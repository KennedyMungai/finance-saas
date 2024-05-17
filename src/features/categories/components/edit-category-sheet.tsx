import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { insertCategoriesSchema } from '@/db/schema'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import { useEditCategory } from '@/features/categories/api/use-edit-category'
import { useGetCategory } from '@/features/categories/api/use-get-category'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useConfirm } from '@/hooks/use-confirm'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import CategoryForm from './category-form'

const formSchema = insertCategoriesSchema.pick({ name: true })

type FormValues = z.infer<typeof formSchema>

const EditCategorySheet = () => {
	const { isOpen, onClose, id } = useOpenCategory()

	const [ConfirmDelete, confirm] = useConfirm(
		'Are you sure?',
		'You are about to delete this category'
	)

	const categoriesQuery = useGetCategory(id)
	const editMutation = useEditCategory(id)
	const deleteMutation = useDeleteCategory(id)

	const isLoading = categoriesQuery.isLoading

	const isPending = editMutation.isPending || deleteMutation.isPending

	const onSubmit = (values: FormValues) =>
		editMutation.mutate(values, { onSuccess: () => onClose() })

	const defaultValues = categoriesQuery.data
		? { name: categoriesQuery.data.name }
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
							{id ? 'Edit Category' : 'New Category'}
						</SheetTitle>
						<SheetDescription>
							{id
								? 'Edit an existing category'
								: 'Create a new category to track your accounts'}
						</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<div className='absolute inset-0 flex items-center justify-center'>
							<Loader2 className='text-muted-foreground animate-spin size-8' />
						</div>
					) : (
						<CategoryForm
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

export default EditCategorySheet
