# Serverless Blogging

A serverless blogging website with authentication and REST APIs for creating accounts, signing in, creating articles, and publishing content.

## Features

- User Authentication with JWT
- REST APIs for account management and article operations
- Serverless backend on Cloudflare Workers
- Skeleton loading for a smoother UX
- Database interactions with Prisma and PostgreSQL

## Tech Stack

**Backend**  
- **Cloudflare Workers:** Serverless functions for backend logic  
- **Hono Framework:** Minimal and fast framework for routing  
- **TypeScript:** Strongly typed language built on JavaScript  
- **Prisma ORM:** Database ORM with connection pooling  
- **PostgreSQL:** Relational database

**Frontend**  
- **Next.js & React.js:** For building the user interface  
- **Tailwind CSS:** Utility-first CSS framework for styling  

## Getting Started

### Prerequisites

- Node.js  
- PostgreSQL  

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/blog-app.git
```

Navigate to the project directory:

```bash
cd blog-app
```

Install dependencies:

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

Set up Cloudflare Workers and configure Next.js as per their respective documentation.

### Running the Application

**Backend (Cloudflare Workers):**

```bash
npm run start:backend
```

**Frontend (Next.js):**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

**Backend:**  
Deploy using Cloudflare Workers. Refer to the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) for detailed instructions.

**Frontend:**  
Deploy the Next.js frontend on your preferred platform. Consult the [Next.js deployment guide](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and open a pull request.

## Backend Docs

Refer to [src/backend/README.md](src/backend/README.md) for backend-specific documentation.
