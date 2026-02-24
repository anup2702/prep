import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import './PricingPage.css';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Get started with essential features.',
    features: [
      '3 resume analyses per month',
      'Basic ATS score',
      'Export as text report',
    ],
    cta: 'Get Started Free',
    href: '/signup',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$14',
    period: '/month',
    desc: 'For serious job seekers.',
    features: [
      'Unlimited analyses',
      'Job description matching',
      'Resume builder with 3 templates',
      'Export PDF & HTML',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/signup',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For teams and recruiters.',
    features: [
      'Everything in Pro',
      'Bulk resume analysis',
      'API access',
      'Custom templates',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    href: '#',
    popular: false,
  },
];

export default function PricingPage() {
  const { user } = useAuth();

  return (
    <div className="pricing-page">
      <nav className="pricing-nav">
        <Link to="/" className="logo">ResumeFlow</Link>
        <div className="nav-links">
          <ThemeToggle />
          <Link to="/create">Create Resume</Link>
          <Link to="/dashboard">Dashboard</Link>
          {user ? (
            <span className="user-email">{user.email}</span>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </div>
      </nav>

      <main className="pricing-main">
        <h1>Simple, Transparent Pricing</h1>
        <p className="pricing-subtitle">
          Choose the plan that fits you. Demo pricing — no real charges.
        </p>

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <span className="popular-badge">Most Popular</span>}
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="price-amount">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
              <p className="plan-desc">{plan.desc}</p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                to={user ? '/dashboard' : plan.href}
                className={`btn-plan ${plan.popular ? 'btn-primary' : ''}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          This is a demo. No payment is processed.
        </p>
      </main>
    </div>
  );
}
