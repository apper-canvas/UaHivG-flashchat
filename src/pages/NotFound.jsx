import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <div className="w-32 h-32 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-6xl">🤔</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Page Not Found
            </motion.h1>
            
            <motion.p 
              className="text-surface-500 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              The content you're looking for has disappeared, just like our messages!
            </motion.p>
            
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/"
                  className="flex items-center px-6 py-3 bg-primary text-surface-900 rounded-xl font-medium shadow-md"
                >
                  <Home size={18} className="mr-2" />
                  Go Home
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => window.history.back()}
                  className="flex items-center px-6 py-3 bg-surface-200 dark:bg-surface-700 rounded-xl font-medium"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Go Back
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </div>
  );
};

export default NotFound;