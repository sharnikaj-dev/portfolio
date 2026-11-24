import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, FolderGit2, Globe, LayoutGrid, List, Search } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

const CATEGORIES: ProjectCategory[] = ['All', 'Full-Stack', 'AI & Vision', 'Security & Data'];

interface ProjectsSectionProps {
  selectedCategory: ProjectCategory;
  onCategoryChange: (cat: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

function ProjectCardImage({ project }: { project: ProjectItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0D0D10]">
      {!failed ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#18181D] to-[#0B0B0E] p-4 text-center">
          <FolderGit2 className="h-7 w-7 text-[#F2B705]" aria-hidden="true" />
          <span className="font-display text-sm font-semibold text-zinc-200">
            {project.title}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121216]/80 via-transparent to-transparent" />
    </div>
  );
}

export function ProjectsSection({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ProjectsSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q)) ||
        project.languages.some((l) => l.name.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      All: PROJECTS.length,
      'Full-Stack': 0,
      'AI & Vision': 0,
      'Security & Data': 0,
    };
    for (const p of PROJECTS) {
      counts[p.category] += 1;
    }
    return counts;
  }, []);

  const activeIndex = activeProject
    ? filteredProjects.findIndex((p) => p.id === activeProject.id)
    : -1;

  const handlePrevProject = () => {
    if (filteredProjects.length === 0 || activeIndex === -1) return;
    const prevIdx = (activeIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveProject(filteredProjects[prevIdx]);
  };

  const handleNextProject = () => {
    if (filteredProjects.length === 0 || activeIndex === -1) return;
    const nextIdx = (activeIndex + 1) % filteredProjects.length;
    setActiveProject(filteredProjects[nextIdx]);
  };

  return (
    <section id="projects" className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-medium text-[#F2B705]">
              01. Selected Engineering &amp; AI Projects
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Systems built across web, ML, vision, and analytics
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            Click any project to read its full README documentation, language breakdown, and setup guide, or jump directly to the live Render app and{' '}
            <a
              href="https://github.com/sharnikaj-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F2B705] underline underline-offset-4 hover:text-amber-300"
            >
              github.com/sharnikaj-dev
            </a>
            .
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center md:justify-between">
          <div
            role="tablist"
            aria-label="Filter projects by domain"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#121216] p-1 border border-zinc-800/90"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategoryChange(category)}
                  className={`relative rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active ? 'text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-project-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[#F2B705]"
                    />
                  )}
                  <span className="relative z-10">
                    {category} ({categoryCounts[category]})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by stack (Python, React, SQL...)"
                aria-label="Filter projects by technology or keyword"
                className="w-full rounded-lg border border-zinc-800 bg-[#121216] py-2 pr-3 pl-9 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-[#F2B705] focus:outline-none"
              />
            </div>

            <div className="flex items-center rounded-lg border border-zinc-800 bg-[#121216] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Bento grid view"
                aria-pressed={viewMode === 'grid'}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-[#F2B705]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                aria-label="Compact index view"
                aria-pressed={viewMode === 'index'}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                  viewMode === 'index'
                    ? 'bg-zinc-800 text-[#F2B705]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-zinc-800 bg-[#121216] p-10 text-center">
            <p className="font-display text-lg font-semibold text-zinc-200">
              No projects match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Try clearing the search query or switching back to all project categories.
            </p>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('All');
                onSearchChange('');
              }}
              className="mt-5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-amber-300"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div layout className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isWide =
                  selectedCategory === 'All' && !searchQuery && index === 0;
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6 }}
                    className={`group flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 transition-colors duration-200 hover:border-[#F2B705]/45 ${
                      isWide ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B705]"
                      >
                        <ProjectCardImage project={project} />
                      </button>

                      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#F2B705]">{project.impactMetric}</span>
                      </div>

                      <h3 className="mt-2 font-display text-xl font-bold text-zinc-50">
                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="text-left transition-colors hover:text-[#F2B705] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]"
                        >
                          {project.title}
                        </button>
                      </h3>

                      <p className="mt-1 text-sm font-medium text-zinc-300">
                        {project.subtitle}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-zinc-800/80 pt-4">
                      <p className="font-mono-tabular text-xs text-zinc-400">
                        {project.techStack.join(' · ')}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="text-xs font-semibold text-[#F2B705] transition-colors hover:text-amber-300 whitespace-nowrap shrink-0"
                        >
                          Docs &amp; README
                        </button>

                        <div className="flex items-center gap-4">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-200 transition-colors hover:text-[#F2B705] whitespace-nowrap shrink-0"
                            >
                              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                              Live App
                            </a>
                          )}

                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 transition-colors hover:text-white whitespace-nowrap shrink-0"
                          >
                            GitHub Repo
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-8 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span className="tabular-nums">{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#F2B705]">{project.impactMetric}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-zinc-100">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="text-left hover:text-[#F2B705] transition-colors"
                    >
                      {project.title} —{' '}
                      <span className="font-normal text-zinc-300">{project.subtitle}</span>
                    </button>
                  </h3>
                  <p className="font-mono-tabular text-xs text-zinc-400">
                    {project.techStack.join(' · ')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="rounded-lg border border-zinc-700 px-3.5 py-2 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:text-white whitespace-nowrap shrink-0"
                  >
                    Docs &amp; README
                  </button>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200 hover:text-[#F2B705] whitespace-nowrap shrink-0"
                    >
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      Live App
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F2B705] hover:text-amber-300 whitespace-nowrap shrink-0"
                  >
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        currentIndex={activeIndex}
        totalCount={filteredProjects.length}
      />
    </section>
  );
}
