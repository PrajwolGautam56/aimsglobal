# AIMS Global Website

Production-ready website for **AIMS Global** – education consultancy in Butwal, Nepal helping students get admissions in Indian universities.

## Enquiry Management (Google Sheets)

Contact forms write to your [Enquiry Management Sheet](https://docs.google.com/spreadsheets/d/1A3xFwN17ERu_eYhKl2jKPDTL9AAzK8zXFyLhpieXXWg/edit).

1. Deploy `scripts/google-apps-script-enquiry.js` in the sheet (Extensions → Apps Script → Deploy as Web App)
2. Add the Web App URL to `.env.local` as `GOOGLE_SHEETS_WEBHOOK`
3. Ensure sheets named **Enquiries** and **Blog Queries** exist with the correct headers

Submissions include: name, email, phone, course, university, city, message, source page, and auto-generated enquiry ID (`ENQ-2025-001`).

## Quick Start

```bash
cd aimsglobal
npm install
cp .env.local.example .env.local   # add RESEND_API_KEY for contact form emails
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Live Google Sheets Data

University and blog content is fetched **directly from your Google Sheets** — no manual CSV export needed. Edit the sheet and changes appear on the site within ~5 minutes (configurable).

### Sheet columns for images (SEO)

Add these columns to both sheets:

| Column | Description | Example |
|--------|-------------|---------|
| `image` | Google Drive image URL (logo or featured image) | `https://drive.google.com/file/d/ABC123/view?usp=sharing` |
| `img_alt` | Alt text for SEO & accessibility | `BMS College of Engineering Bangalore logo` |

**Drive image tip:** Upload image → Share → "Anyone with the link" → paste the share URL in the `image` column.

**Your sheets (must be "Anyone with the link can view"):**
- Universities: [AIMS_Global_Universities](https://docs.google.com/spreadsheets/d/1ZprLoN1DLFzAUJndWm0DLCPWCo6WmXwCIsqWezeEi-M/edit)
- Blog: [AIMS_Global_Blog_Posts](https://docs.google.com/spreadsheets/d/1e8cCwonGxlVySebx8h1JhwVj3reg-WnxGtglP7e0Jp4/edit)

Set `SHEETS_REVALIDATE_SECONDS=60` in `.env.local` for faster updates (1 minute).

**Instant refresh** after editing a sheet:
```bash
curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_REVALIDATE_SECRET"
```

**Fallback:** If Google Sheets is unreachable, the site uses cached JSON in `src/data/*.json`. Run `npm run data:convert` to refresh those backups from CSV.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured universities, courses, testimonials |
| `/universities` | Filterable university listing (29 colleges) |
| `/universities/[slug]` | University detail with tabs |
| `/courses` | Course listing derived from university data |
| `/blog` | Blog listing (12 posts) |
| `/blog/[slug]` | Individual blog post |
| `/about` | About AIMS Global |
| `/contact` | Contact form + map |

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables: `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`
4. Deploy (region: Singapore `sin1` for Nepal/India latency)

## Tech Stack

Next.js 16 · TypeScript · Tailwind CSS · React Hook Form · Zod · Resend
# aimsglobal
