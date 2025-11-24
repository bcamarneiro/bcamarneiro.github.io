#!/usr/bin/env node
/**
 * DEV.to Cross-Posting Script
 *
 * This script publishes blog posts to DEV.to using their API.
 *
 * Usage:
 *   npm run publish:devto <post-slug>
 *
 * Environment variables:
 *   DEVTO_API_KEY - Your DEV.to API key (get from https://dev.to/settings/extensions)
 *
 * Example:
 *   DEVTO_API_KEY=your_key npm run publish:devto hello-world
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEVTO_API_KEY = process.env.DEVTO_API_KEY;
const DEVTO_API_URL = 'https://dev.to/api/articles';
const SITE_URL = 'https://camarneiro.com';

interface DevToArticle {
  title: string;
  body_markdown: string;
  published: boolean;
  tags?: string[];
  canonical_url?: string;
  series?: string;
  main_image?: string;
  description?: string;
}

interface DevToResponse {
  id: number;
  url: string;
  title: string;
  published: boolean;
}

async function publishToDevTo(slug: string) {
  if (!DEVTO_API_KEY) {
    console.error('❌ Error: DEVTO_API_KEY environment variable is required');
    console.log('Get your API key from https://dev.to/settings/extensions');
    process.exit(1);
  }

  // Read the blog post
  const postPath = path.join(__dirname, '..', 'src', 'content', 'blog', `${slug}.md`);

  if (!fs.existsSync(postPath)) {
    console.error(`❌ Error: Post not found at ${postPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(postPath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  // Check if already published
  if (frontmatter.crosspost?.devTo?.published) {
    console.log('⚠️  This post is already published to DEV.to');
    console.log(`   URL: ${frontmatter.crosspost.devTo.url}`);
    console.log('   To update, use the update command instead.');
    return;
  }

  // Prepare the article for DEV.to
  const canonicalUrl = frontmatter.canonicalUrl || `${SITE_URL}/blog/${slug}`;

  const article: DevToArticle = {
    title: frontmatter.title,
    body_markdown: content,
    published: !frontmatter.draft,
    tags: frontmatter.tags?.slice(0, 4), // DEV.to allows max 4 tags
    canonical_url: canonicalUrl,
    description: frontmatter.description,
  };

  console.log(`📝 Publishing "${frontmatter.title}" to DEV.to...`);
  console.log(`   Canonical URL: ${canonicalUrl}`);
  console.log(`   Tags: ${article.tags?.join(', ') || 'none'}`);
  console.log(`   Status: ${article.published ? 'Published' : 'Draft'}`);

  try {
    const response = await fetch(DEVTO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': DEVTO_API_KEY,
      },
      body: JSON.stringify({ article }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`DEV.to API error: ${JSON.stringify(error, null, 2)}`);
    }

    const result: DevToResponse = await response.json();

    console.log('✅ Successfully published to DEV.to!');
    console.log(`   ID: ${result.id}`);
    console.log(`   URL: ${result.url}`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Update your blog post frontmatter with:');
    console.log('');
    console.log('crosspost:');
    console.log('  devTo:');
    console.log('    published: true');
    console.log(`    id: ${result.id}`);
    console.log(`    url: ${result.url}`);
    console.log('');
    console.log('2. For Medium, manually import from:');
    console.log(`   ${canonicalUrl}`);
    console.log('   Go to: https://medium.com/p/import');

  } catch (error) {
    console.error('❌ Error publishing to DEV.to:', error);
    process.exit(1);
  }
}

// Main
const slug = process.argv[2];

if (!slug) {
  console.error('Usage: npm run publish:devto <post-slug>');
  console.error('Example: npm run publish:devto hello-world');
  process.exit(1);
}

publishToDevTo(slug);
