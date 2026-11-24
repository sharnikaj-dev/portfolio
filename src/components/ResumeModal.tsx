import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Printer, X } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6 print:static print:bg-white print:p-0"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#111114] p-6 text-zinc-100 shadow-2xl sm:p-8 print:max-h-none print:border-none print:bg-white print:p-0 print:text-zinc-950 print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 id="resume-modal-title" className="font-display text-lg font-bold text-zinc-50">
              Resume Summary — {PROFILE.name}
            </h3>
            <p className="text-xs text-zinc-400">
              Formatted single-page technical overview
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-3.5 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-amber-300 whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-[#18181D] text-zinc-300 transition-colors hover:border-[#F2B705]/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-6 text-sm">
          <div className="border-b border-zinc-800 pb-4 print:border-zinc-300">
            <h4 className="font-display text-2xl font-bold text-zinc-50 print:text-zinc-950">
              {PROFILE.name}
            </h4>
            <p className="mt-1 font-semibold text-[#F2B705] print:text-zinc-800">
              {PROFILE.headline}
            </p>
            <p className="mt-2 text-xs text-zinc-400 print:text-zinc-600">
              {PROFILE.location} · {PROFILE.email} · {PROFILE.phone} · github.com/sharnikaj-dev
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold tracking-wide text-zinc-400 print:text-zinc-600">
              Profile Summary
            </h5>
            <p className="mt-2 leading-relaxed text-zinc-300 print:text-zinc-800">
              {PROFILE.intro}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold tracking-wide text-zinc-400 print:text-zinc-600">
              Experience
            </h5>
            <div className="mt-2 space-y-3">
              {EXPERIENCE.map((exp) => (
                <div key={exp.role}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-zinc-100 print:text-zinc-950">
                      {exp.role}
                    </span>
                    <span className="font-mono-tabular text-xs text-[#F2B705] print:text-zinc-600">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 print:text-zinc-600">{exp.organization}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-300 print:text-zinc-800">
                    {exp.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold tracking-wide text-zinc-400 print:text-zinc-600">
              Selected Projects
            </h5>
            <div className="mt-2 space-y-2.5">
              {PROJECTS.slice(0, 6).map((p) => (
                <div key={p.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-zinc-100 print:text-zinc-950">
                      {p.title} —{' '}
                      <span className="font-normal text-zinc-400 print:text-zinc-700">
                        {p.subtitle}
                      </span>
                    </span>
                    <span className="font-mono-tabular text-xs text-zinc-500">{p.year}</span>
                  </div>
                  <p className="font-mono-tabular text-xs font-medium text-[#F2B705] print:text-zinc-700">
                    {p.techStack.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 border-t border-zinc-800 pt-4 sm:grid-cols-2 print:border-zinc-300">
            <div>
              <h5 className="text-xs font-semibold tracking-wide text-zinc-400 print:text-zinc-600">
                Education
              </h5>
              <div className="mt-2 space-y-2">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree}>
                    <p className="font-semibold text-zinc-100 print:text-zinc-950">{edu.degree}</p>
                    <p className="text-xs text-zinc-400 print:text-zinc-600">
                      {edu.institution} · {edu.period} · {edu.grade}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-semibold tracking-wide text-zinc-400 print:text-zinc-600">
                Core Skills &amp; Certifications
              </h5>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300 print:text-zinc-800">
                {SKILL_GROUPS.slice(0, 4)
                  .map((g) => g.items.join(', '))
                  .join(' · ')}
              </p>
              <p className="mt-2 text-xs text-zinc-400 print:text-zinc-600">
                Certifications: {CERTIFICATIONS.map((c) => c.title).join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
