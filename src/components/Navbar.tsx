"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, KeyRound, MessageSquare, BookOpen, ShieldCheck, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDiscordLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Shield },
    { name: "Get Key", href: "/get-key", icon: KeyRound },
    { name: "Discord", href: "/discord", icon: MessageSquare },
    { name: "Terms", href: "/terms", icon: BookOpen },
    { name: "Privacy", href: "/privacy", icon: ShieldCheck },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(126,34,206,0.15)] rounded-2xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-brand-purple group-hover:to-brand-purple-light transition-all">
              SwyHub
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive 
                      ? "text-brand-purple bg-white/5" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/dashboard">
               <button className="px-4 py-1.5 cursor-pointer rounded-md bg-white text-black text-sm font-medium transition-colors hover:bg-white/90 flex items-center gap-2">
                 Dashboard
               </button>
            </Link>
          ) : (
             <button onClick={handleDiscordLogin} className="px-4 py-1.5 cursor-pointer rounded-md bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium transition-colors flex items-center gap-2">
                <LogIn className="w-3.5 h-3.5" />
                Discord Login
             </button>
          )}
        </div>
      </nav>
    </div>
  );
}
