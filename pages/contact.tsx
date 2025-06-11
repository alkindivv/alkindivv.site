import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PowerfulSEO from '@/components/shared/PowerfulSEO';
import Accent from '@/components/shared/Accent';
import GlowingButton from '@/components/shared/GlowingButton';
import Image from 'next/image';
import { HiScale, HiDocumentText, HiLibrary } from 'react-icons/hi';
import { RiContactsFill } from 'react-icons/ri';
import { GrContact } from 'react-icons/gr';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusType(null);
    setStatusMessage('');

    try {
      // Simulate form submission for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatusType('success');
      setStatusMessage(
        'Form submitted successfully! (Note: Email functionality is temporarily disabled)'
      );
      formRef.current?.reset();
    } catch (error) {
      console.error('Error:', error);
      setStatusType('error');
      setStatusMessage('Failed to submit form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <PowerfulSEO
        title="Contact"
        description="Get in touch with AL KINDI. Connect via email, social media, or professional networks for legal consultations, collaborations, or inquiries."
        image="/images/default.png"
      />

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
        <div className="absolute top-24 left-24 opacity-15">
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>
        <div className="absolute bottom-24 right-24 opacity-15">
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - Legal Styled */}
          <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
            {/* <div className="flex items-center space-x-2 mb-2 justify-center">
              <RiContactsFill className="text-emerald-400 w-5 h-5" />
              <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                Get In Touch
              </h2>
            </div> */}
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Let's <span className="gradient-text">Connect</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              Fill out the form below to get in touch with me.
            </p>

            {/* Document Number Line */}
            {/* <div className="flex items-center my-8">
              <div className="h-px flex-grow bg-neutral-800/50"></div>
              <div className="px-4 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-sm bg-emerald-900/10">
                CONTACT FORM
              </div>
              <div className="h-px flex-grow bg-neutral-800/50"></div>
            </div> */}
            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          {/* Contact Form - Legal Styled */}
          <div
            className="max-w-5xl mx-auto md:col-span-2 h-full"
            data-fade="3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
              transitionDelay: '800ms',
            }}
          >
            <div className="">
              {/* Corner decorations - legal document style */}
              {/* <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-emerald-500/30"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30"></div> */}

              {/* Decorative top bar */}
              {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div> */}

              <div
                className="flex items-center justify-between mb-4 sm:mb-6 border-b border-neutral-800/60 pb-4"
                data-fade="4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <HiDocumentText className="w-5 h-5" />
                  </div>
                  <h2 className="text-sm sm:text-xl font-semibold">
                    Contact <Accent> Form</Accent>
                  </h2>
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col"
                data-fade="5"
              >
                <div className="flex-1 space-y-3 sm:space-y-6">
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2 relative">
                      <input
                        type="text"
                        name="user_name"
                        required
                        className="w-full bg-transparent border-b border-dotted border-neutral-700 hover:border-neutral-600 focus:border-neutral-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 placeholder:text-neutral-600"
                        placeholder="Your name"
                      />
                      {/* <div className="absolute right-0 top-0 text-[10px] text-neutral-500 font-mono">
                        PETITIONER
                      </div> */}
                    </div>
                    <div className="space-y-2 relative">
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full bg-transparent border-b border-dotted border-neutral-700 hover:border-neutral-600 focus:border-neutral-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 placeholder:text-neutral-600"
                        placeholder="your@email.com"
                      />
                      <div className="absolute right-0 top-0 text-[10px] text-neutral-500 font-mono">
                        CONTACT
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6 relative">
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full bg-transparent border-b border-dotted border-neutral-700 hover:border-neutral-600 focus:border-neutral-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 placeholder:text-neutral-600"
                      placeholder="Subject"
                    />
                    <div className="absolute right-0 top-0 text-[10px] text-neutral-500 font-mono">
                      MATTER
                    </div>
                  </div>

                  <div className="space-y-2 mt-6 relative">
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full bg-transparent border-b border-dotted border-neutral-700 hover:border-neutral-600 focus:border-neutral-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 resize-none placeholder:text-neutral-600"
                      placeholder="Your message"
                    />
                    <div className="absolute right-0 top-0 text-[10px] text-neutral-500 font-mono">
                      STATEMENT
                    </div>
                  </div>

                  {statusMessage && (
                    <div
                      className={`p-2 sm:p-4 rounded-lg text-[10px] sm:text-sm ${
                        statusType === 'success'
                          ? 'bg-emerald-900/30 text-emerald-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {statusMessage}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 sm:pt-4 mt-auto border-t border-neutral-800/40">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <GrContact className="w-4 h-4" />
                    <span>I'm looking forward to hearing from you!</span>
                  </div>
                  <GlowingButton
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    variant="small"
                  >
                    Send Message
                  </GlowingButton>
                </div>
              </form>
              <div className="mt-12 text-end text-[10px] text-neutral-500 font-mono">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {/* <div className="h-px w-12 bg-neutral-800"></div>
                  <HiScale className="w-4 h-4 text-emerald-500/40" />
                  <div className="h-px w-12 bg-neutral-800"></div> */}
                </div>
                ID: CONTACT-{new Date().getFullYear()}
              </div>
              <div
                className="mt-16 text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 800ms ease-out',
                  transitionDelay: '1400ms',
                }}
              >
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                  <HiScale className="w-4 h-4 text-emerald-500/50" />
                  <span>Contact Form</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ContactPage;
