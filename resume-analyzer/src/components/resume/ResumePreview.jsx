import './ResumePreview.css';

const ResumePreview = ({ data, template }) => {
  const skills = data.skills ? data.skills.split(/[,;]/).map((s) => s.trim()).filter(Boolean) : [];

  return (
    <div className={`resume-preview resume-${template}`}>
      <header>
        <h1>{data.name || 'Your Name'}</h1>
        <div className="contact">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </header>

      {data.summary && (
        <section>
          <h2>Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {data.experiences?.some((e) => e.company || e.role) && (
        <section>
          <h2>Experience</h2>
          {data.experiences.map((exp, i) => (
            <div key={i} className="entry">
              <div className="entry-header">
                <strong>{exp.role || 'Role'}</strong>
                <span>{exp.company || 'Company'}</span>
              </div>
              {exp.dates && <span className="dates">{exp.dates}</span>}
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.education?.some((e) => e.school || e.degree) && (
        <section>
          <h2>Education</h2>
          {data.education.map((ed, i) => (
            <div key={i} className="entry">
              <strong>{ed.degree || 'Degree'}</strong>
              <span>{ed.school || 'School'}</span>
              {ed.year && <span className="dates">{ed.year}</span>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <div className="skills-row">
            {skills.map((s) => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
