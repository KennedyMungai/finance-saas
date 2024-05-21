import { db } from '@/db/drizzle'
import { accounts, transactions } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { differenceInDays, parse, subDays } from 'date-fns'
import { and, eq, gte, lte, sql, sum } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono().get(
	'/',
	clerkMiddleware(),
	zValidator(
		'query',
		z.object({
			from: z.string().optional(),
			to: z.string().optional(),
			accountId: z.string().optional()
		})
	),
	async (c) => {
		const auth = getAuth(c)
		const { from, to, accountId } = c.req.valid('query')

		if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

		const defaultTo = new Date()
		const defaultFrom = subDays(defaultTo, 30)

		const startDate = from
			? parse(from, 'yyyy-MM-dd', new Date())
			: defaultFrom

		const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo

		const periodLength = differenceInDays(endDate, startDate) + 1
		const lastPeriodStart = subDays(startDate, periodLength)
		const lastPeriodEnd = subDays(endDate, periodLength)

		const fetchFinancialData = async (
			userId: string,
			startDate: Date,
			endDate: Date
		) =>
			await db
				.select({
					income: sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
						Number
					),
					expenses:
						sql`SUM(CASE WHEN ${transactions.amount} <= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
							Number
						),
					remaining: sum(transactions.amount).mapWith(Number)
				})
				.from(transactions)
				.innerJoin(accounts, eq(transactions.accountId, accounts.id))
				.where(
					and(
						accountId
							? eq(transactions.accountId, accountId)
							: undefined,
						eq(accounts.userId, userId),
						gte(transactions.date, startDate),
						lte(transactions.date, endDate)
					)
				)

		const [currentPeriod] = await fetchFinancialData(
			auth.userId,
			startDate,
			endDate
		)
		const [lastPeriod] = await fetchFinancialData(
			auth.userId,
			startDate,
			endDate
		)

		return c.json({ currentPeriod, lastPeriod })
	}
)

export default app
