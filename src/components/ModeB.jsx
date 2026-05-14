import { useState } from 'react'
import ResultCard from './ResultCard.jsx'
import styles from './ModeB.module.css'

const NODES = [
  { level: 1, label: 'Model year?', key: null },
  { level: 2, choices: [
    { key: 'old', icon: '🕰', label: 'Pre-2007', sub: 'Indirect TPMS' },
    { key: 'new', icon: '📅', label: '2007 or newer', sub: 'Direct TPMS' },
  ]},
  { level: 3, label: 'Relearn method?', showIf: s => s.year === 'new' },
  { level: 4, choices: [
    { key: 'obd',  icon: '🔌', label: 'OBD Scan Tool',  sub: 'Fastest method' },
    { key: 'dic',  icon: '📋', label: 'DIC Method',     sub: 'No tool needed' },
    { key: 'auto', icon: '✨', label: 'Auto Relearn',   sub: '2022+ only' },
  ], showIf: s => s.year === 'new' },
  { level: 5, label: 'Vehicle year?', showIf: s => s.method === 'dic' },
  { level: 6, choices: [
    { key: 'classic', icon: '🔧', label: '2007–2021', sub: 'Classic DIC' },
    { key: 'dicAuto', icon: '✨', label: '2022+',     sub: 'Auto eligible' },
  ], showIf: s => s.method === 'dic' },
]

function getResult(s) {
  if (s.year === 'old') return 'indirect'
  if (s.method === 'obd') return 'obd_scan'
  if (s.method === 'auto') return 'auto_relearn'
  if (s.sub === 'classic') return 'dic_basic'
  if (s.sub === 'dicAuto') return 'auto_relearn'
  return null
}

function getTrail(s) {
  const t = ['Start']
  if (s.year === 'old') t.push('Pre-2007')
  if (s.year === 'new') t.push('2007+')
  if (s.method === 'obd') t.push('OBD Tool')
  if (s.method === 'dic') t.push('DIC Method')
  if (s.method === 'auto') t.push('Auto Relearn')
  if (s.sub === 'classic') t.push('Classic DIC')
  if (s.sub === 'dicAuto') t.push('2022+ Auto')
  return t
}

export default function ModeB() {
  const [sel, setSel] = useState({})

  function pick(level, key) {
    if (level === 'year') setSel({ year: key })
    else if (level === 'method') setSel(s => ({ ...s, method: key, sub: undefined }))
    else if (level === 'sub') setSel(s => ({ ...s, sub: key }))
  }

  function reset() { setSel({}) }

  const result = getResult(sel)
  const trail = getTrail(sel)

  return (
    <div className={styles.tree}>
      {/* Root */}
      <div className={styles.rowCenter}>
        <div className={styles.rootCard}>
          <span>🚗</span>
          <div>
            <div className={styles.rootTitle}>Chevy TPMS Relearn</div>
            <div className={styles.rootSub}>Select your path below</div>
          </div>
        </div>
      </div>

      <div className={styles.connector} />
      <div className={styles.sectionLabel}>Model year?</div>

      {/* Year row */}
      <div className={styles.row}>
        {[
          { key: 'old', icon: '🕰', label: 'Pre-2007', sub: 'Indirect TPMS' },
          { key: 'new', icon: '📅', label: '2007 or newer', sub: 'Direct TPMS' },
        ].map(n => (
          <button
            key={n.key}
            className={`${styles.node} ${sel.year === n.key ? styles.active : ''}`}
            onClick={() => pick('year', n.key)}
          >
            <span className={styles.nodeIcon}>{n.icon}</span>
            <div>
              <div className={styles.nodeLabel}>{n.label}</div>
              <div className={styles.nodeSub}>{n.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Method row */}
      {sel.year === 'new' && (
        <>
          <div className={styles.connector} />
          <div className={styles.sectionLabel}>Relearn method?</div>
          <div className={styles.row}>
            {[
              { key: 'obd',  icon: '🔌', label: 'OBD Scan Tool', sub: 'Fastest method' },
              { key: 'dic',  icon: '📋', label: 'DIC Method',    sub: 'No tool needed' },
              { key: 'auto', icon: '✨', label: 'Auto Relearn',  sub: '2022+ only' },
            ].map(n => (
              <button
                key={n.key}
                className={`${styles.node} ${sel.method === n.key ? styles.active : ''}`}
                onClick={() => pick('method', n.key)}
              >
                <span className={styles.nodeIcon}>{n.icon}</span>
                <div>
                  <div className={styles.nodeLabel}>{n.label}</div>
                  <div className={styles.nodeSub}>{n.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Sub-method for DIC */}
      {sel.method === 'dic' && (
        <>
          <div className={styles.connector} />
          <div className={styles.sectionLabel}>Vehicle year?</div>
          <div className={styles.row}>
            {[
              { key: 'classic', icon: '🔧', label: '2007–2021', sub: 'Classic DIC flow' },
              { key: 'dicAuto', icon: '✨', label: '2022+',     sub: 'Auto relearn eligible' },
            ].map(n => (
              <button
                key={n.key}
                className={`${styles.node} ${sel.sub === n.key ? styles.active : ''}`}
                onClick={() => pick('sub', n.key)}
              >
                <span className={styles.nodeIcon}>{n.icon}</span>
                <div>
                  <div className={styles.nodeLabel}>{n.label}</div>
                  <div className={styles.nodeSub}>{n.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Result */}
      {result && (
        <div className={styles.resultWrap}>
          <div className={styles.trailRow}>
            {trail.map((t, i) => (
              <span key={i} className={styles.trailItem}>
                {i > 0 && <span className={styles.trailArrow}>→</span>}
                <span className={styles.trailChip}>{t}</span>
              </span>
            ))}
          </div>
          <ResultCard resultKey={result} trail={trail} onRestart={reset} />
        </div>
      )}
    </div>
  )
}
