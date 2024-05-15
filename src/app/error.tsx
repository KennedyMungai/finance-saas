'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

type Props = {
	error: Error & { digest?: string }
	reset: () => void
}

const ErrorPage = ({ error, reset }: Props) => {
	useEffect(() => {
		console.log(error)
	}, [error])

	return (
		<div className='h-screen bg-rose-400 flex flex-col items-center justify-center gap-4 font-bold text-3xl text-white'>
			{error.message}
			<Button variant={'outline'} asChild className='bg-transparent'>
				<Link href={'/'}>Go Back</Link>
			</Button>
		</div>
	)
}

export default ErrorPage
