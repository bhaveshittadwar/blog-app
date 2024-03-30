import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
    JWT_SECRET: string;
	}
}>();

const encryptString = async (str: string) => {
  const myText = new TextEncoder().encode(str);
  const myDigest = await crypto.subtle.digest(
    {
      name: 'SHA-256',
    },
    myText // The data you want to hash as an ArrayBuffer
  );

  return Array.from(new Uint8Array(myDigest)).map(byte => String.fromCharCode(byte)).join('');
}

app.post('/api/v1/user/signup', async c => {
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const hashedPassword = await encryptString(body.password);
  console.log(hashedPassword)

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      }
    })

    const payload = {
      id: user.id
    }

    const jwtToken = await sign(payload, c.env?.JWT_SECRET)
    
    return c.text(jwtToken)
  } catch (error) {
    c.status(403);
		return c.json({ error: "error while signing up" });
  }
})

app.post('/api/v1/user/signin', async(c) => {
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const {email, password} = body

  const hashedPassword = await encryptString(password)
  console.log(hashedPassword)
  
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: hashedPassword,
    }
  })

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
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
