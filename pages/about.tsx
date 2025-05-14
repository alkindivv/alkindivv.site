import React from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import clsx from 'clsx';
import DimensionLink from '@/components/common/DimensionLink';
import AccentNormal from '@/components/shared/AccentNormal';

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        templateTitle="About"
        description="Learn about AL KINDI - A legal professional specializing in capital markets, M&A, bankruptcy, and crypto regulations. Discover my background, expertise, and professional journey."
        banner="/images/default.png"
      />

      {/* Background Effect */}
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[400px] w-[550px] rounded-full bg-gradient-to-r from-[#2E996C]/70 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
        />
        <Image
          alt=""
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled-3.jpg"
          priority
        />
      </div>

      <main className={clsx('content-spacing')}>
        {/* Header Section */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mt-10 relative space-y-1 text-center" data-fade="1">
              <h1 className="text-center font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-tight">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="hero-text inline-block text-center text-[0.95rem] md:text-[1.05rem]">
                My background, interests, and experiences.
              </p>
            </div>
            <div className="mt-5  h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

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
                  passion for writing and sharing knowledge. I focus on
                  exploring and analyzing legal topics such as capital markets &
                  securities, mergers and acquisitions (M&A), bankruptcy &
                  insolvency, and the legal aspects of crypto assets in
                  Indonesia.
                </p>

                <p
                  className="text-justify paragraph-text leading-relaxed"
                  data-fade="4"
                >
                  Currently i'm looking for job as{' '}
                  <AccentNormal>Trainee</AccentNormal> or{' '}
                  <AccentNormal>Junior Associates</AccentNormal> so i can gain
                  more experience in the field of law especially in the field of
                  corporate & business law.
                </p>

                <p
                  className="text-justify paragraph-text leading-relaxed"
                  data-fade="5"
                >
                  Since 2018, I have been deeply immersed in studying blockchain
                  technology, which has given me a unique perspective on the
                  legal and compliance issues surrounding decentralized systems.
                  I actively engage in projects related to crypto regulations
                  and blockchain governance, helping to bridge the gap between
                  legal practice and technological innovation.
                </p>

                <p
                  className="text-justify paragraph-text leading-relaxed"
                  data-fade="6"
                >
                  This blog is a platform where I bring together my expertise in
                  law and technology to sharing knowledge for people who are
                  interested in capital markets, M&A, bankruptcy, and crypto
                  asset regulations.
                </p>
              </div>
              <div className="clear-both mb-20" />
              <div
                className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-5"
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
                className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-14 mt-5"
                data-fade="9"
              />

              <div className="space-y-14">
                {/* Experience 1 */}
                <div className="group">
                  <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 data-fade-8">
                    <div>
                      <div
                        className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider -mb-10 md:-mb-0"
                        data-fade="10"
                      >
                        Nov 2023 — Dec 2024
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3
                          className="font-sans leading-relaxed text-[1.25rem] md:text-[1.5rem] font-bold text-white mb-0"
                          data-fade="11"
                        >
                          Internship
                        </h3>
                        <div
                          className="font-light text-[0.9rem] md:text-[0.975rem]"
                          data-fade="12"
                        >
                          <DimensionLink href="#">
                            Law Firm RR & Partners
                          </DimensionLink>
                        </div>
                      </div>

                      <div
                        className="paragraph-text leading-relaxed"
                        data-fade="13"
                      >
                        {/* Assisting in legal research, document drafting, and case
                        analysis for various corporate and commercial matters. */}
                      </div>

                      <ul className="space-y-4" data-fade="14">
                        <li
                          className="flex gap-3 text-justify paragraph-text leading-relaxed"
                          data-fade="15"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                          <span>
                            Assisted in drafting and filing various legal
                            documents, including lawsuits, and contracts, while
                            ensuring compliance with applicable court procedures
                          </span>
                        </li>
                        <li
                          className="flex gap-3 text-justify paragraph-text leading-relaxed"
                          data-fade="15"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                          <span>
                            Conducted through legal research and case analysis
                            to support utilizing legal databases and academic
                            resources.
                          </span>
                        </li>
                        <li
                          className="flex gap-3 text-justify paragraph-text leading-relaxed"
                          data-fade="15"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                          <span>
                            Collaborated in case strategy meetings, contributing
                            to tailored legal arguments and solutions.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Experience 2 */}
                <div className="group">
                  <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 data-fade-8">
                    <div>
                      <div
                        className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider -mb-10 md:-mb-0"
                        data-fade="10"
                      >
                        Jan 2022 — Feb 2022
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3
                          className="font-sans leading-relaxed text-[1.25rem] md:text-[1.5rem] font-bold text-white mb-0"
                          data-fade="11"
                        >
                          Legal Intern
                        </h3>
                        <div
                          className="font-light text-[0.9rem] md:text-[0.975rem]"
                          data-fade="12"
                        >
                          <DimensionLink href="https://www.linkedin.com/company/wahyu-priyanka-partners/posts/?feedView=all">
                            Ariyanto & Rekan, Wahyu Priyanka & Partners, Erlan
                            Nopri & Partners
                          </DimensionLink>
                        </div>
                      </div>

                      <div
                        className="paragraph-text leading-relaxed"
                        data-fade="13"
                      >
                        Completed a mandatory internship course as part of the
                        undergraduate law curriculum.
                      </div>

                      <ul className="space-y-4" data-fade="14">
                        <li
                          className="flex gap-3 text-justify paragraph-text leading-relaxed"
                          data-fade="15"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                          <span>
                            Interned simultaneously at three law firms to gain
                            broader exposure to legal practice
                          </span>
                        </li>
                        <li
                          className="flex gap-3 text-justify paragraph-text leading-relaxed"
                          data-fade="15"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                          <span>
                            Developed practical skills in legal drafting,
                            research, and courtroom procedures.
                          </span>
                        </li>
                        <li
                          className="flex gap-3 text-justify paragraph-text leading-relaxed"
                          data-fade="15"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                          <span>
                            Developed foundational advocacy techniques and
                            assisted in administrative tasks related to the
                            management and establishment of a law office.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Experience 3 */}
                <div className="group">
                  <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 data-fade-8">
                    <div>
                      <div
                        className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider -mb-10 md:-mb-0"
                        data-fade="10"
                      >
                        Feb 2021 — Dec 2023
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3
                          className="font-sans leading-relaxed text-[1.25rem] md:text-[1.5rem] font-bold text-white mb-0"
                          data-fade="11"
                        >
                          Freelancer
                        </h3>
                        <div
                          className="font-light text-[0.9rem] md:text-[0.975rem]"
                          data-fade="12"
                        >
                          <DimensionLink href="https://www.fiverr.com/rizkil">
                            Fiverr
                          </DimensionLink>
                        </div>
                      </div>

                      <div
                        className="paragraph-text leading-relaxed"
                        data-fade="13"
                      >
                        <ul className="space-y-4" data-fade="14">
                          <li
                            className="flex gap-3 text-justify paragraph-text leading-relaxed"
                            data-fade="15"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                            <span>
                              Install and configure macOS on non-Apple hardware,
                              ensuring full system functionality and performance
                              optimization.
                            </span>
                          </li>
                          <li
                            className="flex gap-3 text-justify paragraph-text leading-relaxed"
                            data-fade="15"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                            <span>
                              Analyze and optimize hardware compatibility to
                              ensure a fully functional macOS on non-Apple
                              hardware
                            </span>
                          </li>
                          <li
                            className="flex gap-3 text-justify paragraph-text leading-relaxed"
                            data-fade="15"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                            <span>
                              Customize configurations according to client
                              specifications (laptop/desktop model, CPU, GPU,
                              RAM, etc.)
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
