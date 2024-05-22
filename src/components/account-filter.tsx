'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'

type Props = {}

const AccountFilter = (props: Props) => {
	const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()

	return (
		<Select value='' onValueChange={() => {}} disabled={false}>
			<SelectTrigger className='lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-y-10 hover:bg-y-20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition'>
				<SelectValue placeholder='Account' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='all'>All Accounts</SelectItem>
				{accounts?.map((account) => (
					<SelectItem key={account.id} value={account.name}>
						{account.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default AccountFilter
