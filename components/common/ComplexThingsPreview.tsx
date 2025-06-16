'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const cards = [
  {
    title: 'Flexbox',
    description: 'Mental Model to Understand Flexbox',
    href: '/blog',
  },
  {
    title: 'Fetching',
    description: 'Understanding Next.js Data Fetching',
    href: '/blog',
  },
  {
    title: 'And More!',
    description: 'Thoughts and mental models about front-end development.',
    href: '/blog',
  },
];

export default function ComplexThingsPreview() {
  return (
    <section className="w-full py-24 relative overflow-hidden bg-dot-pattern bg-[length:12px_12px]">
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-script text-white/80 mb-2"
        >
          Complex Things
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[2.5rem] md:text-6xl font-extrabold text-white inline-block relative"
        >
          <span className="relative z-10">Made</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Simple
          </span>
          {/* Outline effect */}
          <span className="absolute inset-0 border border-white/20 rounded-xl pointer-events-none" />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl mx-auto text-slate-400 text-center"
        >
          I'm sharing how I approach something and how my mental model affects
          my learning about a certain topic.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="mt-10 mb-12 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:space-x-[-1rem] isolate px-6 justify-center">
        {cards.map((card, idx) => (
          <motion.a
            key={card.title}
            href={card.href}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
            className={clsx(
              'group aspect-square w-80 py-10 px-8 rounded-xl bg-neutral-950 border border-neutral-900 text-left flex flex-col justify-end overflow-hidden transition duration-500 hover:brightness-[150%] shadow-[inset_0_0_100px_20px_rgba(0,0,0,0.3)]',
              {
                'lg:rotate-[5deg] z-30': idx === 0,
                'lg:rotate-[-3deg] lg:translate-y-12 z-20': idx === 1,
                'lg:rotate-[4deg] z-10': idx === 2,
              }
            )}
          >
            {/* Pattern grid */}
            <div className="relative h-[7.5rem] flex gap-2 mb-auto">
              <div className="absolute inset-0 grid grid-cols-[repeat(6,3.5rem)] grid-rows-[repeat(3,3.5rem)] gap-2 opacity-10 -translate-y-[4rem] -translate-x-[4rem]">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-800/70 via-[#525252] to-neutral-800/70"
                  />
                ))}
              </div>
            </div>

            {/* Title & desc */}
            <h3 className="text-2xl font-bold border-b-2 border-transparent group-hover:border-white transition-colors duration-200 text-white">
              {card.title}
            </h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              {card.description}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
