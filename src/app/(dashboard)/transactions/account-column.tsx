import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

type Props = {
	id: string
	account: string
	accountId: string
}

const AccountColumn = ({ account, accountId, id }: Props) => {
	const { onOpen: onOpenAccount } = useOpenAccount()

	const onClick = () => onOpenAccount(accountId)

	return (
		<div
			className='flex items-center cursor-pointer hover:underline'
			onClick={onClick}
		>
			{account}
		</div>
	)
}

export default AccountColumn
