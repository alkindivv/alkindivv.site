import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import clsx from 'clsx';
import Link from 'next/link';
import AccentNormal from '@/components/shared/AccentNormal';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <SEO
        templateTitle="About"
        description="Learn about AL KINDI - A legal professional specializing in capital markets, M&A, bankruptcy, and crypto regulations. Discover my background, expertise, and professional journey."
        banner="/images/AL-KINDI.png"
      />

      <main className={clsx('fade-wrapper', !isLoaded && 'opacity-0')}>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12 items-start">
              {/* Left Column - Photo & Info */}
              <div className="space-y-6">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-900/50 border border-gray-800">
                  <Image
                    src="/images/AL-KINDI.png"
                    alt="AL KINDI"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="grid gap-4">
                  <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="font-medium">Current Position</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Trainee Associate at Law Firm RR & Partners
                    </p>
                  </div>

                  <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <h3 className="font-medium">Location</h3>
                    </div>
                    <p className="text-sm text-gray-400">Jakarta, Indonesia</p>
                  </div>

                  <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      <h3 className="font-medium">Focus Areas</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Corporate Law
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Capital Markets
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Crypto Law
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Me
                  </Link>
                  <a
                    href="https://www.fiverr.com/s/5r5xxG6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-emerald-600/30 hover:border-emerald-500/50 rounded text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Hire on Fiverr
                  </a>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-4">
                    Hi, I'm <Accent>AL KINDI</Accent>
                  </h1>
                  <p className="text-lg text-gray-400">
                    Legal Professional & Tech Enthusiast
                  </p>
                </div>

                <div className="prose prose-invert max-w-none space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    A law graduate with expertise in{' '}
                    <AccentNormal>
                      capital markets, M&A, bankruptcy,
                    </AccentNormal>{' '}
                    and <AccentNormal>crypto regulations</AccentNormal>.
                    Combining legal knowledge with tech understanding to bridge
                    the gap between traditional legal practices and emerging
                    technologies.
                  </p>

                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                      Key Achievements
                    </h2>
                    <div className="grid gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-emerald-500/10 rounded-full mt-1">
                          <svg
                            className="w-3 h-3 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-200">
                            PERADI Certified Legal Professional
                          </h3>
                          <p className="text-sm text-gray-400">
                            Completed Professional Legal Training Program
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-emerald-500/10 rounded-full mt-1">
                          <svg
                            className="w-3 h-3 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-200">
                            Academic Excellence
                          </h3>
                          <p className="text-sm text-gray-400">
                            Graduated Cumlaude with GPA 3.59/4.00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-emerald-500/10 rounded-full mt-1">
                          <svg
                            className="w-3 h-3 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-200">
                            Tech Integration
                          </h3>
                          <p className="text-sm text-gray-400">
                            Expertise in blockchain technology and legal tech
                            solutions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="container mx-auto px-4 py-16 bg-gray-900/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-12 text-center">
              Professional <Accent>Expertise</Accent>
            </h2>

            <div className="grid gap-8">
              {/* Legal Skills */}
              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                  Legal Expertise
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Corporate Law</span>
                        <span className="text-emerald-400">90%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: '90%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Capital Markets</span>
                        <span className="text-emerald-400">85%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: '85%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">M&A</span>
                        <span className="text-emerald-400">80%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: '80%' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Bankruptcy Law</span>
                        <span className="text-emerald-400">75%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: '75%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">
                          Crypto Regulations
                        </span>
                        <span className="text-emerald-400">85%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: '85%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Legal Research</span>
                        <span className="text-emerald-400">95%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: '95%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  Technical Skills
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-medium mb-3">Blockchain</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Smart Contracts
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        DeFi
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        NFTs
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-medium mb-3">Development</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Web Development
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        React
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Node.js
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-medium mb-3">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Legal Research
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Documentation
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
                        Analysis
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-12 text-center">
              Professional <Accent>Journey</Accent>
            </h2>

            <div className="space-y-8">
              {[
                {
                  year: 'Nov 2023 - Sep 2024',
                  title: 'Trainee Associate',
                  organization: 'Law Firm RR & Partners',
                  location: 'Jakarta',
                  type: 'Experience',
                  description: [
                    'Legal drafting and documentation',
                    'Court procedure compliance',
                    'Case analysis and research',
                    'Client consultation support',
                  ],
                },
                {
                  year: 'Feb 2021 - Present',
                  title: 'Freelance Developer',
                  organization: 'Fiverr',
                  location: 'Remote',
                  type: 'Experience',
                  description: [
                    'Web development solutions',
                    'Technical consulting',
                    'Client project management',
                  ],
                },
                {
                  year: 'Jan 2022 - Feb 2022',
                  title: 'Legal Internship',
                  organization: 'Multiple Law Firms',
                  location: 'Yogyakarta',
                  type: 'Experience',
                  description: [
                    'Legal research and analysis',
                    'Document preparation',
                    'Case management support',
                    'Client communication',
                  ],
                },
                {
                  year: 'Aug 2019 - Aug 2023',
                  title: 'Bachelor of Law',
                  organization: 'Universitas Islam Indonesia',
                  location: 'Yogyakarta',
                  type: 'Education',
                  description: [
                    'Cumlaude Graduate (GPA: 3.59)',
                    'Corporate Law Specialization',
                    'Legal Research Excellence',
                  ],
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex items-start gap-8 group"
                >
                  {/* Timeline Line & Dot */}
                  <div className="hidden md:block absolute left-[7.5rem] top-0 bottom-0 w-px bg-gray-800 group-last:bg-gradient-to-b group-last:from-gray-800 group-last:to-transparent">
                    <div className="absolute left-1/2 top-7 w-2.5 h-2.5 -translate-x-1/2 rounded-full border-2 border-emerald-500 bg-gray-900" />
                  </div>

                  {/* Date */}
                  <div className="w-[7.5rem] pt-5 text-sm text-emerald-400 font-medium">
                    {item.year}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 rounded-lg bg-gray-900/50 border border-gray-800">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <span className="px-2 py-1 text-xs bg-gray-800 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      {item.organization} • {item.location}
                    </p>
                    <ul className="space-y-2">
                      {item.description.map((desc, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-16 bg-gray-900/30">
          <div className="max-w-5xl mx-auto">
            <div className="p-8 rounded-lg bg-gray-900/50 border border-gray-800">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Let's <Accent>Connect</Accent>
                </h2>
                <p className="text-gray-400">
                  Interested in working together? Feel free to reach out.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 p-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Send a Message
                </Link>
                <a
                  href="https://www.fiverr.com/s/5r5xxG6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 border border-emerald-600/30 hover:border-emerald-500/50 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  View Fiverr Profile
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
