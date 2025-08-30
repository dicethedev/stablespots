"use client";

import { HomeView } from "./views";
import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function HomePage() {
   const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  return <HomeView />;
}
