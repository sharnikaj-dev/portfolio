import { motion } from 'motion/react';
import { PROFILE, SKILL_GROUPS } from '../data/portfolioData';

interface SkillsAndAboutProps {
  onSelectTech: (tech: string) => void;
}

const FILTERABLE_TECH = new Set([
  'Python',
  'TypeScript',
  'JavaScript',
  'PHP',
  'SQL',
  'React',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Bootstrap',
  'Chart.js',
  'Flask',
  'Express.js',
  'Docker',
  'Scikit-learn',
  'XGBoost',
  'OpenCV',
  'MediaPipe',
  'Gemini AI',
  'Neural TTS',
  'MySQL',
  'SQLite',
  'Power BI',
  'Pandas',
]);

export function SkillsAndAbout({ onSelectTech }: SkillsAndAboutProps) {
  return (
    <>
      <section id="about" className="border-t border-zinc-800/80 bg-[#0D0D10] py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-[#F2B705]">02. About Sharnika</p>
              <h2
                className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Engineering clarity from database schema to user conversation
              </h2>

              <dl className="mt-8 space-y-4 border-t border-zinc-800/80 pt-6 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-zinc-400">Location</dt>
                  <dd className="font-medium text-zinc-200">{PROFILE.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-zinc-400">Degree Track</dt>
                  <dd className="font-medium text-zinc-200 tabular-nums">MCA, 2025 – 2027</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-zinc-400">Availability</dt>
                  <dd className="font-medium text-[#F2B705]">Full-Stack · Python · AI Roles</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-5 text-base leading-relaxed text-zinc-300 lg:col-span-7">
              {PROFILE.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <div className="grid grid-cols-1 gap-6 border-t border-zinc-800/80 pt-7 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-base font-semibold text-zinc-100">
                    Full-Stack Web Systems
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    Authentication, role-based access control, parameterized SQL queries, and responsive interfaces across Flask, React, Express, and PHP.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-zinc-100">
                    Applied AI &amp; Analytics
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    Practical ML pipelines (XGBoost, Scikit-learn), real-time OpenCV &amp; MediaPipe vision, Gemini integrations, and Power BI reporting.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="border-t border-zinc-800/80 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#F2B705]">03. Technical Capabilities</p>
              <h2
                className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Languages, frameworks, and tools in active production
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Select any highlighted technology to filter matching projects
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group, idx) => (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 transition-colors duration-200 hover:border-[#F2B705]/40"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-zinc-100">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {group.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-zinc-800/80 pt-4 font-mono-tabular text-xs leading-relaxed">
                  {group.items.map((item, itemIdx) => {
                    const isFilterable = FILTERABLE_TECH.has(item);
                    return (
                      <span key={item} className="inline-flex items-center gap-2">
                        {isFilterable ? (
                          <button
                            type="button"
                            onClick={() => onSelectTech(item)}
                            className="text-amber-200/90 underline-offset-4 transition-colors hover:text-[#F2B705] hover:underline"
                          >
                            {item}
                          </button>
                        ) : (
                          <span className="text-zinc-300">{item}</span>
                        )}
                        {itemIdx < group.items.length - 1 && (
                          <span className="text-zinc-600" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
