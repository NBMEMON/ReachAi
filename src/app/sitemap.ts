import type { MetadataRoute } from 'next';

const BASE_URL = 'https://reachai.app';

const staticRoutes: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',          priority: 1.0,  changeFreq: 'weekly'  },
  { path: '/pricing',  priority: 0.9,  changeFreq: 'monthly' },
  { path: '/blog',     priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/about',    priority: 0.7,  changeFreq: 'monthly' },
  { path: '/contact',  priority: 0.6,  changeFreq: 'monthly' },
  { path: '/changelog',priority: 0.5,  changeFreq: 'weekly'  },
  { path: '/docs',     priority: 0.7,  changeFreq: 'monthly' },
  { path: '/help',     priority: 0.6,  changeFreq: 'monthly' },
  { path: '/privacy',  priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/terms',    priority: 0.3,  changeFreq: 'yearly'  },
];

const blogSlugs = [
  'cold-email-subject-lines',
  'cold-email-personalization-guide',
  'cold-email-vs-linkedin-outreach',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFreq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
