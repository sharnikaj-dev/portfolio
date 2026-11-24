/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsAndAbout } from './components/SkillsAndAbout';
import { ExperienceAndCredentials } from './components/ExperienceAndCredentials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectCategory } from './data/portfolioData';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [projectSearch, setProjectSearch] = useState('');

  const handleFilterByTech = (tech: string) => {
    setSelectedCategory('All');
    setProjectSearch(tech);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#08080A] text-zinc-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#F2B705] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-zinc-950"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <MarqueeStrip />
          <ProjectsSection
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={projectSearch}
            onSearchChange={setProjectSearch}
          />
          <SkillsAndAbout onSelectTech={handleFilterByTech} />
          <ExperienceAndCredentials onOpenResume={() => setResumeOpen(true)} />
          <ContactSection />
        </main>

        <Footer />

        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </MotionConfig>
  );
}
