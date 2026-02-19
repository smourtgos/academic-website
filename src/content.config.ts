import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.string()),
    publication: z.string(),
    abstract: z.string().optional(),
    summary: z.string().optional(),
    doi: z.string().optional(),
    pdfUrl: z.string().optional(),
    codeUrl: z.string().optional(),
    datasetUrl: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    subtitle: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    lastModified: z.coerce.date().optional(),
    image: z.string().optional(),
    imageCaption: z.string().optional(),
  }),
});

export const collections = { publications, posts };
