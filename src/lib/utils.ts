import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const convertAmountToMilliunits = (amount: number) =>
	Math.round(amount * 1000)

export const convertAmountFromMilliunits = (amount: number) => amount / 1000

export const formatCurrency = (value: number) =>
	Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(value)

export const calculatePercentageChange = (
	current: number,
	previous: number
) => {
	if (previous === 0) return previous === current ? 0 : 100

	return ((current - previous) / previous) * 100
}
