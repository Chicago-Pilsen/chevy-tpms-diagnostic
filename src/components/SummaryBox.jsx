import { useState } from 'react'
import { buildSummaryText } from '../data.js'
import styles from './SummaryBox.module.css'

export default function SummaryBox({ resultKey, trail = [] }) {
  const [copied, setCopied] = useState(false)
  const text = buildSummaryText(resultKey, trail)

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  function handlePrint() {
    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html><html><head>
      <title>TPMS Procedure — Fertech Auto Repair</title>
      <style>
        body { font-family: 'Courier New', monospace; font-size: 13px;
               padding: 2rem; white-space: pre-wrap; line-height: 1.8;
               color: #111; background: #fff; }
        @media print { body { padding: 1rem; } }
      </style>
    </head><body>${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body></html>`)
    win.document.close()
    win.focus()
    setTimeout(() => win.print(), 300)
  }

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>📄</span>
          Procedure summary
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
          >
            {copied ? '✓ Copied!' : '⎘ Copy'}
          </button>
          <button className={styles.btn} onClick={handlePrint}>
            🖨 Print
          </button>
        </div>
      </div>
      <pre className={styles.body}>{text}</pre>
    </div>
  )
}
