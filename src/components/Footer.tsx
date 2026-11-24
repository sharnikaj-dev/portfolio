import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="no-print border-t border-zinc-800/80 bg-[#08080A] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <p className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} {PROFILE.name}. Built in Madurai, India.
        </p>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-400">
          <a href="#projects" className="transition-colors hover:text-[#F2B705]">
            Projects
          </a>
          <a href="#experience" className="transition-colors hover:text-[#F2B705]">
            Experience
          </a>
          <a href="#certifications" className="transition-colors hover:text-[#F2B705]">
            Certificates
          </a>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#F2B705]"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#F2B705]"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-[#121216] px-2.5 py-1 font-medium text-zinc-300 transition-colors hover:border-[#F2B705]/60 hover:text-[#F2B705]"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
