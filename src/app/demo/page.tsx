"use client";

import { FloatingHeader } from "@/components/ui/floating-header";
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";

export default function DemoOne() {
 return (
		<div className="relative w-full px-4 min-h-screen bg-black overflow-hidden">
			<FloatingHeader />
			
			<div className="max-w-4xl mx-auto py-24 text-center">
				<motion.h1 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-6xl font-black mb-6 tracking-tight text-white"
				>
					Component <span className="text-brand-purple-light">Demo</span>
				</motion.h1>
				<p className="text-white/40 text-lg max-w-lg mx-auto">
					This is a preview of the new Shadcn-integrated Floating Header. 
					It features smooth backdrop blurs and responsive mobile navigation.
				</p>
			</div>

			<div className="min-h-[50vh]" />

			{/* Background Dots */}
			<div
				aria-hidden="true"
				className={cn(
					'fixed inset-0 -z-10 size-full pointer-events-none',
					'bg-[radial-gradient(color-mix(in_oklab,white/10,transparent)_1px,transparent_1px)]',
					'bg-[size:24px_24px]',
				)}
			/>
			
			{/* Glow Effects */}
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none -z-10" />
		</div>
	);
}
