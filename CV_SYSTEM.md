# CV System Documentation

This is your **master CV system** - a single source of truth for all your professional information.

## Architecture

```
src/
├── data/
│   └── cv.json          # Master CV data (edit this!)
├── types/
│   └── cv.ts            # TypeScript types for CV structure
├── pages/
│   └── cv.astro         # Renders CV from JSON
└── scripts/
    └── generate-cv-md.ts # Optional: Generate Markdown
```

## Quick Start

### 1. Update Your CV Data

Edit `src/data/cv.json` with your real information from LinkedIn or other sources.

```bash
# Open in your editor
code src/data/cv.json
```

### 2. View Your CV

```bash
npm run dev
# Visit http://localhost:4321/cv
```

### 3. Print/Export to PDF

Visit `/cv` in your browser and click "Download PDF" or use browser print (Cmd/Ctrl + P).

## Data Structure

### Personal Info
```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your@email.com",
    "location": "City, Country",
    "website": "https://yoursite.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  }
}
```

### Experience
```json
{
  "experience": [{
    "id": "unique-id",
    "title": "Job Title",
    "company": "Company Name",
    "location": "City, Country",
    "startDate": "2023-01",        // YYYY-MM format
    "endDate": null,                // null for current position
    "description": "Brief description",
    "achievements": [
      "Led team of X engineers...",
      "Improved Y by Z%"
    ],
    "skills": ["TypeScript", "React"],
    "visibility": ["all"]           // For filtering (future feature)
  }]
}
```

### Skills
```json
{
  "skills": {
    "technical": [
      {
        "category": "Languages",
        "skills": ["TypeScript", "JavaScript"]
      }
    ],
    "soft": ["Leadership", "Mentoring"]
  }
}
```

## Features

### ✅ Currently Implemented

- **JSON-driven**: Edit once, render everywhere
- **Beautiful rendering**: Clean, minimalist design matching your site
- **Print-optimized**: PDF export via browser print
- **Date formatting**: Automatic "Jan 2023 - Present" formatting
- **Duration calculation**: "2 years, 3 months" automatically calculated
- **Type-safe**: Full TypeScript types for validation
- **Responsive**: Mobile-friendly layout
- **SEO-optimized**: Proper meta tags and semantic HTML

### 🚀 Future Enhancements

#### Visibility Filtering
Generate targeted CVs by filtering sections:

```typescript
// Example: Generate senior-focused CV
const seniorCV = filterCV(cvData, ["all", "senior"]);

// Example: Generate frontend-focused CV
const frontendCV = filterCV(cvData, ["all", "frontend"]);
```

#### Export Formats
```bash
npm run cv:export-md         # Markdown for GitHub
npm run cv:export-linkedin   # LinkedIn-optimized format
npm run cv:export-pdf        # Automated PDF generation
npm run cv:export-json       # Filtered JSON for APIs
```

#### LinkedIn Sync
```bash
npm run cv:sync-linkedin     # Pull latest from LinkedIn API
```

## Usage Examples

### Updating Experience

When you get a new job:

```json
{
  "experience": [
    {
      "id": "exp-new",
      "title": "New Position",
      "company": "New Company",
      "startDate": "2024-12",
      "endDate": null,
      ...
    },
    {
      "id": "exp-previous",
      ...
      "endDate": "2024-11"  // Update previous role end date
    }
  ]
}
```

### Adding a New Skill

```json
{
  "skills": {
    "technical": [
      {
        "category": "Languages",
        "skills": ["TypeScript", "JavaScript", "Go"]  // Add "Go"
      }
    ]
  }
}
```

### Creating Targeted CVs (Future)

```json
{
  "experience": [{
    "title": "Frontend Lead",
    ...
    "visibility": ["all", "senior", "frontend"]
  }]
}
```

Then filter:
```typescript
// Show only items visible to "senior" or "all"
const seniorCV = filterCV(cvData, ["senior"]);
```

## Tips

1. **Keep achievements quantified**: Use numbers ("Improved performance by 40%")
2. **Update regularly**: Add achievements as they happen
3. **Use consistent dates**: Always YYYY-MM format
4. **One source of truth**: Update JSON, then sync to LinkedIn (not vice versa)
5. **Version control**: Commit CV changes to git for history

## Maintenance

### Adding New Sections

1. Update `src/types/cv.ts` with new type
2. Add data to `src/data/cv.json`
3. Update `src/pages/cv.astro` to render new section

### Validation

TypeScript will catch most errors, but check:
- Date formats (YYYY-MM)
- Required fields (title, company, startDate for experience)
- Array lengths (achievements, skills should not be empty)

## FAQs

**Q: Can I have multiple CV versions?**
A: Yes! Use the `visibility` field to filter content, or copy `cv.json` to `cv-senior.json`, etc.

**Q: How do I sync with LinkedIn?**
A: Currently manual. Future: Use LinkedIn API to pull/push data.

**Q: Can I export to Word?**
A: Print to PDF, then import into Word. Or use a script to generate .docx from JSON.

**Q: How do I add a photo?**
A: Add `photo: "/path/to/photo.jpg"` to personal info, then update cv.astro template.

## Next Steps

1. Fill in your real data in `src/data/cv.json`
2. Review the output at `/cv`
3. Export to PDF
4. Update LinkedIn to match your JSON (manual for now)
5. Consider adding generation scripts as needed

---

**Remember**: `src/data/cv.json` is your single source of truth. Keep it updated!
