import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image, MessageCircle, Users, User, Settings, ChevronLeft } from "lucide-react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [activeTab, setActiveTab] = useState("camera");
  const [user, setUser] = useState({
    username: "flashuser",
    displayName: "Flash User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    friends: ["friend1", "friend2", "friend3"],
    streaks: { friend1: 5, friend2: 12 }
  });
  
  const [chats, setChats] = useState([
    { id: "chat1", username: "alex_j", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", lastMessage: "Photo", timestamp: new Date(), status: "delivered", streak: 15 },
    { id: "chat2", username: "taylor89", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", lastMessage: "Video", timestamp: new Date(Date.now() - 3600000), status: "opened", streak: 7 },
    { id: "chat3", username: "sam_wilson", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", lastMessage: "Text", timestamp: new Date(Date.now() - 7200000), status: "sent", streak: 3 },
  ]);
  
  const [stories, setStories] = useState([
    { id: "story1", username: "your_story", avatar: user.avatar, hasUnviewed: false, isYours: true },
    { id: "story2", username: "alex_j", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", hasUnviewed: true },
    { id: "story3", username: "taylor89", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", hasUnviewed: true },
    { id: "story4", username: "sam_wilson", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", hasUnviewed: false },
  ]);

  const formatTime = (date) => {
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "now";
    if (diffHours < 24) return `${diffHours}h`;
    return `${Math.floor(diffHours / 24)}d`;
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <header className="px-4 py-3 bg-white dark:bg-surface-800 shadow-sm z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.img 
              src={user.avatar} 
              alt="Profile" 
              className="w-8 h-8 rounded-full border-2 border-primary"
              whileTap={{ scale: 0.9 }}
            />
            <h1 className="text-xl font-bold">
              Flash<span className="text-primary">Chat</span>
            </h1>
          </div>
          <motion.button 
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
            whileTap={{ scale: 0.9 }}
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "camera" && (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <MainFeature />
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              {/* Stories */}
              <div className="p-4 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4">
                  {stories.map(story => (
                    <motion.div 
                      key={story.id} 
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`relative ${story.hasUnviewed ? 'p-0.5 bg-gradient-to-tr from-primary to-secondary rounded-full' : ''}`}>
                        <img 
                          src={story.avatar} 
                          alt={story.username} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-surface-800"
                        />
                        {story.isYours && (
                          <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-surface-800">
                            <span className="text-xs">+</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs mt-1 truncate w-16 text-center">
                        {story.username}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <h2 className="font-bold text-lg mb-2">Chats</h2>
                {chats.map(chat => (
                  <motion.div 
                    key={chat.id}
                    className="flex items-center p-3 rounded-xl mb-2 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img 
                      src={chat.avatar} 
                      alt={chat.username} 
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-semibold">{chat.username}</span>
                        <span className="text-xs text-surface-500">{formatTime(chat.timestamp)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm ${chat.status === 'opened' ? 'text-surface-500' : 'font-medium'}`}>
                          {chat.lastMessage}
                        </span>
                        {chat.streak > 0 && (
                          <div className="ml-2 flex items-center">
                            <span className="text-xs bg-surface-200 dark:bg-surface-700 px-1.5 py-0.5 rounded-full">
                              🔥 {chat.streak}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full ml-2 flex-shrink-0 bg-primary opacity-0"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "stories" && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col p-4"
            >
              <h2 className="font-bold text-xl mb-4">Stories</h2>
              <div className="grid grid-cols-2 gap-4">
                {stories.map(story => (
                  <motion.div
                    key={story.id}
                    className="aspect-[3/4] rounded-xl overflow-hidden relative bg-gradient-to-br from-surface-700 to-surface-900"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 flex items-center">
                      <img 
                        src={story.avatar} 
                        alt={story.username} 
                        className="w-8 h-8 rounded-full object-cover mr-2 border border-white"
                      />
                      <span className="text-white text-sm font-medium">{story.username}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "friends" && (
            <motion.div
              key="friends"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full p-4"
            >
              <h2 className="font-bold text-xl mb-4">Friends</h2>
              <div className="space-y-4">
                {user.friends.map((friendId, index) => (
                  <motion.div 
                    key={friendId}
                    className="flex items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${1580489944761 + index}-19a922579faa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} 
                      alt={friendId} 
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{friendId}</div>
                      {user.streaks[friendId] && (
                        <div className="flex items-center">
                          <span className="text-xs">🔥 {user.streaks[friendId]} day streak</span>
                        </div>
                      )}
                    </div>
                    <motion.button 
                      className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
                      whileTap={{ scale: 0.9 }}
                    >
                      <MessageCircle size={18} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full p-4"
            >
              <div className="flex flex-col items-center mb-6">
                <motion.div 
                  className="relative mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                  />
                  <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white dark:border-surface-800">
                    <span className="text-sm">+</span>
                  </div>
                </motion.div>
                <h2 className="text-xl font-bold">{user.displayName}</h2>
                <p className="text-surface-500">@{user.username}</p>
              </div>

              <div className="space-y-3">
                <motion.div 
                  className="p-4 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <h3 className="font-semibold mb-2">My Stories</h3>
                  <p className="text-sm text-surface-500">Create and manage your stories</p>
                </motion.div>
                
                <motion.div 
                  className="p-4 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <h3 className="font-semibold mb-2">Friends</h3>
                  <p className="text-sm text-surface-500">{user.friends.length} friends</p>
                </motion.div>
                
                <motion.div 
                  className="p-4 bg-white dark:bg-surface-800 rounded-xl shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <h3 className="font-semibold mb-2">Settings</h3>
                  <p className="text-sm text-surface-500">Privacy and app settings</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-surface-800 shadow-lg rounded-t-xl">
        <div className="flex justify-around py-3">
          {[
            { id: "chat", icon: <MessageCircle size={24} /> },
            { id: "stories", icon: <Image size={24} /> },
            { id: "camera", icon: <Camera size={24} /> },
            { id: "friends", icon: <Users size={24} /> },
            { id: "profile", icon: <User size={24} /> }
          ].map(tab => (
            <motion.button
              key={tab.id}
              className={`p-2 rounded-full ${activeTab === tab.id ? 'text-primary' : 'text-surface-500'}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              {tab.icon}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                  layoutId="navIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ x: "-50%" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Home;