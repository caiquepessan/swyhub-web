'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, KeyRound, MessageSquare, BookOpen, ShieldCheck, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 11.77 11.77 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01 10.12 10.12 0 0 0 .372.292.077.077 0 0 1-.008.128 12.08 12.08 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
	</svg>
);

export function FloatingHeader() {
	const pathname = usePathname();
	const [open, setOpen] = React.useState(false);
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
		<header
			className={cn(
				'sticky top-5 z-50',
				'mx-auto w-full max-w-4xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(126,34,206,0.05)]',
				'bg-[#060606]/85 backdrop-blur-xl',
			)}
		>
			<nav className="mx-auto flex items-center justify-between p-1.5 px-3">
				<Link href="/" className="flex items-center gap-2 group px-3 py-1.5">
					<div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center transition-all group-hover:scale-105 shadow-[0_0_10px_rgba(126,34,206,0.3)] group-hover:shadow-[0_0_15px_rgba(126,34,206,0.5)]">
						<Shield className="w-4 h-4 text-white" />
					</div>
					<span className="font-bold text-lg tracking-tight text-white transition-all">
						SwyHub
					</span>
				</Link>

				<div className="hidden items-center gap-1 lg:flex bg-white/5 p-1 rounded-xl border border-white/5">
					{navLinks.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.name}
								href={link.href}
								className={cn(
									buttonVariants({ variant: 'ghost', size: 'sm' }),
									'flex items-center gap-2 px-4 py-1.5 h-9 rounded-lg transition-all duration-300',
									isActive 
										? 'text-brand-purple-light bg-brand-purple/10 border border-brand-purple/20 shadow-sm' 
										: 'text-white/40 hover:text-white/80 hover:bg-white/5'
								)}
							>
								<link.icon className={cn("size-4", isActive ? "text-brand-purple-light" : "text-white/40")} />
								{link.name}
							</Link>
						);
					})}
				</div>

				<div className="flex items-center gap-2">
					{user ? (
						<Link href="/dashboard">
							<Button 
								size="sm" 
								variant="default" 
								className="bg-white text-black hover:bg-white/90 font-semibold px-4 rounded-lg h-9 shadow-md transition-all active:scale-95 border-none"
							>
								Dashboard
							</Button>
						</Link>
					) : (
						<Button 
							size="sm" 
							onClick={handleDiscordLogin} 
							className="bg-brand-purple/10 border border-brand-purple/20 hover:bg-brand-purple/20 hover:border-brand-purple/40 text-brand-purple-light font-semibold px-4 rounded-lg h-9 transition-all flex items-center gap-2 active:scale-95 shadow-sm"
						>
							<DiscordIcon className="size-4" />
							Login
						</Button>
					)}

					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden border-white/10 hover:bg-white/5 rounded-lg bg-white/5 h-9 w-9"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 w-[300px]"
							showClose={false}
							side="left"
						>
							<SheetHeader className="border-b border-white/10 px-6 py-6">
								<SheetTitle className="text-white flex items-center gap-3 text-xl font-bold">
									<div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center shadow-md">
										<Shield className="w-5 h-5 text-white" />
									</div>
									SwyHub
								</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col gap-y-1 overflow-y-auto px-4 py-8">
								{navLinks.map((link) => {
									const isActive = pathname === link.href;
									return (
										<Link
											key={link.name}
											href={link.href}
											onClick={() => setOpen(false)}
											className={cn(
												buttonVariants({
													variant: 'ghost',
													className: 'justify-start gap-4 w-full py-7 text-lg rounded-xl',
												}),
												isActive ? 'text-brand-purple-light bg-brand-purple/10' : 'text-white/50'
											)}
										>
											<link.icon className={cn("size-6", isActive ? "text-brand-purple-light" : "text-white/40")} />
											{link.name}
										</Link>
									);
								})}
							</div>
							<SheetFooter className="mt-auto border-t border-white/10 p-6 flex flex-col gap-4">
								{!user && (
									<Button 
										onClick={handleDiscordLogin} 
										className="w-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light h-14 rounded-xl text-lg font-bold shadow-lg hover:bg-brand-purple/20"
									>
										<DiscordIcon className="size-6 mr-3" />
										Discord Login
									</Button>
								)}
								<Button 
									variant="outline" 
									className="w-full h-12 border-white/10 rounded-xl text-white/60 hover:bg-white/5" 
									onClick={() => setOpen(false)}
								>
									Close Menu
								</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
