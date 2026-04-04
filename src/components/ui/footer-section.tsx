'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 -28.5 256 256" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" 
      fill="currentColor" 
    />
  </svg>
);

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
		label: 'Social',
		links: [
			{ title: 'Discord', href: '/discord', icon: DiscordIcon },
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
						<img src="/logo.svg" alt="SwyHub Logo" className="size-12 object-contain" />
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
