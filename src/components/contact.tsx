// This component should be used inside a file like: app/contact/page.tsx or pages/contact.tsx

'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

// Define the type for the form data
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // --- Placeholder Submission Logic ---
    // In a real application, you would make an API call here (e.g., fetch('/api/contact'))
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Success simulation
      console.log('Form Submitted:', formData);
      setSubmitMessage({ 
        type: 'success', 
        text: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      
    } catch (error) {
      // Error simulation
      setSubmitMessage({ 
        type: 'error', 
        text: 'Sorry, there was an error sending your message. Please try again or email us directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Utility classes for the orange accent (matching your navbar's hover/active state)
  const ACCENT_COLOR = 'orange-600';
  const BG_ACCENT_COLOR = 'bg-orange-600';
  const RING_ACCENT_COLOR = 'ring-orange-600';

  return (
    <div className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header/Title Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl sm:text-5xl font-extrabold text-${ACCENT_COLOR} tracking-tight`}>
            Get In Touch
          </h1>
          <p className="mt-3 text-xl text-gray-400 max-w-3xl mx-auto">
            We're here to help with orders, tech support, and partnership inquiries.
          </p>
        </div>

        {/* Main Content Grid: Form (2/3) and Info (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* -------------------- Contact Form (Left Column) -------------------- */}
          <div className="lg:col-span-2 bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl shadow-black/50 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Send a Quick Message</h2>
            
            {/* Submission Feedback Message */}
            {submitMessage && (
              <div 
                className={`p-4 rounded-lg mb-6 transition-opacity duration-300 ${
                  submitMessage.type === 'success' 
                    ? `bg-green-700/50 border border-green-400 text-green-100`
                    : `bg-red-700/50 border border-red-400 text-red-100`
                }`}
                role="alert"
              >
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text" id="name" required
                  value={formData.name} onChange={handleChange}
                  className={`w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:${RING_ACCENT_COLOR} focus:border-${ACCENT_COLOR}`}
                  placeholder="Your Name"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email" id="email" required
                  value={formData.email} onChange={handleChange}
                  className={`w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:${RING_ACCENT_COLOR} focus:border-${ACCENT_COLOR}`}
                  placeholder="name@example.com"
                  disabled={isSubmitting}
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text" id="subject" required
                  value={formData.subject} onChange={handleChange}
                  className={`w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:${RING_ACCENT_COLOR} focus:border-${ACCENT_COLOR}`}
                  placeholder="Order Inquiry or Support Request"
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                <textarea
                  id="message" rows={4} required
                  value={formData.message} onChange={handleChange}
                  className={`w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:${RING_ACCENT_COLOR} focus:border-${ACCENT_COLOR}`}
                  placeholder="Detailed description of your inquiry..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full lg:w-auto px-8 py-3 ${BG_ACCENT_COLOR} text-white font-semibold rounded-full shadow-lg hover:bg-orange-500 transition duration-300 transform ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>

          {/* -------------------- Contact Info (Right Column) -------------------- */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Information Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-t-orange-600">
              <h3 className="text-xl font-bold mb-4 text-white">Contact Details</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <Mail className={`w-5 h-5 text-${ACCENT_COLOR} mt-1 mr-3 flex-shrink-0`} />
                  <div>
                    <strong className="text-white">Email Support:</strong>
                    <p className="truncate">support@shoptech.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className={`w-5 h-5 text-${ACCENT_COLOR} mt-1 mr-3 flex-shrink-0`} />
                  <div>
                    <strong className="text-white">Phone:</strong>
                    <p>+234 816 942 8366</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className={`w-5 h-5 text-${ACCENT_COLOR} mt-1 mr-3 flex-shrink-0`} />
                  <div>
                    <strong className="text-white">Warehouse:</strong>
                    <p>1000 Tech Ave, Silicon City, CA 90210</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-l-orange-600">
              <h3 className="text-xl font-bold mb-4 text-white">Stay Connected</h3>
              <div className="flex space-x-4">
                <SocialLink Icon={Facebook} href="#" label="Facebook" accent={ACCENT_COLOR} />
                <SocialLink Icon={Twitter} href="#" label="Twitter" accent={ACCENT_COLOR} />
                <SocialLink Icon={Instagram} href="#" label="Instagram" accent={ACCENT_COLOR} />
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

// Helper component for social links
interface SocialLinkProps {
    Icon: typeof Mail; // Using 'typeof Mail' as a generic Lucide icon type
    href: string;
    label: string;
    accent: string;
}

const SocialLink = ({ Icon, href, label, accent }: SocialLinkProps) => (
    <a 
        href={href} 
        aria-label={label}
        className={`w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-gray-300 hover:bg-${accent} hover:text-white transition duration-300`}
    >
        <Icon className="w-5 h-5" />
    </a>
);