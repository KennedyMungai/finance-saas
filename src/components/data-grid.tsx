'use client'

import { useGetSummary } from '@/features/summary/api/use-get-summary'
import { formatDateRange } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'
import DataCard from './data-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const DataGrid = () => {
	const { data } = useGetSummary()

	const params = useSearchParams()
	const to = params.get('to') || undefined
	const from = params.get('from') || undefined

	const dateRangeLabel = formatDateRange({ to, from })

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
			<DataCard
				title='Remaining'
				value={data?.remainingAmount}
				percentageChange={data?.remainingChange}
				icon={FaPiggyBank}
				variant='default'
				dateRange={dateRangeLabel}
			/>
			<DataCard
				title='Income'
				value={data?.incomeAmount}
				percentageChange={data?.incomeChange}
				icon={FaArrowTrendUp}
				variant='default'
				dateRange={dateRangeLabel}
			/>
			<DataCard
				title='Expenses'
				value={data?.expensesAmount}
				percentageChange={data?.expensesChange}
				icon={FaArrowTrendDown}
				variant='default'
				dateRange={dateRangeLabel}
			/>
		</div>
	)
}

export default DataGrid

export const DataCardLoading = () => (
	<Card className='border-none drop-shadow-sm h-[192px]'>
		<CardHeader className='flex flex-row items-center justify-between gap-x-4'>
			<div className='space-y-2'>
				<Skeleton className='h-6 w-24' />
				<Skeleton className='h-6 w-40' />
			</div>
			<Skeleton className='size-12' />
		</CardHeader>
		<CardContent>
			<Skeleton className='shrink-0 h-10 w-24 mb-2' />
			<Skeleton className='shrink-0 h-4 w-40' />
		</CardContent>
	</Card>
)
