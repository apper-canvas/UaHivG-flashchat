import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Smile, Paperclip, Image as ImageIcon, Mic, Camera, X } from "lucide-react";

const ChatInput = ({ onSendMessage, onAttachment }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = (type) => {
    setShowAttachments(false);
    onAttachment(type);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Here you would normally upload or process the file
      // For demo purposes, we're just simulating it
      onAttachment("image");
    }
    // Clear the input
    e.target.value = "";
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
  };

  // Simulated emoji picker
  const emojis = ["😊", "😂", "❤️", "👍", "🔥", "🎉", "🤔", "😍", "🙏", "👋", "🥳", "😎"];

  return (
    <div className="relative">
      {/* Attachment options */}
      <AnimatePresence>
        {showAttachments && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-surface-800 rounded-xl shadow-lg p-3"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-sm">Share</h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAttachments(false)}
              >
                <X size={18} />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              <motion.button
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <ImageIcon size={20} className="text-blue-500" />
                </div>
                <span className="text-xs">Gallery</span>
              </motion.button>
              
              <motion.button
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAttachment("camera")}
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Camera size={20} className="text-green-500" />
                </div>
                <span className="text-xs">Camera</span>
              </motion.button>
              
              <motion.button
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAttachment("voice")}
              >
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Mic size={20} className="text-red-500" />
                </div>
                <span className="text-xs">Audio</span>
              </motion.button>
              
              <motion.button
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAttachment("file")}
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Paperclip size={20} className="text-purple-500" />
                </div>
                <span className="text-xs">Files</span>
              </motion.button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji picker */}
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 right-0 bg-white dark:bg-surface-800 rounded-xl shadow-lg p-3 w-64"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-sm">Emoji</h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowEmojiPicker(false)}
              >
                <X size={18} />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji, index) => (
                <motion.button
                  key={index}
                  className="text-2xl p-1 hover:bg-surface-100 dark:hover:bg-surface-700 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    addEmoji(emoji);
                    setShowEmojiPicker(false);
                  }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div className="flex items-center space-x-2 bg-white dark:bg-surface-800 p-3 border-t border-surface-200 dark:border-surface-700">
        <motion.button
          className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShowAttachments(!showAttachments);
            setShowEmojiPicker(false);
          }}
        >
          <Paperclip size={20} className="text-surface-500" />
        </motion.button>
        
        <div className="flex-1 flex items-center bg-surface-100 dark:bg-surface-700 rounded-full px-4 py-2">
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:outline-none"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <motion.button
            className="ml-2"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setShowAttachments(false);
            }}
          >
            <Smile size={20} className="text-surface-500" />
          </motion.button>
        </div>
        
        <motion.button
          className={`p-2 rounded-full ${message.trim() ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}
          whileTap={{ scale: 0.9 }}
          onClick={message.trim() ? handleSend : () => handleAttachment("voice")}
        >
          {message.trim() ? (
            <Send size={20} className="text-surface-900" />
          ) : (
            <Mic size={20} className="text-surface-500" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;