'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' }

const WELCOME_ART = [
  '  __  __    _    _   ___   ______   ___    _    ____  ____',
  ' |  \\/  |  / \\  | \\ | \\ \\ / /  _ \\ / _ \\  / \\  |  _ \\/ ___|',
  ' | |\\/| | / _ \\ |  \\| |\\ V /| |_) | | | |/ _ \\ | | | \\___ \\',
  ' | |  | |/ ___ \\| |\\  | | | |  _ <| |_| / ___ \\| |_| |___) |',
  ' |_|  |_/_/   \\_\\_| \\_| |_| |_| \\_\\\\___/_/   \\_\\____/|____/',
  '                          A I',
]

const DIVIDER = '─'.repeat(60)

const HELP_TEXT = [
  '// commands',
  '',
  '  theme          : Toggle dark/light mode',
  '  status         : System status',
  '  version        : Show version info',
  '  whois          : About Many Roads AI',
  '  team           : Meet the team',
  '  services       : What we do',
  '  brew           : Make a beverage',
  '  snake          : Play snake',
  '  matrix         : Enter the matrix',
  '  clear          : Clear the terminal',
  '  close          : Close the console',
  '  history        : Show command history',
]

const TEAM_DATA = [
  { name: 'Wing Ho Chow', role: 'Principal Consultant — Strategy & Implementation' },
  { name: 'James Chen', role: 'Senior Engineer — Architecture & Integration' },
  { name: 'Sarah Kim', role: 'AI Specialist — Training & Assessment' },
  { name: 'Marcus Rivera', role: 'DevOps Lead — Infrastructure & Automation' },
]

const SERVICES_DATA = [
  { name: 'Trailhead', price: '$25K–$40K', desc: '8-week guided implementation. Audit, tool selection, workflow redesign, and team training.' },
  { name: 'Wayfinder', price: '$120K–$175K', desc: '6-month embedded partnership. Full-stack AI integration with dedicated engineering support.' },
  { name: 'Training', price: '$2.8K–$45K', desc: 'Workshops and bootcamps. From half-day primers to 4-week intensive programs.' },
]

const BREW_RESPONSES = [
  '418 I\'m a teapot\n\nThe server refuses to brew coffee because it is,\npermanently, a teapot. (RFC 2324)',
  'Just kidding. We\'re consultants, not baristas.\nBut we can help you automate your coffee orders.',
  'brew install productivity\nError: productivity requires --codebase-context flag.\nTry: mrai services',
]

const STATUS_TABLE = [
  '┌──────────────┬──────────────┐',
  '│  Service     │  Status      │',
  '├──────────────┼──────────────┤',
  '│  website     │  ● operational │',
  '│  api         │  ● operational │',
  '│  assessment  │  ● operational │',
  '│  cdn         │  ● operational │',
  '│  dns         │  ● operational │',
  '└──────────────┴──────────────┘',
]

const LS_OUTPUT = [
  'total 6',
  'drwxr-xr-x  assessment/',
  'drwxr-xr-x  implementation/',
  'drwxr-xr-x  training/',
  '-rw-r--r--  README.md',
  '-rw-r--r--  .env.example',
  '-rw-r--r--  package.json',
]

const CAT_README = [
  '# Many Roads AI',
  '',
  'AI consulting for engineering teams.',
  'We help teams adopt AI tools without breaking their workflow.',
  '',
  '## Quick Start',
  '  1. Run the assessment',
  '  2. Pick a pathway (Trailhead or Wayfinder)',
  '  3. Ship better code',
  '',
  'https://manyroads.ai',
]

const CAT_ENV = [
  '# Many Roads AI — Environment Configuration',
  '',
  'AI_PROVIDER="openai"',
  'AI_MODEL="gpt-4"',
  'AI_TOOLS_WORKING="false"  # ← this is why you called us',
  'TEAM_VELOCITY="declining"',
  'TECH_DEBT="increasing"',
  'COFFEE_BUDGET="exhausted"',
]

const PING_OUTPUT = [
  'PING manyroads.ai (76.76.21.21): 56 data bytes',
  '64 bytes from 76.76.21.21: icmp_seq=0 ttl=57 time=1.234 ms',
  '64 bytes from 76.76.21.21: icmp_seq=1 ttl=57 time=1.187 ms',
  '64 bytes from 76.76.21.21: icmp_seq=2 ttl=57 time=1.203 ms',
  '',
  '--- manyroads.ai ping statistics ---',
  '3 packets transmitted, 3 packets received, 0.0% packet loss',
  'round-trip min/avg/max/stddev = 1.187/1.208/1.234/0.019 ms',
]

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const HEX_CHARS = '0123456789ABCDEF'

