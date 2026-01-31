import { MetadataRoute } from 'next';

// Supported locales - keep in sync with i18n config
const locales = ['en', 'fr', 'es', 'it'] as const;
const defaultLocale = 'en';

// Base URL for the site
const baseUrl = 'https://wheelx.bike';

// Static pages with their change frequency and priority
const staticPages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/privacy', changeFrequency: 'monthly' as const, priority: 0.5 },
  { path: '/terms', changeFrequency: 'monthly' as const, priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  
  // Generate sitemap entries for all locales and pages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      // Build the URL with locale prefix
      const url = locale === defaultLocale 
        ? `${baseUrl}${page.path}`
        : `${baseUrl}/${locale}${page.path}`;

      // Build alternates for hreflang
      const alternates: { languages: Record<string, string> } = {
        languages: {},
      };

      for (const altLocale of locales) {
        const altUrl = altLocale === defaultLocale
          ? `${baseUrl}${page.path}`
          : `${baseUrl}/${altLocale}${page.path}`;
        alternates.languages[altLocale] = altUrl;
      }

      // Add x-default pointing to default locale
      alternates.languages['x-default'] = `${baseUrl}${page.path}`;

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates,
      });
    }
  }

  return sitemapEntries;
}
