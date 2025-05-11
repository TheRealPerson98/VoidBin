<div align="center">
  <img src="public/logo_text_nbg.png" alt="VoidBin" width="360" />
  
  <h3>
    <small><small>SECURE · MINIMAL · POWERFUL</small></small>
  </h3>
  
  <br/>
  
  [![Live Demo](https://img.shields.io/badge/LIVE-DEMO-000000?style=for-the-badge)](https://voidbin.com)
  [![GitHub stars](https://img.shields.io/github/stars/thejacedev/VoidBin?style=for-the-badge&color=000000)](https://github.com/thejacedev/VoidBin/stargazers)
  [![License](https://img.shields.io/badge/LICENSE-APACHE%202.0-000000?style=for-the-badge)](LICENSE)
</div>

<br/>

<p align="center">
  <i>The premium pastebin alternative, reimagined for the modern web.</i>
</p>

<br/>

## ✦ OVERVIEW

**VOID|BIN** delivers an unparalleled paste-sharing experience with and meticulous attention to design. Every element has been crafted to provide both aesthetic appeal and seamless functionality.

<br/>

## ✦ DISTINCTIVE FEATURES

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ PERFORMANCE</h3>
      <p>Lightning-fast response times powered by Next.js architecture and optimized code delivery</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎭 DARK MODE</h3>
      <p>Refined dark theme designed for extended coding sessions with reduced eye strain</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📱 RESPONSIVE</h3>
      <p>Flawlessly adapts to any device with carefully crafted breakpoints for optimal viewing</p>
    </td>
  </tr>
</table>

<br/>

## ✦ TECHNOLOGY ARCHITECTURE

```
FRONTEND   │ Next.js • React • TypeScript  
STYLING    │ TailwindCSS • Framer Motion
BACKEND    │ Prisma ORM • PostgreSQL
HIGHLIGHT  │ React Syntax Highlighter
```

<br/>

## ✦ SETUP PROCESS

### PREREQUISITES

```
• Node.js (v18+)
• PostgreSQL database
```

### INSTALLATION

```bash
# Clone the repository
git clone https://github.com/thejacedev/VoidBin.git
cd voidbin

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your database
# DATABASE_URL="postgresql://username:password@host:port/database_name"
# SITE_URL="http://localhost:3000"

# Run migrations
npx prisma migrate dev

# Launch development server
npm run dev
```

Access your local instance at [http://localhost:3000](http://localhost:3000)

<br/>

## ✦ DEPLOYMENT

### VERCEL DEPLOYMENT

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fthejacedev%2FVoidBin)

1. Push to GitHub repository
2. Import to Vercel platform
3. Configure environment variables
4. Deploy

<br/>

## ✦ USER GUIDE

| ACTION | METHOD |
|--------|--------|
| **CREATE** | Visit homepage and begin typing in the editor |
| **SHARE** | Copy the generated URL after saving your paste |
| **DUPLICATE/EDIT** | Use the "Dupe/Edit" button on any existing paste |
| **PLAIN TEXT** | Select "Just Text" for a distraction-free editor |

<br/>

## ✦ LICENSE

Apache License 2.0 — [View License](LICENSE)

<br/>

<div align="center">
  <p>
    <b>VOID|BIN</b> — A project by <a href="https://github.com/thejacedev">thejacedev</a>
  </p>
</div>
