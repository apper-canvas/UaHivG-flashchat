import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Camera, Send } from "lucide-react";

const StoryViewer = ({ story, onClose, onCreateNewStory }) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressInterval = useRef(null);
  
  // For demo purposes, we'll use placeholder images for viewed stories
  const storyContent = story.isYours 
    ? null 
    : { 
        type: "image", 
        src: `https://images.unsplash.com/photo-${1570129477227 + story.id.charCodeAt(0)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80` 
      };

  useEffect(() => {
    if (story.isYours) return; // No auto progress for "Your Story"
    
    // Reset progress when story changes
    setProgress(0);
    
    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    // Set up progress interval (stories last 5 seconds in this demo)
    const duration = 5000; // 5 seconds
    const increment = 100 / (duration / 100); // Progress increment per 100ms
    
    progressInterval.current = setInterval(() => {
      if (!isPaused) {
        setProgress(prevProgress => {
          const newProgress = prevProgress + increment;
          if (newProgress >= 100) {
            clearInterval(progressInterval.current);
            setTimeout(() => onClose(), 300); // Close after completion
            return 100;
          }
          return newProgress;
        });
      }
    }, 100);
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [story.id, isPaused, onClose, story.isYours]);
  
  // Handle mouse events for pausing
  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  
  // Handle create new story action
  const handleCreateStory = () => {
    onClose();
    if (onCreateNewStory) onCreateNewStory();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Progress bar for viewed stories */}
      {!story.isYours && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-surface-700 z-10">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}
      
      {/* Story header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={story.avatar} 
            alt={story.username} 
            className="w-8 h-8 rounded-full border border-white mr-2" 
          />
          <span className="text-white font-medium">
            {story.username === "your_story" ? "Your Story" : story.username}
          </span>
          <span className="text-surface-300 text-xs ml-2">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-white p-1"
          aria-label="Close story"
        >
          <X size={24} />
        </motion.button>
      </div>
      
      {/* Story content */}
      <div 
        className="flex-1 flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {story.isYours ? (
          // Create new story UI
          <div className="text-center p-6">
            <div className="mb-8">
              <div className="w-20 h-20 bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={32} className="text-white" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Create Your Story</h3>
              <p className="text-surface-300">Share a photo or video with your friends</p>
            </div>
            
            <motion.button
              className="bg-primary text-surface-900 font-bold py-3 px-8 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateStory}
            >
              Create Now
            </motion.button>
          </div>
        ) : (
          // View story content
          <div className="relative w-full h-full">
            {storyContent?.type === "image" && (
              <img 
                src={storyContent.src} 
                alt={`${story.username}'s story`}
                className="max-h-full max-w-full object-contain" 
              />
            )}
            
            {/* Navigation for stories */}
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              <motion.button 
                className="w-1/3 h-full flex items-center justify-start pointer-events-auto opacity-0 hover:opacity-100"
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(); // In a real app, would go to previous story
                }}
              >
                <div className="bg-black bg-opacity-30 rounded-full p-2 ml-4">
                  <ChevronLeft size={20} className="text-white" />
                </div>
              </motion.button>
              
              <motion.button 
                className="w-1/3 h-full flex items-center justify-end pointer-events-auto opacity-0 hover:opacity-100"
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(); // In a real app, would go to next story
                }}
              >
                <div className="bg-black bg-opacity-30 rounded-full p-2 mr-4">
                  <ChevronRight size={20} className="text-white" />
                </div>
              </motion.button>
            </div>
          </div>
        )}
      </div>
      
      {/* Story footer - for non-owner stories */}
      {!story.isYours && (
        <div className="p-4 flex items-center">
          <input
            type="text"
            placeholder="Reply to story..."
            className="flex-1 bg-surface-800 text-white border-none rounded-full py-3 px-4 mr-2 focus:outline-none"
          />
          <motion.button
            className="bg-primary rounded-full p-3"
            whileTap={{ scale: 0.9 }}
          >
            <Send size={18} className="text-surface-900" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default StoryViewer;