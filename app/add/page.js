'use client';

import { useApp } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import LoginScreen from '../../components/LoginScreen';
import LoadingScreen from '../../components/LoadingScreen';
import BottomNavigation from '../../components/BottomNavigation';
import { FaVideo, FaImage, FaMusic, FaPlus, FaTimes } from 'react-icons/fa';

export default function AddPage() {
  const { state } = useApp();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('video');
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  if (!state.isAuthenticated) {
    return <LoginScreen />;
  }

  const uploadTabs = [
    { id: 'video', label: 'Video', icon: FaVideo },
    { id: 'photo', label: 'Photo', icon: FaImage },
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlePublish = () => {
    // Handle publish logic here
    console.log('Publishing content:', { file: selectedFile, caption });
    // Reset form
    setSelectedFile(null);
    setCaption('');
  };
  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-10 flex-shrink-0">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Create</h1>
          {selectedFile && (
            <button
              onClick={handlePublish}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Publish
            </button>
          )}
        </div>
      </div>

      {/* Upload Tabs */}
      <div className="border-b border-gray-800 flex-shrink-0">
        <div className="flex">
          {uploadTabs.map((tab) => (
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
            {!selectedFile ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaPlus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {activeTab === 'video' ? 'Select a video to upload' : 'Select a photo to upload'}
                </p>
                <input
                  type="file"
                  accept={activeTab === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-white text-black px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-200 transition-colors inline-block text-sm"
                >
                  Choose File
                </label>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gray-800 rounded-lg p-3 mr-3">
                    {activeTab === 'video' ? (
                      <FaVideo className="w-6 h-6 text-white" />
                    ) : (
                      <FaImage className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-white font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-gray-400 text-xs">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="ml-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FaTimes className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-white text-sm"
              rows="3"
            />
            <p className="text-gray-400 text-xs mt-1">
              {caption.length}/500 characters
            </p>
          </div>

          {/* Privacy Settings - Simplified */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Privacy
            </label>
            <select className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-sm">
              <option value="public">Public</option>
              <option value="followers">Followers only</option>
              <option value="private">Only me</option>
            </select>
          </div>

          {/* Quick Settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-white text-sm">Allow comments</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-white text-sm">Allow downloads</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
