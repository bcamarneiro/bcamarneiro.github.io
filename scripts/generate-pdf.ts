#!/usr/bin/env node
/**
 * CV PDF Generator
 *
 * Generates a PDF version of the CV page using Puppeteer.
 * Runs after Astro build to capture the fully rendered page.
 *
 * Usage:
 *   npm run generate:pdf
 *
 * Output:
 *   dist/cv.pdf
 */

import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const CV_HTML_PATH = path.join(DIST_DIR, 'cv', 'index.html');
const OUTPUT_PDF_PATH = path.join(DIST_DIR, 'cv.pdf');

/**
 * Find Chrome/Chromium executable path
 */
function findChromePath(): string {
  // Check environment variable first (for CI)
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH;
  }

  const platform = process.platform;

  // Common Chrome paths by platform
  const paths: Record<string, string[]> = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium',
    ],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    ],
  };

  const platformPaths = paths[platform] || [];

  for (const chromePath of platformPaths) {
    if (chromePath && fs.existsSync(chromePath)) {
      return chromePath;
    }
  }

  // Try to find via 'which' command on Unix
  if (platform !== 'win32') {
    try {
      const result = execSync('which google-chrome || which chromium || which chromium-browser', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
      if (result) return result;
    } catch {
      // Ignore errors
    }
  }

  throw new Error(
    'Chrome/Chromium not found. Please install Chrome or set CHROME_PATH environment variable.'
  );
}

