import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

async function loadMockData() {
  const mockDataPath = path.join(
    process.cwd(),
    '/src/mock/mockAlbumResults.json'
  );
  const mockData = await fs.readFile(mockDataPath, 'utf8');
  return JSON.parse(mockData);
}

async function fetchSpotifyData(access_token: string, query: string) {
  const searchOptions = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=album&limit=6`,
    searchOptions
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  } else if (response.status === 401) {
    throw new Error('Unauthorized');
  } else {
    throw new Error(data.error || 'Failed to fetch data from Spotify');
  }
}

// search for an album using spotify api
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (process.env.MOCK && process.env.MOCK === 'true') {
    const mockData = await loadMockData();
    return NextResponse.json(mockData);
  }

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  // authenticate to spotify api via /api/auth
  async function fetchAccessToken() {
    // dynamically construct the base URL from the request
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    const authResponse = await fetch(`${baseUrl}/api/auth`);
    const authData = await authResponse.json();

    if (authResponse.status !== 200) {
      throw new Error('Failed to authenticate');
    }

    return authData.access_token;
  }

  // try and search spotify, if token has expired, reauthenticate
  try {
    let access_token = await fetchAccessToken();
    let data;

    try {
      data = await fetchSpotifyData(access_token, query);
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        access_token = await fetchAccessToken();
        data = await fetchSpotifyData(access_token, query);
      } else {
        throw error;
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
