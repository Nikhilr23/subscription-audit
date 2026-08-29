# Subscription Audit
A privacy-friendly manual subscription audit that groups recurring tools by category and flags possible functional overlap.

**Live after Pages activation:** `https://nikhilr23.github.io/subscription-audit/`

## How it works
Add subscription name, monthly cost and category. The tool totals monthly/annual spend and flags categories containing 2+ subscriptions. A small local lookup suggests categories for several common tools.

`potential overlap` is an illustrative amount calculated by summing all but the highest-cost subscription in each duplicated category. It is **not guaranteed savings** and does not mean the tools are interchangeable.

## Tech
HTML · CSS · JavaScript. No Plaid, login, backend or financial-account access.

## V2
Larger local lookup, CSV import/export, annual billing normalization, usage-frequency input and localStorage persistence.