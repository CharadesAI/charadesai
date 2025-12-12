# Charades AI Lab - Copilot Instructions

## Project Overview

Marketing/landing site for **CharadesAI** - a real-time lip-reading and gesture recognition API platform. Built with Vite + React + TypeScript + shadcn/ui + Tailwind CSS.

## Architecture

### Tech Stack

- **Build**: Vite with SWC (React plugin), port 8080
- **UI**: shadcn/ui components (Radix primitives), Tailwind CSS with CSS variables
- **Routing**: React Router DOM (file-based pages in `src/pages/`)
- **State**: TanStack Query for server state, React hooks for local state
- **Theming**: `next-themes` via custom `ThemeProvider`, default dark mode

### Directory Structure

```
src/
├── components/       # Feature components (HeroSection, Navbar, etc.)
│   └── ui/           # shadcn/ui primitives (DO NOT edit directly)
├── pages/            # Route components (Index, Features, Pricing, etc.)
├── hooks/            # Custom hooks (use-mobile, use-toast)
├── lib/utils.ts      # cn() utility for Tailwind class merging
└── assets/           # Static assets (images)
```

### Key Files

- `src/App.tsx` - Route definitions and global providers (QueryClient, ThemeProvider, TooltipProvider)
- `src/index.css` - CSS variables for theming (light/dark), custom utilities
- `tailwind.config.ts` - Extended theme with neon colors, custom animations
- `components.json` - shadcn/ui configuration with `@/` path aliases

## Patterns & Conventions

### Component Structure

```tsx
// Feature components use named exports
export function HeroSection() { ... }

// Page components use default exports
const Index = () => { ... };
export default Index;
```

### Styling Approach

- Use `cn()` from `@/lib/utils` for conditional classes
- CSS variables in HSL format: `hsl(var(--primary))`
- Custom neon colors: `text-neon-cyan`, `bg-neon-violet`, etc.
- Glass morphism: `glass` or `glass-strong` utility classes
- Gradients: `text-gradient`, `bg-gradient-ai`, `bg-gradient-hero`

### Button Variants

Custom variants beyond shadcn defaults (see `src/components/ui/button.tsx`):

- `hero` - Gradient background with glow effect
- `heroOutline` - Bordered variant for secondary CTAs
- `glow` - Hover glow effect
- `neon` - Cyan neon border style

### Animation Classes

Pre-defined in Tailwind config:

- `animate-fade-in`, `animate-slide-up`, `animate-slide-down`
- `animate-scale-up`, `animate-shimmer`
- `animate-pulse-ring`, `animate-orbit`
- Use `[animation-delay:0.1s]` for staggered animations

## Development Commands

```bash
npm run dev       # Start dev server (localhost:8080)
npm run build     # Production build
npm run lint      # ESLint check
npm run preview   # Preview production build
```

## Backend Integration

API documented in `BackendAPI.md`. Key points:

- Base URL: `https://api.charadesai.com`
- Auth: Sanctum tokens via Bearer header
- **Password hashing**: Frontend must SHA-256 hash passwords before sending
- OAuth flows for Google/GitHub available

## Adding shadcn Components

```bash
npx shadcn@latest add [component-name]
```

Components install to `src/components/ui/`. Configuration in `components.json` uses:

- Style: default
- Base color: slate
- CSS variables: enabled

## Important Notes

- Theme storage key: `CharadesAI-theme`
- Default theme: dark
- Do NOT modify files in `src/components/ui/` directly - use variants or wrapper components
- Always use shadcn components for UI consistency
