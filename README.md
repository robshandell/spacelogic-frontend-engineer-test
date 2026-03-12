# SHOP.CO – Frontend test

E-commerce style landing + product detail page. Data comes from [Fake Store API](https://fakestoreapi.com/); layout and UI are based on the provided Figma (SHOP.CO).

**Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind.

## What’s in it

- **Home:** Hero, New Arrivals + Top Selling carousels (from API), Browse by dress style, testimonials, newsletter strip, footer.
- **Product page:** Single product (image, title, description, price, rating), breadcrumb, size/color/quantity, tabs (Details, Rating & Reviews, FAQs), “You might also like” grid.

Responsive layout: one column on small screens, 2–3 columns on desktop. Header uses a hamburger on mobile and full nav + search on larger screens.

## Run it

```bash
git clone https://github.com/robshandell/spacelogic-frontend-engineer-test.git
cd spacelogic-frontend-engineer-test
npm install
npm run dev
```

Then open **http://localhost:3000**.

Production build:

```bash
npm run build
npm run start
```

## Repo layout

- `src/app/` – Routes (home, `products/[id]`)
- `src/components/` – Header, Footer, Hero, ProductCard, carousels, etc.
- `src/lib/api.ts` – Fetch helpers for Fake Store API
- `src/types/product.ts` – Product types

Design reference: [Figma – Frontend test ToolKit](https://www.figma.com/design/JtBnVn0Rsi2DELoUkkbyHj/Frontend-test-ToolKit?node-id=0-1&t=DwjIyD93hWrKKlqF-1)
