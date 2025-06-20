'use client';

import { useApp } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import LoginScreen from '../../components/LoginScreen';
import LoadingScreen from '../../components/LoadingScreen';
import BottomNavigation from '../../components/BottomNavigation';
import { FaSearch, FaUser, FaVideo, FaHeart } from 'react-icons/fa';

export default function SearchPage() {
  const { state } = useApp();
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  if (!state.isAuthenticated) {
    return <LoginScreen />;
  }

  const searchTabs = [
    { id: 'users', label: 'Users', icon: FaUser },
    { id: 'videos', label: 'Videos', icon: FaVideo },
    { id: 'hashtags', label: 'Tags', icon: FaHeart },
  ];

  const mockUsers = [
    { id: 1, username: 'john_doe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', followers: '1.2M' },
    { id: 2, username: 'jane_smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b976?w=40&h=40&fit=crop&crop=face', followers: '892K' },
    { id: 3, username: 'creator_mike', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', followers: '543K' },
  ];

  const mockVideos = [
    { id: 1, title: 'Amazing dance moves', creator: 'john_doe', likes: '45K', thumbnail: 'https://images.unsplash.com/photo-1574391884720-bbc7df1d3c95?w=200&h=300&fit=crop' },
    { id: 2, title: 'Cooking tips', creator: 'jane_smith', likes: '23K', thumbnail: 'https://images.unsplash.com/photo-1556909114-578d00d2bb5e?w=200&h=300&fit=crop' },
    { id: 3, title: 'Travel vlog', creator: 'creator_mike', likes: '67K', thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d7b9d0?w=200&h=300&fit=crop' },
  ];

  const mockHashtags = [
    { tag: '#dance', count: '2.1M videos' },
    { tag: '#cooking', count: '1.8M videos' },
    { tag: '#travel', count: '3.2M videos' },
    { tag: '#comedy', count: '1.5M videos' },
  ];

  const renderContent = () => {
    if (!searchQuery) {
      return (
        <div className="text-center py-12">
          <FaSearch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Search for users, videos, or hashtags</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center p-4 bg-gray-800 rounded-lg">
                <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <p className="text-white font-medium">@{user.username}</p>
                  <p className="text-gray-400 text-sm">{user.followers} followers</p>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        );

      case 'videos':
        return (
          <div className="grid grid-cols-2 gap-4">
            {mockVideos.map((video) => (
              <div key={video.id} className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-[9/16] object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-sm font-medium">{video.title}</p>
                  <p className="text-gray-300 text-xs">@{video.creator} • {video.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'hashtags':
        return (
          <div className="space-y-4">
            {mockHashtags.map((hashtag, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">#</span>
                </div>
                <div>
                  <p className="text-white font-medium">{hashtag.tag}</p>
                  <p className="text-gray-400 text-sm">{hashtag.count}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for users, videos, hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </div>

      {/* Search Tabs */}
      {searchQuery && (
        <div className="border-b border-gray-800">
          <div className="flex">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-4 ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {renderContent()}
      </div>

      <BottomNavigation />
    </div>
  );
}
