import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, FileText, Lock } from 'lucide-react';
import {
  CERTIFICATIONS,
  CertificationItem,
  EDUCATION,
  EXPERIENCE,
} from '../data/portfolioData';
import { CertificateViewerModal } from './CertificateViewerModal';

interface ExperienceAndCredentialsProps {
  onOpenResume: () => void;
}

export function ExperienceAndCredentials({ onOpenResume }: ExperienceAndCredentialsProps) {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  return (
    <section id="experience" className="border-t border-zinc-800/80 bg-[#0D0D10] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 space-y-20">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[#F2B705]">
                04. Experience &amp; Education
              </p>
              <h2
                className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Practical internship delivery and academic foundation
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-zinc-700 bg-[#121216] px-4 py-2 text-xs font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#F2B705]/60 hover:text-white"
            >
              <FileText className="h-4 w-4 text-[#F2B705]" aria-hidden="true" />
              Open Printable Resume
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <h3 className="text-xs font-semibold tracking-wide text-zinc-400">
                Experience &amp; Applied Engineering
              </h3>
              {EXPERIENCE.map((exp, idx) => (
                <motion.article
                  key={exp.role}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 transition-colors duration-200 hover:border-[#F2B705]/40"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span className="tabular-nums text-[#F2B705] font-medium">{exp.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.organization}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.type}</span>
                  </div>

                  <h4 className="mt-2 font-display text-xl font-bold text-zinc-50">
                    {exp.role}
                  </h4>

                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                    {exp.summary}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-zinc-800/80 pt-4 text-sm text-zinc-400">
                    {exp.contributions.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F2B705]" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>

            <div className="space-y-6 lg:col-span-5">
              <h3 className="text-xs font-semibold tracking-wide text-zinc-400">
                Academic Credentials
              </h3>
              <div className="space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <motion.article
                    key={edu.degree}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.38, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 transition-colors duration-200 hover:border-[#F2B705]/40"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                      <span className="tabular-nums text-[#F2B705] font-medium">{edu.period}</span>
                      <span className="font-mono-tabular font-semibold text-zinc-200">
                        {edu.grade}
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-lg font-bold text-zinc-50">
                      {edu.degree}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-zinc-300">
                      {edu.institution}
                    </p>
                    <p className="mt-3 border-t border-zinc-800/80 pt-3 text-xs leading-relaxed text-zinc-400">
                      {edu.focus}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="certifications" className="border-t border-zinc-800/80 pt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[#F2B705]">
                05. Verified Original Certificates
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-zinc-50">
                Continuous specialization across AI, vision, BI, and Python
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Lock className="h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
              <span>Locked Original Records · View-Only Protection</span>
            </div>
          </div>

          <div className="mt-8 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.32, delay: idx * 0.04 }}
                className="grid grid-cols-1 gap-4 py-5 lg:grid-cols-12 lg:items-center lg:gap-6"
              >
                <div className="lg:col-span-4">
                  <h4 className="font-display text-base font-semibold text-zinc-100">
                    {cert.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    {cert.issuer} · <span className="font-mono-tabular">{cert.period}</span>
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-sm text-zinc-300">{cert.focus}</p>
                  <p className="mt-0.5 font-mono-tabular text-xs text-zinc-500">
                    {cert.credentialCode}
                  </p>
                </div>

                <div className="flex items-center lg:col-span-3 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-amber-300 whitespace-nowrap shrink-0"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    View Original Certificate
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <CertificateViewerModal
        certificate={activeCert}
        onClose={() => setActiveCert(null)}
      />
    </section>
  );
}
