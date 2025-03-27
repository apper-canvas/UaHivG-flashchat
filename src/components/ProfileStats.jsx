import { motion } from 'framer-motion';
import { Flame, Calendar, Users, Eye, Award, Camera } from 'lucide-react';

const ProfileStats = ({ user }) => {
  // Calculate total streaks
  const totalStreaks = Object.values(user.streaks || {}).reduce((sum, curr) => sum + curr, 0);
  
  // Example stats (in a real app, these would come from props or an API)
  const stats = [
    { 
      id: 'streaks', 
      icon: <Flame size={20} className="text-orange-500" />, 
      value: totalStreaks, 
      label: 'Total Streak Days' 
    },
    { 
      id: 'friends', 
      icon: <Users size={20} className="text-blue-500" />, 
      value: user.friends.length, 
      label: 'Friends' 
    },
    { 
      id: 'active-days', 
      icon: <Calendar size={20} className="text-green-500" />, 
      value: 23, 
      label: 'Active Days' 
    },
    { 
      id: 'story-views', 
      icon: <Eye size={20} className="text-purple-500" />, 
      value: 142, 
      label: 'Story Views' 
    },
    { 
      id: 'badges', 
      icon: <Award size={20} className="text-yellow-500" />, 
      value: 5, 
      label: 'Badges Earned' 
    },
    { 
      id: 'snaps', 
      icon: <Camera size={20} className="text-pink-500" />, 
      value: 84, 
      label: 'Snaps Sent' 
    }
  ];

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm">
      <h2 className="font-bold text-lg mb-4">Your Stats</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 flex flex-col items-center"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white dark:bg-surface-800 p-2 rounded-full mb-2">
              {stat.icon}
            </div>
            <span className="text-xl font-bold">{stat.value}</span>
            <span className="text-xs text-surface-500 dark:text-surface-400 text-center">{stat.label}</span>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center"
        whileHover={{ scale: 1.01 }}
      >
        <div className="p-2 bg-white dark:bg-surface-800 rounded-full mr-3">
          <Flame size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Keep Your Streaks Going!</h3>
          <p className="text-xs text-surface-600 dark:text-surface-300">
            You have {Object.keys(user.streaks || {}).length} active streaks
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileStats;