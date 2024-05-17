import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { insertAccountsSchema } from '@/db/schema'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import AccountForm from './account-form'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertAccountsSchema.pick({ name: true })

type FormValues = z.infer<typeof formSchema>

const EditAccountSheet = () => {
	const { isOpen, onClose, id } = useOpenAccount()

	const [ConfirmDelete, confirm] = useConfirm(
		'Are you sure?',
		'You are about to delete this account'
	)

	const accountsQuery = useGetAccount(id)
	const editMutation = useEditAccount(id)
	const deleteMutation = useDeleteAccount(id)

	const isLoading = accountsQuery.isLoading

	const isPending = editMutation.isPending || deleteMutation.isPending

	const onSubmit = (values: FormValues) =>
		editMutation.mutate(values, { onSuccess: () => onClose() })

	const defaultValues = accountsQuery.data
		? { name: accountsQuery.data.name }
		: { name: '' }

	const onDelete = async () => {
		const ok = await confirm()

		if (ok) deleteMutation.mutate(undefined, { onSuccess: () => onClose() })
	}

	return (
		<>
			<ConfirmDelete />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className='space-y-4'>
					<SheetHeader>
						<SheetTitle>
							{id ? 'Edit Account' : 'New Account'}
						</SheetTitle>
						<SheetDescription>
							{id
								? 'Edit an existing account'
								: 'Create a new account to track your transactions'}
						</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<div className='absolute inset-0 flex items-center justify-center'>
							<Loader2 className='text-muted-foreground animate-spin size-8' />
						</div>
					) : (
						<AccountForm
							id={id}
							onSubmit={onSubmit}
							disabled={isPending}
							defaultValues={defaultValues}
							onDelete={onDelete}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}

export default EditAccountSheet
