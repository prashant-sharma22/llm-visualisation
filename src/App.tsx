import { useEffect, useRef, useState } from 'react'
import { allConcepts } from './data/concepts'
import { sections } from './data/curriculum'
import { getConceptsBySection } from './data/concepts'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Header } from './components/layout/Header'
import { Sidebar, MobileNav } from './components/layout/Sidebar'
import { ConceptSection } from './components/ConceptSection'
import { SectionDivider } from './components/shared/SectionDivider'

function AppContent() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState(allConcepts[0].id)
  const [searchOpen, setSearchOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const scrollToConcept = (id: string) => {
    setActiveId(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    )

    allConcepts.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header
        searchOpen={searchOpen}
        onSearchOpen={() => setSearchOpen(true)}
        onSearchClose={() => setSearchOpen(false)}
        onNavigate={scrollToConcept}
      />
      <MobileNav activeId={activeId} onSelect={scrollToConcept} />

      <div className="mx-auto flex max-w-7xl">
        <Sidebar activeId={activeId} onSelect={scrollToConcept} />

        <main ref={mainRef} className="flex-1 px-4 py-8 md:px-8 md:py-12">
          <div className="mb-12 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 to-cyan-950/20 p-8 md:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              LLM Visualiser
            </h2>
            <p className="mt-3 max-w-2xl text-gray-300">
              {t({
                hinglish:
                  'Zero se LLM tak — pehle AI, vectors & LLM intro, phir KD Tree se MCP tak. Course structured hai — har topic pehle wale pe build hota hai. University-level why-first teaching. English default, Hinglish toggle.',
                english:
                  'From zero to LLM — AI, vectors & LLM intro first, then KD Tree through MCP. Structured course where every topic builds on the last. University-level why-first teaching with animated dry runs and numerical examples.',
              })}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                t({ hinglish: `${allConcepts.length} Topics`, english: `${allConcepts.length} Topics` }),
                t({ hinglish: '13 Sections', english: '13 Sections' }),
                t({ hinglish: 'Why-First', english: 'Why-First' }),
                t({ hinglish: '12 Sections/Chapter', english: '12 Sections/Chapter' }),
                t({ hinglish: 'English + Hinglish', english: 'English + Hinglish' }),
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-violet-500/30 bg-violet-600/10 px-3 py-1 text-xs font-medium text-violet-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const concepts = getConceptsBySection(section.id)
                if (concepts.length === 0) return null
                return (
                  <div key={section.id} className="space-y-16">
                    <SectionDivider
                      order={section.order}
                      title={section.title}
                      topicCount={concepts.length}
                      isIntro={section.id === 'intro'}
                    />
                    <div className="space-y-24">
                      {concepts.map((concept) => (
                        <ConceptSection
                          key={concept.id}
                          concept={concept}
                          sectionTitle={section.title}
                          isActive={concept.id === activeId}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>

          <footer className="mt-20 border-t border-[var(--color-border)] py-8 text-center text-sm text-gray-500">
            {t({
              hinglish: 'LLM Visualiser — knowledge sharing ke liye banaya gaya',
              english: 'LLM Visualiser — Built for knowledge sharing',
            })}
          </footer>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
