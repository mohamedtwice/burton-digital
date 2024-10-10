'use client';

import { motion } from 'framer-motion';

const MotionDiv = ({ children, className }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`${className} cursor-pointer active:bg-opacity-80 transition-colors duration-200 ease-in-out`}
  >
    {children}
  </motion.div>
);

export default MotionDiv;
