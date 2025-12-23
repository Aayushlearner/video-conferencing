'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!API_KEY) {
      console.error('Stream API key is missing');
      return;
    }

    try {
      const client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: 'anonymous-user',
          name: 'Anonymous User',
          image: '',
        },
        tokenProvider,
      });

      setVideoClient(client);
    } catch (error) {
      console.error('Failed to create Stream client:', error);
    }
  }, []);

  if (!videoClient) {
    // Render children without StreamVideo if client failed to initialize
    console.warn('Stream client not initialized, rendering without video capabilities');
    return <>{children}</>;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
