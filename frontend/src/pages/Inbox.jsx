import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, MailOpen, RefreshCw, LogOut } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LS_KEY = 'bhanu_admin_token';

const Inbox = () => {
  const [token, setToken] = useState(() => localStorage.getItem(LS_KEY) || '');
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = async (t) => {
    setLoading(true);
    setErr('');
    try {
      const res = await axios.get(`${API}/contact`, { headers: { 'X-Admin-Token': t } });
      setItems(res.data || []);
    } catch (e) {
      if (e?.response?.status === 401) {
        setErr('Wrong token');
        localStorage.removeItem(LS_KEY);
        setToken('');
      } else {
        setErr('Failed to load messages');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  const login = (e) => {
    e.preventDefault();
    if (!input) return;
    localStorage.setItem(LS_KEY, input);
    setToken(input);
  };

  const logout = () => {
    localStorage.removeItem(LS_KEY);
    setToken('');
    setItems([]);
  };

  const markRead = async (id) => {
    await axios.patch(`${API}/contact/${id}/read`, {}, { headers: { 'X-Admin-Token': token } });
    setItems(items.map((it) => (it.id === id ? { ...it, read: true } : it)));
  };

  const del = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await axios.delete(`${API}/contact/${id}`, { headers: { 'X-Admin-Token': token } });
    setItems(items.filter((it) => it.id !== id));
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <form
          onSubmit={login}
          className="w-full max-w-md p-8 border border-white/10 rounded-md bg-[#0d0d0d]"
        >
          <div className="mono text-xs tracking-[0.3em] text-white/50">ADMIN</div>
          <h1 className="mt-2 text-3xl font-medium">Inbox</h1>
          <p className="mt-2 text-white/60 text-sm">Enter your admin token to view messages.</p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Admin token"
            className="mt-6 w-full bg-transparent border-b border-white/20 focus:border-[#ff5f19] outline-none py-3"
            autoFocus
          />
          {err && <div className="mt-3 text-sm text-red-400">{err}</div>}
          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-full bg-[#ff5f19] text-black font-medium hover:bg-white transition-colors"
          >
            Enter
          </button>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-xs mono tracking-[0.3em] text-white/50 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> BACK HOME
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="px-6 md:px-16 py-8 flex items-center justify-between border-b border-white/10">
        <Link to="/" className="mono text-xs tracking-[0.3em] text-white/70 hover:text-[#ff5f19]">
          BHANUTEJA / INBOX
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => load(token)}
            className="p-2 rounded-full border border-white/15 hover:border-[#ff5f19] hover:text-[#ff5f19]"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-full border border-white/15 hover:border-red-400 hover:text-red-400"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="px-6 md:px-16 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-medium">Messages</h1>
          <div className="mono text-xs tracking-[0.3em] text-white/50">
            {items.length} TOTAL — {items.filter((i) => !i.read).length} UNREAD
          </div>
        </div>

        {items.length === 0 && (
          <div className="text-white/50 text-lg py-20 text-center">
            No messages yet. Share the site and check back.
          </div>
        )}

        <ul className="space-y-4">
          {items.map((m) => (
            <li
              key={m.id}
              className={`p-6 rounded-md border ${m.read ? 'border-white/10 bg-[#0d0d0d]' : 'border-[#ff5f19]/40 bg-[#0d0d0d]'}`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-medium text-white">{m.name}</span>
                    <a
                      href={`mailto:${m.email}`}
                      className="mono text-xs tracking-[0.15em] text-white/60 hover:text-[#ff5f19]"
                    >
                      {m.email}
                    </a>
                    {!m.read && (
                      <span className="mono text-[10px] tracking-[0.25em] text-[#ff5f19] px-2 py-0.5 border border-[#ff5f19]/40 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  {m.subject && (
                    <div className="mt-1 text-white/80 text-base">{m.subject}</div>
                  )}
                  <div className="mono text-[11px] tracking-[0.2em] text-white/40 mt-1">
                    {new Date(m.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <button
                      onClick={() => markRead(m.id)}
                      title="Mark as read"
                      className="p-2 rounded-full border border-white/15 hover:border-white hover:text-white"
                    >
                      <MailOpen className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => del(m.id)}
                    title="Delete"
                    className="p-2 rounded-full border border-white/15 hover:border-red-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-4 text-white/85 whitespace-pre-wrap leading-relaxed">{m.message}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Inbox;
