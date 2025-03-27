import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, BellRing, MessageCircle, UserMinus, Check, X } from 'lucide-react';
import FriendRequests from './FriendRequests';
import AddFriend from './AddFriend';
import FriendChat from './FriendChat';
import { useFriends } from '../contexts/FriendsContext';

const Friends = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  
  const { 
    friends, 
    pendingRequests, 
    activeChat,
    removeFriend, 
    startChat 
  } = useFriends();
  
  const formatLastActive = (date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return diffMinutes <= 15 ? 'Active now' : `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffMinutes / 1440)}d ago`;
    }
  };
  
  const handleRemoveFriend = (friendId) => {
    if (confirm('Are you sure you want to remove this friend?')) {
      removeFriend(friendId);
    }
  };
  
  const filteredFriends = friends.filter(friend => 
    friend.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeChat) {
    return <FriendChat friend={activeChat} />;
  }

  return (
    <AnimatePresence mode="wait">
      {showFriendRequests && (
        <FriendRequests onClose={() => setShowFriendRequests(false)} />
      )}
      {showAddFriend && (
        <AddFriend onClose={() => setShowAddFriend(false)} />
      )}
      {!showFriendRequests && !showAddFriend && !activeChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Friends</h3>
            <div className="flex space-x-2">
              <motion.button
                className="relative p-2 rounded-full bg-surface-100 dark:bg-surface-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFriendRequests(true)}
              >
                <BellRing size={18} />
                {(pendingRequests.incoming.length > 0) && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {pendingRequests.incoming.length}
                  </span>
                )}
              </motion.button>
              <motion.button
                className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddFriend(true)}
              >
                <UserPlus size={18} />
              </motion.button>
            </div>
          </div>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-surface-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full bg-surface-100 dark:bg-surface-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-3 mt-2">
            {filteredFriends.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-surface-500">No friends found</p>
              </div>
            ) : (
              filteredFriends.map(friend => (
                <motion.div
                  key={friend.id}
                  className="flex items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-surface-800"
                    />
                    {formatLastActive(friend.lastActive) === 'Active now' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-surface-800"></div>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="font-semibold">{friend.displayName}</div>
                    <div className="flex items-center">
                      <span className="text-xs text-surface-500">@{friend.username}</span>
                      {friend.streak > 0 && (
                        <span className="ml-2 text-xs bg-surface-100 dark:bg-surface-700 px-1.5 py-0.5 rounded-full">
                          🔥 {friend.streak}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-surface-400">
                      {formatLastActive(friend.lastActive)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <motion.button
                      className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => startChat(friend.id)}
                    >
                      <MessageCircle size={18} />
                    </motion.button>
                    <motion.button
                      className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      <UserMinus size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Friends;