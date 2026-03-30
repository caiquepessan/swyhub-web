"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Code, ArrowRight } from "lucide-react";
import { GradientDots } from "@/components/ui/gradient-dots";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full relative overflow-hidden">
      <GradientDots duration={40} className="fixed inset-0 opacity-18 pointer-events-none -z-10" backgroundColor="#000000" />
      {/* Animated Subtle Background Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-purple rounded-full blur-[150px] -z-10 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] -z-10 pointer-events-none"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-3xl text-center flex flex-col items-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-brand-purple/20 bg-brand-purple/10 text-xs font-semibold tracking-wider text-brand-purple-light shadow-[0_0_15px_rgba(126,34,206,0.1)]">
          <span className="text-brand-purple-light">THE BEST ROBLOX SCRIPT HUB</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Execute Faster with <br />
          <span className="text-white">SwyHub</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg text-white/50 max-w-xl mb-10">
          SwyHub is the most reliable, fast, and feature-rich script hub for popular Roblox games. Enjoy unparalleled performance for completely free.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/get-key" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(126,34,206,0.2)] hover:shadow-[0_0_30px_rgba(126,34,206,0.4)] bg-brand-purple hover:bg-purple-600 flex justify-center items-center gap-2 text-sm border border-white/10">
              Get Key <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          
          <Link href="/discord" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all bg-[#111] hover:bg-[#1a1a1a] hover:border-brand-purple/40 border border-[#222] flex justify-center items-center gap-2 text-sm hover:scale-105 active:scale-95">
              Join Discord
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full relative z-10"
      >
        <GlowCard 
          glowColor="purple" 
          customSize={true} 
          className="p-6 flex flex-col gap-3 group border-white/5 transition-all duration-500 ease-out hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-md bg-[#111] border border-[#222] group-hover:border-brand-purple/30 group-hover:text-brand-purple-light transition-colors flex items-center justify-center text-white mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-brand-purple-light transition-colors relative z-10">Lightning Fast</h3>
          <p className="text-sm text-white/50 leading-relaxed relative z-10">Highly optimized codebase ensuring the absolute minimum impact on your game performance.</p>
        </GlowCard>

        <GlowCard 
          glowColor="purple" 
          customSize={true} 
          className="p-6 flex flex-col gap-3 group border-white/5 transition-all duration-500 ease-out hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-md bg-[#111] border border-[#222] group-hover:border-brand-purple/30 group-hover:text-brand-purple-light transition-colors flex items-center justify-center text-white mb-2">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-brand-purple-light transition-colors relative z-10">Undetected & Safe</h3>
          <p className="text-sm text-white/50 leading-relaxed relative z-10">Built from the ground up focusing on strict anti-cheat bypass technologies and safety protocols.</p>
        </GlowCard>

        <GlowCard 
          glowColor="purple" 
          customSize={true} 
          className="p-6 flex flex-col gap-3 group border-white/5 transition-all duration-500 ease-out hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-md bg-[#111] border border-[#222] group-hover:border-brand-purple/30 group-hover:text-brand-purple-light transition-colors flex items-center justify-center text-white mb-2">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-brand-purple-light transition-colors relative z-10">Universal Support</h3>
          <p className="text-sm text-white/50 leading-relaxed relative z-10">Built to seamlessly integrate with your favorite games. One execution, endless possibilities tailored per game.</p>
        </GlowCard>
      </motion.div>
    </div>
  );
}
