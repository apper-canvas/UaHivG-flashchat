import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";

const ChatMessage = ({ message, showAvatar, avatar, username }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check size={14} className="text-surface-400" />;
      case "delivered":
        return (
          <div className="flex">
            <Check size={14} className="text-surface-400" />
            <Check size={14} className="text-surface-400 -ml-1" />
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <Check size={14} className="text-blue-500" />
            <Check size={14} className="text-blue-500 -ml-1" />
          </div>
        );
      default:
        return null;
    }
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const messageVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    }
  };

  return (
    <motion.div
      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-2`}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
    >
      {message.sender === "other" && showAvatar ? (
        <img 
          src={avatar} 
          alt={username} 
          className="w-8 h-8 rounded-full mr-2 mt-1"
        />
      ) : message.sender === "other" ? (
        <div className="w-8 mr-2" />
      ) : null}
      
      <div className={`max-w-[80%] ${message.type === "image" ? "max-w-xs" : ""}`}>
        <div 
          className={`message-bubble ${
            message.sender === "me" ? "message-sent" : "message-received"
          }`}
        >
          {message.type === "text" && (
            <p>{message.content}</p>
          )}
          
          {message.type === "image" && (
            <div className="rounded-lg overflow-hidden">
              {!imageLoaded && (
                <div className="w-full h-48 bg-surface-300 dark:bg-surface-600 animate-pulse flex items-center justify-center">
                  <span className="text-surface-500 dark:text-surface-400 text-sm">Loading image...</span>
                </div>
              )}
              <img 
                src={message.content} 
                alt="Shared image" 
                className={`w-full object-cover ${!imageLoaded ? 'hidden' : 'block'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          )}
          
          {message.type === "voice" && (
            <div className="flex items-center space-x-3 py-1">
              <div className="w-8 h-8 rounded-full bg-surface-300 dark:bg-surface-600 flex items-center justify-center">
                <Play size={16} fill="currentColor" />
              </div>
              <div className="space-y-1">
                <div className="w-32 h-1 bg-surface-300 dark:bg-surface-600 rounded-full">
                  <div className="w-1/3 h-full bg-surface-500 dark:bg-surface-400 rounded-full"></div>
                </div>
                <span className="text-xs">{message.content}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className={`flex text-xs mt-1 text-surface-500 ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
          <span>{formatTime(message.time)}</span>
          {message.sender === "me" && (
            <span className="ml-1">{getStatusIcon()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;