#!/usr/bin/env node
/**
 * CV LinkedIn Export
 *
 * Exports CV JSON data to LinkedIn-optimized text format.
 * Generates sections that can be copy-pasted directly into LinkedIn.
 *
 * Usage:
 *   npm run cv:linkedin              # Output all sections
 *   npm run cv:linkedin summary      # Output only summary/about
 *   npm run cv:linkedin experience   # Output only experience
 *
 * LinkedIn character limits:
 *   - Headline: 220 characters
 *   - About/Summary: 2,600 characters
 *   - Experience description: 2,000 characters per role
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

function isVisible(item: { visibility?: string[] }): boolean {
  if (!item.visibility) return true;
  return item.visibility.includes('all');
}

function truncateWithWarning(text: string, limit: number, label: string): string {
  if (text.length <= limit) return text;
  console.error(`\n⚠️  Warning: ${label} exceeds ${limit} characters (${text.length} chars)`);
  console.error(`   Consider shortening by ${text.length - limit} characters\n`);
  return text;
}

function generateHeadline(cv: CVData): string {
  // LinkedIn headline is 220 chars max
  // Format: Title | Key skills | Value proposition
  const title = cv.personal.title;
  const headline = `${title} | React, Next.js, TypeScript | Building high-performance web applications`;
  return truncateWithWarning(headline, 220, 'Headline');
}

function generateAbout(cv: CVData): string {
  // LinkedIn About/Summary is 2,600 chars max
  const lines: string[] = [];

  lines.push(cv.summary);
  lines.push('');
  lines.push('Core Expertise:');

  // Add key skills grouped
  const frontendSkills = cv.skills.technical.find(c => c.category === 'Frontend Engineering');
  if (frontendSkills) {
    lines.push(`• Frontend: ${frontendSkills.skills.slice(0, 6).join(', ')}`);
  }

  const testingSkills = cv.skills.technical.find(c => c.category === 'Testing & Quality');
  if (testingSkills) {
    lines.push(`• Testing: ${testingSkills.skills.slice(0, 5).join(', ')}`);
  }

  const archSkills = cv.skills.technical.find(c => c.category === 'Architecture & Performance');
  if (archSkills) {
    lines.push(`• Architecture: ${archSkills.skills.slice(0, 5).join(', ')}`);
  }

  const leadershipSkills = cv.skills.technical.find(c => c.category === 'Leadership & Collaboration');
  if (leadershipSkills) {
    lines.push(`• Leadership: ${leadershipSkills.skills.slice(0, 4).join(', ')}`);
  }

  lines.push('');
  lines.push(`📧 ${cv.personal.email}`);
  if (cv.personal.github) lines.push(`💻 ${cv.personal.github}`);

  const about = lines.join('\n');
  return truncateWithWarning(about, 2600, 'About section');
}

function generateExperience(cv: CVData): string {
  const lines: string[] = [];

  const visibleExperience = cv.experience.filter(exp => isVisible(exp));

  for (const exp of visibleExperience) {
    lines.push('═'.repeat(50));
    lines.push(`${exp.title.toUpperCase()}`);
    lines.push(`${exp.company} • ${exp.location}`);
    lines.push('─'.repeat(50));
    lines.push('');

    // Build role description
    const roleLines: string[] = [];
    roleLines.push(exp.description);
    roleLines.push('');

    if (exp.achievements.length > 0) {
      roleLines.push('Key Achievements:');
      for (const achievement of exp.achievements) {
        roleLines.push(`• ${achievement}`);
      }
    }

    if (exp.skills.length > 0) {
      roleLines.push('');
      roleLines.push(`Technologies: ${exp.skills.join(', ')}`);
    }

    const roleText = roleLines.join('\n');
    const truncated = truncateWithWarning(roleText, 2000, `${exp.company} - ${exp.title}`);
    lines.push(truncated);
    lines.push('');
  }

  return lines.join('\n');
}

function generateSkills(cv: CVData): string {
  // Generate a flat list of skills for LinkedIn skills section
  const allSkills: string[] = [];

  for (const category of cv.skills.technical) {
    allSkills.push(...category.skills);
  }

  // Remove duplicates and sort
  const uniqueSkills = [...new Set(allSkills)].sort();

  const lines: string[] = [];
  lines.push('SKILLS FOR LINKEDIN');
  lines.push('═'.repeat(50));
  lines.push('Copy these to your LinkedIn Skills section:');
  lines.push('');
  lines.push(uniqueSkills.join('\n'));

  return lines.join('\n');
}

function generateEducation(cv: CVData): string {
  const lines: string[] = [];

  const visibleEducation = cv.education.filter(edu => isVisible(edu));

  lines.push('EDUCATION');
  lines.push('═'.repeat(50));

  for (const edu of visibleEducation) {
    lines.push('');
    lines.push(`${edu.degree}`);
    lines.push(`${edu.institution}`);
    lines.push(`${edu.startDate} - ${edu.endDate || 'Present'}`);
    if (edu.description) lines.push(edu.description);
  }

  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const section = args[0]?.toLowerCase();

  if (!fs.existsSync(CV_JSON_PATH)) {
    console.error('Error: CV JSON not found at', CV_JSON_PATH);
    process.exit(1);
  }

  const cvData: CVData = JSON.parse(fs.readFileSync(CV_JSON_PATH, 'utf-8'));

  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║           LINKEDIN CV EXPORT                     ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  if (!section || section === 'headline') {
    console.log('HEADLINE (220 chars max)');
    console.log('═'.repeat(50));
    console.log(generateHeadline(cvData));
    console.log('');
  }

  if (!section || section === 'summary' || section === 'about') {
    console.log('ABOUT / SUMMARY (2,600 chars max)');
    console.log('═'.repeat(50));
    console.log(generateAbout(cvData));
    console.log('');
  }

  if (!section || section === 'experience') {
    console.log('EXPERIENCE (2,000 chars per role)');
    console.log(generateExperience(cvData));
  }

  if (!section || section === 'skills') {
    console.log(generateSkills(cvData));
    console.log('');
  }

  if (!section || section === 'education') {
    console.log(generateEducation(cvData));
    console.log('');
  }

  console.log('');
  console.log('═'.repeat(50));
  console.log('💡 Tip: Use specific sections with:');
  console.log('   npm run cv:linkedin headline');
  console.log('   npm run cv:linkedin about');
  console.log('   npm run cv:linkedin experience');
  console.log('   npm run cv:linkedin skills');
  console.log('   npm run cv:linkedin education');
}

main();
