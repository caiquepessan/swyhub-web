"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Trash2, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PrivacyPolicy() {
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
      title: "What We Collect",
      icon: <Database className="w-5 h-5 text-brand-purple-light" />,
      content: "We collect only the essential data required to provide and secure our services. This includes your unique Discord ID for key allocation and hardware identification hashes (IP/HWID) used exclusively for abuse prevention and platform monitoring."
    },
    {
      title: "Data Protection",
      icon: <Lock className="w-5 h-5 text-green-400" />,
      content: "Your data is stored in secure, encrypted databases provided by Supabase. We implement strict access controls and do not share your personal information with third-party advertisers or data brokers. All telemetry is used for platform security purposes only."
    },
    {
      title: "Usage Metrics",
      icon: <Eye className="w-5 h-5 text-blue-400" />,
      content: "When using the SwyHub script suite, we log basic execution metrics (game IDs and successful script loads) to improve our compatibility and track platform stability. No personal in-game chat logs or private user data are ever recorded."
    },
    {
      title: "Data Retention",
      icon: <Clock className="w-5 h-5 text-yellow-400" />,
      content: "Hardware security logs are rotated regularly. If you are involved in a blacklist investigation, relevant identifying hashes may be retained as long as necessary to protect the platform. All other operational logs are purged periodically."
    },
    {
      title: "Your Rights",
      icon: <Trash2 className="w-5 h-5 text-red-400" />,
      content: "You have the right to request the deletion of any data associated with your Discord account. Please note that data deletion requests do not include removal from the platform blacklist if security terms were violated."
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
            Privacy <span className="text-brand-purple-light">Policy</span>
          </h1>
          <p className="text-lg text-white/40 leading-relaxed max-w-xl mx-auto">
            Your privacy is critically important to us. We have fundamental principles about protecting your data 
            and only collecting what is absolutely necessary for SwyHub's operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-6 border border-white/5 rounded-2xl bg-white/[0.01] backdrop-blur-sm group hover:border-white/10 transition-colors h-full",
                idx === 2 && "md:col-span-2"
              )}
            >
              <div className="flex flex-col gap-4">
                <div className="w-fit p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-brand-purple/10 group-hover:border-brand-purple/20 transition-all">
                  {section.icon}
                </div>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
                <p className="text-white/50 leading-relaxed text-sm">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-white/5 rounded-2xl bg-white/[0.01] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold mb-2">Security First</h3>
            <p className="text-white/40 text-sm max-w-md">
              We use industry-standard encryption to protect your data. No personal information is ever sold to third parties.
            </p>
          </div>
          <Link href="/discord" className="w-full md:w-auto">
            <button className="whitespace-nowrap px-8 py-3 rounded-xl bg-brand-purple hover:bg-purple-600 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-purple/20">
              Contact us via Discord
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
