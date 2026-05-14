import { useState } from 'react'
import ModeA from './components/ModeA.jsx'
import ModeB from './components/ModeB.jsx'
import ModeC from './components/ModeC.jsx'
import styles from './App.module.css'

const TABS = [
  { id: 'a', icon: '→', label: 'Mode A', sub: 'Step Wizard', component: <ModeA /> },
  { id: 'b', icon: '⑃', label: 'Mode B', sub: 'Branch Tree', component: <ModeB /> },
  { id: 'c', icon: '▣', label: 'Mode C', sub: 'Card Flip',   component: <ModeC /> },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('a')

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>🔧 Fertech Auto Repair</div>
          <h1 className={styles.title}>Chevy TPMS Relearn Diagnostic</h1>
          <p className={styles.subtitle}>2007+ models · Direct TPMS · Three ways to navigate</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabSub}>{tab.sub}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className={styles.panel}>
          {TABS.map(tab => (
            <div
              key={tab.id}
              role="tabpanel"
              hidden={activeTab !== tab.id}
              style={{ display: activeTab === tab.id ? 'block' : 'none' }}
            >
              {tab.component}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          Chevrolet TPMS Relearn Guide · Updated 2024 · Fertech Auto Repair, Chicago IL
        </div>
      </div>
    </div>
  )
}
