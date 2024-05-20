import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
	(typeof client.api.transactions)[':id']['$delete']
>

export const useDeleteTransaction = (id?: string) => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error>({
		mutationFn: async () => {
			const response = await client.api.transactions[':id']['$delete']({
				param: { id }
			})
			return await response.json()
		},
		onSuccess: () => {
			toast.success('Transaction Deleted')
			queryClient.invalidateQueries({ queryKey: ['transaction', { id }] })
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			// TODO: Invalidate summary
		},
		onError: () => {
			toast.error('Failed to delete transaction')
		}
	})

	return mutation
}
