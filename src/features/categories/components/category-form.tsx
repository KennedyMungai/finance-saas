import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { insertCategoriesSchema } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = insertCategoriesSchema.pick({ name: true })

type FormValues = z.input<typeof formSchema>

type Props = {
	id?: string
	defaultValues?: FormValues
	onSubmit: (values: FormValues) => void
	onDelete?: () => void
	disabled?: boolean
}

const CategoryForm = ({
	onSubmit,
	defaultValues,
	disabled,
	id,
	onDelete
}: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	const handleSubmit = (values: FormValues) => onSubmit(values)

	const handleDelete = () => onDelete?.()

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-4 pt-4'
			>
				<FormField
					name='name'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder='e.g. Food, Travel, etc.'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button className='w-full' disabled={disabled}>
					{id ? 'Save Changes' : 'Create Category'}
				</Button>
				{!!id && (
					<Button
						className='w-full'
						type='button'
						disabled={disabled}
						onClick={handleDelete}
						variant={'outline'}
					>
						<Trash className='size-4 mr-3' /> Delete Category
					</Button>
				)}
			</form>
		</Form>
	)
}

export default CategoryForm
