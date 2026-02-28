# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Updated logo to "VENOM DLS" with gradient icon and stacked text
- [x] Updated hero background to hip-hop urban aesthetic (Unsplash concert photo, gold/amber tints, grain texture)
- [x] Redesigned logo to black signature style: black rounded emblem with SVG V-bolt mark, white wordmark with tight tracking
- [x] Added About section (src/components/sections/AboutSection.tsx) with company info, values cards, and contact email (venommacllinx@gmail.com); linked from Header nav and Footer
- [x] Added Privacy Policy page (/privacy) with music-platform-specific content (data collection, AI music ownership, DMCA, user rights)
- [x] Added Terms & Conditions page (/terms) with music platform terms (IP ownership, acceptable use, publishing, DMCA, subscriptions)
- [x] Updated Footer to link to /privacy and /terms in both Company nav and bottom bar
- [x] Added InspiredBySection (src/components/sections/InspiredBySection.tsx) featuring XXXTentacion as Venom's role model — includes portrait card, stats, full discography (17, ?, Skins, Bad Vibes Forever) with track listings, 12 notable singles grid, and legacy quote
- [x] Updated AboutSection to include XXXTentacion role model callout card (purple accent)
- [x] Added "#inspired-by" nav link ("X") to Header
- [x] Established Venom DLS as creator and owner of Venom; added www.venom.com references in AboutSection, Footer (brand area + copyright bar), layout metadata, and Terms page
- [x] Added Venomous Chat feature: ChatSection component on homepage with live users preview, dedicated /chat page with real-time chat rooms
- [x] Added Venom AI Assistant: Floating widget on all pages that helps users with music generation, publishing, chat, games, and web builder features

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/app/chat/page.tsx` | Venomous Chat page | ✅ Ready |
| `src/components/VenomAI.tsx` | AI Assistant widget | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

**Venom Music Platform** — fully built and deployed.

The app is a complete music platform landing page with 4 core feature sections.

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
