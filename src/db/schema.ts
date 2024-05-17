import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const accounts = pgTable('accounts', {
	id: uuid('id').defaultRandom().primaryKey(),
	plaidId: text('plaid_id'),
	name: text('name').notNull(),
	userId: text('user_id').notNull()
})

export const accountsRelations = relations(accounts, ({ many }) => ({
	transactions: many(transactions)
}))

export const insertAccountsSchema = createInsertSchema(accounts)

export const categories = pgTable('categories', {
	id: uuid('id').defaultRandom().primaryKey(),
	plaidId: text('plaid_id'),
	name: text('name').notNull(),
	userId: text('user_id').notNull()
})

export const insertCategoriesSchema = createInsertSchema(categories)

export const categoriesRelations = relations(categories, ({ many }) => ({
	transactions: many(transactions)
}))

export const transactions = pgTable('transactions', {
	id: uuid('id').defaultRandom().primaryKey(),
	amount: integer('amount').notNull(),
	payee: text('payee').notNull(),
	notes: text('notes'),
	date: timestamp('date', { mode: 'date' }).notNull(),

	accountId: uuid('accountId')
		.references(() => accounts.id, {
			onDelete: 'cascade'
		})
		.notNull(),
	categoryId: uuid('categoryId').references(() => categories.id, {
		onDelete: 'set null'
	})
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
	accounts: one(accounts, {
		fields: [transactions.accountId],
		references: [accounts.id]
	}),
	categories: one(categories, {
		fields: [transactions.categoryId],
		references: [categories.id]
	})
}))

export const insertTransactionsSchema = createInsertSchema(transactions, {
	date: z.coerce.date()
})
