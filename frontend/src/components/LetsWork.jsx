import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL } from '../mock';

const LetsWork = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const FORMSPREE_FORM_ID = 'xkjnljpa';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to deliver message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err.message || 'Something went wrong. Please email me directly below.'
      );
    }
  };

  return (
    <section id="contact" className="relative px-6 md:px-16 py-28 md:py-36 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="mono text-xs tracking-[0.3em] text-[#ff5f19] mb-4">
          CONTACT // 06
        </div>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
          Let’s build something impactful.
        </h2>
        <p className="text-neutral-400 font-mono text-base md:text-lg mb-12 max-w-xl">
          Whether you want to talk data pipelines, marketplace analytics, or custom projects, drop your message below.
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-white/[0.03] border border-[#ff5f19]/30 flex flex-col items-center text-center gap-4"
          >
            <CheckCircle2 className="w-12 h-12 text-[#ff5f19]" />
            <h3 className="text-2xl font-medium text-white">Message delivered!</h3>
            <p className="text-neutral-400 font-mono text-sm max-w-md">
              Thanks for reaching out. I'll get back to you at your provided email shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-4 px-6 py-2 rounded-full border border-white/20 text-xs mono tracking-wider hover:border-white transition-colors"
            >
              SEND ANOTHER MESSAGE
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mono text-xs tracking-wider text-neutral-400 mb-2">
                  YOUR NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff5f19] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mono text-xs tracking-wider text-neutral-400 mb-2">
                  YOUR EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff5f19] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mono text-xs tracking-wider text-neutral-400 mb-2">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Bhanu, let's discuss an analytics opportunity..."
                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff5f19] transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mono">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                data-cursor="hover"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff5f19] text-black font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <a
                href={`mailto:${PERSONAL.email}?subject=Portfolio%20Inquiry`}
                className="mono text-xs text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                Or email directly: {PERSONAL.email}
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default LetsWork;