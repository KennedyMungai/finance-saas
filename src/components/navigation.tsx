'use client'

import { usePathname } from 'next/navigation'
import NavButton from './nav-button'

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
	const pathname = usePathname()

	return (
		<nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
			{routes.map((route, index) => (
				<NavButton
					key={index}
					href={route.href}
					label={route.label}
					isActive={pathname === route.href}
				/>
			))}
		</nav>
	)
}

export default Navigation
