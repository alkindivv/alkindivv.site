import React, { useState } from 'react';
import GlowingButton from '../shared/GlowingButton';
import Link from 'next/link';
import { FiArrowUpRight, FiSend } from 'react-icons/fi';

const ChatPreview = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [demoResponse, setDemoResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsTyping(true);

    // Simulasi respons typing
    let response =
      'Thank you for your message! This is a preview of the chat feature. For a real conversation, please visit the AMA page.';
    let currentChar = 0;

    const typingInterval = setInterval(() => {
      if (currentChar < response.length) {
        setDemoResponse(response.substring(0, currentChar + 1));
        currentChar++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20); // Kecepatan typing yang realistis

    // Reset pesan setelah interval
    setTimeout(() => {
      setMessage('');
      setDemoResponse('');
    }, 8000);
  };

  return (
    <section className="py-16 w-full">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2
            className="text-2xl md:text-3xl font-semibold text-white/90"
            data-fade="1"
          >
            Ask Me Anything
          </h2>
          <div
            className="h-px max-w-[120px] w-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-transparent"
            data-fade="2"
          />
          <p className="text-neutral-400 text-sm md:text-base" data-fade="3">
            Have a question? Drop it here or visit the full AMA page
          </p>
        </div>

        <div
          className="border border-neutral-800 rounded-xl bg-neutral-900/30 backdrop-blur-lg p-6"
          data-fade="4"
        >
          <div className="flex flex-col gap-4">
            {demoResponse && (
              <div className="flex gap-3 items-start transition-all duration-300 animate-slideUp">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
                  A
                </div>
                <div className="bg-neutral-800/50 rounded-lg py-3 px-4 text-sm md:text-base max-w-[calc(100%-4rem)]">
                  <p className="text-neutral-200">{demoResponse}</p>
                  {isTyping && (
                    <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse"></span>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-2">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  placeholder="Type your question here..."
                  className="w-full bg-neutral-800/30 border border-neutral-700 rounded-lg py-3 pl-4 pr-12 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/60"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-emerald-500 transition-colors p-2"
                  disabled={!message.trim()}
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex justify-end mt-2">
              <Link href="/ama">
                <GlowingButton
                  variant="small"
                  rightIcon={<FiArrowUpRight className="size-[70%]" />}
                >
                  Visit full AMA
                </GlowingButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;
