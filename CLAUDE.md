# Valentine's Day Website V2 — Potito King

## Project Overview
A fun, interactive Valentine's Day website for a boyfriend. Features a two-step question flow with dodging buttons, dancing lizards, and a celebration reveal.

## Tech Stack
- Pure HTML, CSS, and JavaScript (no frameworks or build tools)
- Single-page static site

## Project Structure
```
valentinesday-v2/
├── CLAUDE.md           # Project instructions for Claude
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # All interactivity logic
└── assets/
    └── images/
        ├── kedisu.png          # Grumpy orange cat (celebration reveal)
        ├── potito.png          # Cute potato king (question 1)
        └── dancinglizard.gif   # Dancing white lizard with transparent background (question 2)
```

## Page Flow
1. **Question 1**: "Will you be my Potito King this Valentine's Day?" with potito.png
   - **"Yes!"** → goes to Question 2
   - **"Hmm let me think"** → dodges cursor, impossible to click
2. **Question 2**: "Will you showcase your talents tonight?" with 3 dancing lizards
   - **"Only for kedisu"** → triggers celebration
   - **"No"** → dodges cursor, impossible to click
3. **Celebration**: Confetti + burst hearts, "Good choice" with kedisu.png

## Key Behaviors
- **Dodging buttons**: Always dodge cursor/tap — uses `mouseenter` and `touchstart` events to reposition randomly on screen
- **No overlap**: Dodging buttons never land on top of the Yes button (40px buffer zone)
- **Buttons start side by side**: Yes and No/dodge buttons appear next to each other initially, dodge only triggers on interaction
- **Dancing lizards**: 3 lizards in a row (middle one mirrored) with transparent backgrounds, created by AI background removal from original video
- **Background**: Floating heart emojis on a dark (#1a0a1e) background
- **Mobile support**: Touch events handled for dodging buttons

## Conventions
- Keep it simple — no build tools, bundlers, or package managers
- All assets go in `assets/images/`
- CSS in `css/`, JS in `js/`
- Test by opening `index.html` directly in a browser
