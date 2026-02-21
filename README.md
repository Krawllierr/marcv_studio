# MarcV Studio — T.VYZ Landing Page

Interactive Unreal Engine Archviz landing page for the US market.

## Setup

```bash
npm install --ignore-scripts
cp .env.example .env.local
```

Add your Formspree endpoints to `.env.local`:

- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` — main lead form
- `NEXT_PUBLIC_LEAD_MAGNET_ENDPOINT` — checklist PDF signup
- `NEXT_PUBLIC_SITE_URL` — canonical site URL for metadata

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```
