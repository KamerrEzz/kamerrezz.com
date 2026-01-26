# AGENTS.md - Development Guidelines for kamerrezz.com

This file contains essential guidelines for agentic coding agents working on this Astro + Tailwind CSS project.

## Build and Development Commands

### Core Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the production site (outputs to `dist/`)
- `npm run preview` - Preview the built production site locally
- `npm run astro` - Run Astro CLI commands directly

### Type Checking
- TypeScript is configured with strict mode (`astro/tsconfigs/strict`)
- Run type checking before commits: `npx astro check`

## Tech Stack and Architecture

### Framework
- **Astro 5.16+** - Static site generator with island architecture
- **TypeScript** - Strict TypeScript configuration enabled
- **Tailwind CSS 4.x** - Utility-first CSS framework via Vite plugin

### Key Integrations
- `@astrojs/mdx` - MDX support for rich content
- `@astrojs/sitemap` - Automatic sitemap generation
- `@astrojs/rss` - RSS feed generation
- `@astrojs/check` - TypeScript integration

## Project Structure

```
src/
├── components/        # Reusable Astro components
├── layouts/          # Page layout templates
├── pages/            # File-based routing
│   ├── blog/        # Blog post routes
│   └── projects/    # Project routes
├── content/         # Content collections
│   ├── blog/       # Blog posts (.md/.mdx)
│   └── projects/    # Project files (.md/.mdx)
└── styles/          # Global CSS files
```

## Code Style Guidelines

### Import Conventions
```typescript
// Astro imports first
import BaseHead from '../components/BaseHead.astro';
import { getCollection } from 'astro:content';

// External packages second
import type { CollectionEntry } from 'astro:content';

// Local imports third
import { SITE_TITLE } from '../consts';
```

### Component Structure
```astro
---
// Frontmatter script - imports and data fetching
import Component from './Component.astro';
const data = await getCollection('blog');
---

<!-- HTML template -->
<div>
  <Component prop={value} />
</div>

<style>
  /* Scoped CSS - always at the bottom */
  .class {
    property: value;
  }
</style>
```

### TypeScript Patterns
- Use strict TypeScript with proper typing
- Leverage Zod schemas for content collection validation
- Define types for props and data structures

### Naming Conventions
- **Components**: PascalCase (`Header.astro`, `BlogPost.astro`)
- **Files**: kebab-case for assets, PascalCase for components
- **Variables**: camelCase (`const blogPosts = ...`)
- **CSS Classes**: kebab-case (`hero-section`, `project-card`)

### Tailwind CSS Guidelines
- **NEVER** use `@apply` directive
- Use utility classes extensively in templates
- Implement responsive design with breakpoints (`sm:`, `md:`, `lg:`)
- Leverage color palette and spacing scale for consistency
- Custom CSS only for complex animations or special cases

### Content Collections
- Blog posts: `src/content/blog/*.md` or `*.mdx`
- Projects: `src/content/projects/*.md` or `*.mdx`
- Use Zod schemas defined in `src/content.config.ts`
- Required fields: title, description, pubDate (blog), type (projects)

### Component Props
```astro
---
// Define interface for props
interface Props {
  title: string;
  description?: string;
  featured?: boolean;
}

const { title, description = '', featured = false } = Astro.props;
---
```

### Styling Patterns
- Use scoped `<style>` tags in Astro components
- CSS custom properties for theme consistency
- Mobile-first responsive design
- Semantic HTML structure

### Performance Guidelines
- Prioritize static generation
- Use client:* directives minimally:
  - `client:load` for immediately needed interactivity
  - `client:idle` for non-critical features  
  - `client:visible` for components that hydrate when visible
- Optimize images with proper sizing and formats
- Minimize JavaScript bundle size

### SEO and Meta Tags
- Include proper meta tags in `BaseHead` component
- Use semantic HTML5 elements
- Add `alt` attributes to all images
- Implement proper heading hierarchy
- Use `rel="noopener noreferrer"` for external links

### Error Handling
- Use TypeScript for compile-time error prevention
- Implement proper try-catch for async operations
- Handle missing data gracefully with fallbacks
- Validate content collection data with Zod schemas

### File Organization
- Keep components focused and single-purpose
- Use clear, descriptive file names
- Group related functionality
- Maintain logical directory structure

### Code Quality
- Use descriptive variable and function names
- Keep functions small and focused
- Add comments only for complex logic
- Follow Astro's style guide conventions

## Testing Notes
- No test framework currently configured
- Manual testing recommended during development
- Use `npm run build` to verify production builds
- Test responsive design at different viewport sizes
- Validate content collection schemas with `astro check`

## Deployment Considerations
- Build outputs to `dist/` directory
- Static site compatible with most hosting platforms
- Environment variables handled through Astro's built-in system
- Ensure `astro.config.mjs` site URL matches deployment domain