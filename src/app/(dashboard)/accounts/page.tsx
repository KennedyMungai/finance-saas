'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Plus } from 'lucide-react'

const AccountsPage = () => {
	const newAccount = useNewAccount()

	return (
		<div>
			<Card className='border-none drop-shadow-sm'>
				<CardHeader className='flex gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
					<CardTitle className='text-xl line-clamp-1'>
						AccountsPage
					</CardTitle>
					<Button size={'sm'} onClick={newAccount.onOpen}>
						<Plus className='size-4 mr-2' />
						Add new
					</Button>
				</CardHeader>
			</Card>
		</div>
	)
}

export default AccountsPage
