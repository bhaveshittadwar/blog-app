# Routes

### 1. User Routes

Base Route: `/api/v1/user`

1. POST /signup
    - **params**: email, password
    - **password encryption**: SHA-256
    - Uses jwt token to sign the user id
2. POST /signin
    - **params**: email, password
    - **password encryption**: SHA-256
    - Uses jwt token to sign the user id

### 2. Blog Routes

Base Route: `/api/v1/blog`

1. POST /
    - **params**: title, content, userId 

# Middlewares

1. '*' - Initialize prisma for all routes
    - `../index.ts`
2. **Blog Middleware**: `/api/v1/blog/*`
    - Headers: Authorization with Bearer token
    - `./blog.ts`