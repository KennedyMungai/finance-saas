import AmountInput from '@/components/amount-input'
import DatePicker from '@/components/date-picker'
import Select from '@/components/select'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { insertTransactionsSchema } from '@/db/schema'
import { convertAmountToMilliunits } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	date: z.coerce.date(),
	accountId: z.string(),
	categoryId: z.string().nullable().optional(),
	payee: z.string(),
	amount: z.string(),
	notes: z.string().nullable().optional()
})

const apiSchema = insertTransactionsSchema.omit({ id: true })

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
	id?: string
	defaultValues?: FormValues
	onSubmit: (values: ApiFormValues) => void
	onDelete?: () => void
	disabled?: boolean
	accountOptions: { label: string; value: string }[]
	categoryOptions: { label: string; value: string }[]
	onCreateAccount: (name: string) => void
	onCreateCategory: (name: string) => void
}

const TransactionForm = ({
	onSubmit,
	defaultValues,
	disabled,
	id,
	onDelete,
	accountOptions,
	categoryOptions,
	onCreateAccount,
	onCreateCategory
}: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	const handleSubmit = (values: FormValues) => {
		const amount = parseFloat(values.amount)
		const amountInMilliunits = convertAmountToMilliunits(amount)

		onSubmit({
			...values,
			amount: amountInMilliunits
		})
	}

	const handleDelete = () => onDelete?.()

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-4 pt-4'
			>
				<FormField
					name='date'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<DatePicker
									value={field.value}
									onChange={field.onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='accountId'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account</FormLabel>
							<FormControl>
								<Select
									placeholder='Select an Account'
									options={accountOptions}
									onCreate={onCreateAccount}
									value={field.value}
									onChange={field.onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='categoryId'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Select
									placeholder='Select a category'
									options={categoryOptions}
									onCreate={onCreateCategory}
									value={field.value}
									onChange={field.onChange}
									disabled={disabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='payee'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payee</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder='Add a payee'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='amount'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<AmountInput
									{...field}
									disabled={disabled}
									placeholder='0.00'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='notes'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									value={field.value ?? ''}
									disabled={disabled}
									placeholder='Optional notes'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button className='w-full' disabled={disabled}>
					{id ? 'Save Changes' : 'Create Transaction'}
				</Button>
				{!!id && (
					<Button
						className='w-full'
						type='button'
						disabled={disabled}
						onClick={handleDelete}
						variant={'outline'}
					>
						<Trash className='size-4 mr-3' /> Delete Transaction
					</Button>
				)}
			</form>
		</Form>
	)
}

export default TransactionForm
