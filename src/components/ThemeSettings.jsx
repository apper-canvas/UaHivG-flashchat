import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Moon, Sun, Palette, Sparkles, Zap } from 'lucide-react';

const ThemeSettings = ({ darkMode, onChangeDarkMode, onClose }) => {
  const [activeTheme, setActiveTheme] = useState('default');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  const colorThemes = [
    { id: 'default', name: 'Default', colors: ['#673AB7', '#3F51B5'] },
    { id: 'sunset', name: 'Sunset', colors: ['#FF9800', '#F44336'] },
    { id: 'ocean', name: 'Ocean', colors: ['#2196F3', '#00BCD4'] },
    { id: 'forest', name: 'Forest', colors: ['#4CAF50', '#8BC34A'] },
    { id: 'berry', name: 'Berry', colors: ['#E91E63', '#9C27B0'] }
  ];

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm">
      <h2 className="font-bold text-lg mb-4">Appearance</h2>
      
      <div className="mb-6">
        <h3 className="font-medium text-surface-600 dark:text-surface-300 mb-3 flex items-center">
          <Palette size={16} className="mr-2" /> Color Theme
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {colorThemes.map((theme) => (
            <motion.button
              key={theme.id}
              className={`p-2 rounded-lg flex flex-col items-center ${
                activeTheme === theme.id ? 'ring-2 ring-primary' : 'border border-surface-200 dark:border-surface-700'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTheme(theme.id)}
            >
              <div className="flex mb-1">
                {theme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full mr-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs">{theme.name}</span>
              {activeTheme === theme.id && (
                <div className="absolute top-1 right-1">
                  <Check size={12} className="text-primary" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-surface-600 dark:text-surface-300 mb-3 flex items-center">
          <Moon size={16} className="mr-2" /> Dark Mode
        </h3>
        <div className="flex space-x-3">
          <motion.button
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${
              !darkMode ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChangeDarkMode(false)}
          >
            <Sun size={18} className="mr-2" />
            <span>Light</span>
          </motion.button>
          
          <motion.button
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChangeDarkMode(true)}
          >
            <Moon size={18} className="mr-2" />
            <span>Dark</span>
          </motion.button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-surface-600 dark:text-surface-300 mb-3 flex items-center">
          <Sparkles size={16} className="mr-2" /> Animations
        </h3>
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-700">
          <div className="flex items-center">
            <Zap size={18} className="mr-2 text-yellow-500" />
            <span>Enable animations</span>
          </div>
          <motion.button
            className={`w-12 h-6 rounded-full relative ${
              animationsEnabled ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
            }`}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
          >
            <motion.div 
              className="w-5 h-5 rounded-full bg-white absolute top-0.5"
              initial={false}
              animate={{ 
                x: animationsEnabled ? 26 : 2 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Save Settings
        </motion.button>
      </div>
    </div>
  );
};

export default ThemeSettings;