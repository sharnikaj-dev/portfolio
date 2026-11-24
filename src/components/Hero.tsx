import { MouseEvent, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothRotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [5, -5]), {
    stiffness: 180,
    damping: 22,
  });
  const smoothRotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 180,
    damping: 22,
  });

  const handleFrameMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(x);
    tiltY.set(y);
  };

  const handleFrameLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-12 lg:pt-32 lg:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 h-96 w-96 rounded-full bg-[#F2B705]/10 blur-3xl animate-amber-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl animate-amber-drift-reverse"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-xs font-medium tracking-wide text-[#F2B705]"
              >
                {PROFILE.kicker}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 font-display text-4xl font-extrabold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl"
                style={{ textWrap: 'balance', lineHeight: 1.04 }}
              >
                {PROFILE.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 font-display text-xl font-semibold text-zinc-300 sm:text-2xl"
                style={{ textWrap: 'balance' }}
              >
                {PROFILE.headline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400"
              >
                {PROFILE.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#F2B705] px-5 py-2.5 text-sm font-semibold text-zinc-950 whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]"
                >
                  Explore Selected Work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/90 bg-[#121216] px-5 py-2.5 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#F2B705]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]"
                >
                  <FileText className="h-4 w-4 text-[#F2B705]" aria-hidden="true" />
                  Resume Overview
                </button>
              </motion.div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-zinc-800/80 pt-6">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-[#F2B705] whitespace-nowrap shrink-0"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                github.com/sharnikaj-dev
              </a>

              <span className="text-zinc-700" aria-hidden="true">
                /
              </span>

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-[#F2B705] whitespace-nowrap shrink-0"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>

              <span className="text-zinc-700" aria-hidden="true">
                /
              </span>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-[#F2B705] whitespace-nowrap shrink-0"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <span className="text-emerald-300">Email copied</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>{PROFILE.email}</span>
                    <Copy className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
            style={{ perspective: 1000 }}
          >
            <motion.div
              onMouseMove={handleFrameMove}
              onMouseLeave={handleFrameLeave}
              style={{
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="group relative h-72 w-full overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#121216] transition-colors duration-200 hover:border-[#F2B705]/45 sm:h-96 lg:h-full lg:min-h-[430px]"
            >
              {!imageError ? (
                <img
                  src={PROFILE.heroImage}
                  alt="Sharnika J software engineering studio workspace"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#18181D] via-[#0E0E11] to-[#1D180F] p-8">
                  <span className="font-mono-tabular text-xs text-[#F2B705]">
                    sharnika.dev
                  </span>
                  <div>
                    <p className="font-display text-2xl font-bold text-zinc-100">
                      Full-Stack &amp; AI Engineering
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Python · Flask · React · TypeScript · PHP · MySQL
                    </p>
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080A]/90 via-[#08080A]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-medium text-zinc-200">
                  Engineering Practice · Python, React, Flask &amp; MySQL
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Building reliable web architectures, ML threat consoles &amp; vision tools
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-zinc-800/80 py-7 sm:grid-cols-4">
          {PROFILE.heroMetrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.18 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              className="flex flex-col"
            >
              <span className="font-display text-2xl font-bold text-[#F2B705] tabular-nums sm:text-3xl">
                {metric.value}
              </span>
              <span className="mt-1 text-xs text-zinc-400 sm:text-sm">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
