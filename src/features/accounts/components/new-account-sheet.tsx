import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { insertAccountsSchema } from '@/db/schema'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { z } from 'zod'
import AccountForm from './account-form'

const formSchema = insertAccountsSchema.pick({ name: true })

type FormValues = z.infer<typeof formSchema>

const NewAccountSheet = () => {
	const { isOpen, onClose } = useNewAccount()

	const mutation = useCreateAccount()

	const onSubmit = (values: FormValues) => mutation.mutate(values)

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
					disabled={false}
					defaultValues={{ name: '' }}
				/>
			</SheetContent>
		</Sheet>
	)
}

export default NewAccountSheet
