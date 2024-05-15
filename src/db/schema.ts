import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const accounts = pgTable('accounts', {
	id: uuid('id').defaultRandom().primaryKey(),
	plaidId: uuid('plaid_id').defaultRandom().notNull(),
	name: text('name').notNull(),
	userId: text('user_id').notNull()
})