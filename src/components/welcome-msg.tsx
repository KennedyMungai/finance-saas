'use client'

import { useUser } from '@clerk/nextjs'

const WelcomeMsg = () => {
	const { isLoaded, user } = useUser()

	return (
		<div className='space-y-2 lg:mb-4 mb-24'>
			<h2 className='text-2xl lg:text-4xl text-white font-medium'>
				Welcome Back {isLoaded ? ', ' : ''}
				{user?.firstName}👋
			</h2>
			<p className='text-sm lg:text-base text-[#89b6fd]'>
				This is your financial overview report
			</p>
		</div>
	)
}

export default WelcomeMsg
