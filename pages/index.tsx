import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import SocialMedia from '@/components/social/SocialMedia';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import DimensionLink from '@/components/DimensionLink';
import AccentNormal from '@/components/shared/AccentNormal';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout isHomePage>
      <SEO />
      <main className={clsx('content-spacing ', isLoaded && 'fade-wrapper')}>
        {/* <div className={styles.container}>
          <div className={styles.main}> */}
        {/* Hi! */}
        <div className="mt-40 relative order-1" data-fade="1">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight mb-0 md:mb-0">
            Hi!
          </h2>
        </div>

        {/* You can call me AL KINDI */}
        <div className="relative order-2" data-fade="2">
          <div className="text-3xl mb-2 md:text-4xl 2xl:text-5xl font-bold tracking-tight">
            You can call me <Accent className="inline-block">AL KINDI</Accent>
          </div>
          {/* <div className="text-[11px] text-gray-300/60 font-light mt-1 mb-2 tracking-widest ">
            Known as <Accent className="inline-block">alkindivv</Accent> in the
            digital space
          </div> */}
        </div>
        {/* Front-end Engineer text */}
        <div className="relative order-3" data-fade="3">
          <p className=" font-light text-sm md:text-base 2xl:text-lg text-gray-400 mb-4 md:mb-4 leading-relaxed">
            <span className="inline-block">
              <AccentNormal>Junior or Trainee Associate</AccentNormal>
            </span>
            {/* at{' '}
            <DimensionLink href="#">Law Firm</DimensionLink> */}
          </p>
        </div>
        {/* Main paragraph */}
        <div className="relative order-4" data-fade="4">
          <p className=" leading-relaxed text-sm md:text-base 2xl:text-lg text-gray-400 mb-4 md:mb-6 max-w-[800px]">
            I am passionate about law, focusing on capital markets, M&A,
            bankruptcy, and crypto assets. I enjoy exploring the intersection of
            law and technology to address complex challenges and share my
            thoughts through blog writing on this website.
            <br />
            <br />
            Though I can't say it isn't expensive, I feel this purchase is well
            justified since it has brought me thousands of percent in returns as
            it supports my work.
          </p>
        </div>
        {/* Guestbook text */}
        {/* <div className="relative order-5" data-fade="5">
          <p className=" font-light text-sm md:text-base 2xl:text-lg text-gray-300 mb-4 md:mb-4 2xl:mb-8">
            Don't forget to sign my{' '}
            <DimensionLink href="/guestbook">guestbook</DimensionLink>!
          </p>
        </div> */}
        {/* Buttons Section */}
        <div className="relative order-6" data-fade="6">
          <div className="flex gap-3 md:gap-4 mb-4 md:mb-4 2xl:mb-6">
            <Link
              href="/blog"
              className="gradient-button font-semibold text-sm md:text-base 2xl:text-lg  px-3 md:px-3 py-1.5 md:py-2.5"
            >
              Read the blog
            </Link>
            <Link
              href="/about"
              className="no-gradient-button font-semibold text-sm md:text-base 2xl:text-lg px-3 md:px-3 py-1.5 md:py-2.5"
            >
              Learn more about me
            </Link>
          </div>
        </div>
        {/* Social Media Section */}
        <div className="mt-4" data-fade="7">
          <SocialMedia variant="default" />
        </div>

        {/* </div>
        </div> */}
      </main>
    </Layout>
  );
}
