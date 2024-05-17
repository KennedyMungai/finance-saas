import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { insertAccountsSchema } from '@/db/schema'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { z } from 'zod'
import AccountForm from './account-form'

const formSchema = insertAccountsSchema.pick({ name: true })

type FormValues = z.infer<typeof formSchema>

const EditAccountSheet = () => {
	const { isOpen, onClose, id } = useOpenAccount()

	const accountsQuery = useGetAccount(id)

	const mutation = useCreateAccount()

	const onSubmit = (values: FormValues) =>
		mutation.mutate(values, { onSuccess: () => onClose() })

	const defaultValues = accountsQuery.data
		? { name: accountsQuery.data.name }
		: { name: '' }

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>New Account</SheetTitle>
					<SheetDescription>
						Create a new account to track your transactions
					</SheetDescription>
				</SheetHeader>
				<AccountForm
					onSubmit={onSubmit}
					disabled={mutation.isPending}
					defaultValues={defaultValues}
				/>
			</SheetContent>
		</Sheet>
	)
}

export default EditAccountSheet
