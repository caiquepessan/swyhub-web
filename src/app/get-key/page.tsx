"use client";

import { motion } from "framer-motion";
import { MessageSquare, KeyRound, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function GetKey() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 w-full relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light text-sm font-bold tracking-wide">
          <KeyRound className="w-4 h-4" />
          KEY SYSTEM UPDATE
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          How to get your <span className="text-gradient-primary">SwyHub Key</span>
        </h1>
        
        <p className="text-lg text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
          We've moved our key generation to Discord for a faster and more secure experience. Direct generation on the website has been discontinued.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 border border-white/5 rounded-2xl bg-white/[0.02] flex flex-col gap-4 relative overflow-hidden group shadow-xl"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple/40" />
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple-light">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">1. Join Discord</h3>
              <p className="text-sm text-white/40">Enter our community server to access the key features.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 border border-white/5 rounded-2xl bg-white/[0.02] flex flex-col gap-4 relative overflow-hidden group shadow-xl"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500/40" />
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">2. Run Command</h3>
              <p className="text-sm text-white/40">Use the <code className="text-green-400 font-mono">/key</code> command in the bot channel.</p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/discord" className="w-full sm:w-auto">
            <ShinyButton className="w-full sm:w-auto !px-8 !py-4 !text-base !font-bold shadow-[0_0_30px_rgba(126,34,206,0.2)]">
              <div className="flex items-center justify-center gap-2">
                Join Discord Server <ExternalLink className="w-4 h-4" />
              </div>
            </ShinyButton>
          </Link>
        </div>

        <p className="mt-12 text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
          SwyHub Security & Performance First
        </p>
      </motion.div>
    </div>
  );
}
