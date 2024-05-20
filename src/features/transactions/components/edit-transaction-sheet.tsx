import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { insertTransactionsSchema } from '@/db/schema'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'
import { useEditTransaction } from '@/features/transactions/api/use-edit-transaction'
import { useGetTransaction } from '@/features/transactions/api/use-get-transaction'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useConfirm } from '@/hooks/use-confirm'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import TransactionForm from './transaction-form'
import { notExists } from 'drizzle-orm'

const formSchema = insertTransactionsSchema.omit({ id: true })

type FormValues = z.infer<typeof formSchema>

const EditTransactionSheet = () => {
	const { isOpen, onClose, id } = useOpenTransaction()

	const [ConfirmDelete, confirm] = useConfirm(
		'Are you sure?',
		'You are about to delete this transaction'
	)

	const transactionQuery = useGetTransaction(id)
	const editMutation = useEditTransaction(id)
	const deleteMutation = useDeleteTransaction(id)

	const isLoading = transactionQuery.isLoading

	const isPending = editMutation.isPending || deleteMutation.isPending

	const onSubmit = (values: FormValues) =>
		editMutation.mutate(values, { onSuccess: () => onClose() })

	const defaultValues = transactionQuery.data
		? {
				accountId: transactionQuery.data.accountId,
				categoryId: transactionQuery.data.categoryId,
				amount: transactionQuery.data.amount.toString(),
				date: transactionQuery.data.date
					? new Date(transactionQuery.data.date)
					: new Date(),
				payee: transactionQuery.data.payee,
				notes: transactionQuery.data.notes
		  }
		: {
				accountId: '',
				categoryId: '',
				amount: '',
				date: '',
				payee: '',
				notes: ''
		  }

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
							{id ? 'Edit Transaction' : 'New Transaction'}
						</SheetTitle>
						<SheetDescription>
							{id
								? 'Edit an existing transaction'
								: 'Create a new transaction'}
						</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<div className='absolute inset-0 flex items-center justify-center'>
							<Loader2 className='text-muted-foreground animate-spin size-8' />
						</div>
					) : (
						<TransactionForm
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

export default EditTransactionSheet
