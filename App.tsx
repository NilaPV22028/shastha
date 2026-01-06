
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, Mail, MapPin, Instagram, Menu, X, Play, ChevronRight, Drum, Flame, Star, MessageSquare } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';
import { Occasion, ArtForm } from './types';

const OCCASIONS: Occasion[] = [
  {
    id: '1',
    title: 'Temple Festivals',
    description: 'The heartbeat of every Pooram, our melam creates a divine connection through rhythmic patterns.',
    image: 'https://images.unsplash.com/photo-1590494444537-80252655977f?q=80&w=1000&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/5199622/5199622-uhd_2560_1440_30fps.mp4'
  },
  {
    id: '2',
    title: 'Weddings & Rituals',
    description: 'Adding a traditional soul to your special day with authentic Chenda Melam performances.',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1000&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/3248384/3248384-uhd_2560_1440_25fps.mp4'
  },
  {
    id: '3',
    title: 'Cultural Programs',
    description: 'Spectacular stage shows blending the energy of drums with the ritual visual of Theyyam.',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/3248386/3248386-uhd_2560_1440_25fps.mp4'
  },
  {
    id: '4',
    title: 'Special Ceremonies',
    description: 'Bespoke ritualistic performances tailored for unique traditional gatherings.',
    image: 'https://images.unsplash.com/photo-1582533089852-024fe58a3b7c?q=80&w=1000&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/5199623/5199623-uhd_2560_1440_30fps.mp4'
  }
];

const ART_FORMS: ArtForm[] = [
  {
    id: 'a1',
    name: 'Chenda Melam',
    description: 'From Panchari to Pandi, we perform the complex rhythmic cycles that define Kerala’s percussion heritage.',
    image: 'https://images.unsplash.com/photo-1590494444537-80252655977f?q=80&w=1000&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/3248384/3248384-uhd_2560_1440_25fps.mp4'
  },
  {
    id: 'a2',
    name: 'Theyyam Rituals',
    description: 'The dance of the gods. Witness the intense transformation and divine blessing of sacred Theyyams.',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/3248386/3248386-uhd_2560_1440_25fps.mp4'
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [hoveredArtForm, setHoveredArtForm] = useState<string | null>(null);
  
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#d4af37] selection:text-black font-body">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-500 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7c1212] flex items-center justify-center rounded-full border border-[#d4af37]/30 group-hover:scale-110 transition-transform">
             <Flame className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg md:text-xl font-bold tracking-tighter leading-none">SHASTHA</span>
            <span className="font-subheading text-[10px] tracking-[0.3em] text-[#d4af37]">KALASAMITHI</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.2em] uppercase">
          {['Occasions', 'Art Forms', 'Heritage'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-[#d4af37] transition-colors text-white/70"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollToSection('booking')}
          className="hidden md:flex items-center gap-2 border border-[#d4af37]/50 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase bg-[#7c1212]/10 hover:bg-[#7c1212] transition-all duration-300 rounded-sm"
          data-hover="true"
        >
          Book Ritual
        </button>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-[#0a0a0a] flex flex-col items-center justify-center gap-10"
          >
            <button className="absolute top-8 right-8" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            {['Occasions', 'Art Forms', 'Heritage', 'Booking'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-3xl font-heading font-bold hover:text-[#d4af37] transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Visual Grid */}
        <div className="absolute inset-0 z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full w-full opacity-40">
           {OCCASIONS.map((occ) => (
             <div 
               key={occ.id} 
               className="relative overflow-hidden group border-r border-white/5 h-full"
               onMouseEnter={() => setHoveredVideo(occ.id)}
               onMouseLeave={() => setHoveredVideo(null)}
             >
               <img src={occ.image} alt={occ.title} className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
               <AnimatePresence mode="wait">
                 {hoveredVideo === occ.id && (
                    <motion.video
                      key={occ.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      autoPlay muted loop playsInline
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    >
                      <source src={occ.video} type="video/mp4" />
                    </motion.video>
                 )}
               </AnimatePresence>
               <div className="absolute inset-0 bg-black/40 z-20" />
             </div>
           ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 flex items-center gap-4">
               <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
               <span className="text-[10px] md:text-xs tracking-[0.5em] font-bold text-[#d4af37] uppercase">Kerala's Traditional Rhythm</span>
               <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>

            <GradientText 
              text="FEEL THE RHYTHM" 
              as="h1" 
              className="text-[10vw] md:text-[7vw] leading-[0.9] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
            />
            <GradientText 
              text="WITNESS THE RITUAL" 
              as="h1" 
              className="text-[10vw] md:text-[7vw] leading-[0.9] mt-[-1vw]" 
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-sm md:text-lg text-white/70 max-w-xl mx-auto font-subheading tracking-wide px-6"
            >
              Authentic Chenda Melam & Theyyam performances for temples, weddings, and cultural celebrations. Deeply rooted in Kerala's sacred traditions.
            </motion.p>

            <div className="mt-12 flex flex-col md:flex-row gap-6 pointer-events-auto">
              <button 
                onClick={() => scrollToSection('booking')}
                className="px-10 py-4 bg-[#7c1212] text-[#d4af37] font-bold tracking-[0.2em] uppercase border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-[#7c1212] transition-all duration-300 shadow-[0_10px_30px_rgba(124,18,18,0.3)]"
                data-hover="true"
              >
                Book Performance
              </button>
              <button 
                onClick={() => scrollToSection('occasions')}
                className="px-10 py-4 border border-white/20 hover:border-white/50 transition-colors uppercase font-bold tracking-[0.2em] backdrop-blur-md"
                data-hover="true"
              >
                View Experiences
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[8px] uppercase tracking-[0.3em]">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
        </motion.div>
      </header>

      {/* OCCASIONS SECTION */}
      <section id="occasions" className