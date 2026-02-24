import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import './HomePage.css';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home">
      <nav className="home-nav">
        <span className="logo">ResumeFlow</span>
        <div className="nav-links">
          <ThemeToggle />
          <Link to="/create">Create Resume</Link>
          <Link to="/pricing">Pricing</Link>
          {user ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </nav>

      <section className="hero">
        <h1>Analyze Your Resume in Seconds</h1>
        <p>
          Get instant feedback on your resume. Improve clarity, structure, and keywords
          to land more interviews.
        </p>
        {user ? (
          <Link to="/dashboard" className="btn-hero">Go to Dashboard</Link>
        ) : (
          <Link to="/signup" className="btn-hero">Get Started Free</Link>
        )}
      </section>

      <section className="features-preview">
        <h2>Why ResumeFlow?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <span className="icon">📝</span>
            <h3>Create Resume</h3>
            <p>Multiple templates. Fill and download.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📄</span>
            <h3>Upload & Parse</h3>
            <p>Upload PDF or DOCX and get instant parsing.</p>
          </div>
          <div className="feature-card">
            <span className="icon">✨</span>
            <h3>Smart Analysis</h3>
            <p>Get scores and suggestions for improvement.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🎯</span>
            <h3>ATS Optimization</h3>
            <p>Optimize for Applicant Tracking Systems.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📋</span>
            <h3>Job Match</h3>
            <p>Paste a job description to see match score.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 ResumeFlow — No database required for this prototype</p>
      </footer>
    </div>
  );
}
