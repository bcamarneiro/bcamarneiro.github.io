#!/usr/bin/env node
/**
 * Tailored CV PDF Generator
 *
 * Converts a tailored markdown CV to a professionally styled PDF.
 * Uses the same styling as the main CV PDF for consistency.
 *
 * Workflow:
 *   1. Export CV to markdown:  npm run cv:markdown > tailored-cv.md
 *   2. Edit with LLM or manually to tailor for specific job
 *   3. Generate PDF:           npm run cv:pdf:tailored tailored-cv.md
 *
 * Usage:
 *   npm run cv:pdf:tailored <markdown-file> [output-file]
 *
 * Examples:
 *   npm run cv:pdf:tailored tailored-cv.md
 *   npm run cv:pdf:tailored tailored-cv.md my-cv-for-company.pdf
 */

import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color palette matching the main CV
const COLORS = {
  ink: '#1A1A1A',
  graphite: '#4B4B4B',
  copper: '#B36B47',
  beige: '#F4EFE6',
  border: '#E5E5E5',
};

/**
 * Find Chrome/Chromium executable path
 */
function findChromePath(): string {
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH;
  }

  const platform = process.platform;

  const paths: Record<string, string[]> = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
    ],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ],
  };

  const platformPaths = paths[platform] || [];

  for (const chromePath of platformPaths) {
    if (chromePath && fs.existsSync(chromePath)) {
      return chromePath;
    }
  }

  if (platform !== 'win32') {
    try {
      const result = execSync('which google-chrome || which chromium', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
      if (result) return result;
    } catch {
      // Ignore
    }
  }

  throw new Error('Chrome not found. Set CHROME_PATH environment variable.');
}

/**
 * Convert markdown to styled HTML - compact for 2-page CV
 */
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Escape HTML
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Headers - consistent compact sizes
  html = html.replace(/^# (.+)$/gm, `<h1>$1</h1>`);
  html = html.replace(/^## (.+)$/gm, `<h2>$1</h2>`);
  html = html.replace(/^### (.+)$/gm, `<h3>$1</h3>`);

  // Bold labels (like **Skills:**) - copper color for category names
  html = html.replace(/\*\*([^*]+):\*\*/g, `<strong class="label">$1:</strong>`);
  // Other bold text
  html = html.replace(/\*\*([^*]+)\*\*/g, `<strong>$1</strong>`);
  // Italic (dates, locations)
  html = html.replace(/\*([^*]+)\*/g, `<em>$1</em>`);

  // Lists
  html = html.replace(/^- (.+)$/gm, `<li>$1</li>`);

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, (match) => {
    return `<ul>${match}</ul>`;
  });

  // Process paragraphs (lines that aren't already HTML)
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return line;
    return `<p>${trimmed}</p>`;
  });
  html = processedLines.join('\n');

  // Clean up empty lines
  html = html.replace(/\n{3,}/g, '\n\n');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      color: ${COLORS.graphite};
      font-size: 9pt;
      line-height: 1.4;
    }

    h1 {
      color: ${COLORS.ink};
      font-size: 18pt;
      font-weight: 600;
      margin-bottom: 2pt;
    }

    h1 + p {
      font-size: 11pt;
      color: ${COLORS.graphite};
      margin-bottom: 8pt;
    }

    h2 {
      color: ${COLORS.ink};
      font-size: 10pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
      margin-top: 14pt;
      margin-bottom: 6pt;
      padding-bottom: 3pt;
      border-bottom: 1px solid ${COLORS.border};
    }

    h3 {
      color: ${COLORS.ink};
      font-size: 9.5pt;
      font-weight: 600;
      margin-top: 10pt;
      margin-bottom: 2pt;
    }

    /* First h3 after h2 doesn't need extra top margin */
    h2 + h3 {
      margin-top: 0;
    }

    p {
      margin-bottom: 4pt;
    }

    /* Add spacing after experience/education blocks */
    h3 + em + p {
      margin-bottom: 6pt;
    }

    em {
      font-size: 8pt;
      color: ${COLORS.graphite};
      display: block;
      margin-bottom: 4pt;
    }

    strong {
      font-weight: 600;
      color: ${COLORS.ink};
    }

    strong.label {
      color: ${COLORS.copper};
      font-size: 8.5pt;
    }

    ul {
      list-style-type: disc;
      margin: 3pt 0 8pt 0;
      padding-left: 14pt;
    }

    li {
      margin-bottom: 2pt;
    }

    /* Skills section - tighter spacing */
    h2 + p > strong.label {
      display: inline;
    }
  </style>
</head>
<body>
${html}
</body>
</html>
`;
}

async function generatePDF(inputPath: string, outputPath: string) {
  console.log('📄 Generating tailored CV PDF...');
  console.log(`   Input: ${inputPath}`);

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  let markdown = fs.readFileSync(inputPath, 'utf-8');

  // Strip npm output lines that may appear when using `npm run cv:markdown > file.md`
  // These lines look like: "> package-name@version script-name" and "> command"
  markdown = markdown.replace(/^>\s+\S+@[\d.]+\s+\S+\n/gm, '');
  markdown = markdown.replace(/^>\s+tsx\s+\S+\n/gm, '');
  markdown = markdown.replace(/^\n+/, ''); // Remove leading empty lines

  const html = markdownToHtml(markdown);

  const chromePath = findChromePath();
  console.log(`   Using Chrome: ${chromePath}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts
    await page.evaluateHandle('document.fonts.ready');

    await page.pdf({
      path: outputPath,
      format: 'Letter',
      margin: {
        top: '0.3in',
        right: '0.4in',
        bottom: '0.3in',
        left: '0.4in',
      },
      printBackground: true,
      displayHeaderFooter: false,
      scale: 0.9,
    });

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);

    console.log('✅ PDF generated successfully!');
    console.log(`   Output: ${outputPath}`);
    console.log(`   Size: ${sizeKB} KB`);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Tailored CV PDF Generator

Usage:
  npm run cv:pdf:tailored <markdown-file> [output-file]

Workflow:
  1. Export your CV to markdown:
     npm run cv:markdown > tailored-cv.md

  2. Edit the markdown file to tailor it for a specific job
     (use an LLM or edit manually)

  3. Generate the PDF:
     npm run cv:pdf:tailored tailored-cv.md

Examples:
  npm run cv:pdf:tailored tailored-cv.md
  npm run cv:pdf:tailored tailored-cv.md my-cv-for-google.pdf
    `);
    process.exit(0);
  }

  const inputPath = path.resolve(args[0]);
  const outputPath = args[1]
    ? path.resolve(args[1])
    : inputPath.replace(/\.md$/, '.pdf');

  generatePDF(inputPath, outputPath);
}

main();
