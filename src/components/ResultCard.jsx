import SummaryBox from './SummaryBox.jsx'
import { RESULTS } from '../data.js'
import styles from './ResultCard.module.css'

export default function ResultCard({ resultKey, trail = [], onBack, onRestart }) {
  const r = RESULTS[resultKey]
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconCircle}>{r.icon}</div>
        <div>
          <div className={styles.title}>{r.title}</div>
          <div className={styles.sub}>{r.desc}</div>
        </div>
      </div>

      <div className={styles.steps}>
        {r.steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNum}>{i + 1}</div>
            <div className={styles.stepText}>{step}</div>
          </div>
        ))}
      </div>

      {r.warning && (
        <div className={styles.warning}>
          <span className={styles.warnIcon}>⚠</span>
          {r.warning}
        </div>
      )}

      <SummaryBox resultKey={resultKey} trail={trail} />

      <div className={styles.actions}>
        {onBack && (
          <button className={styles.btnSecondary} onClick={onBack}>
            ← Back
          </button>
        )}
        {onRestart && (
          <button className={styles.btnSecondary} onClick={onRestart}>
            ↺ Restart
          </button>
        )}
      </div>
    </div>
  )
}
