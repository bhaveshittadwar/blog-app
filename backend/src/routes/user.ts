import { Hono } from 'hono'
import { sign } from 'hono/jwt'

const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
    JWT_SECRET: string;
	},
  Variables: {
    userId: string;
    prisma: any
  }
}>();

// Helper functions
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

// user routes
userRouter.post('/signup', async c => {
  const body = await c.req.json()
  const prisma = c.get('prisma')

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

userRouter.post('/signin', async(c) => {
  const body = await c.req.json()
  const prisma = c.get('prisma')

  const {email, password} = body

  const hashedPassword = await encryptString(password)
  
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

export {userRouter}