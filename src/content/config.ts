import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    // Cross-posting metadata
    canonicalUrl: z.string().url().optional(),
    crosspost: z.object({
      devTo: z.object({
        published: z.boolean().optional().default(false),
        id: z.number().optional(),
        url: z.string().url().optional(),
      }).optional(),
      medium: z.object({
        published: z.boolean().optional().default(false),
        url: z.string().url().optional(),
      }).optional(),
    }).optional(),
  }),
});

export const collections = { blog };
