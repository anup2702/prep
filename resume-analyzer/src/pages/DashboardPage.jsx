import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHistory } from '../context/HistoryContext';
import ThemeToggle from '../components/ThemeToggle';
import { generateMockAnalysis } from '../utils/mockAnalysis';
import './DashboardPage.css';

function AnalysisResults({ analysis, onExport, onNew }) {
  const exportReport = () => {
    const lines = [
      'ResumeFlow — Analysis Report',
      '============================',
      '',
      `Overall Score: ${analysis.overallScore}/100`,
      analysis.jobMatchScore != null ? `Job Match Score: ${analysis.jobMatchScore}/100` : null,
      '',
      'Section Scores:',
      ...analysis.sections.map((s) => `  ${s.name}: ${s.score}/100 — ${s.tip}`),
      '',
      'Extracted Keywords:',
      `  ${analysis.keywords?.join(', ') || 'N/A'}`,
      '',
      'Suggestions:',
      ...analysis.suggestions.map((s) => `  • ${s}`),
    ].filter(Boolean);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onExport?.();
  };

  return (
    <div className="analysis-results">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <div className="results-actions">
          <button onClick={exportReport} className="btn-export">Export Report</button>
          <button onClick={onNew} className="btn-secondary">Upload New</button>
        </div>
      </div>

      {analysis.jobMatchScore != null && (
        <div className="job-match-badge">
          Job Match: <strong>{analysis.jobMatchScore}%</strong>
        </div>
      )}

      <div className="overall-score">
        <span className="score-number">{analysis.overallScore}</span>
        <span>Overall Score</span>
      </div>

      {analysis.keywords?.length > 0 && (
        <div className="keywords-section">
          <h3>Extracted Keywords</h3>
          <div className="keyword-tags">
            {analysis.keywords.map((k) => (
              <span key={k} className="keyword-tag">{k}</span>
            ))}
          </div>
        </div>
      )}

      <div className="section-scores">
        {analysis.sections.map((s) => (
          <div key={s.name} className="section-card">
            <div className="section-header">
              <h4>{s.name}</h4>
              <span className="section-score">{s.score}/100</span>
            </div>
            <p>{s.tip}</p>
          </div>
        ))}
      </div>

      <div className="suggestions">
        <h3>Suggestions</h3>
        <ul>
          {analysis.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HistoryTab() {
  const { items, remove } = useHistory();

  if (items.length === 0) {
    return (
      <div className="history-empty">
        <p>No past analyses yet.</p>
        <p className="history-hint">Upload and analyze a resume to see it here.</p>
      </div>
    );
  }

  return (
    <div className="history-list">
      {items.map((item) => (
        <div key={item.id} className="history-item">
          <div className="history-item-main">
            <strong>{item.fileName}</strong>
            <span className="history-score">{item.overallScore}/100</span>
          </div>
          <div className="history-item-meta">
            {new Date(item.date).toLocaleString()}
            {item.jobMatchScore != null && (
              <span className="job-match-small">Job match: {item.jobMatchScore}%</span>
            )}
          </div>
          <button onClick={() => remove(item.id)} className="btn-remove">Remove</button>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { save } = useHistory();
  const navigate = useNavigate();
  const [tab, setTab] = useState('analyze');
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setAnalysis(null);
    await new Promise((r) => setTimeout(r, 1200));
    const result = generateMockAnalysis(file.name, jobDescription);
    setAnalysis(result);
    save(result);
    setLoading(false);
  };

  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
    setJobDescription('');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <Link to="/" className="logo">ResumeFlow</Link>
        <div className="nav-right">
          <Link to="/create" className="nav-link">Create</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <ThemeToggle />
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">Log out</button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-tabs">
          <button
            className={tab === 'analyze' ? 'tab active' : 'tab'}
            onClick={() => setTab('analyze')}
          >
            Analyze
          </button>
          <button
            className={tab === 'history' ? 'tab active' : 'tab'}
            onClick={() => setTab('history')}
          >
            History
          </button>
        </div>

        {tab === 'analyze' && (
          <>
            <h1>Resume Analysis</h1>
            <p className="dashboard-subtitle">
              Upload your resume and optionally paste a job description for match scoring.
            </p>

            <div className="upload-section">
              <div className="job-desc-field">
                <label>Job Description (optional)</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description to see how well your resume matches..."
                  rows={3}
                />
              </div>
              <div className="upload-zone">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  {file ? file.name : 'Choose PDF or DOCX'}
                </label>
              </div>
              <div className="upload-actions">
                <button onClick={handleAnalyze} disabled={!file || loading}>
                  {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              </div>
            </div>

            {loading && (
              <div className="loading">
                <div className="spinner" />
                <p>Analyzing your resume...</p>
              </div>
            )}

            {analysis && !loading && (
              <AnalysisResults analysis={analysis} onNew={handleReset} />
            )}
          </>
        )}

        {tab === 'history' && <HistoryTab />}
      </main>
    </div>
  );
}
