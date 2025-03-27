import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Check, X } from 'lucide-react';
import { useFriends } from '../contexts/FriendsContext';

const FriendRequests = ({ onClose }) => {
  const { pendingRequests, acceptFriendRequest, rejectFriendRequest } = useFriends();

  const formatTime = (date) => {
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleAccept = (requestId) => {
    acceptFriendRequest(requestId);
  };

  const handleReject = (requestId, type = 'incoming') => {
    rejectFriendRequest(requestId, type);
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
        <h3 className="text-lg font-semibold">Friend Requests</h3>
      </div>
      
      {pendingRequests.incoming.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-surface-500">Received Requests</h4>
          <div className="space-y-3">
            {pendingRequests.incoming.map(request => (
              <motion.div 
                key={request.id}
                className="flex items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img 
                  src={request.avatar} 
                  alt={request.username} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3 flex-1">
                  <div className="font-semibold">{request.displayName}</div>
                  <div className="text-xs text-surface-500">@{request.username}</div>
                  <div className="flex items-center text-xs text-surface-400">
                    <Clock size={12} className="mr-1" />
                    {formatTime(request.timeSent)}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <motion.button
                    className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAccept(request.id)}
                  >
                    <Check size={18} />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleReject(request.id)}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
      
      {pendingRequests.outgoing.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-surface-500 mt-6">Sent Requests</h4>
          <div className="space-y-3">
            {pendingRequests.outgoing.map(request => (
              <motion.div 
                key={request.id}
                className="flex items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img 
                  src={request.avatar} 
                  alt={request.username} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3 flex-1">
                  <div className="font-semibold">{request.displayName}</div>
                  <div className="text-xs text-surface-500">@{request.username}</div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs py-0.5 px-1.5 bg-surface-100 dark:bg-surface-700 rounded-full">
                      Pending
                    </span>
                    <span className="text-xs text-surface-400 ml-2">
                      {formatTime(request.timeSent)}
                    </span>
                  </div>
                </div>
                <motion.button
                  className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleReject(request.id, 'outgoing')}
                >
                  <X size={18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </>
      )}
      
      {pendingRequests.incoming.length === 0 && pendingRequests.outgoing.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-surface-500">No pending friend requests</p>
        </div>
      )}
    </motion.div>
  );
};

export default FriendRequests;