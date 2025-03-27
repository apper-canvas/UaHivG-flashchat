import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Camera, User, AtSign } from 'lucide-react';

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    username: user.username,
    avatar: user.avatar
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.includes(' ')) {
      newErrors.username = "Username cannot contain spaces";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Edit Profile</h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
          onClick={onCancel}
        >
          <X size={18} />
        </motion.button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            className="relative mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={formData.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-primary"
            />
            <motion.div 
              className="absolute bottom-0 right-0 bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white dark:border-surface-800"
              whileTap={{ scale: 0.9 }}
            >
              <Camera size={16} />
            </motion.div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium mb-1 text-surface-600 dark:text-surface-300">
              <User size={16} className="mr-2" />
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium mb-1 text-surface-600 dark:text-surface-300">
              <AtSign size={16} className="mr-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <motion.button
            type="button"
            className="btn btn-ghost text-surface-600 dark:text-surface-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="btn btn-primary flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle size={18} className="mr-2" />
            Save Changes
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;