"use client";

import { motion } from "framer-motion";
import { Shield, ShieldAlert, KeyRound, Globe, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Terms() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const sections = [
    {
      title: "1. Acceptance of Agreement",
      icon: <Shield className="w-5 h-5 text-brand-purple-light" />,
      content: "By accessing SwyHub and generating execution keys, you agree to follow our comprehensive terms of service. You understand that SwyHub is an integrated platform for testing Roblox experiences securely. We reserve the right to modify these terms at any time without prior notice."
    },
    {
      title: "2. Key Generation & Use",
      icon: <KeyRound className="w-5 h-5 text-brand-purple-light" />,
      content: "Execution keys are distributed exclusively through our official Discord bot. These keys are granted for personal, non-commercial use only. Sharing, selling, or distributing your personal key to third parties is strictly prohibited and will result in an immediate and permanent blacklist."
    },
    {
      title: "3. Prohibited Conduct",
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
      content: "You agree not to attempt to reverse engineer, decompile, or otherwise extract source code from the SwyHub software. Any attempts to bypass security checkpoints, manipulate network requests, or automate key generation outside of our official channels are grounds for a full hardware (HWID) and IP blacklist."
    },
    {
      title: "4. Disclaimer of Liability",
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      content: "SwyHub is not affiliated with, endorsed by, or sponsored by Roblox Corporation. You understand the risks associated with third-party software in cloud gaming environments. We are not responsible for any account moderation, game bans, or data loss resulting from the use of our services."
    },
    {
      title: "5. Account & Community Rules",
      icon: <Users className="w-5 h-5 text-green-400" />,
      content: "Our community guidelines extend from our Discord server into the product. Harassment, redistribution of paid assets as free, or impersonating staff members will lead to loss of access to the SwyHub suite across all platforms."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-20 w-full relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold tracking-widest uppercase"
          >
            Last Updated: April 2026
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Terms of <span className="text-brand-purple-light">Service</span>
          </h1>
          <p className="text-lg text-white/40 leading-relaxed max-w-xl mx-auto">
            Please read these terms carefully before accessing our script hub services. 
            By using SwyHub, you acknowledge that you have read and agreed to these conditions.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 border border-white/5 rounded-2xl bg-white/[0.01] backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-brand-purple/10 group-hover:border-brand-purple/20 transition-all">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3 text-white">{section.title}</h2>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 text-center">
          <p className="text-sm text-brand-purple-light font-medium">
            Have questions about our terms? Join our <Link href="/discord" className="underline hover:text-white transition-colors">Discord Server</Link> and open a support ticket.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

import Link from "next/link";
