export const RESULTS = {
  indirect: {
    icon: '🟢',
    title: 'Indirect TPMS — No Relearn Needed',
    desc: 'First-generation system, self-resetting.',
    steps: [
      'Ensure all four tires are properly inflated to the recommended PSI.',
      'Drive for 10+ minutes at 30+ mph on a highway or open road.',
      'TPMS light should extinguish automatically. If not, check tire pressure again.',
      'If light persists after a second drive cycle, inspect sensors for damage.',
    ],
    warning: null,
  },
  dic_basic: {
    icon: '🔵',
    title: 'DIC Basic Relearn — Step by Step',
    desc: 'No scan tool required. Uses the Driver Information Center.',
    steps: [
      'Set the parking brake and turn ignition to ON/RUN with engine OFF.',
      'Press the MENU button to access Vehicle Information in the DIC.',
      'Scroll to the Tire Pressure menu and press SET/CLR to enter relearn mode.',
      'Vehicle horn will chirp once — relearn mode is now active.',
      'Starting at the LF (Left Front) tire, use a TPMS tool to activate the sensor. Horn chirps = recognized.',
      'Move clockwise: RF → RR → LR. Activate each sensor and wait for horn chirp.',
      'After LR is confirmed, a long horn chirp signals relearn complete.',
    ],
    warning: 'Two rapid horn chirps before completion = relearn failed. Restart from step 1.',
  },
  obd_scan: {
    icon: '🔌',
    title: 'OBD Scan Tool Relearn',
    desc: 'Requires a TPMS scan tool with OBD capability.',
    steps: [
      'Connect the TPMS scan tool to the OBD-II port under the dash.',
      'On the tool, select Make: Chevrolet → Model → Year.',
      'Follow on-screen tool instructions for OBD relearn mode.',
      'The tool will transfer sensor IDs through the OBD port automatically.',
      'Confirm success message on the scan tool.',
      'Turn ignition off, then start engine and verify TPMS light is off.',
    ],
    warning: null,
  },
  auto_relearn: {
    icon: '✨',
    title: 'Auto Relearn (2022+ Models)',
    desc: 'New models support automatic relearn after driving.',
    steps: [
      'Ensure all four tires are inflated to the recommended PSI (check door jamb sticker).',
      'Drive the vehicle for at least 20 continuous minutes at 30+ mph.',
      'The ECU will automatically detect and match sensor IDs.',
      'TPMS light should go off. If not, a DIC or OBD relearn may still be required.',
    ],
    warning: "Applies to most 2022+ Chevy models. Check your owner's manual to confirm your model supports auto-relearn.",
  },
}

export const WIZARD_STEPS = [
  {
    q: 'What is the TPMS light doing?',
    sub: 'Observe the dashboard indicator to determine the fault type.',
    choices: [
      { icon: '💡', bg: '#FAEEDA', label: 'Flashing / Blinking', desc: 'Light blinks repeatedly on startup', key: 'flash' },
      { icon: '🔴', bg: '#FCEBEB', label: 'Steady / Solid', desc: 'Light stays on continuously', key: 'steady' },
    ],
  },
  {
    q: 'What is the vehicle model year?',
    sub: 'Older models use indirect TPMS and do not require a relearn procedure.',
    choices: [
      { icon: '📅', bg: '#E1F5EE', label: '2007 or newer', desc: 'Direct TPMS with sensors', key: 'new' },
      { icon: '🕰', bg: '#F1EFE8', label: 'Pre-2007', desc: 'Indirect (wheel-speed based) TPMS', key: 'old' },
    ],
  },
  {
    q: 'Do you have a TPMS scan tool?',
    sub: 'A scan tool speeds up the relearn. Without one, the DIC method works on most models.',
    choices: [
      { icon: '🔌', bg: '#E6F1FB', label: 'Yes — scan tool available', desc: 'OBD or dedicated TPMS tool', key: 'scan' },
      { icon: '📋', bg: '#EEEDFE', label: 'No scan tool', desc: 'Will use DIC menu method', key: 'dic' },
    ],
  },
  {
    q: 'Is this a 2022 or newer model?',
    sub: 'Newer Chevys may support automatic relearn without any tools.',
    choices: [
      { icon: '✨', bg: '#E1F5EE', label: '2022 or newer', desc: 'May support auto-relearn', key: 'new2022' },
      { icon: '🔧', bg: '#F1EFE8', label: '2007–2021', desc: 'Standard DIC relearn', key: 'classic' },
    ],
  },
]

export const CARD_STEPS = [
  {
    label: 'Step 1 — TPMS light behavior',
    choices: [
      { icon: '💡', title: 'Flashing', desc: 'Blinks on startup or while driving', key: 'flash', color: '#FAEEDA' },
      { icon: '🔴', title: 'Steady', desc: 'Solid light, does not blink', key: 'steady', color: '#FCEBEB' },
    ],
  },
  {
    label: 'Step 2 — Model year',
    choices: [
      { icon: '🕰', title: 'Pre-2007', desc: 'First-gen indirect TPMS', key: 'old', color: '#F1EFE8' },
      { icon: '📅', title: '2007 or newer', desc: 'Direct TPMS sensors', key: 'new', color: '#E1F5EE' },
    ],
  },
  {
    label: 'Step 3 — Relearn method',
    choices: [
      { icon: '🔌', title: 'Scan Tool (OBD)', desc: 'Have a TPMS OBD scanner', key: 'obd', color: '#E6F1FB' },
      { icon: '📋', title: 'DIC Method', desc: 'No scan tool — use DIC menu', key: 'dic', color: '#EEEDFE' },
      { icon: '✨', title: 'Auto Relearn', desc: '2022+ models only', key: 'auto', color: '#E1F5EE' },
    ],
  },
]

export function getWizardNext(step, key) {
  if (step === 1 && key === 'old') return { result: 'indirect' }
  if (step === 1 && key === 'new') return { next: 2 }
  if (step === 2 && key === 'scan') return { result: 'obd_scan' }
  if (step === 2 && key === 'dic') return { next: 3 }
  if (step === 3 && key === 'new2022') return { result: 'auto_relearn' }
  if (step === 3 && key === 'classic') return { result: 'dic_basic' }
  return { next: step + 1 }
}

export function buildSummaryText(resultKey, trail = []) {
  const r = RESULTS[resultKey]
  const now = new Date()
  const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '  FERTECH AUTO REPAIR — CHICAGO, IL',
    '  CHEVROLET TPMS RELEARN — PROCEDURE SUMMARY',
    `  ${date} at ${time}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `PROCEDURE:  ${r.title}`,
    `NOTE:       ${r.desc}`,
    trail.length ? `PATH:       ${trail.join(' → ')}` : '',
    '',
    'STEPS:',
    ...r.steps.map((s, i) => `  ${i + 1}. ${s}`),
    '',
    r.warning ? `⚠ WARNING:\n  ${r.warning}` : '',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '  fertech-autorepair.com',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ]
  return lines.filter(l => l !== null).join('\n')
}
