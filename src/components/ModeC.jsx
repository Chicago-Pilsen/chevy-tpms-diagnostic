import { useState } from 'react'
import ResultCard from './ResultCard.jsx'
import { CARD_STEPS } from '../data.js'
import styles from './ModeC.module.css'

function getResult(selections) {
  if (selections[1] === 'old') return 'indirect'
  if (selections[2] === 'obd') return 'obd_scan'
  if (selections[2] === 'auto') return 'auto_relearn'
  if (selections[2] === 'dic') return 'dic_basic'
  return null
}

function getTrail(selections) {
  const labels = {
    flash: 'Flashing', steady: 'Steady',
    old: 'Pre-2007', new: '2007+',
    obd: 'OBD Tool', dic: 'DIC Method', auto: 'Auto Relearn',
  }
  return ['Start', ...selections.filter(Boolean).map(k => labels[k] || k)]
}

export default function ModeC() {
  const [selections, setSelections] = useState([])

  function choose(stepIdx, key) {
    setSelections(prev => {
      const next = [...prev]
      next[stepIdx] = key
      next.length = stepIdx + 1
      return next
    })
  }

  function reset() { setSelections([]) }

  const result = getResult(selections)
  const trail = getTrail(selections)

  return (
    <div className={styles.cards}>
      {CARD_STEPS.map((step, idx) => {
        // Skip method step if pre-2007
        if (idx === 2 && selections[1] === 'old') return null
        // Don't show next step until previous is selected
        if (idx >= 1 && selections[idx - 1] === undefined) return null

        const stepSel = selections[idx]
        const cols = step.choices.length > 2 ? 3 : 2

        return (
          <div key={idx} className={styles.stage}>
            <div className={styles.stageLabel}>{step.label}</div>
            <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {step.choices.map(c => {
                const selected = stepSel === c.key
                const dimmed = stepSel && !selected
                return (
                  <button
                    key={c.key}
                    className={`${styles.card} ${selected ? styles.selected : ''} ${dimmed ? styles.dim : ''}`}
                    style={{ borderTop: `3px solid ${c.color}` }}
                    onClick={() => choose(idx, c.key)}
                  >
                    <div className={styles.cardIcon}>{c.icon}</div>
                    <div className={styles.cardTitle}>{c.title}</div>
                    <div className={styles.cardDesc}>{c.desc}</div>
                  </button>
                )
              })}
            </div>

            {/* Divider between stages */}
            {!result && stepSel && !(idx === 1 && stepSel === 'old') && idx < 2 && (
              <div className={styles.divider}>
                <div className={styles.dividerLine} />
                <span className={styles.dividerText}>→ next</span>
                <div className={styles.dividerLine} />
              </div>
            )}
          </div>
        )
      })}

      {result && (
        <ResultCard resultKey={result} trail={trail} onRestart={reset} />
      )}
    </div>
  )
}
