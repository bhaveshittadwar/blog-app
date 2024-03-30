import { Hono } from 'hono'
import { verify } from 'hono/jwt'

const blogRouter = new Hono<{
	Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
	},
    Variables: {
        userId: string;
        prisma: any
    }
}>();

// blog middleware
blogRouter.use('*', async (c, next) => {
  const jwt = c.req.header('Authorization')
  if(!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" })
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET)

  if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

	c.set('userId', payload.id);
  await next();
})

// initialize a blog
blogRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = c.get('prisma');
    const {title, content} = await c.req.json();

    const post = await prisma.post.create({
        data: {
			title,
			content,
			authorId: userId
		}
    })

    return c.json({
		id: post.id
	});
})

// update a blog
blogRouter.put('/', (c) => {
  return c.text('blog put')
})

// get all blogs
blogRouter.get('/bulk', (c) => {
  return c.text('blog bulk get')
})

// get a specific blog
blogRouter.get('/:id', (c) => {
  return c.text('blog:id get')
})

export { blogRouter }