'use client';

import { motion } from 'framer-motion';

const MotionMain = ({ children, className }) => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className={className}
  >
    {children}
  </motion.main>
);

export default MotionMain;
