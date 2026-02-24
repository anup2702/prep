import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import ResumePreview from '../components/resume/ResumePreview';
import { TEMPLATES, defaultResumeData } from '../data/resumeDefaults';
import { exportResumeAsHtml } from '../utils/exportResume';
import './CreateResumePage.css';

export default function CreateResumePage() {
  const { user } = useAuth();
  const [data, setData] = useState({ ...defaultResumeData });
  const [template, setTemplate] = useState('modern');

  const update = (path, value) => {
    setData((prev) => {
      const next = { ...prev };
      if (path.includes('.')) {
        const [parent, idx, field] = path.split('.');
        const arr = [...(next[parent] || [])];
        arr[idx] = { ...arr[idx], [field]: value };
        next[parent] = arr;
      } else {
        next[path] = value;
      }
      return next;
    });
  };

  const addExperience = () => setData((p) => ({ ...p, experiences: [...(p.experiences || []), { company: '', role: '', dates: '', description: '' }] }));
  const addEducation = () => setData((p) => ({ ...p, education: [...(p.education || []), { school: '', degree: '', year: '' }] }));

  const handleExport = () => exportResumeAsHtml(data, template);

  return (
    <div className="create-resume-page">
      <nav className="create-nav">
        <Link to="/" className="logo">ResumeFlow</Link>
        <div className="nav-links">
          <ThemeToggle />
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/pricing">Pricing</Link>
          {user ? (
            <span className="user-email">{user.email}</span>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </div>
      </nav>

      <main className="create-main">
        <h1>Create Your Resume</h1>
        <p className="create-subtitle">Choose a template, fill in your details, and download.</p>

        <div className="template-selector">
          <h3>Choose Template</h3>
          <div className="template-options">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                className={`template-btn ${template === t.id ? 'active' : ''}`}
                onClick={() => setTemplate(t.id)}
              >
                <span className="template-name">{t.name}</span>
                <span className="template-desc">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="builder-layout">
          <div className="builder-form">
            <section className="form-section">
              <h3>Contact</h3>
              <input placeholder="Full Name" value={data.name} onChange={(e) => update('name', e.target.value)} />
              <input type="email" placeholder="Email" value={data.email} onChange={(e) => update('email', e.target.value)} />
              <input placeholder="Phone" value={data.phone} onChange={(e) => update('phone', e.target.value)} />
            </section>
            <section className="form-section">
              <h3>Summary</h3>
              <textarea placeholder="Brief professional summary..." value={data.summary} onChange={(e) => update('summary', e.target.value)} rows={3} />
            </section>
            <section className="form-section">
              <h3>Experience</h3>
              {data.experiences?.map((exp, i) => (
                <div key={i} className="form-group">
                  <input placeholder="Role" value={exp.role} onChange={(e) => update(`experiences.${i}.role`, e.target.value)} />
                  <input placeholder="Company" value={exp.company} onChange={(e) => update(`experiences.${i}.company`, e.target.value)} />
                  <input placeholder="Dates (e.g. 2020 - Present)" value={exp.dates} onChange={(e) => update(`experiences.${i}.dates`, e.target.value)} />
                  <textarea placeholder="Description" value={exp.description} onChange={(e) => update(`experiences.${i}.description`, e.target.value)} rows={2} />
                </div>
              ))}
              <button type="button" onClick={addExperience} className="btn-add">+ Add Experience</button>
            </section>
            <section className="form-section">
              <h3>Education</h3>
              {data.education?.map((ed, i) => (
                <div key={i} className="form-group">
                  <input placeholder="Degree" value={ed.degree} onChange={(e) => update(`education.${i}.degree`, e.target.value)} />
                  <input placeholder="School" value={ed.school} onChange={(e) => update(`education.${i}.school`, e.target.value)} />
                  <input placeholder="Year" value={ed.year} onChange={(e) => update(`education.${i}.year`, e.target.value)} />
                </div>
              ))}
              <button type="button" onClick={addEducation} className="btn-add">+ Add Education</button>
            </section>
            <section className="form-section">
              <h3>Skills</h3>
              <input placeholder="Comma-separated skills" value={data.skills} onChange={(e) => update('skills', e.target.value)} />
            </section>
          </div>
          <div className="builder-preview">
            <ResumePreview data={data} template={template} />
            <button onClick={handleExport} className="btn-download">Download as HTML</button>
            <p className="export-hint">Open in browser and use Print → Save as PDF</p>
          </div>
        </div>
      </main>
    </div>
  );
}
