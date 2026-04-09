# Design Brief: PropListify

## Tone
Refined minimalism with warm accents. Professional, premium real estate brand — trustworthy yet approachable. Not corporate-sterile, not playful.

## Differentiation
Elevated property cards with layered depth and subtle colored accents. Warm gradient accents on hero images and CTAs. Intentional structural zone hierarchy.

## Palette

| Token | OKLCH | Use |
|-------|-------|-----|
| Primary (Warm Slate) | `0.48 0.04 250` | Headers, badges, text hierarchy |
| Accent (Amber-Gold) | `0.65 0.12 60` | CTAs, property highlights, energy |
| Secondary (Muted Gold) | `0.92 0.02 60` | Background tints, soft accents |
| Muted (Stone) | `0.88 0.01 0` | Dividers, disabled states |
| Background (Soft White) | `0.99 0.01 280` | Page backgrounds, card backgrounds |
| Foreground (Deep Slate) | `0.18 0.02 250` | Body text, primary copy |
| Destructive (Red) | `0.55 0.22 25` | Error states, remove actions |

## Typography
- **Display**: Lora (serif, editorial, premium credibility)
- **Body**: Plus Jakarta Sans (humanist sans, warm, modern, readable)
- **Mono**: JetBrains Mono (property IDs, code blocks)
- **Scale**: 12/14/16/18/20/24/32/40/48px

## Shape & Spacing
- Border radius: `12px` (professional, approachable)
- Spacing scale: `4/8/12/16/24/32/48px` (4px base)
- Grid: 12-column, mobile-first breakpoints at 640px / 1024px / 1280px

## Structural Zones
| Zone | Background | Border | Depth |
|------|-----------|--------|-------|
| Header/Nav | `bg-card` | `border-b border-border` | Elevated with shadow-card |
| Hero | `bg-background` with `gradient-accent` overlay | None | Flat |
| Content Sections | `bg-background` | None | Flat |
| Property Cards | `bg-card` | `border border-border` | Elevated with shadow-elevated |
| Sidebar (Admin) | `bg-sidebar` | `border-r border-sidebar-border` | Elevated |
| Footer | `bg-muted/20` | `border-t border-border` | Subtle |
| Lead Forms | `bg-popover` | `border border-border` | Elevated with shadow-card |

## Component Patterns
- **Property Cards**: Image + title + price badge (accent) + amenity icons + "View Details" CTA (cta-primary)
- **Property Type Tabs**: Underline-active style with accent underline, text foreground on inactive
- **Star Ratings**: Accent color fill, muted for empty stars
- **Lead Forms**: Card layout with accent accent input border-focus, cta-primary submit button
- **Admin Sidebar**: Dark-themed (sidebar tokens), accent highlight for active nav
- **Featured Carousel**: Auto-play, swipe-enabled, gradient overlay on hero images

## Motion & Animation
- Page transitions: `fade-in` 200ms
- Hover states: `opacity-90` on interactive elements, `transition-smooth`
- Card hover: slight scale-up (`scale-102`) with elevated shadow
- CTA buttons: opacity change on hover, no bounce

## Constraints
- No gradients on text (legibility first)
- Shadows are subtle and warm-tinted, not pure black
- Accent color used sparingly — only on CTAs, badges, and highlights
- No animations on scroll (performance priority)
- Mobile-first responsive: all layouts start mobile, scale up

## Signature Detail
Warm gradient accents layered behind property images and CTA buttons create a distinctive, approachable luxury feel unique to PropListify.
