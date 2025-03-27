import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, Smile, MoreVertical, Phone, Video } from 'lucide-react';
import { useFriends } from '../contexts/FriendsContext';

const FriendChat = ({ friend }) => {
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const { getChatMessages, sendMessage, closeChat, currentUser } = useFriends();
  const messages = getChatMessages(friend.id);

  useEffect(() => {
    // Auto scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
    
    // Simulate friend typing occasionally
    const randomTimeout = Math.floor(Math.random() * 10000) + 5000;
    const typingTimeout = setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }, randomTimeout);
    
    return () => clearTimeout(typingTimeout);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    sendMessage(messageText);
    setMessageText('');
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-[80vh]"
    >
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center">
          <motion.button
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2"
            whileTap={{ scale: 0.9 }}
            onClick={closeChat}
          >
            <ChevronLeft size={18} />
          </motion.button>
          <div className="flex items-center">
            <div className="relative">
              <img
                src={friend.avatar}
                alt={friend.displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {friend.lastActive && (new Date() - friend.lastActive) < 900000 && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-surface-800"></div>
              )}
            </div>
            <div className="ml-2">
              <div className="font-semibold">{friend.displayName}</div>
              <div className="text-xs text-surface-500">
                {friend.lastActive && (new Date() - friend.lastActive) < 900000
                  ? 'Active now'
                  : 'Offline'
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <motion.button
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Phone size={18} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Video size={18} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoreVertical size={18} />
          </motion.button>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-3">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <MessageIcon />
              </motion.div>
            </div>
            <p className="font-medium">No messages yet</p>
            <p className="text-sm text-surface-500 mt-1">
              Say hello to {friend.displayName}!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isSentByMe = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`message-bubble ${
                    isSentByMe ? 'message-sent' : 'message-received'
                  }`}
                >
                  <div>{message.text}</div>
                  <div className="text-xs mt-1 opacity-70 text-right">
                    {formatMessageTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="message-bubble message-received py-2 px-3">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t border-surface-200 dark:border-surface-700 p-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
          >
            <Smile size={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-surface-100 dark:bg-surface-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <motion.button
            type="submit"
            className="p-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!messageText.trim()}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

// Chat bubble icon for empty state
const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default FriendChat;