"use client";

import { motion } from "framer-motion";
import { 
  Crown, 
  Zap, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Gamepad2,
  LockOpen
} from "lucide-react";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function GetKey() {
  const premiumFeatures = [
    "Instant Access (No Checkpoints)",
    "Priority Discord Support",
    "Ad-Free Experience",
    "Early Beta Access",
    "Custom Script Requests"
  ];

  const freeFeatures = [
    "Standard Checkpoint Flow",
    "Community Support",
    "Includes Advertisements",
    "24h Key Expiration"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 w-full relative overflow-hidden py-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light text-xs font-bold tracking-widest uppercase">
          <LockOpen className="w-4 h-4" />
          Choose Your Path
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white italic">
          Unlock the <span className="text-brand-purple-light">Full Power</span>
        </h1>
        
        <p className="text-lg text-white/40 mb-16 max-w-2xl mx-auto leading-relaxed">
          Choose between our standard free access or upgrade to the premium experience for instant execution and priority features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {/* Free Access Card */}
          <GlowCard 
            glowColor="blue" 
            customSize={true} 
            className="p-8 flex flex-col gap-6 relative group border-white/5 bg-white/[0.01] hover:-translate-y-2 transition-all duration-500 overflow-visible"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-white/30 uppercase tracking-wider">Free Access</span>
                <p className="text-3xl font-black text-white">$0.00</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Free Key</h3>
              <ul className="space-y-3">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/50">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <Link href="https://jnkie.com/flow/ef74b532-405b-483c-9115-589fa913a10d" target="_blank">
                <button className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center justify-center gap-2 group/btn">
                  Get Free Key <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </GlowCard>

          {/* Premium Access Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: [1.02, 1.03, 1.02],
            }}
            transition={{
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: { duration: 0.5 },
              y: { duration: 0.5 }
            }}
            className="relative"
          >
            <GlowCard 
              glowColor="purple" 
              customSize={true} 
              className="p-8 flex flex-col gap-6 relative group border-brand-purple/40 bg-brand-purple/10 hover:-translate-y-2 transition-all duration-500 overflow-visible shadow-[0_0_60px_rgba(168,85,247,0.2)]"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [3, 5, 3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-1.5 rounded-full bg-brand-purple text-white text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.5)] z-20"
              >
                Most Popular
              </motion.div>

              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/30 border border-brand-purple/40 flex items-center justify-center text-brand-purple-light shadow-xl">
                  <Crown className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-brand-purple-light uppercase tracking-wider">Premium Access</span>
                  <p className="text-3xl font-black text-white">$4.99<span className="text-sm text-white/40 font-medium">/mo</span></p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  Premium Key
                  <Zap className="w-4 h-4 text-brand-purple-light fill-current" />
                </h3>
                <ul className="space-y-3">
                  {premiumFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/90 font-medium group/item">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-lg shadow-brand-purple/40 group-hover/item:scale-110 transition-transform">
                        <Zap className="w-3 h-3 fill-current" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-brand-purple/20">
                <Link href="https://swyhub.mysellauth.com/product/swyhub-premium" target="_blank">
                  <ShinyButton className="w-full !py-4 !rounded-xl !text-base !font-black !shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2">
                      Buy Premium <Crown className="w-4 h-4" />
                    </div>
                  </ShinyButton>
                </Link>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            Secure Payments via SellAuth
          </p>
          <div className="flex items-center gap-6 grayscale opacity-20">
             {/* Payment Methods Icons Placeholder */}
             <div className="h-4 w-12 bg-white rounded-sm" />
             <div className="h-4 w-12 bg-white rounded-sm" />
             <div className="h-4 w-12 bg-white rounded-sm" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
