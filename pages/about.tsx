import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import clsx from 'clsx';
import DimensionLink from '@/components/common/DimensionLink';
import Link from 'next/link';
import AccentNormal from '@/components/shared/AccentNormal';

// Data definitions
const experiences = [
  {
    date: 'Nov 2023 — Present',
    title: 'Trainee Associate',
    company: 'Law Firm RR & Partners',
    location: 'Jakarta, Indonesia',
    description:
      'Assisting in legal research, document drafting, and case analysis for various corporate and commercial matters. Focusing on capital market regulations, M&A transactions, and technology law.',
    achievements: [
      'Led multiple legal research projects on capital market regulations and fintech compliance',
      'Drafted and reviewed various legal documents including contracts, memoranda, and legal opinions',
      'Assisted in due diligence processes for M&A transactions',
      'Conducted analysis on regulatory frameworks for crypto assets and blockchain technology',
    ],
    tags: [
      'Legal Research',
      'Document Drafting',
      'Corporate Law',
      'Capital Markets',
    ],
  },
  {
    date: 'Jan 2023 - Oct 2023',
    title: 'Legal Research Assistant',
    company: 'Technology Law Research Center',
    description:
      'Conducted comprehensive research on blockchain technology regulations, crypto assets, and their legal implications in Indonesia. Published several articles on legal tech innovation.',
    tags: ['Legal Tech', 'Blockchain Law', 'Research', 'Publications'],
  },
  {
    date: 'Jun 2022 - Dec 2022',
    title: 'Legal Intern',
    company: 'Corporate Law Firm',
    description:
      'Gained practical experience in corporate legal matters, including contract review, due diligence, and regulatory compliance. Assisted in preparing legal opinions and memoranda.',
    tags: ['Corporate Law', 'Due Diligence', 'Contract Review', 'Compliance'],
  },
];

const certifications = [
  {
    title: 'Capital Market Professional Basic 1',
    issuer: 'Himpunan Konsultan Hukum Sektor Keuangan',
    date: 'Not Yet',
    link: 'https://fhp-edulaw.com/ppkhpm/',
  },
  {
    title: 'Capital Market Professional Basic 2',
    issuer: 'Himpunan Konsultan Hukum Sektor Keuangan',
    date: 'Not Yet',
    link: 'https://fhp-edulaw.com/ppkhpm/',
  },
  {
    title: 'Certified Legal Auditor',
    issuer: 'Asosiasi Auditor Hukum Indonesia',
    date: 'Not Yet',
    link: 'https://www.jimlyschool.com/diklat/profesi-auditor-hukum-jslg-dan-asahi/',
  },
  {
    title: 'Receiver & Administrator of Bankruptcy',
    issuer: 'Asosiasi Kurator dan Pengurus Indonesia',
    date: '2022',
    link: 'http://www.pendaftaran-akpi.or.id/',
  },
];

