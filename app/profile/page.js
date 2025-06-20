'use client';

import { useApp } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginScreen from '../../components/LoginScreen';
import LoadingScreen from '../../components/LoadingScreen';
import BottomNavigation from '../../components/BottomNavigation';
import { FaEdit, FaBell, FaShieldAlt, FaQuestionCircle, FaSignOutAlt, FaUser, FaHeart, FaEye } from 'react-icons/fa';

export default function ProfilePage() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  if (!state.isAuthenticated) {
    return <LoginScreen />;
  }
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };
  const profileSections = [
    { id: 'profile', label: 'Profile Info', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Privacy & Security', icon: FaShieldAlt },
    { id: 'help', label: 'Help & Support', icon: FaQuestionCircle },
  ];
  const renderProfileInfo = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <img
          src={state.user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
          alt={state.user?.username}
          className="w-20 h-20 rounded-full"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-bold text-white">{state.user?.username}</h2>
          <p className="text-gray-400">{state.user?.email}</p>
          <div className="flex justify-center sm:justify-start space-x-6 mt-3">
            <div className="text-center">
              <p className="text-white font-bold">123</p>
              <p className="text-gray-400 text-xs">Following</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">1.2K</p>
              <p className="text-gray-400 text-xs">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">89K</p>
              <p className="text-gray-400 text-xs">Likes</p>
            </div>
          </div>
        </div>
        <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <FaEdit className="w-4 h-4 text-white" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            className="w-full p-3 bg-gray-800 rounded-lg text-white resize-none"
            rows="3"
            placeholder="Tell people about yourself..."
            defaultValue="🎬 Content Creator | 🌟 Spreading positivity through videos"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
          <input
            type="url"
            className="w-full p-3 bg-gray-800 rounded-lg text-white"
            placeholder="https://your-website.com"
          />
        </div>
          <button className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Save Changes
        </button>
        
        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <FaSignOutAlt className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
      
      {[
        { label: 'Push Notifications', description: 'Receive notifications on your device' },
        { label: 'Email Notifications', description: 'Receive notifications via email' },
        { label: 'Like Notifications', description: 'When someone likes your videos' },
        { label: 'Comment Notifications', description: 'When someone comments on your videos' },
        { label: 'Follow Notifications', description: 'When someone follows you' },
        { label: 'Marketing Emails', description: 'Receive promotional content' },
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <p className="text-white font-medium">{item.label}</p>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Privacy & Security</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="text-white font-medium mb-2">Account Privacy</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="radio" name="privacy" className="text-white" defaultChecked />
              <span className="ml-2 text-gray-300">Public Account</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="privacy" className="text-white" />
              <span className="ml-2 text-gray-300">Private Account</span>
            </label>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="text-white font-medium mb-2">Who can message you</h4>
          <select className="w-full p-2 bg-gray-700 text-white rounded">
            <option>Everyone</option>
            <option>People you follow</option>
            <option>No one</option>
          </select>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="text-white font-medium mb-2">Comment Filters</h4>
          <label className="flex items-center justify-between">
            <span className="text-gray-300">Hide offensive comments</span>
            <input type="checkbox" className="text-white" defaultChecked />
          </label>
        </div>
        
        <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
          Change Password
        </button>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Help & Support</h3>
      
      {[
        'Report a Problem',
        'Help Center',
        'Privacy Policy',
        'Terms of Service',
        'Community Guidelines',
        'Contact Support',
      ].map((item, index) => (
        <button
          key={index}
          className="w-full p-4 bg-gray-800 rounded-lg text-left text-white hover:bg-gray-700 transition-colors"
        >
          {item}
        </button>
      ))}
      
      <div className="mt-8 pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          <FaSignOutAlt className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileInfo();
      case 'notifications':
        return renderNotifications();
      case 'privacy':
        return renderPrivacy();
      case 'help':
        return renderHelp();
      default:
        return renderProfileInfo();
    }
  };  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="flex items-center p-4">
          <h1 className="text-xl font-bold">Profile Settings</h1>
        </div>
      </div>

      {/* Mobile-first responsive layout */}
      <div className="lg:flex">
        {/* Sidebar - horizontal on mobile, vertical on desktop */}
        <div className="lg:w-64 lg:border-r border-gray-800 lg:min-h-screen p-4">
          {/* Mobile horizontal scroll tabs */}
          <div className="lg:hidden flex overflow-x-auto space-x-2 pb-4 mb-4">
            {profileSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 flex items-center px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-white text-black'
                    : 'text-gray-300 bg-gray-800'
                }`}
              >
                <section.icon className="w-4 h-4 mr-2" />
                {section.label}
              </button>
            ))}
          </div>

          {/* Desktop vertical nav */}
          <nav className="hidden lg:block space-y-2">
            {profileSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <section.icon className="w-5 h-5 mr-3" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {renderContent()}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
