"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import componentStyle from "../styles/components.module.css";

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
        <motion.div
          key={"slideinKey"}
          className={componentStyle.slideIn + " z-10"}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 1, ease: "anticipate" }}
        />
      {children}
    </AnimatePresence>
  );
}
