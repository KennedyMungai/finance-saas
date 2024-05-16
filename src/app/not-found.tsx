import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFound = () => {
	return (
		<div className='h-screen bg-blue-600 flex flex-col items-center justify-center gap-4 font-bold text-3xl text-white'>
			404 - Page Not Found
			<Button variant={'outline'} asChild className='bg-transparent'>
				<Link href={'/'}>Go Back</Link>
			</Button>
		</div>
	)
}

export default NotFound
