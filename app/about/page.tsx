import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Breadcrumb from '@/components/shared/Breadcrumb';
import DimensionLink from '@/components/common/DimensionLink';
import AccentNormal from '@/components/shared/AccentNormal';
import { IoCalendarOutline } from 'react-icons/io5';

import { viewport } from '../viewport';

export { viewport };

export const metadata: Metadata = {
  title: 'About',
  description:
    'Im a law graduate with a passion for writing and sharing knowledge. I focus on exploring and analyzing legal topics such as capital markets & securities, mergers and acquisitions (M&A), bankruptcy & insolvency, and the legal aspects of crypto assets in Indonesia.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About - AL KINDI',
    description:
      'Im a law graduate with a passion for writing and sharing knowledge. I focus on exploring and analyzing legal topics such as capital markets & securities, mergers and acquisitions (M&A), bankruptcy & insolvency, and the legal aspects of crypto assets in Indonesia.',
    url: '/about/',
    type: 'website',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'AL KINDI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - AL KINDI',
    description:
      'Im a law graduate with a passion for writing and sharing knowledge. I focus on exploring and analyzing legal topics such as capital markets & securities, mergers and acquisitions (M&A), bankruptcy & insolvency, and the legal aspects of crypto assets in Indonesia.',
    images: ['/images/default.png'],
  },
};

const AboutPage = () => {
  const breadcrumbItems = [{ label: 'About' }];

  return (
    <Layout>
      {/* Background Effect - Legal Themed */}
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
          width={280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/s.jpeg"
          priority
        />

        {/* Legal paper texture */}
        <div
          className="absolute inset-0 opacity-10 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
          }}
        />
      </div>

      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section - Legal Styled */}
          <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-neutral-400 leading-relaxed text-center">
              Background, qualifications, and expertise
            </p>
            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Profile Section - Legal Styled */}
          <div className="mt-8 max-w-6xl mx-auto relative" data-fade="2">
            {/* Photo and Buttons Column - Fixed Width */}
            <div className="md:float-left md:w-[300px] lg:w-[400px] md:mr-8 mb-6 md:mb-0">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300 border border-emerald-900/20">
                <Image
                  src="/images/AL-KINDI.png"
                  alt="AL KINDI"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Legal stamp/watermark */}
              </div>
            </div>

            {/* Text Content - Legal Styled */}
            <div className="prose prose-invert max-w-none ">
              <p
                className="text-justify paragraph-text leading-relaxed"
                data-fade="2"
              >
                Hello! you can call me <AccentNormal>AL</AccentNormal> or{' '}
                <AccentNormal>KINDI</AccentNormal>. I hold a law degree and have
                always enjoyed writing and sharing what I learn. I’m someone who
                is naturally curious and always eager to learn new things,
                whether it's about law, technology, or anything else.
              </p>

              <p
                className="text-justify paragraph-text leading-relaxed"
                data-fade="4"
              >
                Throughout my life, I’ve explored various fields — I’m a law
                graduate, a trader, a developer, and a writer. Despite my
                diverse interests, my main focus remains on building a career in
                law. Currently, I am seeking opportunities as a{' '}
                <AccentNormal>Legal Intern</AccentNormal>,
                <AccentNormal>Trainee</AccentNormal> or{' '}
                <AccentNormal>Junior Associates</AccentNormal> at a law firm,
                particularly in the M&A practice area. I’m eager to grow, learn,
                and gain valuable experience from seasoned professionals in the
                legal industry.
              </p>

              <p
                className="text-justify paragraph-text leading-relaxed"
                data-fade="5"
              >
                Since 2018, I have been deeply immersed in studying
                cryptocurrency and blockchain technology. This ongoing journey
                has given me a unique perspective on the regulatory, and
                compliance challenges surrounding decentralized and centralized
                systems. In addition to self-study and project involvement, I am
                also actively engaged in the Indonesian crypto community. Being
                part of this community has not only broadened my understanding
                of the ecosystem but has also helped me build a strong
                professional individuals network.
              </p>

              <p
                className="text-justify paragraph-text leading-relaxed"
                data-fade="6"
              >
                Through this blog, I combine my knowledge of law and technology
                to share insights with a wider audience. I write about topics
                such as capital markets, mergers and acquisitions, bankruptcy
                law, and crypto asset regulations — hoping to make complex
                subjects more accessible and engaging for readers who are as
                passionate about these areas as I am.
              </p>
            </div>
            <div className="clear-both mb-20" />
          </div>

          {/* Experience Section - Legal Styled */}
          <section className="pb-5 pt-25">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center mt-24">
              <span className="gradient-text">Experiences</span>
            </h2>

            <div
              className="space-y-14"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 800ms ease-out, transform 800ms ease-out',
                transitionDelay: '1100ms',
              }}
            >
              {/* Experience 1 - Legal Styled */}
              <div className="group relative backdrop-blur-md border border-emerald-900/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.03)] pt-6">
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 data-fade-8">
                  <div>
                    <div
                      className="paragraph-text text-[0.75rem] md:text-[0.85rem] leading-relaxed tracking-wider  -mb-10 md:-mb-0 flex items-center"
                      data-fade="10"
                    >
                      <IoCalendarOutline className="w-3.5 h-3.5 text-neutral-50 mr-2" />
                      <span>Nov 2023 — Dec 2024</span>
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
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
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
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
                        <span>
                          Conducted through legal research and case analysis to
                          support utilizing legal databases and academic
                          resources.
                        </span>
                      </li>
                      <li
                        className="flex gap-3 text-justify paragraph-text leading-relaxed"
                        data-fade="15"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
                        <span>
                          Collaborated in case strategy meetings, contributing
                          to tailored legal arguments and solutions.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Experience 2 - Legal Styled */}
              <div className="group relative backdrop-blur-md border border-emerald-900/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.03)] pt-6">
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 data-fade-8">
                  <div>
                    <div
                      className="paragraph-text text-[0.75rem] md:text-[0.85rem] leading-relaxed tracking-wider -mb-10 md:-mb-0 flex items-center"
                      data-fade="10"
                    >
                      <IoCalendarOutline className="w-3.5 h-3.5 text-neutral-50 mr-2" />
                      <span>Jan 2022 — Feb 2022</span>
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
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
                        <span>
                          Interned simultaneously at three law firms to gain
                          broader exposure to legal practice
                        </span>
                      </li>
                      <li
                        className="flex gap-3 text-justify paragraph-text leading-relaxed"
                        data-fade="15"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
                        <span>
                          Developed practical skills in legal drafting,
                          research, and courtroom procedures.
                        </span>
                      </li>
                      <li
                        className="flex gap-3 text-justify paragraph-text leading-relaxed"
                        data-fade="15"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
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

              {/* Experience 3 - Legal Styled */}
              <div className="group relative backdrop-blur-md border border-emerald-900/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.03)] pt-6">
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 data-fade-8">
                  <div>
                    <div
                      className="paragraph-text text-[0.75rem] md:text-[0.85rem] leading-relaxed tracking-wider -mb-10 md:-mb-0 flex items-center"
                      data-fade="10"
                    >
                      <IoCalendarOutline className="w-3.5 h-3.5 text-neutral-50 mr-2" />
                      <span>Feb 2021 — Dec 2023</span>
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
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
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
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
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
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9C9C9C] border border-[#9C9C9C] mt-2" />
                          <span>
                            Customize configurations according to client
                            specifications (laptop/desktop model, CPU, GPU, RAM,
                            etc.)
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
      </main>
    </Layout>
  );
};

export default AboutPage;
