/**
 * @jest-environment node
 */

import { GET } from '../../src/app/api/auth/route';

global.fetch = jest.fn();

describe('GET', () => {
  const client_id = 'test_client_id';
  const client_secret = 'test_client_secret';

  beforeAll(() => {
    process.env.SPOTIFY_CLIENT_ID = client_id;
    process.env.SPOTIFY_CLIENT_SECRET = client_secret;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a token on successful fetch', async () => {
    const mockResponse = {
      access_token: 'test_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await GET();

    expect(fetch).toHaveBeenCalledWith(
      'https://accounts.spotify.com/api/token',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: expect.stringContaining('Basic '),
        }),
        body: 'grant_type=client_credentials',
      })
    );

    expect(await result.json()).toEqual(mockResponse);
  });

  it('should return an error on failed fetch', async () => {
    const mockErrorResponse = {
      error: 'Internal Server Error',
    };

    (fetch as jest.Mock).mockRejectedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    const result = await GET();

    expect(fetch).toHaveBeenCalledWith(
      'https://accounts.spotify.com/api/token',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: expect.stringContaining('Basic '),
        }),
        body: 'grant_type=client_credentials',
      })
    );

    expect(await result.json()).toEqual(mockErrorResponse);
  });
});
