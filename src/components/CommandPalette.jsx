'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' }

const GROUPS = [
  {
    label: 'NAVIGATE', icon: '~', items: [
      { id: 'home', label: 'Home', path: '/v3', action: 'navigate' },
      { id: 'services', label: 'Services', path: '// 02', action: 'scroll', target: 'services' },
      { id: 'about', label: 'About', path: '// 01', action: 'scroll', target: 'about' },
      { id: 'team', label: 'Team', path: '// 04', action: 'scroll', target: 'team' },
      { id: 'assessment', label: 'Assessment', path: '/assessment', action: 'navigate' },
      { id: 'contact', label: 'Contact', path: '// footer', action: 'scroll', target: 'contact' },
      { id: 'design-system', label: 'Design System', path: '/design-system', action: 'navigate' },
      { id: 'changelog', label: 'Changelog', path: '/changelog', action: 'navigate' },
    ],
  },
  {
    label: 'ACTIONS', icon: '$', items: [
      { id: 'toggle-theme', label: 'Toggle dark/light mode', action: 'toggle-dark' },
      { id: 'book-call', label: 'Book a discovery call', action: 'scroll', target: 'contact' },
      { id: 'view-source', label: 'View source on GitHub', action: 'external', url: 'https://github.com/chowwingho/manyroads-ai' },
    ],
  },
  {
    label: 'COMMANDS', icon: '>', items: [
      { id: 'help', label: 'mrai --help', action: 'easter', message: 'Usage: mrai <command>\n\nAvailable commands:\n  status    Check system status\n  brew      Make coffee\n  --version Print version info\n\nFor more info, try asking nicely.' },
      { id: 'version', label: 'mrai --version', action: 'easter', message: 'v2.1.0' },
      { id: 'status', label: 'mrai status', action: 'easter', message: 'all systems operational' },
      { id: 'brew', label: 'mrai brew', action: 'easter', message: '418 I\'m a teapot' },
    ],
  },
]

