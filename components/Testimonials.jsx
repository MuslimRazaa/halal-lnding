"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    company: 'ASTRONUTS',
    logo: '🚀',
    text: "TestSprite saves us time and money. Our engineering team can now automate Q/A and get real-time results, enabling our team to ship faster.",
    author: 'Michel F.',
    position: 'Founder - Astronuts',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    company: 'genrex',
    logo: '⚡',
    text: "TestSprite's automation has been invaluable in detecting hard-to-find issues. API testing is crucial to our product. Its comprehensive coverage gives us confidence to release updates without concerns of breaking the backend.",
    author: 'Malcolm Y.',
    position: 'Co-founder - Genrex',
    avatar: '👨‍💻'
  },
  {
    id: 3,
    company: 'Princeton',
    logo: '🎓',
    text: "TestSprite's user-friendly interface made it easy to set everything up. The simplicity of the onboarding process really sets TestSprite apart from other tools we've used in the past.",
    author: 'Jeffery Z.',
    position: 'Managing Partner - Princeton Pharmatech',
    avatar: '👔'
  },
  {
    id: 4,
    company: 'ByteHQ',
    logo: '📊',
    text: "Good job! AI coding software is getting better every day.",
    author: 'Sarah K.',
    position: 'CTO - ByteHQ',
    avatar: '👩‍💼'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      cards.push(testimonials[index]);
    }
    return cards;
  };

  return (
    <section id="testimonials" className="section-testi">
      <div className="container-testi">
        <h2 className="title-testi">
          The New Way<br />
          to Validate Software.
        </h2>

        <div className="carousel-testi">
          <button 
            className="nav-button-testi prev-testi"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="cards-wrapper-testi">
            <div 
              className="cards-container-testi"
              style={{
                transform: `translateX(-${(currentIndex % testimonials.length) * (100 / 3)}%)`,
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="card-testi">
                  <div className="card-header-testi">
                    <div className="company-logo-testi">
                      <span className="logo-icon-testi">{testimonial.logo}</span>
                      <span className="company-name-testi">{testimonial.company}</span>
                    </div>
                  </div>

                  <p className="testimonial-text-testi">
                    {testimonial.text}
                  </p>

                  <div className="author-section-testi">
                    <div className="author-info-testi">
                      <div className="avatar-testi">{testimonial.avatar}</div>
                      <div className="author-details-testi">
                        <div className="author-name-testi">{testimonial.author}</div>
                        <div className="author-position-testi">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pattern-testi"></div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="nav-button-testi next-testi"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        <div className="dots-testi">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot-testi ${index === currentIndex ? 'active-testi' : ''}`}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}