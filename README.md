# Chevy TPMS Relearn Diagnostic

**Fertech Auto Repair — Chicago, IL**

A React + Vite diagnostic tool for Chevrolet TPMS sensor relearn procedures. Three interactive modes guide technicians to the correct relearn procedure with a printable/copyable summary at the end.

## Features

- **Mode A — Step Wizard**: Step-by-step guided flow with progress bar and back navigation
- **Mode B — Branch Tree**: Expandable decision tree, click nodes to reveal branches
- **Mode C — Card Flip**: Card-based selection, each choice reveals the next set of cards
- **Procedure Summary**: Every result includes a formatted summary you can copy to clipboard or print
- Covers all 4 relearn procedures: Indirect, DIC Basic, OBD Scan Tool, and Auto Relearn (2022+)

## Getting Started

### Requirements
- Node.js 18+
- npm or yarn

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    ModeA.jsx          # Step Wizard mode
    ModeA.module.css
    ModeB.jsx          # Branch Tree mode
    ModeB.module.css
    ModeC.jsx          # Card Flip mode
    ModeC.module.css
    ResultCard.jsx     # Shared result display
    ResultCard.module.css
    SummaryBox.jsx     # Copy / Print summary
    SummaryBox.module.css
  data.js              # All TPMS data & logic
  App.jsx              # Root with tabs
  App.module.css
  index.css            # Global CSS variables
  main.jsx             # Entry point
index.html
vite.config.js
package.json
```