export default function CommandPalette({ open, onClose, dark, onToggleDark, accent }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [easterMessage, setEasterMessage] = useState(null)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const itemRefs = useRef([])

  // Flatten & filter items
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    const result = []
    for (const group of GROUPS) {
      const matchingItems = group.items.filter((item) => {
        if (!q) return true
        return (
          item.label.toLowerCase().includes(q) ||
          (item.path && item.path.toLowerCase().includes(q)) ||
          group.label.toLowerCase().includes(q)
        )
      })
      if (matchingItems.length > 0) {
        result.push({ type: 'group', label: group.label, icon: group.icon })
        for (const item of matchingItems) {
          result.push({ type: 'item', ...item, groupIcon: group.icon })
        }
      }
    }
    return result
  }, [query])

  const flatItems = useMemo(() => filtered.filter((e) => e.type === 'item'), [filtered])

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Animate open/close
  useEffect(() => {
    if (open) {
      setVisible(false)
      setQuery('')
      setSelectedIndex(0)
      setEasterMessage(null)
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      inputRef.current?.focus()
    } else {
      setVisible(false)
    }
  }, [open])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  // Scroll selected into view
  useEffect(() => {
    const el = itemRefs.current[selectedIndex]
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const executeItem = useCallback((item) => {
    if (!item) return
    switch (item.action) {
      case 'navigate':
        window.location.href = item.path
        onClose()
        break
      case 'scroll':
        document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' })
        onClose()
        break
      case 'toggle-dark':
        onToggleDark()
        onClose()
        break
      case 'external':
        window.open(item.url, '_blank')
        onClose()
        break
      case 'easter':
        setEasterMessage(item.message)
        break
    }
  }, [onClose, onToggleDark])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, flatItems.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      executeItem(flatItems[selectedIndex])
      return
    }
  }, [flatItems, selectedIndex, executeItem, onClose])

  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value)
    if (easterMessage) setEasterMessage(null)
  }, [easterMessage])

  if (!open) return null

  let itemIndex = -1

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center"
      style={{
        paddingTop: '20vh',
        backgroundColor: dark ? 'rgba(26,26,24,0.7)' : 'rgba(250,249,246,0.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={handleKeyDown}
    >
      <div
        className="flex flex-col"
        style={{
          width: 'min(92vw, 560px)',
          maxHeight: 'min(70vh, 480px)',
          background: 'var(--mr-bg-card)',
          border: '1px solid var(--mr-border-default)',
          borderRadius: 'var(--mr-radius-lg)',
          boxShadow: `var(--mr-shadow-lg), 0 0 40px ${accent}15`,
          transform: visible ? 'scale(1)' : 'scale(0.96)',
          opacity: visible ? 1 : 0,
          transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Input bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: '1px solid var(--mr-border-default)' }}
        >
          <span className="text-lg font-medium shrink-0" style={{ ...MONO, color: accent }}>{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent outline-none text-base"
            style={{
              color: 'var(--mr-text-primary)',
              caretColor: accent,
              fontFamily: '"Geist Sans", sans-serif',
            }}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd
            className="text-xs px-2 py-1 rounded shrink-0"
            style={{
              ...MONO,
              color: 'var(--mr-text-muted)',
              border: '1px solid var(--mr-border-default)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results or easter egg message */}
        <div ref={listRef} className="flex-1 overflow-y-auto py-2" style={{ maxHeight: '340px' }}>
          {easterMessage ? (
            <div className="px-4 py-6">
              <pre
                className="text-sm whitespace-pre-wrap"
                style={{ ...MONO, color: 'var(--mr-text-primary)' }}
              >
                {easterMessage}
              </pre>
            </div>
          ) : flatItems.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-base font-medium" style={{ ...MONO, color: 'var(--mr-text-primary)' }}>
                404: no results
              </p>
              <p className="text-sm mt-2" style={{ ...MONO, color: 'var(--mr-text-muted)' }}>
                &quot;{query}&quot;
              </p>
            </div>
          ) : (
            filtered.map((entry, i) => {
              if (entry.type === 'group') {
                return (
                  <div
                    key={`group-${entry.label}`}
                    className="px-4 pt-3 pb-1.5 text-xs font-medium tracking-wider"
                    style={{ ...MONO, color: 'var(--mr-text-muted)' }}
                  >
                    <span style={{ color: accent }}>//</span> {entry.label}
                  </div>
                )
              }

              itemIndex++
              const idx = itemIndex
              const isSelected = idx === selectedIndex

              return (
                <button
                  key={entry.id}
                  ref={(el) => { itemRefs.current[idx] = el }}
                  data-selected={isSelected}
                  className="mr-palette-item w-full flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer"
                  style={{
                    borderLeft: isSelected ? `2px solid ${accent}` : '2px solid transparent',
                  }}
                  onClick={() => executeItem(entry)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <span
                    className="text-sm shrink-0 w-4 text-center"
                    style={{ ...MONO, color: 'var(--mr-text-muted)' }}
                  >
                    {entry.groupIcon}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--mr-text-primary)' }}
                  >
                    {entry.label}
                  </span>
                  {entry.path && (
                    <span
                      className="text-xs ml-auto shrink-0"
                      style={{ ...MONO, color: 'var(--mr-text-muted)' }}
                    >
                      {entry.path}
                    </span>
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            borderTop: '1px solid var(--mr-border-default)',
            color: 'var(--mr-text-muted)',
          }}
        >
          <div className="flex items-center gap-4 text-xs" style={MONO}>
            <span><span style={{ opacity: 0.6 }}>↑↓</span> navigate</span>
            <span><span style={{ opacity: 0.6 }}>↵</span> select</span>
            <span><span style={{ opacity: 0.6 }}>esc</span> close</span>
          </div>
          <span className="text-xs" style={{ ...MONO, opacity: 0.5 }}>mrai v2.1</span>
        </div>
      </div>
    </div>
  )
}
