# 🏙️ Jacquie Zarate Real Estate - Web

## Overview
A professional real estate website built with **Next.js (App Router)** focused on:

- Property Management (short-term rentals)
- Active Listings (resale)
- Pre-construction projects
- Investment advisory in Miami

The site is designed for **international investors and buyers**, with a clean, premium, Apple-inspired design focused on clarity, trust, and conversion.

---

## 🔧 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** Custom + next-intl (ES / EN / FR-CA)
- **Deploy:** Vercel
- **UI Pattern:** Reusable components + token-based design system

---

## 🌐 Core Features

- Multilanguage: Spanish / English / French (Canada)
- Listings system with individual property pages
- Property Management service page
- Pre-construction projects catalog
- WhatsApp + contact lead capture
- SEO-ready structure (metadata + OpenGraph)

---

## 📁 Project Structure

### Pages

| Route | Description |
|------|-------------|
| `/[locale]` | Home |
| `/[locale]/listings` | Active listings |
| `/[locale]/listings/[slug]` | Listing detail |
| `/[locale]/proyectos` | Pre-construction projects |
| `/[locale]/proyectos/[slug]` | Project detail |
| `/[locale]/property-management` | Property Management service |
| `/[locale]/sobre-mi` | About Jacquie |
| `/[locale]/contacto` | Contact page |

---

### Core Components

- `NavBar.tsx` — Navigation + language switch
- `Footer.tsx` — Contact + navigation

### Home Sections

- `SectionServices.tsx` — Main services overview
- `SectionListingsHome.tsx` — Featured listings
- `SectionPropertyManagementHome.tsx` — Management teaser
- `SectionAccommodationHome.tsx` — Rental assistance
- `SectionWhyPrecon.tsx` — Pre-construction bridge
- `SectionAboutJacquieHome.tsx` — Personal branding block

### Property Management Page

- `SectionPropertyManagementHome.tsx`
- `SectionPropertyManagementIncluded.tsx`
- `SectionPropertyManagementTrust.tsx`

### Listings

- `ProjectCard.tsx`
- `GalleryLightbox.tsx`
- Listing detail with:
  - gallery
  - specs
  - map
  - SEO schema

---

## 🎨 Brand System

### Palette

| Role | Hex |
|------|-----|
| Primary | #1F3A34 |
| Accent | #8FA79B |
| Surface | #F7F6F3 |
| Text | #2B2B2B |
| White | #FFFFFF |

### Guidelines

- Minimal, premium, editorial style
- Strong typography hierarchy
- Dark cards (primary) over light backgrounds
- Subtle motion (hover, elevation)
- No visual noise or clutter

---

## 🧠 Product Strategy

### Core positioning

Jacquie is not just a realtor.

She is positioned as:

> "Your trusted person in Miami"

Key pillars:

- Personalized service
- End-to-end follow-up
- Short-term rental expertise
- International client focus

---

## 🧱 Content Architecture

### Home

1. Hero
2. Services (4 entry points)
3. Listings
4. Property Management
5. Accommodation
6. Pre-construction
7. About
8. CTA

---

### Property Management

Focus on:

- Airbnb / short-term rental
- Guest selection
- Personalized check-in
- Property care
- Full management

---

### About Page

Focus on:

- Personal brand
- Trust
- Miami expertise
- International clients
- Personalized approach

---

## 🌍 i18n Strategy

- `/es` → Spanish (default)
- `/en` → English
- `/fr` → French (Canada)

Translation approach:

- Inline conditional logic (no heavy abstraction)
- Consistent structure across pages
- Future-ready for scaling

---

## ⚙️ Development Notes

- All colors controlled via tokens (`primary`, `accent`, etc.)
- Easy palette swap without refactor
- Components built for reuse and scalability
- No unnecessary abstraction

---

## 🚀 Roadmap (next steps)

- Improve listings filtering UX
- Add CRM integration
- Add analytics / tracking
- Refine SEO per page
- Add testimonials section

---

## 👨‍💻 Author

Rodrigo Opalo

- devrodri.com
- Product Owner / Creative Director

---

## 📬 Contact

Jacquie Zarate

📍 Miami, FL  
📧 jacqueline@miamiliferealty.com  
📱 +1 786 407 2591

---
