import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';

import Breadcrumb from '@/components/shared/Breadcrumb';

import DimensionLink from '@/components/common/DimensionLink';
import { FaRegCalendarAlt } from 'react-icons/fa';
import AccentNormal from '@/components/shared/AccentNormal';
import { HiScale } from 'react-icons/hi';
import { viewport } from '../viewport';

export { viewport };

export const metadata: Metadata = {
  title: 'About',
  description:
    'Focusing my expertise in corporate M&A, capital markets, and cryptocurrency',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About - AL KINDI',
    description:
      'Focusing my expertise in corporate M&A, capital markets, and cryptocurrency',
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
      'About AL KINDI - Legal professional specializing in corporate law, capital markets, M&A, bankruptcy, and cryptocurrency regulations',
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
          width={1280}
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

        {/* Legal document corner decorations */}
        {/* <div className="absolute top-24 left-24 opacity-15">
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>
        <div className="absolute bottom-24 right-24 opacity-15">
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div> */}
      </div>

      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb - left aligned */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Header Section - Legal Styled */}
          <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
            {/* <div className="flex items-center space-x-2 mb-2 justify-center">
              <HiLibrary className="text-emerald-400 w-5 h-5" />
              <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                Legal Professional
              </h2>
            </div> */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-neutral-400 leading-relaxed text-center">
              Professional background, qualifications, and legal expertise
            </p>
            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          {/* Profile Section - Legal Styled */}
          <div className="mt-8 max-w-6xl mx-auto relative" data-fade="2">
            {/* Photo and Buttons Column - Fixed Width */}
            <div className="md:float-left md:w-[300px] lg:w-[400px] md:mr-8 mb-6 md:mb-0">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300 border border-emerald-900/20">
                {/* Corner decorations - legal document style */}
                {/* <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30 z-10"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30 z-10"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30 z-10"></div>  */}

                <Image
                  src="/images/AL-KINDI.png"
                  alt="AL KINDI"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Legal stamp/watermark */}
                <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full border-2 border-emerald-500/20 flex items-center justify-center opacity-50">
                  <HiScale className="w-10 h-10 text-emerald-500/30" />
                </div>
              </div>

              {/* Legal credential tag */}
              {/* <div className="absolute -bottom-3 right-3 p-2 rounded-md bg-[#060a0d]/90 border border-emerald-900/30 shadow-lg transform rotate-2 transition-all duration-700">
                <div className="text-center">
                  <div className="text-xs text-emerald-400 font-medium">
                    VERIFIED
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Legal Practitioner
                  </div>
                </div>
              </div> */}
            </div>

            {/* Text Content - Legal Styled */}
            <div className="prose prose-invert max-w-none ">
              {/* Document number */}
              {/* <div className="absolute top-3 right-3">
                <div className="text-[10px] text-neutral-500 font-mono">
                  DOC-BIO/{new Date().getFullYear().toString().substring(2)}
                </div>
              </div> */}

              {/* Decorative top bar */}
              {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div> */}

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
                <AccentNormal>Junior Associates</AccentNormal> so i can gain
                more experience in the field of law especially in the field of
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
                This blog is a platform where I bring together my expertise in
                law and technology to sharing knowledge for people who are
                interested in capital markets, M&A, bankruptcy, and crypto asset
                regulations.
              </p>
            </div>
            <div className="clear-both mb-20" />
            {/* <div
              className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-5"
              data-fade="9"
            /> */}
            {/* <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div> */}
          </div>

          {/* Experience Section - Legal Styled */}
          <section className="pb-5 pt-25">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center mt-24">
              <span className="gradient-text">Experiences</span>
            </h2>
            <div className="text-center">
              <p
                className="text-neutral-400 mb-4 inline-block"
                data-fade="8"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition:
                    'opacity 700ms ease-out, transform 700ms ease-out',
                  transitionDelay: '1000ms',
                }}
              >
                Some of my experince, education, and background
              </p>
            </div>
            {/* <div
              className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-14 mt-5"
              data-fade="9"
            /> */}

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
                {/* Corner decorations - legal document style */}
                {/* <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30"></div>  */}

                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                {/* Document number */}
                {/* <div className="absolute top-3 right-3">
                  <div className="text-[10px] text-neutral-500 font-mono">
                    REF-EXP-1/
                    {new Date().getFullYear().toString().substring(2)}
                  </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 data-fade-8">
                  <div>
                    <div
                      className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider -mb-10 md:-mb-0 flex items-center"
                      data-fade="10"
                    >
                      <FaRegCalendarAlt className="w-4 h-4 text-emerald-400 mr-2" />
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
                          Conducted through legal research and case analysis to
                          support utilizing legal databases and academic
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

              {/* Experience 2 - Legal Styled */}
              <div className="group relative backdrop-blur-md border border-emerald-900/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.03)] pt-6">
                {/* Corner decorations - legal document style */}
                {/* <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30"></div> */}

                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                {/* Document number */}
                {/* <div className="absolute top-3 right-3">
                  <div className="text-[10px] text-neutral-500 font-mono">
                    REF-EXP-2/
                    {new Date().getFullYear().toString().substring(2)}
                  </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 data-fade-8">
                  <div>
                    <div
                      className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider -mb-10 md:-mb-0 flex items-center"
                      data-fade="10"
                    >
                      <FaRegCalendarAlt className="w-4 h-4 text-emerald-400 mr-2" />
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

              {/* Experience 3 - Legal Styled */}
              <div className="group relative backdrop-blur-md border border-emerald-900/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.03)] pt-6">
                {/* Corner decorations - legal document style */}
                {/* <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30"></div> */}

                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                {/* Document number */}
                {/* <div className="absolute top-3 right-3">
                  <div className="text-[10px] text-neutral-500 font-mono">
                    REF-EXP-3/
                    {new Date().getFullYear().toString().substring(2)}
                  </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 data-fade-8">
                  <div>
                    <div
                      className="paragraph-text text-[0.9rem] md:text-[0.95rem] leading-relaxed tracking-wider -mb-10 md:-mb-0 flex items-center"
                      data-fade="10"
                    >
                      <FaRegCalendarAlt className="w-4 h-4 text-emerald-400 mr-2" />
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

            {/* Legal footer */}
            <div className="mt-12 text-end text-[10px] text-neutral-500 font-mono">
              <div className="flex items-center justify-center gap-2 mb-1">
                {/* <div className="h-px w-12 bg-neutral-800"></div>
                  <HiScale className="w-4 h-4 text-emerald-500/40" />
                  <div className="h-px w-12 bg-neutral-800"></div> */}
              </div>
              ID: ABOUT-{new Date().getFullYear()}
            </div>
            <div
              className="mt-16 text-center relative"
              style={{
                opacity: 1,
                transition: 'opacity 800ms ease-out',
                transitionDelay: '1400ms',
              }}
            >
              {/* Law scale divider */}
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-neutral-800"></div>
                <div className="mx-4">
                  <HiScale className="w-8 h-8 text-emerald-500/30" />
                </div>
                <div className="h-px w-16 bg-neutral-800"></div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                <HiScale className="w-4 h-4 text-emerald-500/50" />
                <span>Curriculum Vitae</span>
              </div>

              {/* Legal disclaimer */}
              <p className="mt-4 text-[10px] text-neutral-600 max-w-lg mx-auto">
                These are provided for informational purposes only and do not
                constitute legal advice. Always consult with a qualified legal
                professional before using these for references.
              </p>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;
