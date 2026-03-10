# Jay Shah — Portfolio

A fully interactive 3D portfolio with a secure AI assistant powered by Claude.

---

## 📁 Project Structure

```
jay-portfolio/
├── index.html        ← Your entire portfolio (HTML + CSS + JS)
├── api/
│   └── chat.js       ← Vercel Edge Function (secure API proxy)
├── vercel.json       ← Vercel routing config
├── package.json      ← Project metadata
└── README.md
```

---

## 🚀 Deploy to Vercel (5 minutes, free)

### Step 1 — Get a free Vercel account
Go to [vercel.com](https://vercel.com) and sign up with GitHub.

### Step 2 — Get your Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **API Keys** → **Create Key**
3. Copy the key (starts with `sk-ant-...`)

### Step 3 — Push to GitHub
```bash
cd jay-portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jay-portfolio.git
git push -u origin main
```

### Step 4 — Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"** → select `jay-portfolio`
3. Click **"Deploy"** (no build settings needed)

### Step 5 — Add your API Key as an Environment Variable
1. In your Vercel project dashboard → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-key-here`
   - **Environment:** Production, Preview, Development ✅
3. Click **Save**
4. Go to **Deployments** → click **"Redeploy"** on your latest deployment

### Step 6 — Done! 🎉
Your portfolio is live at `https://jay-portfolio.vercel.app` (or your custom domain).

---

## 🌐 Custom Domain (Optional)

1. In Vercel → **Settings** → **Domains**
2. Add your domain (e.g. `jayshah.dev`)
3. Update your domain's DNS with the records Vercel provides

---

## 🔒 Security Notes

- Your `ANTHROPIC_API_KEY` is **never exposed** to the browser
- All AI requests go: `Browser → /api/chat (Edge Function) → Anthropic`
- The edge function validates every request before forwarding

---

## 🛠 Local Development

```bash
npm install -g vercel
vercel dev
```

Then open [http://localhost:3000](http://localhost:3000).
Set your API key locally:
```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here
```

---

Built with Three.js · Powered by Claude · Deployed on Vercel
