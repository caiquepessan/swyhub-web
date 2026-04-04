'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Globe,
  Send,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Home', href: '/' },
			{ title: 'Get Key', href: '/get-key' },
			{ title: 'Discord', href: '/discord' },
		],
	},
	{
		label: 'Legal',
		links: [
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Status', href: '#' },
			{ title: 'Help Center', href: '/discord' },
		],
	},
	{
		label: 'Social',
		links: [
			{ title: 'Discord', href: '/discord', icon: MessageSquare },
			{ title: 'YouTube', href: '#', icon: Globe },
			{ title: 'Global', href: '#', icon: Send },
		],
	},
];

import { GlowCard } from '@/components/ui/spotlight-card';

export function Footer() {
	return (
		<footer className="relative w-full max-w-6xl mx-auto mb-0 overflow-hidden group">
      <GlowCard 
        glowColor="purple" 
        customSize={true}
        className="flex flex-col items-center justify-center rounded-t-3xl border-t border-x border-white/10 bg-black/50 backdrop-blur-md px-6 py-12 lg:py-16 transition-all duration-500 ease-out hover:-translate-y-1 group-hover:border-brand-purple/20"
      >
  			{/* Decorative Glow */}
  			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-brand-purple/50 blur-[2px]" />
  			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[200px] bg-brand-purple/5 blur-[100px] -z-10 rounded-full" />
  
  			<div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 pl-6">
				<AnimatedContainer className="space-y-6 md:col-span-1 lg:col-span-1">
					<div className="flex items-center gap-3">
						<img src="/SwyHub-ico.ico" alt="SwyHub Logo" className="size-8 object-contain" />
						<span className="text-xl font-black tracking-tight text-white italic">SwyHub</span>
					</div>
					<p className="text-white/40 text-sm max-w-xs leading-relaxed">
						The most reliable, fast, and feature-rich script hub for popular games. Experience performance like never before.
					</p>
					<p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-12">
						© {new Date().getFullYear()} SwyHub. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-0">
								<h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-purple-light mb-4 text-center sm:text-left">
                  {section.label}
                </h3>
								<ul className="text-white/40 space-y-3 text-sm text-center sm:text-left">
									{section.links.map((link) => (
										<li key={link.title}>
											<Link
												href={link.href}
												className="hover:text-white inline-flex items-center transition-all duration-300 group"
											>
												{link.icon && <link.icon className="me-2 size-4 group-hover:text-brand-purple-light transition-colors" />}
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
      </GlowCard>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(8px)', y: 20, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.6, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
