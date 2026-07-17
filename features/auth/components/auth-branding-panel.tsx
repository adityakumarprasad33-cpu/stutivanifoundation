'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { BRANDING } from '@/constants/branding';

const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [-8, 8, -8],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const floatingAnimationDelayed: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [8, -8, 8],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }
  }
};

export function AuthBrandingPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-950 flex flex-col justify-between">
      {/* Background Image Layer */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
          alt="Stuti-Vani Foundation Mission"
          fill
          priority
          sizes="55vw"
          className="object-cover h-full w-full mix-blend-luminosity"
        />
      </motion.div>
      
      {/* Immersive Gradients & Blur Blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-zinc-950/60 to-zinc-950/90 mix-blend-multiply" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"
      />

      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* Top Header Section */}
      <div className="relative z-20 p-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/90 text-sm font-medium tracking-wide shadow-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            Empowering Communities Since 2021
          </div>
        </motion.div>
      </div>

      {/* Middle Interactive Floating Cards */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-12">
        <div className="w-full max-w-lg relative">
          
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-30"
          >
            <div className="p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
              <div className="relative z-10 space-y-4">
                <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
                  Transforming lives through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">sustainable</span> development.
                </h2>
                <p className="text-lg text-white/70 font-medium leading-relaxed">
                  {BRANDING.ORGANIZATION.MISSION}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating Mission Card 1 */}
          <motion.div 
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="absolute -right-8 -top-12 z-20 hidden xl:block"
          >
            <div className="px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Quality Education</h3>
                  <p className="text-white/60 text-sm">Empowering the youth</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Mission Card 2 */}
          <motion.div 
            variants={floatingAnimationDelayed}
            initial="initial"
            animate="animate"
            className="absolute -left-12 -bottom-10 z-40 hidden xl:block"
          >
            <div className="px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 text-rose-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Healthcare Access</h3>
                  <p className="text-white/60 text-sm">For underprivileged</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer Section */}
      <div className="relative z-20 p-12 w-full flex justify-between items-end">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-white/50 text-sm font-medium tracking-wide flex flex-col gap-1"
        >
          <span>{BRANDING.ORGANIZATION.NAME}</span>
          <span className="text-white/30 text-xs">Reg. No: {BRANDING.ORGANIZATION.REGISTRATION_NUMBER}</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4 text-white/50"
        >
          <a href={BRANDING.SOCIAL.FACEBOOK_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            Facebook
          </a>
          <a href={BRANDING.SOCIAL.TWITTER_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            Twitter
          </a>
          <a href={BRANDING.SOCIAL.INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            Instagram
          </a>
        </motion.div>
      </div>
    </div>
  );
}
