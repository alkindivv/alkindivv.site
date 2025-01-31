import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import SocialMediaContact from '@/components/social/SocialMediaContact';
import Image from 'next/image';

import clsx from 'clsx';
import { FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { SiFiverr } from 'react-icons/si';
import dynamic from 'next/dynamic';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

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

      <main
        className={clsx(
          'content-spacing fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
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
            src=""
          />
        </div>

        {/* Hero Section */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="mx-auto ">
            <div className="mt-2 relative space-y-1 text-center" data-fade="1">
              <h1 className="text-center font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-tight">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="hero-text leading-relaxed text-center text-[0.95rem] md:text-[1.05rem]">
                Feel free to reach out — I'll be happy to help, answer your
                questions, or simply say hi!
              </p>
            </div>

            <div
              className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-10 mt-5"
              data-fade="2"
            />

            {/* Contact Grid */}
            <div className="mt-20 mx-auto" data-fade="4">
              <div className="grid md:grid-cols-3 gap-6 h-full">
                {/* Contact Info Column */}
                <div className="flex flex-col gap-6 h-full" data-fade="5">
                  {/* Contact Info */}
                  <div
                    className="flex-1 p-6 border border-gray-700 rounded-xl"
                    data-fade="6"
                  >
                    <h2 className="text-xl font-semibold mb-6">
                      Contact <Accent>Info</Accent>
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          icon: FaEnvelope,
                          label: 'Email',
                          value: 'law.alkindi@gmail.com',
                          link: 'mailto:law.alkindi@gmail.com',
                          response: 'Response within 24 hours',
                        },
                        {
                          icon: FaWhatsapp,
                          label: 'WhatsApp',
                          value: '+62 822-8864-3890',
                          link: 'https://wa.me/6282288643890',
                          response: 'Available 9AM - 5PM',
                        },
                      ].map((contact, idx) => (
                        <a
                          key={idx}
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-4 border border-gray-700 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all duration-300"
                          data-fade={`${7 + idx}`}
                        >
                          <div className="p-2 bg-emerald-900/30 rounded-lg group-hover:bg-emerald-900/50 transition-colors">
                            <contact.icon className="text-xl text-emerald-500" />
                          </div>
                          <div>
                            <div className="font-medium">{contact.value}</div>
                            <div className="text-xs text-emerald-500/80">
                              {contact.response}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Professional Platforms */}
                  <div
                    className="flex-1 p-6 border border-gray-700 rounded-xl"
                    data-fade="9"
                  >
                    <h2 className="text-xl font-semibold mb-6">
                      Hire <Accent>Me</Accent>
                    </h2>
                    <div className="space-y-4">
                      <a
                        href="https://www.fiverr.com/s/5r5xxG6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 border border-gray-700 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all duration-300"
                        data-fade="10"
                      >
                        <div className="p-2 bg-emerald-900/30 rounded-lg group-hover:bg-emerald-900/50 transition-colors">
                          <SiFiverr className="text-xl text-emerald-500" />
                        </div>
                        <div>
                          <div className="font-medium">Fiverr</div>
                          <div className="text-xs text-emerald-500">
                            Top Rated Seller
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex-1" data-fade="11">
                    <SocialMediaContact />
                  </div>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-2 h-full" data-fade="12">
                  <div className="h-full p-3 sm:p-6 border border-gray-700 rounded-xl flex flex-col">
                    <div
                      className="flex items-center justify-between mb-4 sm:mb-6"
                      data-fade="13"
                    >
                      <h2 className="text-sm sm:text-xl font-semibold">
                        Send a <Accent>Message</Accent>
                      </h2>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] sm:text-sm text-emerald-500">
                          Online now
                        </span>
                      </div>
                    </div>

                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="flex-1 flex flex-col"
                      data-fade="14"
                    >
                      <div className="flex-1 space-y-3 sm:space-y-6">
                        <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[10px] sm:text-sm text-gray-400">
                              Name
                            </label>
                            <input
                              type="text"
                              name="user_name"
                              required
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border bg-transparent border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-colors"
                              placeholder="Your name"
                            />
                          </div>
                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[10px] sm:text-sm text-gray-400">
                              Email
                            </label>
                            <input
                              type="email"
                              name="user_email"
                              required
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border bg-transparent border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-colors"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-[10px] sm:text-sm text-gray-400">
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border bg-transparent border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-colors"
                            placeholder="What's this about?"
                          />
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-[10px] sm:text-sm text-gray-400">
                            Message
                          </label>
                          <textarea
                            name="message"
                            required
                            rows={6}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border bg-transparent border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                            placeholder="Send me a message..."
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
                        <span className="text-[10px] sm:text-sm text-emerald-500">
                          Response within 24 hours
                        </span>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`gradient-button px-3 sm:px-8 py-1.5 sm:py-3 text-[10px] sm:text-sm relative ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <span className="opacity-0">Send Message</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3 h-3 sm:w-5 sm:h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                              </div>
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ContactPage;
