'use client';

import { useApp } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import LoginScreen from '../../components/LoginScreen';
import VideoFeed from '../../components/video/VideoFeed';
import LoadingScreen from '../../components/LoadingScreen';
import BottomNavigation from '../../components/BottomNavigation';

export default function ReelsPage() {
  const { state } = useApp();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      {!state.isAuthenticated ? (
        <LoginScreen />
      ) : (
        <>
          <VideoFeed />
          <BottomNavigation />
        </>
      )}
    </div>
  );
}