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

// search for an album using spotify api
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (process.env.MOCK === 'true') {
    const mockData = await loadMockData();
    return NextResponse.json(mockData);
  }

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
  );
  const authData = await authResponse.json();

  if (authResponse.status !== 200) {
    return NextResponse.json(authData, { status: authResponse.status });
  }

  const access_token = authData.access_token;

  const searchOptions = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=album&limit=9`,
      searchOptions
    );
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
