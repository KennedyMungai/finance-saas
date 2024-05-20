import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import ImportTable from './import-table'

type Props = {
	data: string[][]
	onCancel: () => void
	onSubmit: (data: any) => void
}

export interface SelectedColumnsState {
	[key: string]: string | null
}

const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputFormat = 'yyyy-MM-dd'

const requiredOptions = ['amount', 'date', 'payee']

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
	const [selectedColumns, setSelectedColumns] =
		useState<SelectedColumnsState>({})

	const headers = data[0]
	const body = data.slice(1)

	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Card className='border-none drop-shadow-sm'>
				<CardHeader className='flex gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
					<CardTitle className='text-xl line-clamp-1'>
						Import Transaction
					</CardTitle>
					<div className='flex gap-4 items-center'>
						<Button size={'sm'} onClick={onCancel}>
							Cancel
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<ImportTable
						headers={headers}
						body={body}
						selectedColumns={selectedColumns}
						onTableHeadSelectChange={() => {}}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

export default ImportCard
