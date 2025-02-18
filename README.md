# A Pattern Language Index

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It also has an
embedded [Sanity](https://www.sanity.io/) admin for managing content.

## Getting Started

First, add the required Sanity environment variables in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="<project_id>"
NEXT_PUBLIC_SANITY_DATASET="<dataset>"
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/studio](http://localhost:3000/studio) to view the admin

## Deploying

This is set up to deploy to Vercel. You can set up a new project through their admin or through the
CLI.
