'use client'

import NavButton from '@/components/nav-button'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMedia } from 'react-use'

const routes = [
	{
		href: '/',
		label: 'Overview'
	},
	{
		href: '/transactions',
		label: 'Transactions'
	},
	{
		href: '/accounts',
		label: 'Accounts'
	},
	{
		href: '/categories',
		label: 'Categories'
	},
	{
		href: '/settings',
		label: 'Settings'
	}
]

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()
	const pathname = usePathname()

	const isMobile = useMedia('(max-width: 1024px)', false)

	const onClick = (href: string) => {
		router.push(href)
		setIsOpen(false)
	}

	if (isMobile) {
		return (
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger>
					<Button
						variant={'outline'}
						size='sm'
						className='font-normal bg-white/10 hover:bg-white/20 hover:text-white focus-visible:ring-transparent focus-visible:ring-offset-0 outline-none text-white focus:bg-white/30 transition border-none'
					>
						<Menu className='size-4' />
					</Button>
				</SheetTrigger>
				<SheetContent side={'left'} className='px-2'>
					<nav className='flex flex-col gap-y-2 pt-6'>
						{routes.map((route) => (
							<Button
								key={route.href}
								variant={
									route.href === pathname
										? 'secondary'
										: 'ghost'
								}
								onClick={() => onClick(route.href)}
								className='w-full justify-start'
							>
								{route.label}
							</Button>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
			{routes.map((route, index) => (
				<NavButton
					key={index}
					href={route.href}
					label={route.label}
					isActive={pathname == route.href}
				/>
			))}
		</nav>
	)
}

export default Navigation
