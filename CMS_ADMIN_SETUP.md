# AIMS Global CMS/Admin Setup

This project is now a MongoDB-ready Next.js CMS for:

- Universities and colleges
- Course and fee details
- Logos/images
- SEO metadata
- Blogs
- Sitemap and robots controls
- Admin editing

## 1. Environment

Copy `.env.local.example` to `.env.local` and fill these values:

```bash
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/aims_global?retryWrites=true&w=majority
MONGODB_DB=aims_global
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=your-long-random-session-secret
NEXT_PUBLIC_SITE_URL=https://aimsglobal.com.np
```

Cloudinary values are already reserved in `.env.local.example`; add them when the API details are available.

## 2. Seed MongoDB

After `.env.local` is ready:

```bash
npm run db:seed
```

This uploads the existing local JSON data into MongoDB:

- `src/data/universities.json` -> `universities`
- `src/data/blogs.json` -> `blogs`
- default SEO settings -> `siteSettings`

## 3. Run Admin

```bash
npm run dev
```

Open:

```text
http://localhost:3000/admin/login
```

## 4. SEO Workflow

Each university/blog record supports:

- URL slug
- meta title
- meta description
- focus keyword
- publish status
- featured flag
- SEO score checklist

Published blog posts automatically appear in `sitemap.xml`. Draft blogs do not.

## 5. Logo Workflow

Active logos live in:

```text
public/logos
```

The manifest lives in:

```text
src/data/university-logo-manifest.json
```

Admin records can point to local paths such as:

```text
/logos/alliance-university-bangalore.webp
```
