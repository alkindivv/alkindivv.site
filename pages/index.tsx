import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import DimensionLink from '@/components/DimensionLink';
import Accent from '@/components/Accent';
import clsx from 'clsx';
import SocialMediaSection from '@/components/SocialMediaSection';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="Home | alkindivv.site" isHomePage>
      <main
        className={clsx(
          'layout-main mt-15 md:mt-15',
          isLoaded && 'fade-wrapper'
        )}
      >
        {/* <div className={styles.container}>
          <div className={styles.main}> */}
        {/* Hi! */}
        <div className="relative order-1" data-fade="1">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl  font-bold tracking-tight mb-0 md:mb-0">
            Hi!
          </h2>
        </div>

        {/* You can call me AL KINDI */}
        <div className="relative order-2" data-fade="2">
          <div className="text-3xl md:text-4xl 2xl:text-5xl font-bold tracking-tight mb-1 md:mb-1">
            You can call me <Accent className="inline-block">AL KINDI</Accent>
          </div>
        </div>
        {/* Front-end Engineer text */}
        <div className="relative order-3" data-fade="3">
          <p className=" font-light text-sm md:text-base 2xl:text-lg text-gray-300 mb-4 md:mb-4">
            Trainee Associate at{' '}
            <DimensionLink href="#">Law Firm</DimensionLink>
          </p>
        </div>
        {/* Main paragraph */}
        <div className="relative order-4" data-fade="4">
          <p className="font-light text-sm md:text-base 2xl:text-lg text-gray-200 leading-relaxed mb-4 md:mb-6 max-w-[800px]">
            I have a passion for typing and enjoy learning Technology and law.
            Exploring the intersection of these fields inspires me to find
            innovative Solutions to complex challenges
          </p>
        </div>
        {/* Guestbook text */}
        <div className="relative order-5" data-fade="5">
          <p className=" font-light text-sm md:text-base 2xl:text-lg text-gray-300 mb-4 md:mb-4 2xl:mb-8">
            Don't forget t sign my{' '}
            <DimensionLink href="/guestbook">guestbook</DimensionLink>!
          </p>
        </div>
        <div className="relative order-5" data-fade="5">
          <p className=" font-light text-sm md:text-base 2xl:text-lg text-gray-300 mb-4 md:mb-4 2xl:mb-8">
            Don't forget t ny my{' '}
            <DimensionLink href="/guestbook">guestbook</DimensionLink>!
          </p>
        </div>
        {/* Buttons Section */}
        <div className="relative order-6" data-fade="6">
          <div className="flex gap-3 md:gap-4 mb-4 md:mb-4 2xl:mb-6">
            <Link
              href="/blog"
              className="gradient-button text-sm md:text-base 2xl:text-lg  px-3 md:px-3 py-1.5 md:py-2.5"
            >
              Read the blog
            </Link>
            <Link
              href="/about"
              className="no-gradient-button text-sm md:text-base 2xl:text-lg px-3 md:px-3 py-1.5 md:py-2.5"
            >
              Learn more about me
            </Link>
          </div>
        </div>
        {/* Social Media Links */}
        <div
          className="font-sans relative order-7 mx-auto md:order-1"
          data-fade="7"
        >
          <SocialMediaSection />
        </div>
        {/* </div>
        </div> */}
      </main>
    </Layout>
  );
}
