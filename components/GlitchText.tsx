
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-black tracking-tighter isolate ${className}`}>
      {/* Main Gold Gradient Text */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-[#d4af37] via-[#fff5d7] to-[#d4af37] bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer for depth */}
      <span 
        className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7c1212] to-[#400] opacity-80"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {text}
      </span>
      
      {/* Glowing Aura */}
      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#d4af37] via-orange-500 to-[#d4af37] bg-[length:200%_auto] bg-clip-text text-transparent blur-xl opacity-30"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