// ── Snake game constants ──
const GRID_W = 30
const GRID_H = 15
const SNAKE_TICK = 120

function makeInitialSnake() {
  return [
    { x: 15, y: 7 },
    { x: 14, y: 7 },
    { x: 13, y: 7 },
  ]
}

function randomFood(snake) {
  let pos
  do {
    pos = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) }
  } while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

function renderSnakeGrid(snake, food, score) {
  const lines = []
  lines.push('┌' + '──'.repeat(GRID_W) + '┐')
  for (let y = 0; y < GRID_H; y++) {
    let row = '│'
    for (let x = 0; x < GRID_W; x++) {
      const isHead = snake[0].x === x && snake[0].y === y
      const isBody = !isHead && snake.some(s => s.x === x && s.y === y)
      const isFood = food.x === x && food.y === y
      if (isHead) row += '██'
      else if (isBody) row += '░░'
      else if (isFood) row += '◆ '
      else row += '  '
    }
    row += '│'
    lines.push(row)
  }
  lines.push('└' + '──'.repeat(GRID_W) + '┘')
  lines.push(`SCORE: ${score}`)
  return lines
}

// ── Component ──

export default function MraiConsole({ open, onClose, dark, onToggleDark }) {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [visible, setVisible] = useState(false)
  const [brewCount, setBrewCount] = useState(0)

  // Snake state
  const [snakeActive, setSnakeActive] = useState(false)
  const snakeRef = useRef(null) // { snake, direction, food, score, alive, nextDirection }
  const snakeIntervalRef = useRef(null)

  // Matrix state
  const [matrixActive, setMatrixActive] = useState(false)
  const matrixIntervalRef = useRef(null)
  const matrixFrameRef = useRef(0)

  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const darkRef = useRef(dark)

  useEffect(() => { darkRef.current = dark }, [dark])

  // Lock page scroll when open (stop events from reaching Lenis)
  const overlayRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const el = overlayRef.current
    if (!el) return
    const stop = (e) => e.stopPropagation()
    el.addEventListener('wheel', stop, true)
    el.addEventListener('touchmove', stop, true)
    return () => {
      el.removeEventListener('wheel', stop, true)
      el.removeEventListener('touchmove', stop, true)
    }
  }, [open])

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines, snakeActive])

  // Animate open
  useEffect(() => {
    if (open) {
      setVisible(false)
      setInput('')
      setHistoryIndex(-1)
      setSnakeActive(false)
      setMatrixActive(false)
      // Set welcome lines
      const welcome = [
        ...WELCOME_ART.map(text => ({ text, color: '#7ee787' })),
        { text: '' },
        { text: DIVIDER, color: '#333d47' },
        { text: "Type 'help' to see available commands." },
        { text: DIVIDER, color: '#333d47' },
        { text: '' },
      ]
      setLines(welcome)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setVisible(false)
      // Cleanup game/matrix
      if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current)
      if (matrixIntervalRef.current) clearInterval(matrixIntervalRef.current)
    }
  }, [open])

  // Focus input when opened
  useEffect(() => {
    if (open && !snakeActive && !matrixActive) {
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open, snakeActive, matrixActive])

  const appendLines = useCallback((newLines) => {
    setLines(prev => [...prev, ...newLines.map(l => typeof l === 'string' ? { text: l } : l)])
  }, [])

  const clearTerminal = useCallback(() => {
    setLines([])
  }, [])

  // ── Snake game ──

  const startSnake = useCallback(() => {
    const snake = makeInitialSnake()
    const food = randomFood(snake)
    snakeRef.current = { snake, direction: 'right', nextDirection: 'right', food, score: 0, alive: true }
    setSnakeActive(true)

    // Render initial frame
    const grid = renderSnakeGrid(snake, food, 0)
    appendLines([{ text: '' }, { text: 'Snake! Arrow keys or WASD to move. ESC to quit.', color: '#7ee787' }, { text: '' }])
    appendLines(grid.map(text => ({ text, type: 'snake' })))

    snakeIntervalRef.current = setInterval(() => {
      const state = snakeRef.current
      if (!state || !state.alive) return

      const dir = state.nextDirection
      state.direction = dir
      const head = { ...state.snake[0] }

      if (dir === 'up') head.y--
      else if (dir === 'down') head.y++
      else if (dir === 'left') head.x--
      else if (dir === 'right') head.x++

      // Wall collision
      if (head.x < 0 || head.x >= GRID_W || head.y < 0 || head.y >= GRID_H) {
        state.alive = false
        clearInterval(snakeIntervalRef.current)
        snakeIntervalRef.current = null
        setSnakeActive(false)
        // Remove last snake grid and show game over
        setLines(prev => {
          const filtered = prev.filter(l => l.type !== 'snake')
          return [...filtered, { text: `Game over! Final score: ${state.score}`, color: '#7ee787' }, { text: '' }]
        })
        setTimeout(() => inputRef.current?.focus(), 50)
        return
      }

      // Self collision
      if (state.snake.some(s => s.x === head.x && s.y === head.y)) {
        state.alive = false
        clearInterval(snakeIntervalRef.current)
        snakeIntervalRef.current = null
        setSnakeActive(false)
        setLines(prev => {
          const filtered = prev.filter(l => l.type !== 'snake')
          return [...filtered, { text: `Game over! Final score: ${state.score}`, color: '#7ee787' }, { text: '' }]
        })
        setTimeout(() => inputRef.current?.focus(), 50)
        return
      }

      const newSnake = [head, ...state.snake]

      // Food collision
      if (head.x === state.food.x && head.y === state.food.y) {
        state.score++
        state.food = randomFood(newSnake)
      } else {
        newSnake.pop()
      }

      state.snake = newSnake

      // Re-render grid
      const grid = renderSnakeGrid(state.snake, state.food, state.score)
      setLines(prev => {
        const filtered = prev.filter(l => l.type !== 'snake')
        return [...filtered, ...grid.map(text => ({ text, type: 'snake' }))]
      })
    }, SNAKE_TICK)
  }, [appendLines])

  const stopSnake = useCallback(() => {
    if (snakeIntervalRef.current) {
      clearInterval(snakeIntervalRef.current)
      snakeIntervalRef.current = null
    }
    const state = snakeRef.current
    setSnakeActive(false)
    setLines(prev => {
      const filtered = prev.filter(l => l.type !== 'snake')
      return [...filtered, { text: `Game quit. Final score: ${state?.score ?? 0}`, color: '#7ee787' }, { text: '' }]
    })
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  // ── Matrix animation ──

  const startMatrix = useCallback(() => {
    setMatrixActive(true)
    matrixFrameRef.current = 0

    // Add initial blank lines for matrix area
    const blankFrame = Array.from({ length: 8 }, () => ({ text: '', type: 'matrix' }))
    appendLines([{ text: '' }, ...blankFrame])

    matrixIntervalRef.current = setInterval(() => {
      matrixFrameRef.current++

      if (matrixFrameRef.current > 25) {
        clearInterval(matrixIntervalRef.current)
        matrixIntervalRef.current = null
        setMatrixActive(false)
        setLines(prev => {
          const filtered = prev.filter(l => l.type !== 'matrix')
          return [
            ...filtered,
            { text: '' },
            { text: 'Wake up, engineer...', color: '#7ee787' },
            { text: 'The codebase has you.', color: '#7ee787' },
            { text: 'Follow the green cursor.', color: '#7ee787' },
            { text: '' },
          ]
        })
        setTimeout(() => inputRef.current?.focus(), 50)
        return
      }

      // Generate frame
      const frameLines = []
      for (let row = 0; row < 8; row++) {
        let line = ''
        for (let col = 0; col < 30; col++) {
          if (Math.random() < 0.3) {
            const chars = Math.random() < 0.5 ? KATAKANA : HEX_CHARS
            line += chars[Math.floor(Math.random() * chars.length)] + ' '
          } else {
            line += '  '
          }
        }
        frameLines.push({ text: line.trimEnd(), type: 'matrix', color: '#7ee787' })
      }

      setLines(prev => {
        const filtered = prev.filter(l => l.type !== 'matrix')
        return [...filtered, ...frameLines]
      })
    }, 80)
  }, [appendLines])

  const stopMatrix = useCallback(() => {
    if (matrixIntervalRef.current) {
      clearInterval(matrixIntervalRef.current)
      matrixIntervalRef.current = null
    }
    setMatrixActive(false)
    setLines(prev => prev.filter(l => l.type !== 'matrix'))
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  // ── Command execution ──

  const executeCommand = useCallback((rawInput) => {
    const trimmed = rawInput.trim()
    if (!trimmed) return

    // Echo the command
    appendLines([{ text: `$ ${trimmed}`, color: '#7ee787' }])

    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    switch (cmd) {
      case 'help':
        appendLines(HELP_TEXT.map(text => {
          if (text.startsWith('//')) return { text, color: '#7ee787' }
          return { text }
        }))
        appendLines([{ text: '' }])
        break

      case 'clear':
        clearTerminal()
        break

      case 'close':
      case 'exit':
      case 'quit':
        onClose()
        break

      case 'history':
        if (history.length === 0) {
          appendLines([{ text: 'No commands in history.' }, { text: '' }])
        } else {
          appendLines(history.map((h, i) => ({ text: `  ${i + 1}  ${h}` })))
          appendLines([{ text: '' }])
        }
        break

      case 'theme': {
        onToggleDark()
        const newMode = darkRef.current ? 'light' : 'dark'
        appendLines([{ text: `Theme switched to ${newMode} mode.`, color: '#7ee787' }, { text: '' }])
        break
      }

      case 'whois':
      case 'about':
        appendLines([
          { text: 'Many Roads AI', color: '#7ee787' },
          { text: '' },
          { text: 'AI consulting for engineering teams.' },
          { text: 'We help teams adopt AI coding tools — properly.' },
          { text: '' },
          { text: 'What we do:' },
          { text: '  Assessment → Implementation → Training' },
          { text: '' },
          { text: 'Who we serve:' },
          { text: '  Engineering teams (10-200 devs) struggling with AI adoption' },
          { text: '' },
          { text: 'https://manyroads.ai', color: '#7ee787' },
          { text: 'https://github.com/chowwingho/manyroads-ai', color: '#7ee787' },
          { text: '' },
        ])
        break

      case 'team':
        appendLines([{ text: '' }])
        for (const member of TEAM_DATA) {
          appendLines([
            { text: `  ${member.name}`, color: '#7ee787' },
            { text: `  ${member.role}` },
            { text: '' },
          ])
        }
        appendLines([
          { text: 'Four people. No layers. No account managers.', color: '#7ee787' },
          { text: '' },
        ])
        break

      case 'services':
        appendLines([{ text: '' }])
        for (const svc of SERVICES_DATA) {
          appendLines([
            { text: `  ${svc.name}  ${svc.price}`, color: '#7ee787' },
            { text: `  ${svc.desc}` },
            { text: '' },
          ])
        }
        break

      case 'version':
        appendLines([
          { text: 'mrai v2.1.0', color: '#7ee787' },
          { text: `build: ${new Date().toISOString().split('T')[0]}` },
          { text: 'runtime: next@15, react@19, tailwind@4, geist fonts' },
          { text: 'status: operational' },
          { text: '' },
        ])
        break

      case 'status':
        appendLines(STATUS_TABLE.map(text => {
          if (text.includes('●')) return { text, color: '#7ee787' }
          return { text }
        }))
        appendLines([{ text: '' }])
        break

      case 'brew':
      case 'coffee':
        appendLines(BREW_RESPONSES[brewCount % 3].split('\n').map(text => ({ text })))
        appendLines([{ text: '' }])
        setBrewCount(prev => prev + 1)
        break

      case 'snake':
        startSnake()
        break

      case 'matrix':
        startMatrix()
        break

      case 'sudo':
        appendLines([
          { text: 'Nice try. You don\'t have root here.', color: '#7ee787' },
          { text: '(But we admire the ambition.)' },
          { text: '' },
        ])
        break

      case 'rm':
        appendLines([
          { text: 'Permission denied. We\'re consultants, not destroyers.' },
          { text: '' },
        ])
        break

      case 'whoami':
        appendLines([
          { text: 'A curious engineer. We like that.', color: '#7ee787' },
          { text: '' },
        ])
        break

      case 'ping':
        appendLines(PING_OUTPUT.map(text => ({ text })))
        appendLines([{ text: '' }])
        break

      case 'ls':
        appendLines(LS_OUTPUT.map(text => ({ text })))
        appendLines([{ text: '' }])
        break

      case 'cat':
        if (args === 'README.md') {
          appendLines(CAT_README.map(text => ({ text })))
        } else if (args === '.env.example') {
          appendLines(CAT_ENV.map(text => ({ text })))
        } else if (args) {
          appendLines([{ text: `cat: ${args}: No such file or directory` }])
        } else {
          appendLines([{ text: 'cat: missing operand' }])
        }
        appendLines([{ text: '' }])
        break

      case 'pwd':
        appendLines([{ text: '/home/mrai/consulting' }, { text: '' }])
        break

      default:
        appendLines([
          { text: `command not found: ${cmd}` },
          { text: "Type 'help' for available commands." },
          { text: '' },
        ])
    }
  }, [appendLines, clearTerminal, onClose, onToggleDark, history, brewCount, startSnake, startMatrix])

  // ── Key handling ──

  const handleKeyDown = useCallback((e) => {
    // Snake controls
    if (snakeActive && snakeRef.current?.alive) {
      const state = snakeRef.current
      const opposite = { up: 'down', down: 'up', left: 'right', right: 'left' }

      if (e.key === 'Escape') {
        e.preventDefault()
        stopSnake()
        return
      }

      let newDir = null
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') newDir = 'up'
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') newDir = 'down'
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') newDir = 'left'
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') newDir = 'right'

      if (newDir && opposite[newDir] !== state.direction) {
        e.preventDefault()
        state.nextDirection = newDir
      }
      return
    }

    // Matrix escape
    if (matrixActive) {
      if (e.key === 'Escape') {
        e.preventDefault()
        stopMatrix()
      }
      return
    }

    // Normal input handling
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const val = input.trim()
      if (val) {
        setHistory(prev => [...prev, val])
      }
      executeCommand(input)
      setInput('')
      setHistoryIndex(-1)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      setHistoryIndex(prev => {
        const newIdx = prev === -1 ? history.length - 1 : Math.max(prev - 1, 0)
        setInput(history[newIdx])
        return newIdx
      })
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      setHistoryIndex(prev => {
        const newIdx = prev + 1
        if (newIdx >= history.length) {
          setInput('')
          return -1
        }
        setInput(history[newIdx])
        return newIdx
      })
      return
    }
  }, [snakeActive, matrixActive, input, history, historyIndex, onClose, executeCommand, stopSnake, stopMatrix])

  // Global key listener for snake/matrix (no input element during gameplay)
  useEffect(() => {
    if (!open || (!snakeActive && !matrixActive)) return
    const handler = (e) => handleKeyDown(e)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, snakeActive, matrixActive, handleKeyDown])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current)
      if (matrixIntervalRef.current) clearInterval(matrixIntervalRef.current)
    }
  }, [])

  if (!open) return null

  const bezelBg = dark ? '#2a2f35' : '#c8c8c4'

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 1000,
        backgroundColor: 'rgba(10,10,9,0.6)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <style>{`
        .mrai-console-cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: #7ee787;
          animation: mrai-cursor-blink 1s step-end infinite;
          vertical-align: text-bottom;
          margin-left: 1px;
        }
        @keyframes mrai-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .mrai-console-output::-webkit-scrollbar {
          width: 6px;
        }
        .mrai-console-output::-webkit-scrollbar-track {
          background: transparent;
        }
        .mrai-console-output::-webkit-scrollbar-thumb {
          background: #333d47;
          border-radius: 3px;
        }
        .mrai-console-output::-webkit-scrollbar-thumb:hover {
          background: #444d57;
        }
      `}</style>

      {/* Window */}
      <div
        style={{
          width: 'min(95vw, 740px)',
          maxHeight: 'min(90vh, 560px)',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(61,122,65,0.05)',
          transform: visible ? 'scale(1)' : 'scale(0.96)',
          opacity: visible ? 1 : 0,
          transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: bezelBg,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 38,
          }}
        >
          {/* Decorative grid icons */}
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 12, height: 12, border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 2 }} />
            <div style={{ width: 12, height: 12, border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 2 }} />
          </div>
          {/* Title */}
          <span style={{
            ...MONO,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
            textTransform: 'uppercase',
          }}>
            CONSOLE
          </span>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
              fontSize: 18,
              cursor: 'pointer',
              padding: '0 2px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Bezel + Terminal body */}
        <div
          style={{
            background: bezelBg,
            padding: '0 12px 12px 12px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #1a2332',
              borderRadius: 6,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              overflow: 'hidden',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Output area */}
            <div
              ref={outputRef}
              className="mrai-console-output"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px 14px',
                minHeight: 0,
              }}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    ...MONO,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: line.color || '#c9d1d9',
                    whiteSpace: 'pre',
                    minHeight: '1.6em',
                  }}
                >
                  {line.text || '\u00A0'}
                </div>
              ))}
            </div>

            {/* Input line */}
            {!snakeActive && !matrixActive && (
              <div
                style={{
                  padding: '8px 14px',
                  borderTop: '1px solid #1a2332',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ ...MONO, fontSize: 13, color: '#7ee787', flexShrink: 0 }}>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  style={{
                    ...MONO,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#c9d1d9',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    caretColor: 'transparent',
                    padding: 0,
                  }}
                />
                <span className="mrai-console-cursor" />
              </div>
            )}

            {/* Snake/Matrix active indicator */}
            {(snakeActive || matrixActive) && (
              <div style={{ padding: '8px 14px', borderTop: '1px solid #1a2332' }}>
                <span style={{ ...MONO, fontSize: 12, color: '#7ee787' }}>
                  {snakeActive ? 'Arrow keys to move • ESC to quit' : 'ESC to skip'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
