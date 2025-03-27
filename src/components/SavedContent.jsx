import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, MessageSquare, Bookmark, Trash } from 'lucide-react';

// Example saved content (in a real app, this would come from props or context)
const dummySavedContent = {
  photos: [
    { id: 'p1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', caption: 'Beach day', date: '2 days ago' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36', caption: 'Mountain hike', date: '5 days ago' },
    { id: 'p3', url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12', caption: 'City view', date: '1 week ago' },
    { id: 'p4', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956', caption: 'Sunset moment', date: '2 weeks ago' },
  ],
  videos: [
    { id: 'v1', thumbnail: 'https://images.unsplash.com/photo-1522869635100-187f6605241d', caption: 'Party time', duration: '0:15', date: '3 days ago' },
    { id: 'v2', thumbnail: 'https://images.unsplash.com/photo-1570612861542-284f4c12e75f', caption: 'Concert night', duration: '0:22', date: '1 week ago' },
  ],
  messages: [
    { id: 'm1', content: 'Remember to check this out!', from: 'alex_j', date: '1 day ago' },
    { id: 'm2', content: 'Important note for later', from: 'taylor89', date: '4 days ago' },
    { id: 'm3', content: 'Address for the event: 123 Main St', from: 'sam_wilson', date: '1 week ago' },
  ]
};

const SavedContent = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [savedContent, setSavedContent] = useState(dummySavedContent);
  
  const tabs = [
    { id: 'photos', icon: <Image size={18} />, label: 'Photos', count: savedContent.photos.length },
    { id: 'videos', icon: <Video size={18} />, label: 'Videos', count: savedContent.videos.length },
    { id: 'messages', icon: <MessageSquare size={18} />, label: 'Messages', count: savedContent.messages.length },
  ];
  
  const removeItem = (type, id) => {
    setSavedContent({
      ...savedContent,
      [type]: savedContent[type].filter(item => item.id !== id)
    });
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Saved Items</h2>
        <Bookmark size={18} className="text-primary" />
      </div>
      
      <div className="flex border-b border-surface-200 dark:border-surface-700 mb-4">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            className={`flex items-center py-2 px-3 relative ${
              activeTab === tab.id 
                ? 'text-primary' 
                : 'text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            <span>{tab.label}</span>
            <span className="ml-1 text-xs bg-surface-100 dark:bg-surface-700 px-1.5 rounded-full">
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="savedContentTabIndicator"
              />
            )}
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'photos' && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 gap-2"
          >
            {savedContent.photos.map(photo => (
              <motion.div
                key={photo.id}
                className="relative rounded-lg overflow-hidden aspect-square"
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src={`${photo.url}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`} 
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                  <p className="text-white text-xs">{photo.caption}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-white/80 text-xs">{photo.date}</span>
                    <motion.button
                      className="p-1 bg-white/20 rounded-full"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem('photos', photo.id)}
                    >
                      <Trash size={14} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {activeTab === 'videos' && (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {savedContent.videos.map(video => (
              <motion.div
                key={video.id}
                className="relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-video relative">
                  <img 
                    src={`${video.thumbnail}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`} 
                    alt={video.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-white text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{video.caption}</p>
                    <p className="text-surface-500 text-xs">{video.date}</p>
                  </div>
                  <motion.button
                    className="p-1.5 bg-surface-100 dark:bg-surface-700 rounded-full"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem('videos', video.id)}
                  >
                    <Trash size={16} className="text-surface-500" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {activeTab === 'messages' && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {savedContent.messages.map(message => (
              <motion.div
                key={message.id}
                className="p-3 rounded-lg bg-surface-50 dark:bg-surface-700 relative"
                whileHover={{ x: 5 }}
              >
                <p className="text-sm mb-1">{message.content}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-surface-500">From @{message.from} • {message.date}</p>
                  <motion.button
                    className="p-1 bg-surface-200 dark:bg-surface-600 rounded-full"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem('messages', message.id)}
                  >
                    <Trash size={14} className="text-surface-500" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SavedContent;