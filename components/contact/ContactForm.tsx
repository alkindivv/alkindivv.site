'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Your message has been sent successfully!',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message:
            data.error || 'Something went wrong. Please try again later.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50'
              : 'bg-red-900/30 text-red-400 border border-red-900/50'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-300 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-neutral-300 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
          placeholder="What is this regarding?"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-300 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white resize-none"
          placeholder="Your message here..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-emerald-800 text-emerald-100 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
