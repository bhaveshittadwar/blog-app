import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from '@bhavesh.ittadwar/common'

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
    const userId = c.get('userId')
    const prisma = c.get('prisma')
    const {title, content} = await c.req.json()

    const createPostValid = createPostInput.safeParse({title, content})

    if(!createPostValid.success) {
      c.status(403);
      return c.json({ message: 'Either content or title missing or entered in the wrong format' })
    }

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
blogRouter.put('/', async (c) => {
  const prisma = c.get('prisma')
  const {blogId, title, content} = await c.req.json();
  const updatePostValid = updatePostInput.safeParse({title, content})
  if(!updatePostValid.success) {
    c.status(403);
    return c.json({ message: 'Title and/or content entered in the wrong format' })
  }
  
  await prisma.post.update({
    where: {
      id: blogId
    },
    data: {
      title,
      content
    }
  })
  return c.text('Post Updated Succesfully')
})

// get all blogs
blogRouter.get('/bulk', async(c) => {
  const prisma = c.get('prisma')

  const blogs = await prisma.post.findMany()

  if(!blogs) {
    c.status(404);
    return c.json({ error: "blogs not found" })
  }

  return c.json(blogs)
})

// get a specific blog
blogRouter.get('/:id', async (c) => {
  const blogId = c.req.param('id');
  const prisma = c.get('prisma')

  const blog = await prisma.post.findUnique({
    where: {
      id: blogId
    }
  })

  if(!blog) {
    c.status(404);
    return c.json({ error: "blog not found" })
  }

  return c.json({
    id: blog.id,
    title: blog.title,
    content: blog.content
  })
})

export { blogRouter }
