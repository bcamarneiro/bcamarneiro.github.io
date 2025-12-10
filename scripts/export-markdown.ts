#!/usr/bin/env node
/**
 * CV Markdown Export
 *
 * Exports CV JSON data to clean markdown format for LLM consumption.
 * Useful for tailoring CV content with AI assistance.
 *
 * Usage:
 *   npm run --silent cv:markdown              # Output to stdout (clean)
 *   npm run --silent cv:markdown > cv.md      # Save to file
 *
 * Options:
 *   --include-hidden  Include all items regardless of visibility
 *
 * Note: Use --silent to suppress npm's command output when piping to a file.
 *       The PDF generator (cv:pdf:tailored) automatically strips this output.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CV_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'cv.json');

interface CVData {
  personal: {
    name: string;
    title: string;
    email: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    achievements: string[];
    skills: string[];
    visibility?: string[];
  }>;
  skills: {
    technical: Array<{
      category: string;
      skills: string[];
    }>;
    soft?: string[];
  };
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description?: string;
    visibility?: string[];
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    url?: string;
    github?: string;
    technologies: string[];
    highlights: string[];
    visibility?: string[];
  }>;
  languages?: Array<{
    name: string;
    proficiency: string;
  }>;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function isVisible(item: { visibility?: string[] }, includeHidden: boolean): boolean {
  if (includeHidden) return true;
  if (!item.visibility) return true;
  return item.visibility.includes('all');
}

function exportToMarkdown(cv: CVData, includeHidden: boolean): string {
  const lines: string[] = [];

  // Header
  lines.push(`# ${cv.personal.name}`);
  lines.push(`**${cv.personal.title}**`);
  lines.push('');
  lines.push(`${cv.personal.location} | ${cv.personal.email}`);
  if (cv.personal.linkedin) lines.push(`LinkedIn: ${cv.personal.linkedin}`);
  if (cv.personal.github) lines.push(`GitHub: ${cv.personal.github}`);
  lines.push('');

  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push(cv.summary);
  lines.push('');

  // Experience
  lines.push('## Experience');
  lines.push('');

  const visibleExperience = cv.experience.filter(exp => isVisible(exp, includeHidden));
  for (const exp of visibleExperience) {
    const dates = `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`;
    lines.push(`### ${exp.title} at ${exp.company}`);
    lines.push(`*${exp.location} | ${dates}*`);
    lines.push('');
    lines.push(exp.description);
    lines.push('');

    if (exp.achievements.length > 0) {
      lines.push('**Key Achievements:**');
      for (const achievement of exp.achievements) {
        lines.push(`- ${achievement}`);
      }
      lines.push('');
    }

    if (exp.skills.length > 0) {
      lines.push(`**Technologies:** ${exp.skills.join(', ')}`);
      lines.push('');
    }
  }

  // Skills
  lines.push('## Skills');
  lines.push('');

  for (const category of cv.skills.technical) {
    lines.push(`**${category.category}:** ${category.skills.join(', ')}`);
    lines.push('');
  }

  if (cv.skills.soft && cv.skills.soft.length > 0) {
    lines.push(`**Soft Skills:** ${cv.skills.soft.join(', ')}`);
    lines.push('');
  }

  // Education
  lines.push('## Education');
  lines.push('');

  const visibleEducation = cv.education.filter(edu => isVisible(edu, includeHidden));
  for (const edu of visibleEducation) {
    const dates = `${edu.startDate} - ${edu.endDate || 'Present'}`;
    lines.push(`### ${edu.degree}`);
    lines.push(`*${edu.institution}, ${edu.location} | ${dates}*`);
    if (edu.description) {
      lines.push('');
      lines.push(edu.description);
    }
    lines.push('');
  }

  // Projects (if any visible)
  if (cv.projects && cv.projects.length > 0) {
    const visibleProjects = cv.projects.filter(proj => isVisible(proj, includeHidden));
    if (visibleProjects.length > 0) {
      lines.push('## Projects');
      lines.push('');

      for (const proj of visibleProjects) {
        lines.push(`### ${proj.name}`);
        lines.push('');
        lines.push(proj.description);
        lines.push('');

        if (proj.url) lines.push(`**URL:** ${proj.url}`);
        if (proj.github) lines.push(`**GitHub:** ${proj.github}`);

        if (proj.highlights.length > 0) {
          lines.push('');
          lines.push('**Highlights:**');
          for (const highlight of proj.highlights) {
            lines.push(`- ${highlight}`);
          }
        }

        if (proj.technologies.length > 0) {
          lines.push('');
          lines.push(`**Technologies:** ${proj.technologies.join(', ')}`);
        }
        lines.push('');
      }
    }
  }

  // Languages
  if (cv.languages && cv.languages.length > 0) {
    lines.push('## Languages');
    lines.push('');
    for (const lang of cv.languages) {
      lines.push(`- **${lang.name}:** ${lang.proficiency}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const includeHidden = args.includes('--include-hidden');

  if (!fs.existsSync(CV_JSON_PATH)) {
    // Write to stderr so it doesn't pollute stdout when piping
    process.stderr.write('Error: CV JSON not found at ' + CV_JSON_PATH + '\n');
    process.exit(1);
  }

  const cvData: CVData = JSON.parse(fs.readFileSync(CV_JSON_PATH, 'utf-8'));
  const markdown = exportToMarkdown(cvData, includeHidden);

  // Write directly to stdout without any extra output
  process.stdout.write(markdown);
}

main();
