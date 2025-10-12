# Search a GitHub User — Rewritten

A minimal, dependency-light React + Tailwind app for looking up GitHub users.

## Highlights
- Clean fetch-based API call (no axios)
- Proper error + loading states and accessible alerts
- Duplicate prevention (updates card if the same user is searched again)
- Friendly join-date formatting and blog URL normalization

## Run
```bash
npm install
npm start
```

## Structure
- `src/App.js` — state + composition
- `src/components/Form.js` — input + GitHub request
- `src/components/CardList.js` — responsive grid
- `src/components/Card.js` — profile card
