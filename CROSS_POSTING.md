# Cross-Posting Workflow Documentation

This document explains how to cross-post blog articles from your Astro site to DEV.to and Medium.

## Overview

Your Astro blog is the **source of truth** for all content. The workflow is:

1. Write and publish on your site (https://camarneiro.com)
2. Automatically publish to DEV.to via API
3. Manually import to Medium (API deprecated)

All published posts include canonical URLs pointing back to your site for SEO benefits.

## Setup

### 1. DEV.to API Key

Get your API key from DEV.to:
1. Go to https://dev.to/settings/extensions
2. Generate an API Key
3. Save it securely (you'll use it when publishing)

### 2. Blog Post Frontmatter

Every blog post should include these fields:

```yaml
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
publishedAt: 2024-01-01
updatedAt: 2024-01-15  # Optional
tags: ["javascript", "webdev", "tutorial"]  # Max 4 tags for DEV.to
draft: false  # Set to true for drafts
canonicalUrl: "https://camarneiro.com/blog/your-post-slug"

# Fill this in after cross-posting
crosspost:
  devTo:
    published: true
    id: 123456
    url: "https://dev.to/bcamarneiro/your-post-title"
  medium:
    published: true
    url: "https://medium.com/@bcamarneiro/your-post-title"
---
```

## Publishing Workflow

### Step 1: Write Your Post

Create a new markdown file in `src/content/blog/`:

```bash
# Create a new post
touch src/content/blog/my-awesome-post.md
```

Add frontmatter and content using Markdown/MDX.

### Step 2: Publish to Your Site

```bash
# Preview locally
npm run dev

# Commit and push to GitHub
git add .
git commit -m "feat: add new blog post"
git push origin master
```

GitHub Actions will automatically build and deploy your site.

### Step 3: Publish to DEV.to

Once your post is live on your site, publish to DEV.to:

```bash
DEVTO_API_KEY=your_api_key npm run publish:devto my-awesome-post
```

The script will:
- ✅ Read your markdown file
- ✅ Validate frontmatter
- ✅ Publish to DEV.to with canonical URL
- ✅ Output the DEV.to post ID and URL

**Update your frontmatter** with the returned information:

```yaml
crosspost:
  devTo:
    published: true
    id: 123456
    url: "https://dev.to/bcamarneiro/your-post-title"
```

### Step 4: Import to Medium

Medium no longer has a working API, so use their import tool:

1. Go to https://medium.com/p/import
2. Enter your post URL: `https://camarneiro.com/blog/my-awesome-post`
3. Click "Import"
4. Medium will preserve your canonical URL automatically

**Update your frontmatter** with the Medium URL:

```yaml
crosspost:
  medium:
    published: true
    url: "https://medium.com/@bcamarneiro/your-post-title"
```

### Step 5: Commit Cross-Post Metadata

```bash
git add src/content/blog/my-awesome-post.md
git commit -m "docs: add cross-post metadata"
git push
```

## RSS Feed

Your site automatically generates an RSS feed at:
- https://camarneiro.com/rss.xml

This feed can be used with automation tools like Zapier or IFTTT if you want to automate Medium imports in the future.

## Tips & Best Practices

### Content Considerations

1. **Canonical URLs**: Always set canonical URLs to your site to maintain SEO authority
2. **Tags**: DEV.to supports max 4 tags, Medium is unlimited
3. **Images**: Use absolute URLs for images (e.g., `https://camarneiro.com/images/...`)
4. **Code Blocks**: Both platforms support GitHub-flavored markdown

### SEO Strategy

Your site is the canonical source, so:
- Publish on your site first
- Wait for Google to index it
- Then cross-post with canonical URLs
- This maintains your domain authority

### Draft Management

- Use `draft: true` in frontmatter to keep posts unpublished
- The DEV.to script respects draft status
- Medium imports as drafts by default

### Updating Posts

**DEV.to**: Edit directly on DEV.to or use their API to update
**Medium**: Edit on Medium (they don't support programmatic updates)
**Your site**: Update the markdown file and push

Keep your site as the source of truth, and manually sync major updates.

## Troubleshooting

### DEV.to API Errors

**401 Unauthorized**: Check your API key
```bash
# Test your API key
curl -H "api-key: YOUR_KEY" https://dev.to/api/articles/me
```

**422 Unprocessable Entity**: Check frontmatter validation
- Title too long
- Invalid tags
- Missing required fields

### Medium Import Issues

**Import Fails**:
- Ensure post is publicly accessible
- Check for HTTPS (not HTTP)
- Verify no authentication required

**Canonical URL Not Set**:
- Medium auto-detects canonical from your HTML `<link rel="canonical">`
- Verify your Astro layout includes proper meta tags

### Build Errors

If you get TypeScript errors after adding crosspost fields:

```bash
# Restart dev server
npm run dev
```

The content schema is strictly typed - ensure your frontmatter matches the schema in `src/content/config.ts`.

## Scripts Reference

### Publish to DEV.to
```bash
DEVTO_API_KEY=your_key npm run publish:devto <slug>
```

### Check DEV.to Post Status
```bash
curl -H "api-key: YOUR_KEY" https://dev.to/api/articles/123456
```

## Future Enhancements

Potential improvements to this workflow:

1. **Update Script**: Script to update existing DEV.to posts
2. **Batch Publishing**: Publish multiple posts at once
3. **GitHub Actions**: Automate DEV.to publishing on push
4. **Analytics**: Track cross-post performance
5. **Medium Automation**: Use unofficial APIs or browser automation

## Resources

- [DEV.to API Docs](https://developers.forem.com/api)
- [Astro RSS Integration](https://docs.astro.build/en/guides/rss/)
- [Medium Import Tool](https://medium.com/p/import)
- [Canonical URLs for SEO](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

---

**Questions?** Open an issue or reach out at hello@camarneiro.com
