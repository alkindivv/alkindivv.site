import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import clsx from 'clsx';
import DimensionLink from '@/components/DimensionLink';
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

      <main
        className={clsx(
          'content-spacing fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
        {/* Header Section */}
        <div className="mt-24 relative" data-fade="1">
          <h1 className="mb-2 text-3xl md:text-4xl 2xl:text-5xl font-bold tracking-tight">
            About <Accent>Me</Accent>
          </h1>
          <p className="text-sm md:text-base 2xl:text-lg font-light text-gray-400 leading-relaxed">
            Learn more about my background, interests, and experiences.
          </p>
        </div>

        {/* Profile Section */}
        <div className="mt-8 max-w-6xl mx-auto relative" data-fade="2">
          {/* Photo and Buttons Column - Fixed Width */}
          <div className="md:float-left md:w-[300px] lg:w-[400px] md:mr-8 mb-6 md:mb-0">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/images/AL-KINDI.png"
                alt="AL KINDI"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* <div
              className="flex justify-center md:justify-start gap-4 mt-6"
              data-fade="3"
            >
              <Link href="/contact" className="gradient-button">
                Contact Me
              </Link>
              <DimensionLink
                href="https://www.fiverr.com/s/5r5xxG6"
                className="no-gradient-button"
              >
                Hire on Fiverr
              </DimensionLink>
            </div> */}
          </div>

          {/* Text Content - Will flow around the image */}
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold md:text-3xl mb-2">
              Hi, I'm <Accent>AL KINDI</Accent>
            </h2>
            <p
              className="text-justify leading-relaxed text-sm md:text-base 2xl:text-lg font-light text-gray-400"
              data-fade="2"
            >
              a law graduate with a passion for writing and sharing knowledge. I
              focus on exploring and analyzing legal topics such as{' '}
              <AccentNormal>
                capital markets & securities, mergers and acquisitions (M&A),
                bankruptcy & insolvency,
              </AccentNormal>{' '}
              and the{' '}
              <AccentNormal>legal aspects of crypto assets</AccentNormal> in
              Indonesia.
            </p>

            <p
              className="text-justify leading-relaxed text-sm md:text-base 2xl:text-lg font-light text-gray-400"
              data-fade="3"
            >
              In my legal journey, I have completed the Pendidikan Khusus
              Profesi Advokat (PKPA) from PERADI, strengthening my foundation in
              legal practice. My academic achievements include graduating with
              Cumlaude honors (GPA: 3.59) from the Faculty of Law, Universitas
              Islam Indonesia, with a focus on Private law.
            </p>

            <p
              className="text-justify leading-relaxed text-sm md:text-base 2xl:text-lg font-light text-gray-400"
              data-fade="4"
            >
              During my academic years, I have participated in legal
              competitions and activities, including legal research dan debate.
              These experiences have sharpened my analytical skills and deepened
              my understanding of practical legal issues. Currently i'm looking
              for job as <AccentNormal>Trainee</AccentNormal> or{' '}
              <AccentNormal>Junior Associates</AccentNormal> so i can gain more
              experience in the field of law especially in the field of
              corporate law, capital markets, mergers and acquisitions, and
              bankruptcy.
            </p>

            <p
              className="text-justify mt-8 leading-relaxed text-sm md:text-base 2xl:text-lg font-light text-gray-400"
              data-fade="5"
            >
              Since 2018, I have been deeply immersed in studying blockchain
              technology, which has given me a unique perspective on the legal
              and compliance issues surrounding decentralized systems. I
              actively engage in projects related to crypto regulations and
              blockchain governance, helping to bridge the gap between legal
              practice and technological innovation.
            </p>

            <p
              className="text-justify leading-relaxed text-sm md:text-base 2xl:text-lg font-light text-gray-400"
              data-fade="6"
            >
              This blog is a platform where I bring together my expertise in law
              and technology to sharing knowledge for people who are interested
              in capital markets, M&A, bankruptcy, and crypto asset regulations.
            </p>
          </div>
          <div className="clear-both"></div>
        </div>

        {/* Current Focus Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center" data-fade="5">
              Focus & <Accent>Interest</Accent>
            </h2>
            <div className="grid md:grid-cols-4 gap-8" data-fade="6">
              {/* Corporate Law */}
              <div className="group p-6 border border-gray-700 rounded-xl bg-gray-800/30 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-900/30 rounded-lg group-hover:bg-emerald-900/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-400 font-semibold group-hover:text-emerald-400 transition-colors">
                    Mergers & Acquisitions
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Due Diligence & Compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Business Restructuring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Strategic Transactions
                  </li>
                </ul>
              </div>

              {/* Capital Markets */}
              <div className="group p-6 border border-gray-700 rounded-xl bg-gray-800/30 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-900/30 rounded-lg group-hover:bg-emerald-900/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                    Capital Markets
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Securities Regulations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Financial Regulations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    IPO Procedures
                  </li>
                </ul>
              </div>

              {/* Bankruptcy Law */}
              <div className="group p-6 border border-gray-700 rounded-xl bg-gray-800/30 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-900/30 rounded-lg group-hover:bg-emerald-900/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                    Bankruptcy
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    PKPU Procedures
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Debt Restructuring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Asset Liquidation
                  </li>
                </ul>
              </div>

              {/* Crypto Regulations */}
              <div className="group p-6 border border-gray-700 rounded-xl bg-gray-800/30 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-900/30 rounded-lg group-hover:bg-emerald-900/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                    Crypto Assets
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Digital Asset Laws
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Regulatory Compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Trading Frameworks
                  </li>
                </ul>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="grid md:grid-cols-2 gap-8 mt-12" data-fade="7">
              <div
                className="p-6 border border-gray-700 rounded-xl bg-gray-800/30"
                data-fade="8"
              >
                <h3 className="text-lg font-semibold mb-6">Current Progress</h3>
                <div className="space-y-4 text-gray-400">
                  {[
                    { label: ' Mergers & Acquisitions', progress: 65 },
                    { label: 'Capital Markets', progress: 60 },
                    { label: 'Bankruptcy', progress: 40 },
                    { label: 'Crypto Regulations', progress: 50 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2" data-fade={9 + idx}>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-emerald-500">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-6 border border-gray-700 rounded-xl bg-gray-800/30"
                data-fade="13"
              >
                <h3 className="text-lg font-semibold mb-6">
                  Learning Resources
                </h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    'Legal Research Databases',
                    'Professional Certifications',
                    'Industry Publications',
                    'Expert Consultations',
                    'Academic Journals',
                  ].map((resource, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-400"
                      data-fade={14 + idx}
                    >
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Experience Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl text-center font-bold mb-8" data-fade="19">
              Education & <Accent>Experience</Accent>
            </h2>
            <div className="space-y-8 ">
              {[
                {
                  year: 'Nov 2023 - Sep 2024',
                  title: 'Trainee Associate',
                  organization: 'Law Firm RR & Partners',
                  location: 'Jakarta',
                  type: 'Experience',
                  description: [
                    'Assisted in legal drafting and filing of various legal documents, including lawsuits and warnings, ensuring compliance with court procedures.',
                    'Conducted thorough legal research and case analysis for court submissions, utilizing legal databases and resources to support case arguments.',
                    'Collaborated closely with senior associates and partners, gaining valuable insights and practical knowledge in the legal field.',
                    'Participated in meetings and discussions to strategize case approaches, enhancing teamwork and communication skills within the firm.',
                  ],
                },
                {
                  year: 'Feb 2021 - Present',
                  title: 'Freelance Developer',
                  organization: 'Fiverr',
                  location: 'Remote',
                  type: 'Experience',
                  description: [
                    'Provide solutions for clients in the technology field.',
                  ],
                },
                {
                  year: 'Jan 2022 - Feb 2022',
                  title: 'Legal Internship',
                  organization: 'Multiple Law Firms',
                  location: 'Yogyakarta',
                  type: 'Experience',
                  description: [
                    'Completed a one-month internship at three law firms simultaneously: Ariyanto & Rekan, Wahyu Priyanka & Partners, and Erlan Nopri & Partners',
                    'Gained insights and experience in legal drafting and research',
                    'Prepared legal opinions and conducted due diligence',
                    'Assisted in the management and establishment of a law firm',
                  ],
                },
                {
                  year: 'Aug 2019 - Aug 2023',
                  title: 'Bachelor of Law',
                  organization: 'Universitas Islam Indonesia',
                  location: 'Yogyakarta',
                  type: 'Education',
                  description: [
                    'Graduated with Cumlaude Predicate',
                    'GPA: 3.59',
                    'Focus on Corporate Law and Technology Law',
                  ],
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-gray-700 rounded-xl bg-gray-800/30 hover:border-emerald-500/50 transition-all duration-300"
                  data-fade={20 + idx}
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-emerald-400 font-mono">
                      {item.year}
                    </span>
                    <span className="px-2 py-1 text-xs bg-emerald-900/30 rounded-full">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>@{item.organization}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-400 list-disc list-inside">
                    {Array.isArray(item.description) ? (
                      item.description.map((desc, i) => (
                        <li key={i} className="text-gray-400">
                          {desc}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-400">{item.description}</p>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
