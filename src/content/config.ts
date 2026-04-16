import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    category: z
      .enum(['klimatizace', 'uspory', 'svj', 'developeri', 'kancelare'])
      .default('klimatizace'),
    author: z.string().default('KlimaFlow tým'),
    coverImage: z.string().optional(),
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog };
