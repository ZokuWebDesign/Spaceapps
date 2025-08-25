# Internationalization Implementation Guide

## Overview
This project now uses a translation system that eliminates the need to duplicate components for different languages. Instead of creating separate components for each language, we use a single set of components that dynamically load translations based on the current route.

## How it Works

### 1. Translation Files (`/translations/`)
- `pt.ts` - Portuguese translations
- `en.ts` - English translations  
- `es.ts` - Spanish translations
- `index.ts` - Exports all translations and types

### 2. Translation Hook (`/hooks/useTranslations.ts`)
The `useTranslations()` hook automatically detects the current language based on the URL path:
- `/` or `/page` → Portuguese (default)
- `/en-us/*` → English
- `/es-ar/*` → Spanish

### 3. Component Usage
Components now use the translation hook instead of hardcoded text:

```tsx
"use client";
import { useTranslations } from '@/hooks/useTranslations';

const MyComponent = () => {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.description}</p>
    </div>
  );
};
```

## Migration Process

### For Each Component:
1. Add `"use client";` directive (if not already present)
2. Import the translation hook: `import { useTranslations } from '@/hooks/useTranslations';`
3. Call the hook: `const t = useTranslations();`
4. Replace hardcoded text with translation keys: `{t.section.key}`
5. Add corresponding translations to all language files

### Adding New Translations
1. Add the key to `pt.ts` (Portuguese - base language)
2. Add the same key structure to `en.ts` and `es.ts`
3. Update the TypeScript types by ensuring the structure matches

## Benefits

✅ **No Component Duplication**: Single components work for all languages
✅ **Automatic Language Detection**: Based on URL path
✅ **Type Safety**: TypeScript ensures translation keys exist
✅ **Maintainable**: Changes to layout/styling only need to be made once
✅ **Scalable**: Easy to add new languages
✅ **SEO Friendly**: Each language has its own route

## File Structure
```
translations/
├── index.ts          # Main exports and types
├── pt.ts            # Portuguese translations
├── en.ts            # English translations
└── es.ts            # Spanish translations

hooks/
└── useTranslations.ts # Translation hook

components/sections/   # Components now use translations
├── Header.tsx        # Updated ✅
├── Hero.tsx          # Updated ✅
├── Footer.tsx        # Updated ✅
└── ...               # Need to be updated
```

## Next Steps

1. **Update Remaining Components**: Apply the same pattern to all components in `/components/sections/`
2. **Add Missing Translations**: Complete translation files with all text content
3. **Test All Languages**: Verify each route displays correct translations
4. **Optional Improvements**:
   - Add language switcher component
   - Implement right-to-left (RTL) support for Arabic/Hebrew
   - Add translation loading states
   - Implement pluralization rules

## Example Translation Structure
```typescript
export const pt = {
  header: {
    navigation: {
      home: "Início",
      about: "Sobre",
      services: "Serviços"
    }
  },
  hero: {
    title: "Título Principal",
    subtitle: "Subtítulo",
    cta: "Botão de Ação"
  },
  footer: {
    copyright: "Direitos reservados"
  }
};
```

This approach provides a clean, maintainable solution for internationalization without component duplication.
