import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image, MessageCircle, Users, User, Settings, ChevronLeft, LogOut, Edit, Save, Check } from "lucide-react";
import MainFeature from "../components/MainFeature";
import ProfileEdit from "../components/ProfileEdit";
import ProfileStats from "../components/ProfileStats";
import ThemeSettings from "../components/ThemeSettings";
import SavedContent from "../components/SavedContent";
import MyStories from "../components/MyStories";
import Friends from "../components/Friends";
import Privacy from "../components/Privacy";
import ChatDetail from "../components/ChatDetail";
import StoryViewer from "../components/StoryViewer";

const Home = ({ darkMode, setDarkMode }) => {
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

  // Story viewer state
  const [activeStory, setActiveStory] = useState(null);

  // Profile section state
  const [profileSection, setProfileSection] = useState("main"); // main, edit, stats, settings, saved, myStories, friends, privacy
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Chat detail state
  const [activeChat, setActiveChat] = useState(null);

  const formatTime = (date) => {
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "now";
    if (diffHours < 24) return `${diffHours}h`;
    return `${Math.floor(diffHours / 24)}d`;
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUser({
      ...user,
      ...updatedProfile
    });
    
    // Update the story avatar as well
    const updatedStories = stories.map(story => 
      story.isYours ? { ...story, avatar: updatedProfile.avatar } : story
    );
    setStories(updatedStories);
    
    setProfileSection("main");
    showToast();
  };

  const showToast = () => {
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  const handleUpdateLastMessage = (chatId, message, status = "delivered") => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              lastMessage: message,
              timestamp: new Date(),
              status
            } 
          : chat
      )
    );
  };

  const handleStoryKeyDown = (e, story) => {
    // Handle keyboard interaction for stories
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleViewStory(story);
    }
  };

  const handleViewStory = (story) => {
    setActiveStory(story);
    
    // Mark story as viewed if it was unviewed
    if (story.hasUnviewed) {
      setStories(prevStories => 
        prevStories.map(s => 
          s.id === story.id ? { ...s, hasUnviewed: false } : s
        )
      );
    }
  };

  const handleCreateNewStory = () => {
    // Switch to camera tab and set up for story creation
    setActiveTab("camera");
    setActiveStory(null);
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
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 focus-visible:ring-2 focus-visible:ring-primary"
            whileTap={{ scale: 0.9 }}
            aria-label="Settings"
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

          {activeTab === "chat" && !activeChat && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              {/* Stories */}
              <div className="p-4 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4" role="list" aria-label="Stories">
                  {stories.map(story => (
                    <motion.div 
                      key={story.id} 
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="listitem"
                    >
                      <div 
                        className={`relative ${story.hasUnviewed ? 'p-0.5 bg-gradient-to-tr from-primary to-secondary rounded-full' : ''}`}
                        tabIndex={0}
                        role="button"
                        aria-label={story.isYours ? "Create your story" : `View ${story.username}'s story`}
                        onKeyDown={(e) => handleStoryKeyDown(e, story)}
                        onClick={() => handleViewStory(story)}
                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none rounded-full"
                      >
                        <img 
                          src={story.avatar} 
                          alt={story.isYours ? "Your profile picture" : `${story.username}'s profile picture`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-surface-800"
                        />
                        {story.isYours && (
                          <div 
                            className="absolute bottom-0 right-0 bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-surface-800"
                            aria-hidden="true"
                          >
                            <span className="text-xs">+</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs mt-1 truncate w-16 text-center">
                        {story.username === "your_story" ? "Your Story" : story.username}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <h2 className="font-bold text-lg mb-2">Chats</h2>
                <div role="list" aria-label="Chat list">
                  {chats.map(chat => (
                    <motion.div 
                      key={chat.id}
                      className="flex items-center p-3 rounded-xl mb-2 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveChat(chat)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveChat(chat);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Chat with ${chat.username}, last message: ${chat.lastMessage}, ${formatTime(chat.timestamp)}`}
                    >
                      <img 
                        src={chat.avatar} 
                        alt={`${chat.username}'s profile picture`}
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
                      {chat.status === "delivered" && (
                        <div 
                          className="w-3 h-3 rounded-full ml-2 flex-shrink-0 bg-primary"
                          aria-label="New message" 
                        ></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "chat" && activeChat && (
            <motion.div
              key={`chat-detail-${activeChat.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <ChatDetail 
                chat={activeChat} 
                onBack={() => setActiveChat(null)}
                onUpdateLastMessage={(message) => handleUpdateLastMessage(activeChat.id, message)}
              />
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
              <div className="grid grid-cols-2 gap-4" role="list" aria-label="Stories grid">
                {stories.map(story => (
                  <motion.div
                    key={story.id}
                    className="aspect-[3/4] rounded-xl overflow-hidden relative bg-gradient-to-br from-surface-700 to-surface-900 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    tabIndex={0}
                    role="button"
                    aria-label={story.isYours ? "Your story" : `${story.username}'s story`}
                    onClick={() => handleViewStory(story)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleViewStory(story);
                      }
                    }}
                  >
                    <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-black to-transparent" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 p-3 flex items-center">
                      <img 
                        src={story.avatar} 
                        alt={story.isYours ? "Your profile picture" : `${story.username}'s profile picture`}
                        className="w-8 h-8 rounded-full object-cover mr-2 border border-white"
                      />
                      <span className="text-white text-sm font-medium">
                        {story.username === "your_story" ? "Your Story" : story.username}
                      </span>
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
              <div className="space-y-4" role="list" aria-label="Friends list">
                {user.friends.map((friendId, index) => (
                  <motion.div 
                    key={friendId}
                    className="flex items-center p-3 bg-white dark:bg-surface-800 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    tabIndex={0}
                    role="listitem"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${1580489944761 + index}-19a922579faa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} 
                      alt={`${friendId}'s profile picture`}
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
                      className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 focus-visible:ring-2 focus-visible:ring-primary"
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Message ${friendId}`}
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
              className="h-full overflow-y-auto"
            >
              <AnimatePresence mode="wait">
                {profileSection === "main" && (
                  <motion.div
                    key="profile-main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4"
                  >
                    <div className="flex flex-col items-center mb-6">
                      <motion.div 
                        className="relative mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img 
                          src={user.avatar} 
                          alt="Your profile picture" 
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                        />
                        <motion.button 
                          className="absolute bottom-0 right-0 bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white dark:border-surface-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setProfileSection("edit")}
                          aria-label="Edit profile"
                        >
                          <Edit size={16} />
                        </motion.button>
                      </motion.div>
                      <h2 className="text-xl font-bold">{user.displayName}</h2>
                      <p className="text-surface-500">@{user.username}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <motion.button
                        className="bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm flex flex-col items-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProfileSection("stats")}
                        aria-label="View your stats"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          <Users size={20} className="text-primary" />
                        </div>
                        <span className="font-medium text-sm">My Stats</span>
                      </motion.button>
                      
                      <motion.button
                        className="bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm flex flex-col items-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProfileSection("saved")}
                        aria-label="View saved items"
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                          <Save size={20} className="text-secondary" />
                        </div>
                        <span className="font-medium text-sm">Saved Items</span>
                      </motion.button>
                      
                      <motion.button
                        className="bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm flex flex-col items-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProfileSection("settings")}
                        aria-label="Change appearance settings"
                      >
                        <div className="w-10 h-10 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center mb-2">
                          <Settings size={20} />
                        </div>
                        <span className="font-medium text-sm">Appearance</span>
                      </motion.button>
                      
                      <motion.button
                        className="bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm flex flex-col items-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowLogoutConfirm(true)}
                        aria-label="Sign out of your account"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                          <LogOut size={20} className="text-red-500" />
                        </div>
                        <span className="font-medium text-sm">Sign Out</span>
                      </motion.button>
                    </div>

                    <div className="space-y-3">
                      <motion.div 
                        className="p-4 bg-white dark:bg-surface-800 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileHover={{ y: -2 }}
                        onClick={() => setProfileSection("myStories")}
                        tabIndex={0}
                        role="button"
                        aria-label="Manage your stories"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setProfileSection("myStories");
                          }
                        }}
                      >
                        <h3 className="font-semibold mb-2">My Stories</h3>
                        <p className="text-sm text-surface-500">Create and manage your stories</p>
                      </motion.div>
                      
                      <motion.div 
                        className="p-4 bg-white dark:bg-surface-800 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileHover={{ y: -2 }}
                        onClick={() => setProfileSection("friends")}
                        tabIndex={0}
                        role="button"
                        aria-label="Manage your friends"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setProfileSection("friends");
                          }
                        }}
                      >
                        <h3 className="font-semibold mb-2">Friends</h3>
                        <p className="text-sm text-surface-500">{user.friends.length} friends</p>
                      </motion.div>
                      
                      <motion.div 
                        className="p-4 bg-white dark:bg-surface-800 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileHover={{ y: -2 }}
                        onClick={() => setProfileSection("privacy")}
                        tabIndex={0}
                        role="button"
                        aria-label="Manage privacy settings"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setProfileSection("privacy");
                          }
                        }}
                      >
                        <h3 className="font-semibold mb-2">Privacy</h3>
                        <p className="text-sm text-surface-500">Manage your privacy settings</p>
                      </motion.div>
                    </div>

                    {/* Logout Confirmation Modal */}
                    <AnimatePresence>
                      {showLogoutConfirm && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                          onClick={() => setShowLogoutConfirm(false)}
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="logout-title"
                        >
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-surface-800 rounded-xl p-5 max-w-xs w-full"
                            onClick={e => e.stopPropagation()}
                          >
                            <h3 className="text-lg font-bold mb-2" id="logout-title">Sign Out</h3>
                            <p className="text-surface-600 dark:text-surface-300 mb-4">
                              Are you sure you want to sign out from FlashChat?
                            </p>
                            <div className="flex space-x-2">
                              <motion.button
                                className="flex-1 py-2 px-4 bg-surface-100 dark:bg-surface-700 rounded-lg text-surface-700 dark:text-surface-300 font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setShowLogoutConfirm(false)}
                              >
                                Cancel
                              </motion.button>
                              <motion.button
                                className="flex-1 py-2 px-4 bg-red-500 rounded-lg text-white font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                  // Handle logout here
                                  setShowLogoutConfirm(false);
                                  // For demo purposes, just show a toast message would be added
                                }}
                              >
                                Sign Out
                              </motion.button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {profileSection === "edit" && (
                  <motion.div
                    key="profile-edit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4"
                  >
                    <div className="flex items-center mb-4">
                      <motion.button
                        className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setProfileSection("main")}
                        aria-label="Go back to profile"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <h2 className="text-xl font-bold">Edit Profile</h2>
                    </div>
                    
                    <ProfileEdit 
                      user={user} 
                      onSave={handleProfileUpdate} 
                      onCancel={() => setProfileSection("main")} 
                    />
                  </motion.div>
                )}

                {profileSection === "stats" && (
                  <motion.div
                    key="profile-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4"
                  >
                    <div className="flex items-center mb-4">
                      <motion.button
                        className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setProfileSection("main")}
                        aria-label="Go back to profile"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <h2 className="text-xl font-bold">My Stats</h2>
                    </div>
                    
                    <ProfileStats user={user} />
                  </motion.div>
                )}

                {profileSection === "settings" && (
                  <motion.div
                    key="profile-settings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4"
                  >
                    <div className="flex items-center mb-4">
                      <motion.button
                        className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setProfileSection("main")}
                        aria-label="Go back to profile"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <h2 className="text-xl font-bold">Appearance</h2>
                    </div>
                    
                    <ThemeSettings 
                      darkMode={darkMode} 
                      onChangeDarkMode={setDarkMode} 
                      onClose={() => setProfileSection("main")} 
                    />
                  </motion.div>
                )}

                {profileSection === "saved" && (
                  <motion.div
                    key="profile-saved"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4"
                  >
                    <div className="flex items-center mb-4">
                      <motion.button
                        className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setProfileSection("main")}
                        aria-label="Go back to profile"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <h2 className="text-xl font-bold">Saved Items</h2>
                    </div>
                    
                    <SavedContent />
                  </motion.div>
                )}

                {profileSection === "myStories" && (
                  <motion.div
                    key="profile-stories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4"
                  >
                    <div className="flex items-center mb-4">
                      <motion.button
                        className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setProfileSection("main")}
                        aria-label="Go back to profile"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <h2 className="text-xl font-bold">My Stories</h2>
                    </div>
                    
                    <MyStories onClose={() => setProfileSection("main")} />
                  </motion.div>
                )}

                {profileSection === "friends" && (
                  <motion.div
                    key="profile-friends"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4"
                  >
                    <div className="flex items-center mb-4">
                      <motion.button
                        className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setProfileSection("main")}
                        aria-label="Go back to profile"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <h2 className="text-xl font-bold">Friend Management</h2>
                    </div>
                    
                    <Friends user={user} onClose={() => setProfileSection("main")} />
                  </motion.div>
                )}

                {profileSection === "privacy" && (
                  <motion.div
                    key="profile-privacy"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4"
                  >
                    <div className="flex items-center mb-4">
                      <motion.button
                        className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 mr-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setProfileSection("main")}
                        aria-label="Go back to profile"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <h2 className="text-xl font-bold">Privacy Settings</h2>
                    </div>
                    
                    <Privacy onClose={() => setProfileSection("main")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-surface-800 shadow-lg rounded-t-xl" aria-label="Main navigation">
        <div className="flex justify-around py-3">
          {[
            { id: "chat", icon: <MessageCircle size={24} />, label: "Messages" },
            { id: "stories", icon: <Image size={24} />, label: "Stories" },
            { id: "camera", icon: <Camera size={24} />, label: "Camera" },
            { id: "friends", icon: <Users size={24} />, label: "Friends" },
            { id: "profile", icon: <User size={24} />, label: "Profile" }
          ].map(tab => (
            <motion.button
              key={tab.id}
              className={`p-2 rounded-full ${activeTab === tab.id ? 'text-primary' : 'text-surface-500'} focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "profile") {
                  setProfileSection("main");
                }
                // Reset active chat when switching away from chat tab
                if (tab.id !== "chat") {
                  setActiveChat(null);
                }
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={tab.label}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.icon}
              <span className="sr-only">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                  layoutId="navIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ x: "-50%" }}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Toast Notification */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg flex items-center space-x-2"
            role="alert"
            aria-live="polite"
          >
            <Check size={16} aria-hidden="true" />
            <span>Changes saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Viewer */}
      <AnimatePresence>
        {activeStory && (
          <StoryViewer 
            story={activeStory} 
            onClose={() => setActiveStory(null)} 
            onCreateNewStory={handleCreateNewStory}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;