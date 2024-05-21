import { Hono } from 'hono'

const app = new Hono().get('/', async (c) => c.json({ summary: true }))

export default app
