export const initialFriends = [
  { 
    id: 'friend1', 
    username: 'alex_j', 
    displayName: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    streak: 15,
    lastActive: new Date(Date.now() - 1800000)
  },
  { 
    id: 'friend2', 
    username: 'taylor89', 
    displayName: 'Taylor Swift',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    streak: 7,
    lastActive: new Date(Date.now() - 3600000)
  },
  { 
    id: 'friend3', 
    username: 'sam_wilson', 
    displayName: 'Sam Wilson',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    streak: 3,
    lastActive: new Date(Date.now() - 86400000)
  },
];

export const initialPendingRequests = {
  incoming: [
    {
      id: 'req1',
      username: 'jessica_alba',
      displayName: 'Jessica Alba',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      timeSent: new Date(Date.now() - 86400000 * 2)
    }
  ],
  outgoing: [
    {
      id: 'req2',
      username: 'john_smith',
      displayName: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      timeSent: new Date(Date.now() - 86400000)
    }
  ]
};

export const initialMessages = [
  {
    id: 'msg1',
    senderId: 'friend1',
    receiverId: 'user1',
    text: 'Hey, how are you doing today?',
    timestamp: new Date(Date.now() - 86400000),
    status: 'read'
  },
  {
    id: 'msg2',
    senderId: 'user1',
    receiverId: 'friend1',
    text: 'I\'m doing great! Just finished that project we talked about.',
    timestamp: new Date(Date.now() - 86300000),
    status: 'read'
  },
  {
    id: 'msg3',
    senderId: 'friend1',
    receiverId: 'user1',
    text: 'That\'s awesome! Would love to see it sometime.',
    timestamp: new Date(Date.now() - 85000000),
    status: 'read'
  },
  {
    id: 'msg4',
    senderId: 'friend2',
    receiverId: 'user1',
    text: 'Are we still meeting tomorrow?',
    timestamp: new Date(Date.now() - 50000000),
    status: 'read'
  },
  {
    id: 'msg5',
    senderId: 'user1',
    receiverId: 'friend2',
    text: 'Yes, 2pm at the coffee shop!',
    timestamp: new Date(Date.now() - 49000000),
    status: 'read'
  },
  {
    id: 'msg6',
    senderId: 'friend3',
    receiverId: 'user1',
    text: 'Check out this new app I found',
    timestamp: new Date(Date.now() - 25000000),
    status: 'read'
  }
];