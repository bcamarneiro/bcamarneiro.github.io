import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const now = new Date();
  const blog = await getCollection('blog', ({ data }) => !data.draft && new Date(data.publishedAt) <= now);

  return rss({
    title: 'Bruno Camarneiro | Blog',
    description: 'Thoughts on software engineering, architecture, and building great products.',
    site: context.site || 'https://camarneiro.com',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
