"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, ShieldAlert, ArrowRight, Loader2 } from "lucide-react";

export default function GetKey() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        'missing_token': 'Linkvertise token was not found. Please try again.',
        'invalid_token': 'The verification token is invalid or expired. Bypass attempt detected.',
        'database_error': 'Failed to save your key. Please contact support.',
        'server_error': 'A server internal error occurred.',
        'unauthorized': 'You must be logged in via Discord to generate a key.'
      };
      setError(errorMessages[errorParam] || 'An unknown error occurred.');
    }
  }, [searchParams]);

  const handleProceed = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch('/api/keys/generate', {
        method: 'POST',
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to generate link.");
        setIsLoading(false);
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-4 text-gradient-primary">Get Script Key</h1>
          <p className="text-white/60">
            Complete the steps below to securely generate your temporary 24-hour key.
          </p>
        </div>

        <div className="glass-card p-8 flex flex-col gap-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple-light shrink-0">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">Step 1: Verification</h4>
              <p className="text-sm text-white/50">Complete the Linkvertise checkpoint.</p>
            </div>
            <button 
              onClick={handleProceed}
              disabled={isLoading}
              className="px-4 py-2 bg-brand-purple hover:bg-brand-purple-light text-white rounded-lg font-semibold transition-all flex items-center gap-2 text-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Proceed <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 opacity-50 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/40 shrink-0">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">Step 2: Generate Key</h4>
              <p className="text-sm text-white/50">Redeem your checkpoint for a secure key.</p>
            </div>
            <KeyRound className="w-5 h-5 text-white/40 shrink-0 mr-4" />
          </div>

          <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-brand-purple/20 flex gap-4">
            <ShieldAlert className="w-6 h-6 text-brand-purple shrink-0" />
            <p className="text-sm text-purple-200">
              <strong>Anti-Bypass Active:</strong> Our system strictly verifies checkpoint completion. Usage of bypassers will automatically blacklist your IP and Hardware ID.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
