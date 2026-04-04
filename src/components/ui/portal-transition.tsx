"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PortalTransition() {
  const [isPortalActive, setIsPortalActive] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href) {
        // Optimization: don't trigger for javascript links or empty hashes
        if (anchor.href.startsWith('javascript:') || anchor.getAttribute('href') === '#') return;

        try {
          const url = new URL(anchor.href, window.location.origin);
          const isExternal = url.origin !== window.location.origin;

          if (isExternal) {
            // Play portal animation
            setClickPos({ x: e.clientX, y: e.clientY });
            setIsPortalActive(true);
            
            // Reset portal after animation cycle finishes
            setTimeout(() => setIsPortalActive(false), 1000);
          }
        } catch (err) {
          // Fallback if URL parsing fails
          console.error("Portal error:", err);
        }
      }
    };

    window.addEventListener("mousedown", handleGlobalClick);
    return () => window.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  return (
    <AnimatePresence>
      {isPortalActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        >
          {/* Radial Expansion (The Portal Entrance) */}
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ 
              scale: 25, 
              opacity: [0.8, 1, 0],
              rotate: 45,
            }}
            transition={{ duration: 0.8, ease: "circIn" }}
            style={{
              position: "absolute",
              left: clickPos.x,
              top: clickPos.y,
              width: "150px",
              height: "150px",
              marginLeft: "-75px",
              marginTop: "-75px",
              borderRadius: "40%",
              background: "radial-gradient(circle at center, #a855f7 0%, #7e22ce 30%, #5865F2 60%, transparent 100%)",
              filter: "blur(40px) contrast(150%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Particle Effects (Simulation of travel) */}
          <div className="absolute inset-0 flex items-center justify-center">
             {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0, border: "2px solid #7e22ce" }}
                  animate={{ 
                    scale: 3, 
                    opacity: [0, 0.5, 0],
                    border: "10px solid #5865F2"
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: i * 0.1,
                    ease: "easeOut" 
                  }}
                  className="absolute rounded-full w-[20vw] h-[20vw]"
                />
             ))}
          </div>
          
          {/* Atmospheric Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-brand-purple/20 backdrop-blur-[4px] mix-blend-overlay"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
