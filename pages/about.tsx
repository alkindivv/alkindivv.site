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
    date: 'Nov 2023 — Dec 2024',
    title: 'Trainee Associate',
    company: 'Law Firm RR & Partners',
    location: 'Jakarta',
    description:
      'Assisting in legal research, document drafting, and case analysis for various corporate and commercial matters.',
    achievements: [
      'Assisted in drafting and filing various legal documents, including lawsuits, warnings, and contracts, while ensuring compliance with applicable court procedures and legal standards',
      'Conducted in-depth legal research and case analysis to support court submissions and legal opinions, utilizing legal databases and academic resources',
      "Collaborated with senior associates in case strategy meetings, contributing to the preparation of legal arguments and solutions tailored to clients' needs",
    ],
  },

  {
    date: 'Jan 2022 — Feb 2022',
    title: 'Legal Intern',
    company:
      'Ariyanto & Rekan, Wahyu Priyanka & Partners, Erlan Nopri & Partners',
    location: 'Yogyakarta',
    description:
      'Completed a one-month internship at three law firms simultaneously, gaining comprehensive experience in various aspects of legal practice.',
    achievements: [
      'Gained insights and experience in legal drafting and research',
      'Assisted in the management and establishment of a law firm',
      'Learning how to preparing legal opinion for clients',
    ],
  },
  {
    date: 'Feb 2021 — Dec 2023',
    title: 'Freelancer',
    company: 'Fiverr',
    location: 'Remote',
    description:
      'Improved English communication and negotiation skills through international client interactions on Fiverr.',
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
          </div>

          {/* Text Content */}
          <div className="prose prose-invert max-w-none">
            <p
              className="text-justify paragraph-text leading-relaxed"
              data-fade="2"
            >
              Hello! you can call me <AccentNormal>AL</AccentNormal> or{' '}
              <AccentNormal>KINDI</AccentNormal> I'm a law graduate with a
              passion for writing and sharing knowledge. I focus on exploring
              and analyzing legal topics such as capital markets & securities,
              mergers and acquisitions (M&A), bankruptcy & insolvency, and the
              legal aspects of crypto assets in Indonesia.
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
        <section className="pb-5">
          <h2
            className="  font-sans text-[1.75rem] md:text-[2.75rem] font-bold tracking-tight leading-tight mb-0 text-center"
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
                      className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider -mb-10 md:-mb-0"
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
                        className="font-sans leading-relaxed text-[1.25rem] md:text-[1.5rem] font-bold text-white mb-0"
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
