import { createContext, useState, useContext, useEffect } from 'react';
import { initialFriends, initialPendingRequests, initialMessages } from '../utils/friendsData';

const FriendsContext = createContext();

export const useFriends = () => useContext(FriendsContext);

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState(initialFriends);
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
  const [searchResults, setSearchResults] = useState([]);
  const [messages, setMessages] = useState(initialMessages);
  const [activeChat, setActiveChat] = useState(null);
  const [currentUser] = useState({
    id: 'user1',
    username: 'currentuser',
    displayName: 'Current User',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  });

  // Add friend
  const sendFriendRequest = (userId) => {
    const user = searchResults.find(user => user.id === userId);
    if (!user) return;

    // Check if request already exists
    const exists = pendingRequests.outgoing.some(req => req.id === userId);
    if (exists) return;

    // Add to outgoing requests
    setPendingRequests(prev => ({
      ...prev,
      outgoing: [...prev.outgoing, {
        ...user,
        id: userId,
        timeSent: new Date()
      }]
    }));

    // Remove from search results
    setSearchResults(prev => prev.filter(u => u.id !== userId));
  };

  // Accept friend request
  const acceptFriendRequest = (requestId) => {
    const request = pendingRequests.incoming.find(req => req.id === requestId);
    if (!request) return;

    // Add to friends
    setFriends(prev => [...prev, {
      ...request,
      streak: 0,
      lastActive: new Date(),
      messageCount: 0
    }]);

    // Remove from pending requests
    setPendingRequests(prev => ({
      ...prev,
      incoming: prev.incoming.filter(req => req.id !== requestId)
    }));
  };

  // Reject friend request
  const rejectFriendRequest = (requestId, type = 'incoming') => {
    setPendingRequests(prev => ({
      ...prev,
      [type]: prev[type].filter(req => req.id !== requestId)
    }));
  };

  // Remove friend
  const removeFriend = (friendId) => {
    setFriends(prev => prev.filter(friend => friend.id !== friendId));
    
    // Also remove any active chat
    if (activeChat?.id === friendId) {
      setActiveChat(null);
    }
  };

  // Search users
  const searchUsers = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Simulate an API call
    setTimeout(() => {
      const results = [
        {
          id: 'user2',
          username: 'emma_watson',
          displayName: 'Emma Watson',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        },
        {
          id: 'user3',
          username: 'robert_downey',
          displayName: 'Robert Downey Jr',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        },
        {
          id: 'user4',
          username: 'jennifer_lopez',
          displayName: 'Jennifer Lopez',
          avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        }
      ].filter(user => 
        user.username.includes(query.toLowerCase()) || 
        user.displayName.toLowerCase().includes(query.toLowerCase())
      );
      
      // Filter out existing friends and pending requests
      const filteredResults = results.filter(user => 
        !friends.some(friend => friend.id === user.id) &&
        !pendingRequests.incoming.some(req => req.id === user.id) &&
        !pendingRequests.outgoing.some(req => req.id === user.id)
      );
      
      setSearchResults(filteredResults);
    }, 500);
  };

  // Start a chat with a friend
  const startChat = (friendId) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;
    
    setActiveChat(friend);
  };

  // Send a message
  const sendMessage = (text) => {
    if (!activeChat || !text.trim()) return;
    
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      receiverId: activeChat.id,
      text,
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  // Get messages for a specific chat
  const getChatMessages = (friendId) => {
    return messages.filter(msg => 
      (msg.senderId === friendId && msg.receiverId === currentUser.id) || 
      (msg.senderId === currentUser.id && msg.receiverId === friendId)
    ).sort((a, b) => a.timestamp - b.timestamp);
  };

  // Close active chat
  const closeChat = () => {
    setActiveChat(null);
  };

  const value = {
    friends,
    pendingRequests,
    searchResults,
    activeChat,
    currentUser,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    searchUsers,
    startChat,
    sendMessage,
    getChatMessages,
    closeChat
  };

  return (
    <FriendsContext.Provider value={value}>
      {children}
    </FriendsContext.Provider>
  );
};