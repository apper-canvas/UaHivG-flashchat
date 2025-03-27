import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye, Clock, UserCheck, Lock, Globe } from 'lucide-react';

const MyStories = ({ onClose }) => {
  const [stories, setStories] = useState([
    {
      id: 'story1',
      thumbnail: 'https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      createdAt: new Date(Date.now() - 3600000 * 2),
      views: 15,
      privacy: 'friends',
      duration: 24,
    },
    {
      id: 'story2',
      thumbnail: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      createdAt: new Date(Date.now() - 3600000 * 10),
      views: 42,
      privacy: 'public',
      duration: 24,
    },
    {
      id: 'story3',
      thumbnail: 'https://images.unsplash.com/photo-1535615615570-3b839f4359be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      createdAt: new Date(Date.now() - 3600000 * 20),
      views: 7,
      privacy: 'private',
      duration: 24,
    }
  ]);

  const formatTime = (date) => {
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case 'private':
        return <Lock size={14} />;
      case 'friends':
        return <UserCheck size={14} />;
      case 'public':
        return <Globe size={14} />;
      default:
        return <UserCheck size={14} />;
    }
  };

  const handleDelete = (storyId) => {
    setStories(stories.filter(story => story.id !== storyId));
  };

  const handleCreateStory = () => {
    // Here would go the logic to navigate to the camera/story creation interface
    alert("Create story functionality would open the camera interface");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Your Stories</h3>
        <motion.button
          className="btn btn-primary flex items-center space-x-1 py-1.5 px-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateStory}
        >
          <Plus size={16} />
          <span>New Story</span>
        </motion.button>
      </div>
      
      <div className="space-y-3">
        {stories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-surface-500 mb-4">You haven't shared any stories yet</p>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateStory}
            >
              Create Your First Story
            </motion.button>
          </div>
        ) : (
          stories.map((story) => (
            <motion.div
              key={story.id}
              className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm"
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex">
                <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                  <img 
                    src={story.thumbnail} 
                    alt="Story thumbnail" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex-1">
                  <div className="flex justify-between">
                    <div className="text-xs text-surface-500 flex items-center space-x-2">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatTime(story.createdAt)}
                      </span>
                      <span className="flex items-center">
                        {getPrivacyIcon(story.privacy)}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <motion.button
                        className="p-1.5 rounded-full bg-surface-100 dark:bg-surface-700"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={14} />
                      </motion.button>
                      <motion.button
                        className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(story.id)}
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center mt-1">
                      <Eye size={14} className="text-surface-500 mr-1" />
                      <span className="text-xs text-surface-500">{story.views} views</span>
                    </div>
                    <div className="mt-1 w-full bg-surface-200 dark:bg-surface-700 rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ 
                          width: `${
                            Math.max(
                              0, 
                              100 - (((new Date() - story.createdAt) / (3600000 * story.duration)) * 100)
                            )
                          }%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyStories;