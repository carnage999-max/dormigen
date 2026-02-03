# Dormigen® — EBV Suppression System

A premium one-page marketing site for Dormigen®, built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Drei (Three.js)
- **Icons**: Lucide React
- **Contact Form**: Resend API
- **Language**: TypeScript

## Key Features
- **Premium Medical Aesthetic**: Deep violet and navy palette with medical blue accents.
- **Motion System**: High-end scroll reveals and smooth spring transitions.
- **3D Background**: Interactive particle and helix visuals in the hero section.
- **Diagonal Layout**: Custom diagonal section dividers using CSS clip-paths.
- **iOS-style Design**: Glassmorphism, backdrop blurs, and soft-bordered cards.
- **Functional Components**:
  - Sticky glass navbar with mobile spring dropdown.
  - Interactive "Buy Now" modal with bundle selection.
  - Product breakdown with medical-grade UI.
  - Responsive contact form with Resend integration.
  - Accessible FAQ accordion.

## Setup Instructions

1. **Clone the repository** (if applicable) or enter the project directory.

2. **Install dependencies**:
   ```bash
   pnpm install
   ```
   *(If you don't have pnpm, use `npm install` or `yarn`)*

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Resend API key:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Open the site**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the site.

## Design Alignment
- **Colors**: Sourced from the Dormigen brand guide (Primary Deep Violet #303063, Navy #080C20, Medical Blue #4698DA).
- **Typography**: Inter for body text and Manrope for display headings.
- **Assets**: Logo and product imagery integrated from the provided high-resolution assets.

---
© 2024 Dormigen®. Educational content only. Not medical advice.
