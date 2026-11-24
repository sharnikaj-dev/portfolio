import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  FileCode2,
  FolderGit2,
  Globe,
  Layers,
  X,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  currentIndex = 0,
  totalCount = 0,
}: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'readme'>('overview');
  const [copiedSetup, setCopiedSetup] = useState(false);

  useEffect(() => {
    setImgError(false);
    setActiveTab('overview');
    setCopiedSetup(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const handleCopyCommands = async () => {
    try {
      await navigator.clipboard.writeText(project.setupCommands.join('\n'));
      setCopiedSetup(true);
      window.setTimeout(() => setCopiedSetup(false), 2000);
    } catch {
      setCopiedSetup(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#111114] text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 w-full overflow-hidden border-b border-zinc-800 bg-[#16161B] sm:h-64">
          {!imgError ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#18181D] to-[#0E0E11]">
              <FolderGit2 className="h-10 w-10 text-[#F2B705]" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/35 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-[#08080A]/90 text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-[#18181D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-0 px-6 pb-5 sm:px-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F2B705]">{project.impactMetric}</span>
            </div>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>
        </div>

        <div className="border-b border-zinc-800/80 px-6 pt-4 sm:px-8">
          <div className="flex items-center gap-4" role="tablist" aria-label="Project documentation view">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              className={`relative inline-flex items-center gap-2 pb-3 px-1 text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-[#F2B705]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              Case Study &amp; Architecture
              {activeTab === 'overview' && (
                <motion.span
                  layoutId="project-modal-tab-line"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-[#F2B705]"
                />
              )}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'readme'}
              onClick={() => setActiveTab('readme')}
              className={`relative inline-flex items-center gap-2 pb-3 px-1 text-xs font-semibold transition-colors ${
                activeTab === 'readme'
                  ? 'text-[#F2B705]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              README &amp; Language Breakdown
              {activeTab === 'readme' && (
                <motion.span
                  layoutId="project-modal-tab-line"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-[#F2B705]"
                />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          {activeTab === 'overview' ? (
            <>
              <div>
                <p className="text-sm font-medium text-[#F2B705]">{project.subtitle}</p>
                <p className="mt-2.5 text-base leading-relaxed text-zinc-300">
                  {project.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 border-y border-zinc-800/80 py-6 md:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-400">
                    Key Capabilities &amp; Outcomes
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-300">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F2B705]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-400">
                    Architecture &amp; Stack
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-300">
                    {project.architecture.map((arch) => (
                      <li key={arch} className="flex gap-2.5">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500"
                          aria-hidden="true"
                        />
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-t border-zinc-800/70 pt-4">
                    <p className="text-xs text-zinc-400">Technologies Used</p>
                    <p className="mt-1.5 font-mono-tabular text-xs leading-relaxed text-amber-200/90">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold tracking-wide text-zinc-400">
                  README Documentation Summary
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {project.readmeOverview}
                </p>
              </div>

              <div className="border-t border-zinc-800/80 pt-5">
                <h4 className="text-xs font-semibold tracking-wide text-zinc-400">
                  Repository Languages Breakdown
                </h4>
                <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  {project.languages.map((lang, idx) => {
                    const shades = [
                      'bg-[#F2B705]',
                      'bg-amber-600',
                      'bg-zinc-400',
                      'bg-zinc-600',
                    ];
                    return (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percent}%` }}
                        className={shades[idx % shades.length]}
                        title={`${lang.name}: ${lang.percent}%`}
                      />
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-tabular text-xs text-zinc-300">
                  {project.languages.map((lang, idx) => (
                    <span key={lang.name} className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          idx === 0
                            ? 'bg-[#F2B705]'
                            : idx === 1
                            ? 'bg-amber-600'
                            : idx === 2
                            ? 'bg-zinc-400'
                            : 'bg-zinc-600'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{lang.name}</span>
                      <span className="text-zinc-500">{lang.percent}%</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-zinc-800/80 pt-5 md:grid-cols-2">
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-zinc-400">
                    <FileCode2 className="h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
                    Repository Structure
                  </h4>
                  <ul className="mt-3 grid grid-cols-2 gap-1.5 font-mono-tabular text-xs text-zinc-300">
                    {project.repoFiles.map((file) => (
                      <li key={file} className="truncate rounded bg-[#0A0A0D] px-2.5 py-1.5 border border-zinc-800/80">
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold tracking-wide text-zinc-400">
                      Quick Setup &amp; Run
                    </h4>
                    <button
                      type="button"
                      onClick={handleCopyCommands}
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-[#F2B705]"
                    >
                      {copiedSetup ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                          <span className="text-emerald-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-800 bg-[#08080A] p-3.5 font-mono-tabular text-xs leading-relaxed text-amber-200/90">
                    {project.setupCommands.join('\n')}
                  </pre>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800/80 pt-5">
            <div className="flex items-center gap-2">
              {totalCount > 1 && onPrev && onNext && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous project"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#0B0B0E] px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    Prev
                  </button>
                  <span className="font-mono-tabular px-1.5 text-xs text-zinc-500">
                    {currentIndex + 1} / {totalCount}
                  </span>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next project"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#0B0B0E] px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                  >
                    Next
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#F2B705]/60 bg-[#F2B705]/10 px-3.5 py-2 text-xs font-semibold text-[#F2B705] transition-colors hover:bg-[#F2B705]/20 whitespace-nowrap shrink-0"
                >
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  Open Live App
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-amber-300 whitespace-nowrap shrink-0"
              >
                Open GitHub Repo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
