# RG LOOM Cash-on-Delivery Funnel

## Stack and order flow

Next.js App Router, Tailwind CSS, Google Sheets API, and Nodemailer SMTP. The customer selects an item and quantity on `/`, then `/checkout` calculates delivery (free inside Kathmandu Valley; NPR 100 outside). The form posts to `/api/order`; the server validates it, creates an ID, appends it to Google Sheets, sends the business email and customer confirmation, then returns success so the browser moves to `/thank-you`.

## Local setup and testing

1. Copy `.env.example` to `.env.local` and fill every value. For Gmail, create an App Password (not your normal Gmail password), then use it as `SMTP_PASS`.
2. Run `npm install`, then `npm run dev`.
3. Submit a real test order. Confirm a new row appears in Sheets and both emails arrive; only then will the app redirect to the thank-you page.

## Google Sheet setup

1. Create a Google Sheet and name its tab exactly as `GOOGLE_SHEET_TAB_NAME` (for example `Sheet 1`).
2. Add this header row: `Order ID`, `Date & Time`, `Customer Name`, `Phone Number`, `Email Address`, `Exact Location`, `Product Name`, `Quantity`, `Price Per Piece`, `Total Price`, `Payment Method`, `Order Status`, `Notes`.
3. Get the Sheet ID from the URL: it is the text between `/d/` and `/edit`.
4. In Google Cloud, enable Google Sheets API, create a service account and JSON key, then copy its `client_email` and `private_key` into `.env.local`. Keep escaped `\\n` in the private key.
5. Share the Google Sheet with the service account email as Editor.
6. In Sheets, select the Order Status column → Data → Data validation → Dropdown, then add: `New Order`, `Order Confirmed`, `Order Ongoing`, `Delivered`, `Cancelled`. Use Data → Create a filter to filter and sort orders.

## Vercel deployment

Push the project to GitHub, import it in Vercel, and add the same environment variables under Project Settings → Environment Variables. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to your production URL. Deploy, then submit one live test order.

## Notes

The product images have been converted and optimized as PNGs in `public/products`. All credentials are server-only and never sent to the browser.
