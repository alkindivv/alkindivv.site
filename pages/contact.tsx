import React, { useState, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';

import GlowingButton from '@/components/shared/GlowingButton';

import emailjs from '@emailjs/browser';
import Image from 'next/image';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusType(null);
    setStatusMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = {
        user_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_name: 'AL KINDI',
        reply_to: formData.get('user_email'),
      };

      // Initialize EmailJS
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');

      // Send email using EmailJS directly from client
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formValues
      );

      if (result.status === 200) {
        setStatusType('success');
        setStatusMessage(
          "Message sent successfully! I'll get back to you soon."
        );
        formRef.current?.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Detailed error:', error);
      setStatusType('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        templateTitle="Contact"
        description="Get in touch with AL KINDI for legal consultations, collaborations, or inquiries about capital markets, M&A, bankruptcy, and crypto regulations. Available through email, WhatsApp, or professional platforms."
      />

      <main className="content-spacing">
        {/* Background Effect */}
        <div
          className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
          style={{
            maskImage:
              'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <div
            aria-hidden="true"
            className="h-[400px] w-[650px] rounded-full bg-gradient-to-r from-[#2E996C]/30 to-[#0F3324]/30 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
          />
          <Image
            alt=""
            loading="lazy"
            width={1280}
            height={825}
            className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
            src="/images/textures/crumpled.jpg"
          />
        </div>

        {/* Hero Section */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="mx-auto ">
            <div className="mt-2 relative space-y-1 text-center" data-fade="1">
              <h1 className="text-center font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-tight">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="hero-text inline-block text-center text-[0.95rem] md:text-[1.05rem]">
                Feel free to reach out — I'll be happy to help, answer your
                questions, or simply say hi!
              </p>
            </div>
          </div>

          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-10 mt-5"
            data-fade="2"
          />

          {/* Contact Form */}
          <div className="max-w-5xl mx-auto md:col-span-2 h-full" data-fade="3">
            <div className="h-full p-3 sm:p-6 flex flex-col">
              <div
                className="flex items-center justify-between mb-4 sm:mb-6"
                data-fade="4"
              >
                <h2 className="text-sm sm:text-xl font-semibold">
                  Send a <Accent>Message</Accent>
                </h2>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-[10px] sm:text-sm text-emerald-500"></span>
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
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="user_name"
                        required
                        className="w-full bg-transparent border-b border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 placeholder:text-neutral-600"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full bg-transparent border-b border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 placeholder:text-neutral-600"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full bg-transparent border-b border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 placeholder:text-neutral-600"
                      placeholder="Subject"
                    />
                  </div>

                  <div className="space-y-2 mt-6">
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full bg-transparent border-b border-gray-800 hover:border-emerald-500/50 focus:border-emerald-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 resize-none placeholder:text-neutral-600"
                      placeholder="Your message"
                    />
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

                <div className="flex items-center justify-between pt-2 sm:pt-4 mt-auto">
                  <span className="text-[10px] sm:text-sm text-emerald-500"></span>
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
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ContactPage;
