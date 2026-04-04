'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  MenuIcon, 
  KeyRound, 
} from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { cn } from '@/lib/utils';

export function FloatingHeader() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{ label: 'Home', href: '/' },
		{ label: 'Discord', href: '/discord' },
		{ label: 'Terms', href: '/terms' },
		{ label: 'Privacy', href: '/privacy' },
	];

	return (
		<header
			className={cn(
				'sticky top-5 z-50',
				'mx-auto w-full max-w-3xl rounded-xl border border-white/10 shadow-lg',
				'bg-black/80 backdrop-blur-lg',
			)}
		>
			<nav className="mx-auto flex items-center justify-between p-2 px-4">
				<Link href="/" className="flex items-center gap-2 group transition-all hover:opacity-80">
					<img src="/logo.svg" alt="SwyHub Logo" className="w-12 h-12 object-contain" />
					<p className="font-bold text-lg tracking-tight text-white">SwyHub</p>
				</Link>

				<div className="hidden items-center gap-1 lg:flex">
					{links.map((link) => (
						<Link
							key={link.label}
							className={cn(
								buttonVariants({ variant: 'ghost', size: 'sm' }),
								'text-white/60 hover:text-white hover:bg-white/5 rounded-lg px-4'
							)}
							href={link.href}
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="flex items-center gap-2">
					<Link href="/get-key" className="hidden sm:block">
						<ShinyButton className="!py-2 !px-4 !text-sm !font-bold shadow-lg shadow-brand-purple/20">
							<div className="flex items-center gap-2">
								<KeyRound className="size-4" />
								Get Key
							</div>
						</ShinyButton>
					</Link>
					
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden border-white/10 bg-white/5 hover:bg-white/10 text-white"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-black/95 border-r border-white/10 gap-0 backdrop-blur-xl"
							showClose={false}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => (
									<Link
										key={link.label}
										className={cn(
											buttonVariants({
												variant: 'ghost',
												className: 'justify-start text-lg h-12 text-white/70 hover:text-white hover:bg-white/5 rounded-xl',
											}),
										)}
										href={link.href}
										onClick={() => setOpen(false)}
									>
										{link.label}
									</Link>
								))}
							</div>
							<SheetFooter className="border-t border-white/10 p-4 bg-white/[0.02]">
								<Link href="/get-key" className="w-full" onClick={() => setOpen(false)}>
									<Button className="w-full bg-brand-purple text-white h-12 rounded-xl text-lg font-bold">
										Get Key
									</Button>
								</Link>
								<Button variant="outline" className="w-full h-12 border-white/10 text-white/50 rounded-xl mt-2" onClick={() => setOpen(false)}>
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
