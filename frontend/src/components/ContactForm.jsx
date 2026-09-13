import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader2, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState({ loading: false, ok: false, error: '' });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, error: '' });
    try {
      await axios.post(`${API}/contact`, form);
      setState({ loading: false, ok: true, error: '' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        'Something went wrong. Please try again.';
      setState({ loading: false, ok: false, error: String(msg) });
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div className="md:col-span-1">
        <label className="mono text-[10px] tracking-[0.3em] text-white/50">NAME</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={set('name')}
          className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-[#ff5f19] outline-none py-3 text-white placeholder:text-white/30 transition-colors"
          placeholder="Your name"
        />
      </div>
      <div className="md:col-span-1">
        <label className="mono text-[10px] tracking-[0.3em] text-white/50">EMAIL</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={set('email')}
          className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-[#ff5f19] outline-none py-3 text-white placeholder:text-white/30 transition-colors"
          placeholder="you@company.com"
        />
      </div>
      <div className="md:col-span-2">
        <label className="mono text-[10px] tracking-[0.3em] text-white/50">SUBJECT</label>
        <input
          type="text"
          value={form.subject}
          onChange={set('subject')}
          className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-[#ff5f19] outline-none py-3 text-white placeholder:text-white/30 transition-colors"
          placeholder="What's this about?"
        />
      </div>
      <div className="md:col-span-2">
        <label className="mono text-[10px] tracking-[0.3em] text-white/50">MESSAGE</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-[#ff5f19] outline-none py-3 text-white placeholder:text-white/30 resize-none transition-colors"
          placeholder="Tell me what you're working on…"
        />
      </div>

      <div className="md:col-span-2 flex items-center justify-between gap-4 mt-2 flex-wrap">
        <div className="mono text-[11px] tracking-[0.25em] text-white/50 min-h-[20px]">
          {state.ok && (
            <span className="text-[#4ade80] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> MESSAGE RECEIVED — I'LL REPLY SOON
            </span>
          )}
          {state.error && (
            <span className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> {state.error}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={state.loading}
          className="group inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 hover:border-[#ff5f19] hover:bg-[#ff5f19] hover:text-black disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
          data-cursor="hover"
        >
          <span className="text-base md:text-lg font-medium">
            {state.loading ? 'Sending\u2026' : 'Send message'}
          </span>
          {state.loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
