# spacelogic-frontend-engineer-test

My take on the SHOP.CO frontend test — landing page + product detail. Data from [Fake Store API](https://fakestoreapi.com/), layout from the Figma they gave us.

Live: https://robshandell-spacelogic-frontend-eng.vercel.app/

Next.js 14 (App Router), React, TypeScript, Tailwind.

---

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/robshandell/spacelogic-frontend-engineer-test.git
   cd spacelogic-frontend-engineer-test
   ```

2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
   App runs at http://localhost:3000.

3. Production build (optional):
   ```bash
   npm run build
   npm run start
   ```

---

Home has the hero, New Arrivals + Top Selling carousels, browse by dress style, testimonials, newsletter bit, footer. Product page is the single product (image, details, size/colour/quantity, tabs for Details / Reviews / FAQs) plus “You might also like”. Layout is responsive — 1 col on mobile, 2–3 on desktop.

Design ref: [Figma – Frontend test ToolKit](https://www.figma.com/design/JtBnVn0Rsi2DELoUkkbyHj/Frontend-test-ToolKit?node-id=0-1&t=DwjIyD93hWrKKlqF-1)
