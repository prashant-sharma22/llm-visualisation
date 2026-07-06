import { ChevronDown, Play } from 'lucide-react'
import { useState } from 'react'
import { sections } from '../../data/curriculum'
import { getConceptsBySection } from '../../data/concepts'
import { useLanguage } from '../../context/LanguageContext'

interface SidebarProps {
  activeId: string
  onSelect: (id: string) => void
}

export function Sidebar({ activeId, onSelect }: SidebarProps) {
  const { t } = useLanguage()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.id, true]))
  )

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
      <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto p-4">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Curriculum
        </p>
        <nav className="space-y-2">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              const concepts = getConceptsBySection(section.id)
              const isOpen = openSections[section.id]
              return (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-semibold text-violet-300 transition hover:bg-[var(--color-surface-2)]"
                  >
                    <span>{t(section.title)}</span>
                    <ChevronDown
                      size={16}
                      className={`transition ${isOpen ? 'rotate-0' : '-rotate-90'}`}
                    />
                  </button>
                  {isOpen && (
                    <ul className="mt-1 space-y-0.5 pl-2">
                      {concepts.map((concept) => {
                        const active = concept.id === activeId
                        return (
                          <li key={concept.id}>
                            <button
                              type="button"
                              onClick={() => onSelect(concept.id)}
                              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                active
                                  ? 'bg-violet-600/20 text-violet-200 ring-1 ring-violet-500/40'
                                  : 'text-gray-400 hover:bg-[var(--color-surface-2)] hover:text-gray-200'
                              }`}
                            >
                              <Play size={12} className={active ? 'text-violet-400' : 'text-gray-600'} />
                              <span className="flex-1">{t(concept.title)}</span>
                              <span className="text-[10px] text-gray-500">{concept.duration}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
        </nav>
      </div>
    </aside>
  )
}

export function MobileNav({ activeId, onSelect }: SidebarProps) {
  const { t } = useLanguage()
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] p-3 lg:hidden">
      <select
        value={activeId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 text-sm text-gray-200"
      >
        {sections
          .sort((a, b) => a.order - b.order)
          .flatMap((section) =>
            getConceptsBySection(section.id).map((c) => (
              <option key={c.id} value={c.id}>
                {t(section.title)} → {t(c.title)}
              </option>
            ))
          )}
      </select>
    </div>
  )
}
