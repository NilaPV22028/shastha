
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const EmberField = () => {
  const embers = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: 110,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full bg-orange-500 will-change-transform"
          style={{
            left: `${ember.x}%`,
            width: ember.size,
            height: ember.size,
            boxShadow: '0 0 10px rgba(255, 165, 0, 0.8)',
          }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            x: [`${ember.x}%`, `${ember.x + (Math.random() * 10 - 5)}%`, `${ember.x}%`],
            opacity: [0, ember.opacity, 0],
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            ease: "linear",
            delay: ember.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Base ritual gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505] via-[#000000] to-[#000000]" />
      
      <EmberField />

      {/* Smoky blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] bg-[#7c1212] rounded-full filter blur-[100px] opacity-10 will-change-transform"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#d4af37] rounded-full filter blur-[120px] opacity-5 will-change-transform"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-20 pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black pointer-events-none" />
    </div>
  );
};

export default FluidBackground;
