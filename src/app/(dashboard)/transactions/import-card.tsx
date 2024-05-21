import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { convertAmountToMilliunits } from '@/lib/utils'
import { useState } from 'react'
import ImportTable from './import-table'
import { format, parse } from 'date-fns'

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

	const onTableHeadSelectChange = (
		columnIndex: number,
		value: string | null
	) => {
		setSelectedColumns((prev) => {
			const newSelectedColumns = { ...prev }

			for (const key in newSelectedColumns) {
				if (newSelectedColumns[key] === value) {
					newSelectedColumns[key] = null
				}
			}

			if (value === 'skip') {
				value = null
			}

			newSelectedColumns[`column_${columnIndex}`] = value

			return newSelectedColumns
		})
	}

	const progress = Object.values(selectedColumns).filter(Boolean).length

	const handleContinue = () => {
		const getColumnIndex = (column: string) => column.split('_')[1]

		const mappedData = {
			headers: headers.map((_header, index) => {
				const columnIndex = getColumnIndex(`column_${index}`)

				return selectedColumns[`column_${columnIndex}`] || null
			}),
			body: body
				.map((row, index) => {
					const transformedRow = row.map((cell, index) => {
						const columnIndex = getColumnIndex(`column_${index}`)

						return selectedColumns[`column_${columnIndex}`]
							? cell
							: null
					})

					return transformedRow.every((item) => item === null)
						? []
						: transformedRow
				})
				.filter((row) => row.length > 0)
		}

		const arrayOfData = mappedData.body.map((row) =>
			row.reduce((acc: any, cell, index) => {
				const header = mappedData.headers[index]

				if (header !== null) acc[header] = cell

				return acc
			}, {})
		)

		const formattedData = arrayOfData.map((item) => ({
			...item,
			amount: convertAmountToMilliunits(parseFloat(item.amount)),
			date: format(parse(item.date, dateFormat, new Date()), outputFormat)
		}))

		onSubmit(formattedData)
	}

	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Card className='border-none drop-shadow-sm'>
				<CardHeader className='flex gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
					<CardTitle className='text-xl line-clamp-1'>
						Import Transaction
					</CardTitle>
					<div className='flex gap-4 items-center flex-col lg:flex-row gap-y-2 gap-x-2'>
						<Button
							className='w-full lg:w-auto'
							size={'sm'}
							onClick={handleContinue}
							disabled={progress < requiredOptions.length}
						>
							Continue ({progress}/{requiredOptions.length})
						</Button>
						<Button
							size={'sm'}
							onClick={onCancel}
							className='w-full lg:w-auto'
						>
							Cancel
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<ImportTable
						headers={headers}
						body={body}
						selectedColumns={selectedColumns}
						onTableHeadSelectChange={onTableHeadSelectChange}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

export default ImportCard
