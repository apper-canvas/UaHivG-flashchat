import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, UserPlus, AlertCircle } from 'lucide-react';
import { useFriends } from '../contexts/FriendsContext';

const AddFriend = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { searchResults, searchUsers, sendFriendRequest } = useFriends();

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        setIsSearching(true);
        searchUsers(searchTerm);
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, searchUsers]);

  const handleSendRequest = (userId) => {
    sendFriendRequest(userId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center mb-4">
        <motion.button
          className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2"
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <ChevronLeft size={18} />
        </motion.button>
        <h3 className="text-lg font-semibold">Add Friend</h3>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-surface-400" />
        </div>
        <input
          type="text"
          className="pl-10 pr-4 py-2 w-full bg-surface-100 dark:bg-surface-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search by username or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.length < 2 ? (
        <div className="text-center py-6">
          <AlertCircle className="mx-auto mb-2 text-surface-400" size={24} />
          <p className="text-surface-500">Type at least 2 characters to search</p>
        </div>
      ) : isSearching ? (
        <div className="text-center py-6">
          <div className="typing-indicator mx-auto">
            <span></span><span></span><span></span>
          </div>
          <p className="text-surface-500 mt-2">Searching...</p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-surface-500">No users found</p>
        </div>
      ) : (
        <div className="space-y-3 mt-2">
          {searchResults.map(user => (
            <motion.div
              key={user.id}
              className="flex items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <div className="font-semibold">{user.displayName}</div>
                <div className="text-xs text-surface-500">@{user.username}</div>
              </div>
              <motion.button
                className="p-2 rounded-full bg-primary text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSendRequest(user.id)}
              >
                <UserPlus size={18} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AddFriend;