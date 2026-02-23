# MarcV Studio — T.VYZ Landing Page

Interactive Unreal Engine Archviz landing page for the US market.

## Setup

```bash
npm install --ignore-scripts
cp .env.example .env.local
```

Add your webhook URL to `.env.local`:

- `NEXT_PUBLIC_FORM_WEBHOOK_URL` — n8n webhook for all form submissions (POST)
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
