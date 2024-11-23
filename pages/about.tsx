import Layout from '@/components/Layout';
import { useState } from 'react';
import clsx from 'clsx';
import { useEffect } from 'react';
import Accent from '@/components/Accent';
import DimensionLink from '@/components/DimensionLink';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="About | alkindivv.site">
      <main
        className={clsx(
          'mt-5 sm:-mt-20 md:-mt-10 2xl:-mt-30 fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
        {/* Hero Section */}
        <section className="relative min-h-[5vh] flex items-center py-1 md:py-12">
          <div className="absolute inset-0"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative order-1 md:order-2 w-full" data-fade="4">
                <div className="relative -mx-4 sm:-mx-6 md:mx-0 aspect-square md:max-w-md  md:w-full">
                  {/* <div
                    className="absolute -inset-0.5 rounded-none md:rounded-2xl"
                    style={{
                      zIndex: 1,
                      filter: 'blur(25px)',
                      animation:
                        'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      opacity: 0.5,
                      background:
                        'linear-gradient(to bottom, rgba(16, 185, 129, 0.4), transparent 50%)',
                      mixBlendMode: 'overlay',
                    }}
                  /> */}

                  {/* <div
                    className="absolute bottom-0 left-0 right-0 h-[60%] rounded-none md:rounded-b-2xl"
                    style={{
                      zIndex: 2,
                      background:
                        'linear-gradient(to top, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0.95) 20%, rgba(17, 17, 17, 0.8) 40%, rgba(17, 17, 17, 0.6) 60%, rgba(17, 17, 17, 0.2) 80%, transparent)',
                      mixBlendMode: 'multiply',
                    }}
                  /> */}

                  {/* <Image
                    src="/images/AL-KINDI.png"
                    alt="AL KINDI"
                    className="md:ml-[70px] 2xl:ml-[70px] relative w-full h-full object-contain rounded-none md:rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[0.9]"
                    width={500}
                    height={500}
                    priority
                  /> */}

                  <Image
                    src="/images/AL-KINDI.png"
                    alt="AL KINDI"
                    className="relative w-full h-full
                  object-cover scale-75 md:scale-[1] rounded-none md:rounded-2xl shadow-lg md:ml-[80px] 2xl:ml-[80px]"
                    // transition-transform duration-300 hover:scale-[1]"
                    width={400}
                    height={400}
                    priority
                  />
                </div>
              </div>

              <div className="space-y-6 order-2 md:order-1 md:text-left ">
                <h1
                  className="text-3xl md:text-4xl 2xl:text-5xl  font-bold"
                  data-fade="1"
                >
                  About <Accent>Me</Accent>
                </h1>
                <p className="text-gray-300 leading-relaxed" data-fade="2">
                  Hello! I&apos;m <Accent>AL KINDI</Accent> — a law graduate
                  with a unique blend of expertise in legal practice and
                  technology In the crypto space, I&apos;m deeply engaged with
                  blockchain technology and have been following and studying it
                  since 2018. I run nodes, validators, and regularly participate
                  in testnets and airdrops, aiming to stay at the forefront of{' '}
                  <DimensionLink href="#">decentralized</DimensionLink>{' '}
                  technology advancements.
                  <br />
                  <br />
                  Through this blog, I share insights and tutorials related to
                  my experiences in both law and technology. You&apos;ll find
                  articles on legal issues in fintech, guides on testnets and
                  airdrops, as well as tips on system setups and optimizations.
                  I hope this blog serves as a resourceful place for both
                  beginners and seasoned professionals interested in the
                  convergence of law, technology, and blockchain.
                </p>
                <div
                  className="flex justify-center md:justify-start gap-4"
                  data-fade="3"
                >
                  <Link
                    href="/contact"
                    className="gradient-button text-sm md:text-base 2xl:text-lg  px-3 md:px-3 py-1.5 md:py-2.5"
                  >
                    Contact Me
                  </Link>
                  <DimensionLink
                    href="https://www.fiverr.com/s/5r5xxG6"
                    className="no-gradient-button"
                  >
                    Hire on Fiverr
                  </DimensionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center" data-fade="5">
              Current <Accent>Focus</Accent>
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
                  <h3 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                    Corporate Law
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Company Establishment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Corporate Governance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Business Contracts
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
                <ul className="space-y-3 text-gray-300">
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
                <ul className="space-y-3 text-gray-300">
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
                <ul className="space-y-3 text-gray-300">
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
                <div className="space-y-4">
                  {[
                    { label: 'Corporate Law Studies', progress: 75 },
                    { label: 'Bankruptcy Law', progress: 70 },
                    { label: 'Capital Markets Knowledge', progress: 70 },
                    { label: 'Crypto Regulations', progress: 80 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2" data-fade={9 + idx}>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.label}</span>
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
                <ul className="space-y-3">
                  {[
                    'Legal Research Databases',
                    'Professional Certifications',
                    'Industry Publications',
                    'Expert Consultations',
                    'Academic Journals',
                  ].map((resource, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-300"
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
            <div className="space-y-8">
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
                  <ul className="space-y-2 text-gray-300 list-disc list-inside">
                    {Array.isArray(item.description) ? (
                      item.description.map((desc, i) => (
                        <li key={i} className="text-gray-300">
                          {desc}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-300">{item.description}</p>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6" data-fade="22">
              Let&apos;s <Accent>Connect</Accent>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto" data-fade="23">
              Interested in discussing legal tech solutions or need help with
              blockchain development? Feel free to reach out!
            </p>
            <div className="flex justify-center gap-4" data-fade="24">
              <Link href="/contact" className="gradient-button">
                Get in Touch
              </Link>
              <DimensionLink
                href="https://www.fiverr.com/s/5r5xxG6"
                className="no-gradient-button"
              >
                Hire Me
              </DimensionLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
