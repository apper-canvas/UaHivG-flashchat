import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Globe, Users, UserX, Bell, AlertTriangle, Check } from 'lucide-react';

const Privacy = ({ onClose }) => {
  const [settings, setSettings] = useState({
    storyPrivacy: 'friends',
    profileVisibility: 'everyone',
    receiveMessages: 'friends',
    lastSeen: true,
    readReceipts: true,
    notificationsEnabled: true,
    blockedUsers: [
      {
        id: 'blocked1',
        username: 'unwanted_user',
        displayName: 'Unwanted User',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      }
    ]
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleRadioChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleUnblock = (userId) => {
    setSettings(prev => ({
      ...prev,
      blockedUsers: prev.blockedUsers.filter(user => user.id !== userId)
    }));
  };

  return (
    <div className="bg-surface-50 dark:bg-surface-900 rounded-xl p-4 shadow-md max-w-2xl mx-auto overflow-y-auto max-h-[90vh]">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-primary/10 mr-3">
          <Shield size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">Privacy Settings</h3>
      </div>
      
      {/* Story Privacy */}
      <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm mb-4">
        <div className="flex items-start">
          <Lock size={18} className="mt-1 mr-3 text-primary" />
          <div className="flex-1">
            <h4 className="font-medium mb-2 text-surface-800 dark:text-surface-100">Story Privacy</h4>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-3">
              Control who can see your stories
            </p>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="storyPrivacy"
                  checked={settings.storyPrivacy === 'private'}
                  onChange={() => handleRadioChange('storyPrivacy', 'private')}
                  className="mr-2"
                />
                <div className="flex items-center text-surface-700 dark:text-surface-300">
                  <Eye size={14} className="mr-1" />
                  <span>Only me</span>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="storyPrivacy"
                  checked={settings.storyPrivacy === 'friends'}
                  onChange={() => handleRadioChange('storyPrivacy', 'friends')}
                  className="mr-2"
                />
                <div className="flex items-center text-surface-700 dark:text-surface-300">
                  <Users size={14} className="mr-1" />
                  <span>Friends only</span>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="storyPrivacy"
                  checked={settings.storyPrivacy === 'public'}
                  onChange={() => handleRadioChange('storyPrivacy', 'public')}
                  className="mr-2"
                />
                <div className="flex items-center text-surface-700 dark:text-surface-300">
                  <Globe size={14} className="mr-1" />
                  <span>Everyone</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Visibility */}
      <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm mb-4">
        <div className="flex items-start">
          <Eye size={18} className="mt-1 mr-3 text-secondary" />
          <div className="flex-1">
            <h4 className="font-medium mb-2 text-surface-800 dark:text-surface-100">Profile Visibility</h4>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-3">
              Control who can see your profile information
            </p>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={settings.profileVisibility === 'friends'}
                  onChange={() => handleRadioChange('profileVisibility', 'friends')}
                  className="mr-2"
                />
                <div className="flex items-center text-surface-700 dark:text-surface-300">
                  <Users size={14} className="mr-1" />
                  <span>Friends only</span>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={settings.profileVisibility === 'everyone'}
                  onChange={() => handleRadioChange('profileVisibility', 'everyone')}
                  className="mr-2"
                />
                <div className="flex items-center text-surface-700 dark:text-surface-300">
                  <Globe size={14} className="mr-1" />
                  <span>Everyone</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Message Settings */}
      <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm mb-4">
        <h4 className="font-medium mb-3 text-surface-800 dark:text-surface-100">Message Settings</h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell size={16} className="mr-2 text-surface-500" />
              <span className="text-sm text-surface-700 dark:text-surface-300">Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={settings.notificationsEnabled}
                onChange={() => handleToggle('notificationsEnabled')}
              />
              <div className="w-11 h-6 bg-surface-300 peer-focus:ring-primary rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Eye size={16} className="mr-2 text-surface-500" />
              <span className="text-sm text-surface-700 dark:text-surface-300">Show last seen</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={settings.lastSeen}
                onChange={() => handleToggle('lastSeen')}
              />
              <div className="w-11 h-6 bg-surface-300 peer-focus:ring-primary rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Check size={16} className="mr-2 text-surface-500" />
              <span className="text-sm text-surface-700 dark:text-surface-300">Read receipts</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={settings.readReceipts}
                onChange={() => handleToggle('readReceipts')}
              />
              <div className="w-11 h-6 bg-surface-300 peer-focus:ring-primary rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Blocked Users */}
      <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm mb-4">
        <div className="flex items-center mb-3">
          <UserX size={16} className="mr-2 text-red-500" />
          <h4 className="font-medium text-surface-800 dark:text-surface-100">Blocked Users</h4>
        </div>
        
        {settings.blockedUsers.length === 0 ? (
          <p className="text-sm text-surface-500 dark:text-surface-400 py-2">You haven't blocked any users</p>
        ) : (
          <div className="space-y-2">
            {settings.blockedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-2 bg-surface-100 dark:bg-surface-700 rounded-lg">
                <div className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div>
                    <div className="text-sm font-medium text-surface-800 dark:text-surface-100">{user.displayName}</div>
                    <div className="text-xs text-surface-500 dark:text-surface-400">@{user.username}</div>
                  </div>
                </div>
                <motion.button
                  className="text-xs py-1 px-2 bg-surface-200 dark:bg-surface-600 rounded-md text-surface-700 dark:text-surface-200"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUnblock(user.id)}
                >
                  Unblock
                </motion.button>
              </div>
            ))}
          </div>
        )}
        
        <motion.button
          className="mt-3 text-sm text-primary flex items-center"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
        >
          <UserX size={14} className="mr-1" />
          Block a user
        </motion.button>
      </div>
      
      {/* Account Security Warning */}
      <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-xl p-4 shadow-sm mb-4">
        <div className="flex items-start">
          <AlertTriangle size={18} className="mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium mb-1">Account Security</h4>
            <p className="text-sm">
              Protect your account by enabling two-factor authentication in account settings.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-2 pb-4">
        <motion.button
          className="btn btn-secondary px-6 mr-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Cancel
        </motion.button>
        <motion.button
          className="btn btn-primary px-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
};

export default Privacy;