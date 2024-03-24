import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	}
}>();

app.post('/api/v1/user/signup', async c => {
  const body = await c.req.json()
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      }
    })
    return c.text('jwt token')
  } catch (error) {
    return c.status(403)
  }
})

app.post('/api/v1/user/signin', (c) => {
  return c.text('signin')
})

app.post('/api/v1/blog', (c) => {
  return c.text('blog')
})

app.put('/api/v1/blog', (c) => {
  return c.text('blog put')
})

app.get('api/v1/blog/bulk', (c) => {
  return c.text('blog bulk get')
})

app.get('api/v1/blog/:id', (c) => {
  return c.text('blog:id get')
})

export default app
