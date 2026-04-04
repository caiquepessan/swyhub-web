"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  ExternalLink,
  Bot
} from "lucide-react";
import Link from "next/link";
import { GradientDots } from "@/components/ui/gradient-dots";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function DiscordPage() {
  const inviteLink = "https://discord.gg/PW6SG37Wqy";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 150 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 w-full relative overflow-hidden py-24">
      {/* Immersive Background */}
      <GradientDots duration={40} className="fixed inset-0 opacity-15 pointer-events-none -z-10" backgroundColor="#000000" />
      
      {/* Branded Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#5865F2]/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full flex flex-col items-center relative z-10"
      >
        {/* Animated Discord Icon Section */}
        <motion.div variants={itemVariants} className="relative mb-12">
          <div className="absolute inset-0 bg-[#5865F2] blur-[40px] opacity-20 rounded-full animate-ping" />
          <div className="w-24 h-24 rounded-[2rem] bg-[#5865F2] flex items-center justify-center text-white shadow-[0_0_50px_rgba(88,101,242,0.4)] relative z-10 group transition-all duration-500">
            <img src="/discord.svg" className="w-12 h-12 invert brightness-0" alt="Discord Logo" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5865F2] shadow-xl z-20 animate-bounce">
            <Users className="w-4 h-4" />
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-center italic">
          <span className="text-white">JOIN OUR</span> <br />
          <span className="text-[#5865F2] drop-shadow-[0_0_15px_rgba(88,101,242,0.3)]">ELITE COMMUNITY</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-white/50 mb-12 max-w-xl text-center leading-relaxed font-medium">
          Get 24/7 priority support, exclusive scripts, and join thousands of fellow developers in the official SwyHub community.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          {/* Main Action Card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <GlowCard 
              glowColor="purple" 
              customSize={true} 
              className="p-8 md:p-10 relative group border-white/5 bg-white/[0.02] overflow-visible"
            >
              <div className="flex flex-col items-center justify-center gap-8 w-full">
                <div className="text-center group">
                  <h2 className="text-2xl font-black text-white mb-2 italic">Official Invite</h2>
                  <div className="flex items-center justify-center gap-2 text-white/30 text-xs font-bold uppercase tracking-[0.3em]">
                    <ShieldCheck className="w-3 h-3 text-brand-purple-light" />
                    Verified Hub
                  </div>
                </div>

                <Link href={inviteLink} target="_blank" className="w-full max-w-md">
                    <ShinyButton className="w-full !py-6 !rounded-2xl !text-xl !font-black !shadow-[0_0_40px_rgba(88,101,242,0.3)] group/btn">
                      <div className="flex items-center justify-center gap-3">
                        Enter the Hub <img src="/discord.svg" className="w-6 h-6 invert brightness-0 group-hover/btn:translate-x-2 transition-transform duration-300" alt="Discord Icon" />
                      </div>
                    </ShinyButton>
                </Link>
                
                <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest">
                  No login required to join
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div variants={featureVariants}>
            <GlowCard glowColor="blue" customSize={true} className="p-6 h-full flex items-start gap-5 border-white/5 bg-white/[0.01]">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-white uppercase text-xs tracking-widest">Priority Support</h4>
                <p className="text-sm text-white/40 leading-relaxed">Direct access to the development team to solve any execution issues instantly.</p>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div variants={featureVariants}>
            <GlowCard glowColor="purple" customSize={true} className="p-6 h-full flex items-start gap-5 border-white/5 bg-white/[0.01]">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple-light">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-white uppercase text-xs tracking-widest">Exclusive Access</h4>
                <p className="text-sm text-white/40 leading-relaxed">Early releases of private scripts and feature updates before they go public.</p>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
            Powered by the SwyHub Global Network
          </p>
          <div className="flex items-center justify-center gap-6 text-white/20">
            <Bot className="w-5 h-5 hover:text-[#5865F2] transition-colors" />
            <div className="w-px h-4 bg-white/5" />
            <Zap className="w-5 h-5 hover:text-brand-purple-light transition-colors" />
            <div className="w-px h-4 bg-white/5" />
            <ExternalLink className="w-5 h-5 hover:text-white transition-colors" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
