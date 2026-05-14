import { useState } from 'react'
import ResultCard from './ResultCard.jsx'
import { WIZARD_STEPS, getWizardNext } from '../data.js'
import styles from './ModeA.module.css'

export default function ModeA() {
  const [step, setStep] = useState(0)
  const [history, setHistory] = useState([])
  const [result, setResult] = useState(null)

  function handleChoice(key) {
    const next = getWizardNext(step, key)
    setHistory(h => [...h, { step, key }])
    if (next.result) {
      setResult(next.result)
    } else {
      setStep(next.next)
    }
  }

  function handleBack() {
    if (result) {
      setResult(null)
      const prev = history[history.length - 1]
      setHistory(h => h.slice(0, -1))
      setStep(prev.step)
      return
    }
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setHistory(h => h.slice(0, -1))
      setStep(prev.step)
    }
  }

  function handleRestart() {
    setStep(0)
    setHistory([])
    setResult(null)
  }

  const keyLabels = {
    flash: 'Flashing', steady: 'Steady', new: '2007+', old: 'Pre-2007',
    scan: 'Scan Tool', dic: 'DIC Method', new2022: '2022+', classic: '2007–2021',
  }
  const trail = ['Start', ...history.map(h => keyLabels[h.key] || h.key)]
  const totalSteps = 4

  return (
    <div className={styles.wizard}>
      {/* Progress bar */}
      <div className={styles.progress}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const cur = result ? history.length + 1 : step + 1
          const done = i + 1 < cur
          const active = i + 1 === cur
          return (
            <div key={i} className={styles.progressStep}>
              <div className={`${styles.dot} ${done ? styles.done : ''} ${active ? styles.active : ''}`}>
                {done ? '✓' : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`${styles.line} ${done ? styles.lineDone : ''}`} />
              )}
            </div>
          )
        })}
      </div>

      {result ? (
        <ResultCard
          resultKey={result}
          trail={trail}
          onBack={handleBack}
          onRestart={handleRestart}
        />
      ) : (
        <div className={styles.card}>
          <div className={styles.question}>{WIZARD_STEPS[step].q}</div>
          <div className={styles.sub}>{WIZARD_STEPS[step].sub}</div>
          <div className={styles.choices}>
            {WIZARD_STEPS[step].choices.map(c => (
              <button
                key={c.key}
                className={styles.choiceBtn}
                onClick={() => handleChoice(c.key)}
              >
                <div className={styles.choiceIcon} style={{ background: c.bg }}>
                  {c.icon}
                </div>
                <div className={styles.choiceText}>
                  <strong>{c.label}</strong>
                  <span>{c.desc}</span>
                </div>
              </button>
            ))}
          </div>
          {history.length > 0 && (
            <div className={styles.backRow}>
              <button className={styles.backBtn} onClick={handleBack}>← Back</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
