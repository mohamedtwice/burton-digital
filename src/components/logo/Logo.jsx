"use client";
import Link from "next/link";
import { motion } from "framer-motion";
const Logo = () => {
  return (
    <motion.div
      className="logo inline-block"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 250 }}
    >
      <Link href={"/"} className="uppercase font-medium text-2xl">
        Logo
      </Link>
    </motion.div>
  );
};

export default Logo;
