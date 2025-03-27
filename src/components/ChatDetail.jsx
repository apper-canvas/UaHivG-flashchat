import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MoreVertical, Phone, Video, Image as ImageIcon, Smile, Send, Mic, Plus, Camera } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatDetail = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Simulate loading messages
    const defaultMessages = [
      { id: "m1", content: "Hey! How are you?", type: "text", status: "read", time: new Date(Date.now() - 60000 * 60), sender: "other" },
      { id: "m2", content: "I'm good! Just finished that project we talked about", type: "text", status: "read", time: new Date(Date.now() - 60000 * 30), sender: "me" },
      { id: "m3", content: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", type: "image", status: "read", time: new Date(Date.now() - 60000 * 25), sender: "me" },
      { id: "m4", content: "Wow! That looks amazing", type: "text", status: "read", time: new Date(Date.now() - 60000 * 10), sender: "other" },
      { id: "m5", content: "Thanks! 😊", type: "text", status: "delivered", time: new Date(Date.now() - 60000 * 1), sender: "me" },
    ];
    
    setMessages(defaultMessages);

    // Simulate typing indicator after 1 second
    const typingTimeout = setTimeout(() => {
      setIsTyping(true);
      
      // After "typing", add a new message from the other person
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev, 
          { 
            id: `m${prev.length + 1}`, 
            content: "Are you free to discuss it this evening?", 
            type: "text", 
            status: "read", 
            time: new Date(), 
            sender: "other" 
          }
        ]);
      }, 3000);
    }, 1000);

    return () => clearTimeout(typingTimeout);
  }, [chat.id]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Add message to chat
    const newMessage = {
      id: `m${messages.length + 1}`,
      content: messageText.trim(),
      type: "text",
      status: "sent",
      time: new Date(),
      sender: "me"
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageText("");
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "delivered" } 
            : msg
        )
      );
      
      // Simulate read receipt after delivery
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: "read" } 
              : msg
          )
        );
        
        // Simulate typing response
        if (Math.random() > 0.3) {
          setTimeout(() => {
            setIsTyping(true);
            
            // Add response message after "typing"
            setTimeout(() => {
              setIsTyping(false);
              
              const responses = [
                "That sounds good!",
                "👍",
                "I'll let you know later",
                "Can't wait to hear more about it",
                "Thanks for sharing"
              ];
              
              const randomResponse = responses[Math.floor(Math.random() * responses.length)];
              
              setMessages(prev => [
                ...prev, 
                { 
                  id: `m${prev.length + 1}`, 
                  content: randomResponse, 
                  type: "text", 
                  status: "read", 
                  time: new Date(), 
                  sender: "other" 
                }
              ]);
            }, 2000 + Math.random() * 1000);
          }, 1000 + Math.random() * 2000);
        }
      }, 1000);
    }, 1500);
  };

  const handleAttachment = (type) => {
    let content = "";
    let mediaType = "text";
    
    if (type === "image") {
      const images = [
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ];
      content = images[Math.floor(Math.random() * images.length)];
      mediaType = "image";
    } else if (type === "camera") {
      content = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
      mediaType = "image";
    } else if (type === "voice") {
      content = "Voice message (0:12)";
      mediaType = "voice";
    } else {
      return;
    }

    // Add message to chat
    const newMessage = {
      id: `m${messages.length + 1}`,
      content: content,
      type: mediaType,
      status: "sent",
      time: new Date(),
      sender: "me"
    };
    
    setMessages(prev => [...prev, newMessage]);
    setShowAttachmentOptions(false);
    
    // Simulate message delivery and response
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "delivered" } 
            : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: "read" } 
              : msg
          )
        );
        
        // Simulate typing response for media
        setTimeout(() => {
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            
            const mediaResponses = [
              "Nice!",
              "That's awesome!",
              "Looks great!",
              "Thanks for sharing!",
              "👍",
              "❤️"
            ];
            
            const randomResponse = mediaResponses[Math.floor(Math.random() * mediaResponses.length)];
            
            setMessages(prev => [
              ...prev, 
              { 
                id: `m${prev.length + 1}`, 
                content: randomResponse, 
                type: "text", 
                status: "read", 
                time: new Date(), 
                sender: "other" 
              }
            ]);
          }, 2000);
        }, 1500);
      }, 1000);
    }, 1500);
  };

  const formatDateHeader = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.time).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center py-3 px-4 bg-white dark:bg-surface-800 shadow-sm z-10">
        <motion.button
          className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </motion.button>
        
        <div className="flex items-center ml-2 flex-1" onClick={onBack}>
          <img 
            src={chat.avatar} 
            alt={chat.username} 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-semibold">{chat.username}</div>
            <div className="text-xs text-surface-500">
              {isTyping ? "typing..." : "online"}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
            whileTap={{ scale: 0.9 }}
          >
            <Phone size={20} />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
            whileTap={{ scale: 0.9 }}
          >
            <Video size={20} />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
            whileTap={{ scale: 0.9 }}
          >
            <MoreVertical size={20} />
          </motion.button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-surface-50 dark:bg-surface-900 space-y-4">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} className="space-y-2">
            <div className="flex justify-center my-2">
              <span className="text-xs bg-surface-200 dark:bg-surface-700 px-3 py-1 rounded-full text-surface-600 dark:text-surface-300 font-medium">
                {formatDateHeader(new Date(date))}
              </span>
            </div>
            
            {msgs.map((message, index) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                showAvatar={
                  message.sender === "other" && 
                  (index === 0 || msgs[index - 1]?.sender !== "other")
                }
                avatar={chat.avatar}
                username={chat.username}
              />
            ))}
          </div>
        ))}
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start"
            >
              <img 
                src={chat.avatar} 
                alt={chat.username} 
                className="w-8 h-8 rounded-full mr-2 mt-1"
              />
              <div className="bg-surface-200 dark:bg-surface-700 rounded-xl p-3 px-4">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Attachment Options */}
      <AnimatePresence>
        {showAttachmentOptions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-surface-800 overflow-hidden px-4 py-3 border-t border-surface-200 dark:border-surface-700"
          >
            <div className="flex justify-around">
              <motion.button
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAttachment("image")}
              >
                <div className="w-12 h-12 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
                  <ImageIcon size={22} className="text-primary" />
                </div>
                <span className="text-xs font-medium">Gallery</span>
              </motion.button>
              
              <motion.button
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAttachment("camera")}
              >
                <div className="w-12 h-12 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
                  <Camera size={22} className="text-secondary" />
                </div>
                <span className="text-xs font-medium">Camera</span>
              </motion.button>
              
              <motion.button
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAttachment("voice")}
              >
                <div className="w-12 h-12 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
                  <Mic size={22} className="text-red-500" />
                </div>
                <span className="text-xs font-medium">Audio</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Input Area */}
      <div className="p-3 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500"
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
          >
            <Plus size={22} />
          </motion.button>
          
          <div className="flex-1 bg-surface-100 dark:bg-surface-700 rounded-full py-2 px-4 flex items-center">
            <input
              type="text"
              className="flex-1 bg-transparent border-none focus:outline-none dark:text-white"
              placeholder="Message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <motion.button
              className="p-1 text-surface-500"
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={20} />
            </motion.button>
          </div>
          
          {messageText.trim() ? (
            <motion.button
              className="p-2 bg-primary rounded-full"
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
            >
              <Send size={20} className="text-surface-900" />
            </motion.button>
          ) : (
            <motion.button
              className="p-2 bg-surface-200 dark:bg-surface-700 rounded-full"
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAttachment("voice")}
            >
              <Mic size={22} className="text-surface-500" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;