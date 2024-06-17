import { NextResponse } from 'next/server';

// get auth token from spotify
export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 3600 }, // cache token for an hour
  };

  try {
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
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
