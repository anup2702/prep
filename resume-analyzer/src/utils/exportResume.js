export function exportResumeAsHtml(data, template) {
  const skills = data.skills ? data.skills.split(/[,;]/).map((s) => s.trim()).filter(Boolean) : [];
  const t = template || 'modern';

  const sections = [];
  if (data.summary) {
    sections.push(`
      <section><h2>Summary</h2><p>${escapeHtml(data.summary)}</p></section>
    `);
  }
  if (data.experiences?.some((e) => e.company || e.role)) {
    sections.push(`
      <section>
        <h2>Experience</h2>
        ${data.experiences.map((exp) => `
          <div class="entry">
            <div class="entry-header"><strong>${escapeHtml(exp.role || 'Role')}</strong><span>${escapeHtml(exp.company || '')}</span></div>
            ${exp.dates ? `<span class="dates">${escapeHtml(exp.dates)}</span>` : ''}
            ${exp.description ? `<p>${escapeHtml(exp.description)}</p>` : ''}
          </div>
        `).join('')}
      </section>
    `);
  }
  if (data.education?.some((e) => e.school || e.degree)) {
    sections.push(`
      <section>
        <h2>Education</h2>
        ${data.education.map((ed) => `
          <div class="entry">
            <strong>${escapeHtml(ed.degree || '')}</strong><span>${escapeHtml(ed.school || '')}</span>
            ${ed.year ? `<span class="dates">${escapeHtml(ed.year)}</span>` : ''}
          </div>
        `).join('')}
      </section>
    `);
  }
  if (skills.length > 0) {
    sections.push(`
      <section>
        <h2>Skills</h2>
        <div class="skills-row">${skills.map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}</div>
      </section>
    `);
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(data.name || 'Resume')}</title>
<style>
body{font-family:Georgia,serif;font-size:11px;color:#1e293b;padding:2rem;max-width:700px;margin:0 auto}
header{border-bottom:2px solid #0f172a;padding-bottom:.75rem;margin-bottom:1rem}
h1{margin:0 0 .35rem;font-size:1.5rem}
.contact{display:flex;gap:1rem;color:#64748b;font-size:10px}
section{margin-bottom:1rem}
section h2{font-size:.85rem;text-transform:uppercase;letter-spacing:.05em;color:#475569;margin:0 0 .5rem}
section p{margin:0 0 .5rem;line-height:1.4}
.entry{margin-bottom:.75rem}
.entry-header{display:flex;justify-content:space-between}
.dates{font-size:.9em;color:#64748b}
.skills-row{display:flex;flex-wrap:wrap;gap:.35rem}
.skill-tag{background:#f1f5f9;padding:.2rem .5rem;border-radius:4px;font-size:.9em}
@media print{body{padding:0}}
</style>
</head>
<body class="resume-${t}">
<header>
  <h1>${escapeHtml(data.name || 'Your Name')}</h1>
  <div class="contact">
    ${data.email ? `<span>${escapeHtml(data.email)}</span>` : ''}
    ${data.phone ? `<span>${escapeHtml(data.phone)}</span>` : ''}
  </div>
</header>
${sections.join('')}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `resume-${(data.name || 'resume').replace(/\s+/g, '-')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
