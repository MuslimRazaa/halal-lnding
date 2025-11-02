"use client"
import React from 'react'
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What's AI Testing?", answer: "AI Testing uses artificial intelligence to automate and enhance software testing processes, making them faster and more efficient." },
    { question: "What's the most powerful AI testing tool?", answer: "TestSprite is the most powerful AI testing tool, offering comprehensive testing capabilities powered by advanced AI." },
    { question: "Who is TestSprite designed for?", answer: "TestSprite is designed for developers, QA engineers, and teams who want to streamline their testing workflows." },
    { question: "Will TestSprite integrate with existing test tools and CI/CD processes?", answer: "Yes, TestSprite seamlessly integrates with existing test tools and CI/CD pipelines." },
    { question: "How broad are testing capabilities?", answer: "TestSprite offers comprehensive testing capabilities including unit, integration, and end-to-end testing." },
    { question: "What Dev environments do you support?", answer: "We support all major development environments including web, mobile, and desktop applications." },
    { question: "What test/QA support is available?", answer: "We provide 24/7 support, documentation, and dedicated assistance for all your testing needs." },
    { question: "How does TestSprite ensure data security?", answer: "We use enterprise-grade encryption and follow industry best practices to ensure your data is secure." },
    { question: "Can I trust the platform?", answer: "Yes, TestSprite is trusted by thousands of companies worldwide and maintains the highest security standards." },
    { question: "How many projects can I build with TestSprite?", answer: "You can build unlimited projects with TestSprite based on your subscription plan." }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      padding: '80px 40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '80px',
        alignItems: 'start'
      }}>
        <h1 style={{
          fontSize: '80px',
          fontWeight: '700',
          color: '#ffffff',
          lineHeight: '1.05',
          margin: '0',
          paddingTop: '20px'
        }}>
          Frequently Asked Questions
        </h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0'
        }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              borderBottom: '1px solid #2a2a2a',
              paddingTop: index === 0 ? '0' : '0'
            }}>
              <button 
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  padding: '28px 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '20px',
                  fontWeight: '500',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <svg 
                    style={{
                      width: '18px',
                      height: '18px',
                      color: '#C99E1F',
                      flexShrink: '0'
                    }}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{faq.question}</span>
                </div>
                <svg 
                  style={{
                    width: '24px',
                    height: '24px',
                    color: '#666666',
                    flexShrink: '0',
                    transition: 'transform 0.3s',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openIndex === index && (
                <div style={{
                  paddingBottom: '28px',
                  paddingLeft: '34px',
                  color: '#999999',
                  fontSize: '17px',
                  lineHeight: '1.6',
                  animation: 'slideDown 0.3s ease-out'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          h1 {
            font-size: 56px !important;
          }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 42px !important;
          }
        }
      `}</style>
    </div>
  );
}