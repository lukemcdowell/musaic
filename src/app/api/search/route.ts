import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  console.log(query);

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
  //TODO: only request a new token if the current one is expired
  // response:
  // {
  //   "access_token": "NgCXRKc...MzYjw",
  //   "token_type": "bearer",
  //   "expires_in": 3600
  // }

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
      `https://api.spotify.com/v1/search?q=${query}&type=album&limit=12`,
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
