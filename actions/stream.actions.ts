'use server';

import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  try {
    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    // Use a fixed anonymous user ID
    const token = streamClient.createToken('anonymous-user', expirationTime, issuedAt);

    return token;
  } catch (error) {
    console.error('Failed to create token:', error);
    // Return a dummy token to prevent crashes
    return 'dummy-token';
  }
};
