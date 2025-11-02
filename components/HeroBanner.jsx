// components/HeroBanner.jsx
"use client";
import Link from 'next/link';


export default function HeroBanner() {

  const handleFreeTrial = () => {
    window.open("https://halal-in-the-city-merchant.netlify.app/", "_blank");
  }


  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <span>
          Exclusive Limited-Time <strong>FREE</strong> – Don't Miss Out!
        </span>
        <Link href="#" className="learn-more-link">
          Learn More →
        </Link>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="/logo.png" alt="TestSprite" />
            <span></span>
          </div>

          <nav className="nav">

            <Link href="#faqs">Faqs</Link>
            <Link href="#testimonials">Testimonials</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#contact">Contact Us</Link>
          </nav>

          <div className="auth-buttons">
            <button onClick={handleFreeTrial} className="try-free">Try Free Trial</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="background-pattern"></div>

        <div className="container">
          {/* Notice Badge */}
          <div className="notice">
            <span className="notice-badge">New</span>
            <span className="notice-text">
              Cursor's new Sandbox Mode restricts MCP tools: Enable{' '}
              <span className="highlight">"Ask every time"</span> or{' '}
              <span className="highlight">"Run everything"</span> to unlock
              full testing.
            </span>
            <Link href="#" className="notice-link">
              Learn More →
            </Link>
          </div>

          {/* Main Heading */}
          <h1 className="heading">
            Built for modern coders: the{' '}
            <span className="accent">AI agent</span> that{' '}
            <span className="accent">tests</span>,{' '}
            <span className="accent">fixes</span>, and{' '}
            <span className="accent">validates</span> your software.
          </h1>

          {/* Subheading */}
          <p className="subheading">
            Turn your draft code into working software without code, prompts, or
            effort.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button onClick={handleFreeTrial} className="try-mcp">
              <span className="new-badge">New</span>
              Try Free
            </button>
            <button className="join-community">Contact Us</button>
          </div>
        </div>
      </section>
    </>
  );
}