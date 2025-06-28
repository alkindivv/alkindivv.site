'use client';

import React, { useState, useRef, useEffect } from 'react';
import Accent from '@/components/shared/Accent';
import GlowingButton from '@/components/shared/GlowingButton';
import Image from 'next/image';
import { HiScale } from 'react-icons/hi';

import Breadcrumb from '@/components/shared/Breadcrumb';

export default function ContactClient() {
  const breadcrumbItems = [{ label: 'Contact' }];
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
      const formData = new FormData(e.currentTarget);
      const payload = {
        name: formData.get('user_name'),
        email: formData.get('user_email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      // API call ke endpoint send-email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusType('success');
        setStatusMessage(data.message || 'Form submitted successfully!');
        formRef.current?.reset();
      } else {
        setStatusType('error');
        setStatusMessage(
          data.error || 'Failed to submit form. Please try again later.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusType('error');
      setStatusMessage('Failed to submit form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

      {/* Hero Section */}
      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header - Legal Styled */}
          <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Let's <span className="gradient-text">Connect</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              Fill out the form below to get in touch with me.
            </p>
            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          <div className=" mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Contact Form - Legal Styled */}
          <div
            className="mx-auto md:col-span-2 h-full"
            data-fade="3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
              transitionDelay: '800ms',
            }}
          >
            <div className="">
              <div
                className="flex items-center justify-between mb-4 sm:mb-6 border-b border-neutral-800/60 pb-4"
                data-fade="4"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    Contact <Accent> Form</Accent>
                  </h3>
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
                    </div>
                    <div className="space-y-2 relative">
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full bg-transparent border-b border-dotted border-neutral-700 hover:border-neutral-600 focus:border-neutral-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 placeholder:text-neutral-600"
                        placeholder="your@email.com"
                      />
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
                  </div>

                  <div className="space-y-2 mt-6 relative">
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full bg-transparent border-b border-dotted border-neutral-700 hover:border-neutral-600 focus:border-neutral-500 transition-colors px-0 py-2 text-sm sm:text-base focus:outline-none focus:ring-0 resize-none placeholder:text-neutral-600"
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

                <div className="flex items-center justify-end pt-2 sm:pt-4 mt-auto border-t border-neutral-800/40">
                  {/* <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>I'm looking forward to hearing from you!</span>
                  </div> */}
                  <GlowingButton
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    variant="small"
                    iconPosition="right"
                  >
                    Send Message
                  </GlowingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
