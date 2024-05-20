import Image from 'next/image'

const Loading = () => {
	return (
		<div className='h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-400'>
			<Image
				src='/fin-saas-logo.svg'
				alt='fin-logo'
				width={100}
				height={100}
				className='animate-pulse'
			/>
		</div>
	)
}

export default Loading
