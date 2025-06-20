
'use client';

import { useApp } from '../context/AppContext';
import { useEffect, useState } from 'react';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import LoginScreen from '../components/LoginScreen';
import VideoFeed from '../components/video/VideoFeed';
import LoadingScreen from '../components/LoadingScreen';
import BottomNavigation from '../components/BottomNavigation';

export default function Home() {
  const { state } = useApp();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  // If user is authenticated, show the video feed (home page)
  // If not authenticated, show the landing page
  return (
    <div className="min-h-screen bg-black">
      {!state.isAuthenticated ? (
        <HeroGeometric
          title1="VideoFeed App, "
          title2=" a modern video streaming platform"
        />
      ) : (
        <>
          <VideoFeed />
          <BottomNavigation />
        </>
      )}
    </div>
  );
}