const education = {
  degree: 'Bachelor of Law',
  school: 'Universitas Islam Indonesia',
  year: '2019 - 2023',
  achievements: [
    'Graduated with Cumlaude Predicate (GPA: 3.59)',
    'Focus on Corporate Law and Technology Law',
  ],
};

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
          <h1 className="text-center font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-tight">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="hero-text leading-relaxed text-center text-[0.95rem] md:text-[1.05rem]">
            My background, interests, and experiences.
          </p>
        </div>

        {/* Profile Section */}
        <div className="mt-8 max-w-6xl mx-auto relative" data-fade="2">
          {/* Photo Stack */}
          <div className="md:float-left md:w-[300px] lg:w-[400px] md:mr-8 mb-6 md:mb-0">
            <div className="relative w-full aspect-square group">
              {/* Background Stack Frames */}
              <div className="absolute inset-0 -z-10">
                {/* Third Frame (Bottom) */}
                {/* <div className="absolute inset-0 bg-black p-6 pb-20 border border-neutral-800 rotate-[15deg] translate-y-6" /> */}
                {/* Second Frame (Middle) - This will match the hover photo */}
                <div className="absolute inset-0 bg-black p-6 pb-20 border border-neutral-800 rotate-[8deg] translate-y-3" />
                {/* First Frame (Top) */}
                {/* <div className="absolute inset-0 bg-black p-6 pb-20 border border-neutral-800 rotate-[-8deg] translate-y-1" /> */}
              </div>

              {/* Front Photo (Default) */}
              <div
                className="relative bg-black p-6 pb-20 border border-neutral-800 shadow-md group-hover:opacity-0 group-hover:z-0"
                style={{
                  transform: 'rotate(-4.99902deg)',
                }}
              >
                <figure className="relative overflow-hidden select-none">
                  <div className="relative pt-[100%]">
                    <div className="absolute inset-0">
                      <Image
                        src="/images/AL-KINDI.png"
                        alt="AL KINDI Primary"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </figure>

                {/* Signature */}
                <div className="absolute bottom-6 -right-10 group-hover:opacity-0">
                  <svg
                    width="214"
                    height="30"
                    viewBox="0 0 114 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <text
                      x="10"
                      y="30"
                      fill="currentColor"
                      fontSize="20"
                      fontFamily="Apple Homemade"
                    >
                      Al Kindi
                    </text>
                  </svg>
                </div>
              </div>

              {/* Background Photo (Shows on Hover) */}
              <div
                className="absolute inset-0 bg-black p-6 pb-20 border-neutral-800 border opacity-0 group-hover:opacity-100"
                style={{
                  zIndex: 2,
                  transform: 'rotate(8deg) translateY(3px)',
                }}
              >
                <figure className="relative overflow-hidden select-none">
                  <div className="relative pt-[100%]">
                    <div className="absolute inset-0">
                      <Image
                        src="/images/ALKINDI-bag.png"
                        alt="AL KINDI Secondary"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </figure>
              </div>

              {/* Decorative Arrow */}
              <svg
                width="102"
                height="28"
                viewBox="0 0 102 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute z-10 top-[40%] -left-8"
              >
                <path
                  d="M100.5 14H1.5M1.5 14C1.5 14 8.5 7 8.5 1M1.5 14C1.5 14 8.5 21 8.5 27"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="prose prose-invert max-w-none">
            <p
              className="text-justify paragraph-text leading-relaxed"
              data-fade="2"
            >
              Hello! you can call me AL or KINDI or whatever you like. :D I'm a
              law graduate with a passion for writing and sharing knowledge. I
              focus on exploring and analyzing legal topics such as capital
              markets & securities, mergers and acquisitions (M&A), bankruptcy &
              insolvency, and the{' '}
              <AccentNormal>legal aspects of crypto assets</AccentNormal> in
              Indonesia.
            </p>

            <p
              className="text-justify paragraph-text leading-relaxed"
              data-fade="4"
            >
              Currently i'm looking for job as{' '}
              <AccentNormal>Trainee</AccentNormal> or{' '}
              <AccentNormal>Junior Associates</AccentNormal> so i can gain more
              experience in the field of law especially in the field of
              corporate & business law.
            </p>

            <p
              className="text-justify paragraph-text leading-relaxed"
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
              className="text-justify paragraph-text leading-relaxed"
              data-fade="6"
            >
              This blog is a platform where I bring together my expertise in law
              and technology to sharing knowledge for people who are interested
              in capital markets, M&A, bankruptcy, and crypto asset regulations.
            </p>
          </div>
          <div className="clear-both mb-20" />
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-5"
            data-fade="9"
          />
        </div>

        {/* Experience Section */}
        <section className="pb-20">
          <h2
            className="  font-sans text-[1.5rem] md:text-[2.5rem] font-bold tracking-tight leading-tight mb-0 text-center"
            data-fade="7"
          >
            <span className="gradient-text">Experiences</span>
          </h2>
          <div className="text-center">
            <p className="hero-text mb-4 inline-block" data-fade="8">
              Some experiences I've had in the past few years
            </p>
          </div>
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-14 mt-5"
            data-fade="9"
          />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <div key={index} className="group">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 data-fade-8">
                  {/* Left Column - Company */}
                  <div>
                    <div
                      className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider mb-2"
                      data-fade="10"
                    >
                      {exp.date}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Date and Title */}
                    <div>
                      <h3
                        className="font-sans leading-relaxed text-[1rem] md:text-[1.25rem] font-bold text-white mb-0"
                        data-fade="11"
                      >
                        {exp.title}
                      </h3>
                      <div
                        className="font-light text-[0.9rem] md:text-[0.975rem]"
                        data-fade="12"
                      >
                        <DimensionLink href="#">{exp.company}</DimensionLink>
                      </div>
                    </div>

                    {/* Description */}
                    <div
                      className="paragraph-text leading-relaxed"
                      data-fade="13"
                    >
                      {exp.description}
                    </div>

                    {/* Achievements */}
                    {exp.achievements && (
                      <ul className="space-y-4" data-fade="14">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-justify paragraph-text leading-relaxed"
                            data-fade="15"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {/* <div
                  className=" h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mt-6"
                  data-fade="10"
                /> */}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20">
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-5 mt-0"
            data-fade="9"
          />
          <h2
            className="font-sans text-[1.5rem] md:text-[2.5rem] font-bold tracking-tight leading-tight mb-0 text-center"
            data-fade="11"
          >
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-center hero-text mb-4" data-fade="12">
            I'm still learning and improving my skills, so i'm not yet certified
            in any field yet, but i'll do my best to get certified in the next
            few years.
          </p>
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-14 mt-10"
            data-fade="13"
          />
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <div key={index} className="group">
                <div className="space-y-4">
                  <div
                    className="text-sm text-gray-400 tracking-wider"
                    data-fade="14"
                  >
                    {cert.date}
                  </div>
                  <h3
                    className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors"
                    data-fade="15"
                  >
                    {cert.title}
                  </h3>
                  <div
                    className="flex items-center gap-2 text-sm"
                    data-fade="16"
                  >
                    <span className="font-medium text-emerald-400">
                      {cert.issuer}
                    </span>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-1 duration-300"
                      data-fade="17"
                    >
                      View Certificate
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  )}
                </div>
                {/* {index !== certifications.length - 1 && (
                  <div
                    className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mt-8"
                    data-fade="16"
                  />
                )} */}
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
