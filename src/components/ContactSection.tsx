import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const TOPIC_PRESETS = [
  'Full-Stack Role',
  'Python / AI Internship',
  'Project Collaboration',
  'General Inquiry',
];

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(TOPIC_PRESETS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please include a short message (at least 10 characters).';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage(null);
      return;
    }

    const mailSubject = encodeURIComponent(`[Portfolio] ${subject} — ${name.trim()}`);
    const mailBody = encodeURIComponent(
      `Hi Sharnika,\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${subject}\n\n${message.trim()}`
    );

    window.location.href = `mailto:${PROFILE.email}?subject=${mailSubject}&body=${mailBody}`;
    setStatusMessage(
      `Draft prepared for ${PROFILE.email}. If your mail client did not open, copy the email address on the left directly.`
    );
  };

  return (
    <section id="contact" className="border-t border-zinc-800/80 bg-[#08080A] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium text-[#F2B705]">06. Contact</p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Let&apos;s build something dependable together
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              I&apos;m open to full-stack software engineering, Python backend, and applied AI roles or internships. Reach out directly or prepare a quick note here.
            </p>

            <div className="mt-8 space-y-4 border-t border-zinc-800/80 pt-6 text-sm">
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-3 font-medium text-zinc-200 transition-colors hover:text-[#F2B705]"
                >
                  <Mail className="h-4 w-4 text-[#F2B705] shrink-0" aria-hidden="true" />
                  <span className="truncate">{PROFILE.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-[#121216] px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-[#F2B705]/60 hover:text-white whitespace-nowrap shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="tel:+919597411576"
                className="flex items-center gap-3 text-zinc-300 transition-colors hover:text-[#F2B705]"
              >
                <Phone className="h-4 w-4 text-[#F2B705] shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{PROFILE.phone}</span>
              </a>

              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin className="h-4 w-4 text-[#F2B705] shrink-0" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </div>

              <div className="flex items-center gap-5 pt-3">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 transition-colors hover:text-[#F2B705]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub Profile
                </a>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 transition-colors hover:text-[#F2B705]"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 transition-colors duration-200 hover:border-[#F2B705]/30 sm:p-8"
            >
              <div>
                <span className="block text-xs font-semibold text-zinc-300">
                  Inquiry Topic
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {TOPIC_PRESETS.map((preset) => {
                    const active = subject === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSubject(preset)}
                        className={`relative rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                          active
                            ? 'text-zinc-950 font-semibold'
                            : 'border border-zinc-800 bg-[#0B0B0E] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="contactTopicHighlight"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-lg bg-[#F2B705]"
                          />
                        )}
                        <span className="relative z-10">{preset}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-300">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recruiter or collaborator name"
                    className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#0B0B0E] px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-300">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#0B0B0E] px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, project scope, or interview scheduling notes..."
                  className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#0B0B0E] px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.message}</p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#F2B705] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 whitespace-nowrap shrink-0"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </motion.button>

                <span className="text-xs text-zinc-500">
                  Opens your default email client pre-filled
                </span>
              </div>

              {statusMessage && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-200"
                >
                  {statusMessage}
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
