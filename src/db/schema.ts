import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const accounts = pgTable('accounts', {
	id: uuid('id').defaultRandom().primaryKey(),
	plaidId: uuid('plaid_id'),
	name: text('name').notNull(),
	userId: text('user_id').notNull()
})

export const insertAccountsSchema = createInsertSchema(accounts)

export const categories = pgTable('categories', {
	id: uuid('id').defaultRandom().primaryKey(),
	plaidId: uuid('plaid_id'),
	name: text('name').notNull(),
	userId: text('user_id').notNull()
})

export const insertCategoriesSchema = createInsertSchema(categories)