async function generatePDF() {
  console.log('📄 Generating CV PDF...');

  // Verify the CV HTML exists
  if (!fs.existsSync(CV_HTML_PATH)) {
    console.error('❌ Error: CV HTML not found. Run "npm run build" first.');
    console.error(`   Expected: ${CV_HTML_PATH}`);
    process.exit(1);
  }

  const chromePath = findChromePath();
  console.log(`   Using Chrome: ${chromePath}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
      '--disable-gpu',
    ],
  });

  try {
    const page = await browser.newPage();

    // Load the local HTML file
    const fileUrl = `file://${CV_HTML_PATH}`;
    console.log(`   Loading: ${fileUrl}`);

    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Emulate print media AFTER page load to trigger @media print CSS rules
    await page.emulateMediaType('print');

    // Force apply PDF-optimized styles via JavaScript
    await page.evaluate(() => {
      // === COLOR PALETTE (from tailwind.config.mjs) ===
      const COLORS = {
        ink: '#1A1A1A',       // Primary text, headings
        graphite: '#4B4B4B',  // Secondary text, body
        copper: '#B36B47',    // Accent color, highlights
        beige: '#F4EFE6',     // Background
        border: '#E5E5E5',    // Subtle borders
      };

      // Force hide elements that should be hidden in print
      const hideSelectors = [
        'body > header',
        'body > footer',
        'header nav',
        'footer',
        'nav',
        'a[download]',
        '.container-narrow > div:last-child', // download/print buttons
        '.container-narrow > section:nth-of-type(2)', // Key Achievements
      ];

      hideSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });

      // Hide older experience entries (keep only 6)
      document.querySelectorAll('.container-narrow > section:nth-of-type(3) article:nth-of-type(n+7)').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // Force SVG icon sizes
      document.querySelectorAll('svg').forEach(el => {
        el.style.width = '0.75rem';
        el.style.height = '0.75rem';
        el.style.minWidth = '0.75rem';
        el.style.minHeight = '0.75rem';
      });

      // === HEADER IMPROVEMENTS ===
      // Make header more compact and inline
      const header = document.querySelector('.container-narrow > header') as HTMLElement;
      if (header) {
        header.style.marginBottom = '0.75rem';
        header.style.paddingBottom = '0.5rem';
      }

      // Compact the name
      const h1 = header?.querySelector('h1') as HTMLElement;
      if (h1) {
        h1.style.fontSize = '1.75rem';
        h1.style.marginBottom = '0.25rem';
      }

      // Compact the title
      const title = header?.querySelector('p.text-xl, p.text-2xl') as HTMLElement;
      if (title) {
        title.style.fontSize = '1rem';
        title.style.marginBottom = '0.5rem';
      }

      // Make contact info more compact - inline style
      const contactRow = header?.querySelector('.flex.flex-wrap.gap-4') as HTMLElement;
      if (contactRow) {
        contactRow.style.gap = '0.75rem';
        contactRow.style.fontSize = '0.8rem';

        // Fix icon alignment in each contact item
        contactRow.querySelectorAll('.flex.items-center').forEach(item => {
          const el = item as HTMLElement;
          el.style.display = 'inline-flex';
          el.style.alignItems = 'center';
          el.style.gap = '0.25rem';

          // Ensure SVG icons are properly sized and aligned
          const svg = el.querySelector('svg') as SVGElement;
          if (svg) {
            svg.style.width = '0.85rem';
            svg.style.height = '0.85rem';
            svg.style.minWidth = '0.85rem';
            svg.style.minHeight = '0.85rem';
            svg.style.flexShrink = '0';
            svg.style.verticalAlign = 'middle';
          }
        });
      }

      // === HIDE DURATION (recruiters can do the math) ===
      document.querySelectorAll('.text-xs').forEach(el => {
        // Hide the duration line (e.g., "2 years, 3 months")
        if ((el as HTMLElement).textContent?.includes('month') || (el as HTMLElement).textContent?.includes('year')) {
          (el as HTMLElement).style.display = 'none';
        }
      });

      // === SKILLS SECTION - Condensed with merged categories ===
      const skillsSection = document.querySelector('.container-narrow > section:nth-of-type(4)') as HTMLElement;
      if (skillsSection) {
        // Get all skill categories
        const skillGroups = skillsSection.querySelector('.space-y-6') as HTMLElement;
        if (skillGroups) {
          // Extract skills by category
          const categories: { name: string; skills: string[] }[] = [];
          skillGroups.querySelectorAll(':scope > div').forEach(div => {
            const h3 = div.querySelector('h3');
            const categoryName = h3?.textContent || '';
            const skills: string[] = [];
            div.querySelectorAll('span').forEach(span => {
              if (span.textContent) skills.push(span.textContent.trim());
            });
            categories.push({ name: categoryName, skills });
          });

          // Merge related categories
          const mergedCategories: { name: string; skills: string[] }[] = [];

          // Frontend + State Management + Architecture
          const frontendSkills = categories
            .filter(c => ['Frontend Engineering', 'State Management & Data', 'Architecture & Performance'].includes(c.name))
            .flatMap(c => c.skills);
          if (frontendSkills.length) mergedCategories.push({ name: 'Frontend', skills: frontendSkills });

          // Testing
          const testingSkills = categories.find(c => c.name === 'Testing & Quality')?.skills || [];
          if (testingSkills.length) mergedCategories.push({ name: 'Testing', skills: testingSkills });

          // DevOps + Cloud
          const devopsSkills = categories
            .filter(c => ['DevOps & Tools', 'Cloud & Monitoring'].includes(c.name))
            .flatMap(c => c.skills);
          if (devopsSkills.length) mergedCategories.push({ name: 'DevOps & Cloud', skills: devopsSkills });

          // Leadership + Emerging Tech
          const leadershipSkills = categories
            .filter(c => ['Leadership & Collaboration', 'Emerging Tech'].includes(c.name))
            .flatMap(c => c.skills);
          if (leadershipSkills.length) mergedCategories.push({ name: 'Leadership & Other', skills: leadershipSkills });

          // Create new compact HTML
          const newContent = mergedCategories.map(cat =>
            `<div style="margin-bottom: 0.3rem;">
              <strong style="font-size: 0.8rem; color: ${COLORS.copper};">${cat.name}:</strong>
              <span style="font-size: 0.75rem; color: ${COLORS.graphite};"> ${cat.skills.join(', ')}</span>
            </div>`
          ).join('');

          skillGroups.innerHTML = newContent;
          skillGroups.style.display = 'block';
        }

        // Handle soft skills separately - convert to inline
        const softSkillsDiv = skillsSection.querySelector('.space-y-6 + div, div:last-child') as HTMLElement;
        if (softSkillsDiv && softSkillsDiv.querySelector('h3')?.textContent?.includes('Soft')) {
          const softSkills: string[] = [];
          softSkillsDiv.querySelectorAll('span').forEach(span => {
            if (span.textContent) softSkills.push(span.textContent.trim());
          });
          if (softSkills.length) {
            softSkillsDiv.innerHTML = `
              <div style="margin-bottom: 0.3rem;">
                <strong style="font-size: 0.8rem; color: ${COLORS.copper};">Soft Skills:</strong>
                <span style="font-size: 0.75rem; color: ${COLORS.graphite};"> ${softSkills.join(', ')}</span>
              </div>
            `;
          }
        }
      }

      // === EXPERIENCE SECTION - Tighter spacing ===
      const experienceSection = document.querySelector('.container-narrow > section:nth-of-type(3)') as HTMLElement;
      if (experienceSection) {
        // Reduce space between experience entries
        const spaceY12 = experienceSection.querySelector('.space-y-12') as HTMLElement;
        if (spaceY12) {
          spaceY12.style.gap = '0';
          spaceY12.querySelectorAll('article').forEach(article => {
            (article as HTMLElement).style.marginBottom = '0.6rem';
            (article as HTMLElement).style.paddingBottom = '0.4rem';
            (article as HTMLElement).style.borderBottom = `1px solid ${COLORS.border}`;
          });
        }

        // Tighter header row (title + company + dates)
        experienceSection.querySelectorAll('article').forEach(article => {
          // Make title/company row more compact
          const headerDiv = article.querySelector('.flex.flex-col.md\\:flex-row') as HTMLElement;
          if (headerDiv) {
            headerDiv.style.marginBottom = '0.15rem';
            headerDiv.style.gap = '0.25rem';
          }

          // Job title
          const jobTitle = article.querySelector('h3') as HTMLElement;
          if (jobTitle) {
            jobTitle.style.fontSize = '0.95rem';
            jobTitle.style.marginBottom = '0';
            jobTitle.style.lineHeight = '1.2';
          }

          // Company line
          const companyLine = article.querySelector('p.text-copper') as HTMLElement;
          if (companyLine) {
            companyLine.style.fontSize = '0.8rem';
            companyLine.style.marginBottom = '0';
          }

          // Date line
          const dateDiv = article.querySelector('.text-graphite.text-sm') as HTMLElement;
          if (dateDiv) {
            dateDiv.style.fontSize = '0.75rem';
            dateDiv.style.whiteSpace = 'nowrap';
          }

          // Description paragraph - make it tighter
          const desc = article.querySelector('p.text-graphite.mb-4') as HTMLElement;
          if (desc) {
            desc.style.fontSize = '0.8rem';
            desc.style.marginBottom = '0.15rem';
            desc.style.marginTop = '0.1rem';
            desc.style.lineHeight = '1.3';
          }
        });

        // Tighter achievement lists
        experienceSection.querySelectorAll('ul').forEach(ul => {
          (ul as HTMLElement).style.marginTop = '0.1rem';
          (ul as HTMLElement).style.marginBottom = '0.15rem';
          (ul as HTMLElement).style.paddingLeft = '1rem';
        });

        experienceSection.querySelectorAll('li').forEach(li => {
          (li as HTMLElement).style.marginBottom = '0.05rem';
          (li as HTMLElement).style.fontSize = '0.8rem';
          (li as HTMLElement).style.lineHeight = '1.3';
        });

        // Convert skill pills to comma-separated list
        experienceSection.querySelectorAll('.flex.flex-wrap.gap-2').forEach(container => {
          const skills: string[] = [];
          container.querySelectorAll('span').forEach(span => {
            if (span.textContent) skills.push(span.textContent.trim());
          });

          if (skills.length) {
            (container as HTMLElement).innerHTML = `
              <span style="font-size: 0.7rem; color: ${COLORS.graphite}; font-style: italic;">${skills.join(', ')}</span>
            `;
            (container as HTMLElement).style.display = 'block';
            (container as HTMLElement).style.marginTop = '0.1rem';
          }
        });
      }

      // === SECTION HEADERS - Smaller ===
      document.querySelectorAll('.container-narrow > section > h2').forEach(h2 => {
        (h2 as HTMLElement).style.fontSize = '1.1rem';
        (h2 as HTMLElement).style.marginBottom = '0.5rem';
        (h2 as HTMLElement).style.paddingBottom = '0.25rem';
      });

      // === LANGUAGES SECTION - Inline comma-separated ===
      // Languages is after Skills (5th section when Key Achievements is hidden)
      const languagesSection = document.querySelector('.container-narrow > section:last-of-type') as HTMLElement;
      if (languagesSection && languagesSection.querySelector('h2')?.textContent?.includes('Languages')) {
        const langGrid = languagesSection.querySelector('.grid') as HTMLElement;
        if (langGrid) {
          // Extract languages
          const languages: string[] = [];
          langGrid.querySelectorAll(':scope > div').forEach(div => {
            const name = div.querySelector('p.font-medium')?.textContent?.trim() || '';
            const proficiency = div.querySelector('p.text-sm')?.textContent?.trim() || '';
            if (name) languages.push(`${name} (${proficiency})`);
          });

          // Replace with inline format
          if (languages.length) {
            langGrid.innerHTML = `
              <span style="font-size: 0.8rem; color: ${COLORS.graphite};">${languages.join(' · ')}</span>
            `;
            langGrid.style.display = 'block';
          }
        }
        // Reduce section spacing
        languagesSection.style.marginBottom = '0.5rem';
        const langH2 = languagesSection.querySelector('h2') as HTMLElement;
        if (langH2) {
          langH2.style.marginBottom = '0.3rem';
        }
      }

      // === EDUCATION SECTION - Tighter spacing ===
      // Education is typically the 4th section (after Experience and Skills)
      document.querySelectorAll('.container-narrow > section').forEach(section => {
        const h2 = section.querySelector('h2');
        if (h2?.textContent?.includes('Education')) {
          const eduSection = section as HTMLElement;

          // Reduce space between education entries
          const spaceY8 = eduSection.querySelector('.space-y-8') as HTMLElement;
          if (spaceY8) {
            spaceY8.style.gap = '0';
            spaceY8.querySelectorAll('article').forEach(article => {
              (article as HTMLElement).style.marginBottom = '0.5rem';
              (article as HTMLElement).style.paddingBottom = '0.3rem';
              (article as HTMLElement).style.borderBottom = `1px solid ${COLORS.border}`;
            });
          }

          // Tighter header row - only show name, institution, and dates
          eduSection.querySelectorAll('article').forEach(article => {
            const headerDiv = article.querySelector('.flex.flex-col.md\\:flex-row') as HTMLElement;
            if (headerDiv) {
              headerDiv.style.marginBottom = '0';
              headerDiv.style.gap = '0.2rem';
            }

            // Degree title
            const degreeTitle = article.querySelector('h3') as HTMLElement;
            if (degreeTitle) {
              degreeTitle.style.fontSize = '0.85rem';
              degreeTitle.style.marginBottom = '0';
              degreeTitle.style.lineHeight = '1.2';
            }

            // Institution line
            const instLine = article.querySelector('p.text-copper') as HTMLElement;
            if (instLine) {
              instLine.style.fontSize = '0.75rem';
              instLine.style.marginBottom = '0';
            }

            // Date line
            const dateDiv = article.querySelector('.text-graphite.text-sm') as HTMLElement;
            if (dateDiv) {
              dateDiv.style.fontSize = '0.7rem';
            }

            // Hide description
            const desc = article.querySelector('p.text-graphite.mb-4') as HTMLElement;
            if (desc) {
              desc.style.display = 'none';
            }

            // Hide achievement lists
            article.querySelectorAll('ul').forEach(ul => {
              (ul as HTMLElement).style.display = 'none';
            });
          });
        }
      });

      // === HEADER LINKS - Plain text URLs for print ===
      const headerContactRow = document.querySelector('.container-narrow > header .flex.flex-wrap.gap-4') as HTMLElement;
      if (headerContactRow) {
        // Find and update email link
        const emailLink = headerContactRow.querySelector('a[href^="mailto:"]') as HTMLAnchorElement;
        if (emailLink) {
          const email = emailLink.href.replace('mailto:', '');
          emailLink.style.color = COLORS.graphite;
          emailLink.style.textDecoration = 'none';
          // Show actual email
          const emailSpan = emailLink.querySelector('span');
          if (emailSpan) emailSpan.textContent = email;
        }

        // Find and update LinkedIn link
        const linkedinLink = headerContactRow.querySelector('a[href*="linkedin"]') as HTMLAnchorElement;
        if (linkedinLink) {
          linkedinLink.style.color = COLORS.graphite;
          linkedinLink.style.textDecoration = 'none';
          const linkedinSpan = linkedinLink.querySelector('span');
          if (linkedinSpan) {
            // Extract username from URL (e.g., linkedin.com/in/brunocamarneiro)
            const url = new URL(linkedinLink.href);
            linkedinSpan.textContent = `linkedin.com${url.pathname}`;
          }
        }

        // Find and update GitHub link
        const githubLink = headerContactRow.querySelector('a[href*="github"]') as HTMLAnchorElement;
        if (githubLink) {
          githubLink.style.color = COLORS.graphite;
          githubLink.style.textDecoration = 'none';
          const githubSpan = githubLink.querySelector('span');
          if (githubSpan) {
            // Extract username from URL (e.g., github.com/bcamarneiro)
            const url = new URL(githubLink.href);
            githubSpan.textContent = `github.com${url.pathname}`;
          }
        }
      }

      // === GENERAL SPACING ===
      document.querySelectorAll('.mb-16').forEach(el => {
        (el as HTMLElement).style.marginBottom = '0.75rem';
      });

      document.querySelectorAll('.mb-12').forEach(el => {
        (el as HTMLElement).style.marginBottom = '0.5rem';
      });

      // Tighter paragraph spacing
      document.querySelectorAll('.container-narrow p').forEach(p => {
        (p as HTMLElement).style.marginBottom = '0.25rem';
        (p as HTMLElement).style.fontSize = '0.85rem';
        (p as HTMLElement).style.lineHeight = '1.4';
      });

      // === ENSURE CONSISTENT COLORS THROUGHOUT ===
      // Main headings (h1) - ink color
      document.querySelectorAll('h1').forEach(h1 => {
        (h1 as HTMLElement).style.color = COLORS.ink;
      });

      // Section headers (h2) - ink color
      document.querySelectorAll('h2').forEach(h2 => {
        (h2 as HTMLElement).style.color = COLORS.ink;
      });

      // Job/education titles (h3) - ink color
      document.querySelectorAll('h3').forEach(h3 => {
        (h3 as HTMLElement).style.color = COLORS.ink;
      });

      // Copper accent text (company names, institution names, etc.)
      document.querySelectorAll('.text-copper').forEach(el => {
        (el as HTMLElement).style.color = COLORS.copper;
      });

      // Graphite text (descriptions, dates, body text)
      document.querySelectorAll('.text-graphite').forEach(el => {
        (el as HTMLElement).style.color = COLORS.graphite;
      });

      // List items
      document.querySelectorAll('li').forEach(li => {
        (li as HTMLElement).style.color = COLORS.graphite;
      });


      // Section borders
      document.querySelectorAll('.border-b').forEach(el => {
        (el as HTMLElement).style.borderColor = COLORS.border;
      });

      // Header border
      const cvHeader = document.querySelector('.container-narrow > header') as HTMLElement;
      if (cvHeader) {
        cvHeader.style.borderColor = COLORS.border;
      }
    });

    // Wait for styles to apply
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 500)));

    // Generate PDF with settings matching the print CSS @page rules
    await page.pdf({
      path: OUTPUT_PDF_PATH,
      format: 'Letter',
      margin: {
        top: '0.3in',
        right: '0.4in',
        bottom: '0.3in',
        left: '0.4in',
      },
      printBackground: true,
      displayHeaderFooter: false,
      scale: 0.85, // Slight scale down for better density
    });

    const stats = fs.statSync(OUTPUT_PDF_PATH);
    const sizeKB = (stats.size / 1024).toFixed(1);

    console.log('✅ PDF generated successfully!');
    console.log(`   Output: ${OUTPUT_PDF_PATH}`);
    console.log(`   Size: ${sizeKB} KB`);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePDF();
