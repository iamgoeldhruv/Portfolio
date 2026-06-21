import { useState, useEffect, useRef } from "react";

const VIOLET = "#7C3AED";
const VIOLET_LIGHT = "#A78BFA";
const VIOLET_DIM = "#4C1D95";
const BG = "#0A0A0A";
const SURFACE = "#111111";
const SURFACE2 = "#1A1A1A";
const BORDER = "#222222";
const BORDER2 = "#2E2E2E";
const TEXT = "#F0EFF8";
const MUTED = "#888880";
const MUTED2 = "#444440";
const GREEN = "#22C55E";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  html, body, #root {
    width: 100%;
    background: ${BG};
    color: ${TEXT};
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .grotesk { font-family: 'Space Grotesk', sans-serif; }
  .mono    { font-family: 'JetBrains Mono', monospace; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: ${BG}; }
  ::-webkit-scrollbar-thumb { background: ${VIOLET_DIM}; border-radius: 2px; }

  @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes orbitSlow  { from{transform:rotate(0deg) translateX(180px) rotate(0deg)} to{transform:rotate(360deg) translateX(180px) rotate(-360deg)} }
  @keyframes orbitFast  { from{transform:rotate(0deg) translateX(120px) rotate(0deg)} to{transform:rotate(-360deg) translateX(120px) rotate(360deg)} }
  @keyframes pulseRing  { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(2.2);opacity:0} }
  @keyframes glowPulse  { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
  @keyframes slideRight { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  @keyframes countUp    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes marquee    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  /* ── NAV ── */
  .nav {
    position: fixed; top:0; left:0; right:0; z-index:100;
    display:flex; align-items:center; justify-content:space-between;
    padding: 16px 5vw;
    transition: all 0.3s ease;
  }
  .nav.scrolled {
    background: rgba(10,10,10,0.92);
    border-bottom: 1px solid ${BORDER};
    backdrop-filter: blur(20px);
  }
  .nav-logo {
    font-family:'Space Grotesk',sans-serif;
    font-size:20px; font-weight:700; letter-spacing:-0.5px; color:${TEXT};
  }
  .nav-logo span { color:${VIOLET}; }
  .nav-center { display:flex; gap:36px; }
  .nav-link {
    font-size:12px; font-weight:500; letter-spacing:0.1em;
    text-transform:uppercase; color:${MUTED};
    cursor:pointer; text-decoration:none; transition:color 0.2s;
  }
  .nav-link:hover { color:${TEXT}; }
  .nav-cta {
    background:${VIOLET}; color:white; border:none; border-radius:6px;
    padding:9px 22px; font-size:13px; font-weight:600;
    cursor:pointer; font-family:'Inter',sans-serif; transition:all 0.2s;
  }
  .nav-cta:hover { background:#6D28D9; transform:translateY(-1px); }

  /* ── HERO ── */
  .hero {
    min-height:100vh; width:100%;
    display:flex; flex-direction:column; justify-content:center;
    padding: 140px 5vw 80px;
    position:relative; overflow:hidden;
  }
  .hero-grid-bg {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(${BORDER} 1px, transparent 1px),
      linear-gradient(90deg, ${BORDER} 1px, transparent 1px);
    background-size: 80px 80px;
    opacity:0.35;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 0%, black 30%, transparent 100%);
  }
  .hero-glow {
    position:absolute; top:-300px; right:-100px;
    width:900px; height:900px; pointer-events:none;
    background: radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%);
  }
  .hero-glow2 {
    position:absolute; bottom:-200px; left:-200px;
    width:600px; height:600px; pointer-events:none;
    background: radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%);
  }
  .hero-layout {
    position:relative; z-index:1;
    display:grid; grid-template-columns: 1fr auto;
    gap:60px; align-items:center; width:100%;
  }
  .hero-eyebrow {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.25);
    border-radius:99px; padding:6px 16px;
    font-size:11px; font-weight:600; letter-spacing:0.12em;
    text-transform:uppercase; color:${VIOLET_LIGHT};
    margin-bottom:24px;
  }
  .hero-dot {
    width:6px; height:6px; border-radius:50%; background:${GREEN};
    box-shadow: 0 0 8px ${GREEN}; position:relative;
  }
  .hero-dot::after {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border:1px solid ${GREEN}; animation:pulseRing 1.8s ease-out infinite;
  }
  .hero-h1 {
    font-family:'Space Grotesk',sans-serif;
    font-size: clamp(44px,6.5vw,88px);
    font-weight:700; line-height:1.0; letter-spacing:-3px;
    margin-bottom:10px;
  }
  .hero-h1-grad {
    background: linear-gradient(135deg, ${TEXT} 0%, ${VIOLET_LIGHT} 50%, #C4B5FD 100%);
    background-size: 200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    animation: shimmer 4s linear infinite;
  }
  .hero-terminal {
    font-family:'JetBrains Mono',monospace;
    font-size:clamp(14px,1.6vw,20px); color:${VIOLET_LIGHT};
    margin-bottom:24px; min-height:30px; display:flex; align-items:center; gap:8px;
  }
  .terminal-prompt { color:#4ADE80; }
  .cursor {
    display:inline-block; width:2px; height:1.1em;
    background:${VIOLET_LIGHT}; vertical-align:text-bottom;
    animation:blink 1s step-end infinite; margin-left:1px;
  }
  .hero-desc {
    font-size:clamp(15px,1.4vw,17px); line-height:1.75; color:${MUTED};
    max-width:600px; margin-bottom:36px;
  }
  .hero-desc strong { color:${TEXT}; font-weight:500; }
  .hero-actions { display:flex; gap:12px; flex-wrap:wrap; }
  .btn-primary {
    background:${VIOLET}; color:white; border:none;
    padding:14px 32px; border-radius:8px; font-size:15px; font-weight:600;
    cursor:pointer; font-family:'Inter',sans-serif; transition:all 0.25s;
    box-shadow: 0 0 30px rgba(124,58,237,0.35);
  }
  .btn-primary:hover { background:#6D28D9; transform:translateY(-2px); box-shadow:0 0 50px rgba(124,58,237,0.55); }
  .btn-outline {
    background:transparent; color:${TEXT}; font-family:'Inter',sans-serif;
    border:1px solid ${BORDER2}; padding:14px 32px; border-radius:8px;
    font-size:15px; font-weight:500; cursor:pointer; transition:all 0.25s;
  }
  .btn-outline:hover { border-color:${VIOLET}; color:${VIOLET_LIGHT}; transform:translateY(-2px); }

  /* Orbit visual */
  .hero-visual {
    display:flex; align-items:center; justify-content:center;
    width:340px; height:340px; position:relative; flex-shrink:0;
  }
  .orbit-center {
    width:90px; height:90px; border-radius:50%;
    background:${SURFACE2}; border:1px solid rgba(124,58,237,0.4);
    display:flex; align-items:center; justify-content:center;
    font-size:32px; position:relative; z-index:2;
    box-shadow: 0 0 40px rgba(124,58,237,0.3);
  }
  .orbit-ring {
    position:absolute; border-radius:50%; border:1px dashed rgba(124,58,237,0.2);
  }
  .orbit-r1 { width:200px; height:200px; }
  .orbit-r2 { width:300px; height:300px; border-color:rgba(124,58,237,0.1); }
  .orbit-node {
    position:absolute; top:50%; left:50%;
    width:36px; height:36px; border-radius:8px;
    background:${SURFACE}; border:1px solid ${BORDER2};
    display:flex; align-items:center; justify-content:center;
    font-size:13px; font-family:'JetBrains Mono',monospace; color:${VIOLET_LIGHT};
    transform-origin:center; margin-top:-18px; margin-left:-18px;
    box-shadow: 0 0 12px rgba(0,0,0,0.5);
  }
  .orbit-n1 { animation: orbitSlow 8s linear infinite; }
  .orbit-n2 { animation: orbitSlow 8s linear infinite 2.67s; }
  .orbit-n3 { animation: orbitSlow 8s linear infinite 5.33s; }
  .orbit-n4 { animation: orbitFast 6s linear infinite; }
  .orbit-n5 { animation: orbitFast 6s linear infinite 3s; }

  /* Hero stats bar */
  .hero-stats-bar {
    width:100%; border-top:1px solid ${BORDER};
    margin-top:60px; padding-top:40px;
    display:grid; grid-template-columns:repeat(4,1fr); gap:0;
    position:relative; z-index:1;
  }
  .stat-item {
    padding:0 0 0 32px; border-left:1px solid ${BORDER};
    animation: countUp 0.6s ease forwards;
  }
  .stat-item:first-child { border-left:none; padding-left:0; }
  .stat-num {
    font-family:'Space Grotesk',sans-serif;
    font-size:clamp(28px,3vw,42px); font-weight:700;
    letter-spacing:-1.5px; line-height:1; color:${TEXT};
    margin-bottom:4px;
  }
  .stat-num em { color:${VIOLET}; font-style:normal; }
  .stat-lbl { font-size:12px; color:${MUTED}; letter-spacing:0.05em; }

  /* ── MARQUEE ── */
  .marquee-wrap {
    width:100%; overflow:hidden; border-top:1px solid ${BORDER};
    border-bottom:1px solid ${BORDER}; padding:14px 0;
    background:${SURFACE};
  }
  .marquee-track {
    display:flex; gap:48px; white-space:nowrap;
    animation: marquee 25s linear infinite; width:max-content;
  }
  .marquee-item {
    font-family:'JetBrains Mono',monospace; font-size:12px;
    color:${MUTED2}; letter-spacing:0.08em; text-transform:uppercase;
    display:flex; align-items:center; gap:12px;
  }
  .marquee-item::after { content:'·'; color:${VIOLET}; font-size:16px; }

  /* ── SECTION SHELL ── */
  .section {
    width:100%; padding:100px 5vw;
  }
  .sec-label {
    font-size:11px; font-weight:700; letter-spacing:0.16em;
    text-transform:uppercase; color:${VIOLET};
    display:flex; align-items:center; gap:10px; margin-bottom:12px;
  }
  .sec-label::before { content:''; display:block; width:24px; height:1px; background:${VIOLET}; }
  .sec-title {
    font-family:'Space Grotesk',sans-serif;
    font-size:clamp(26px,3.5vw,46px); font-weight:700;
    letter-spacing:-1.5px; color:${TEXT}; margin-bottom:12px; line-height:1.1;
  }
  .sec-sub { font-size:15px; color:${MUTED}; max-width:480px; line-height:1.7; margin-bottom:52px; }

  /* ── SKILLS full-width strips ── */
  .skills-section { padding:0; }
  .skills-header { padding:80px 5vw 48px; }
  .skills-strips { width:100%; display:flex; flex-direction:column; gap:1px; background:${BORDER}; }
  .skill-row {
    display:grid; background:${SURFACE};
    border-bottom:1px solid ${BORDER};
  }
  .skill-row-4  { grid-template-columns:160px repeat(4,1fr); }
  .skill-row-5  { grid-template-columns:160px repeat(5,1fr); }
  .skill-row-3  { grid-template-columns:160px repeat(3,1fr); }
  .skill-row-6  { grid-template-columns:160px repeat(6,1fr); }
  .skill-row-cat {
    padding:20px 24px; border-right:1px solid ${BORDER};
    font-size:10px; font-weight:700; letter-spacing:0.12em;
    text-transform:uppercase; color:${VIOLET};
    display:flex; align-items:center;
    background:rgba(124,58,237,0.04);
  }
  .skill-cell {
    padding:18px 20px; border-right:1px solid ${BORDER};
    display:flex; align-items:center; gap:8px;
    font-size:13px; color:${TEXT}; font-weight:500;
    transition:background 0.2s; cursor:default;
  }
  .skill-cell:last-child { border-right:none; }
  .skill-cell:hover { background:rgba(124,58,237,0.08); }
  .skill-dot { width:6px; height:6px; border-radius:50%; background:${VIOLET}; opacity:0.5; flex-shrink:0; }

  /* ── SERVICES ── */
  .services-section { background:${SURFACE}; border-top:1px solid ${BORDER}; border-bottom:1px solid ${BORDER}; }
  .services-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:${BORDER}; }
  .service-card {
    background:${BG}; padding:36px 32px; position:relative;
    transition:background 0.25s; overflow:hidden;
  }
  .service-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:${VIOLET}; transform:scaleX(0); transform-origin:left;
    transition:transform 0.3s ease;
  }
  .service-card:hover { background:${SURFACE2}; }
  .service-card:hover::before { transform:scaleX(1); }
  .svc-num {
    font-family:'JetBrains Mono',monospace; font-size:10px;
    color:${MUTED2}; letter-spacing:0.1em; margin-bottom:20px;
  }
  .svc-title {
    font-family:'Space Grotesk',sans-serif; font-size:18px;
    font-weight:700; color:${TEXT}; margin-bottom:12px; letter-spacing:-0.3px;
  }
  .svc-desc { font-size:13px; color:${MUTED}; line-height:1.7; margin-bottom:20px; }
  .svc-price {
    font-family:'JetBrains Mono',monospace; font-size:12px;
    color:${VIOLET_LIGHT}; font-weight:500;
  }

  /* ── EXPERIENCE ── */
  .exp-section { border-top:1px solid ${BORDER}; }
  .exp-layout { display:grid; grid-template-columns:300px 1fr; gap:0; align-items:start; }
  .exp-sidebar { padding-right:48px; position:sticky; top:100px; }
  .exp-list { border-left:1px solid ${BORDER}; padding-left:48px; }
  .exp-card {
    padding:28px 32px; border:1px solid ${BORDER}; border-radius:0;
    margin-bottom:1px; cursor:pointer; background:${SURFACE};
    position:relative; overflow:hidden; transition:all 0.2s;
  }
  .exp-card::before {
    content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
    background:${VIOLET}; transform:scaleY(0); transform-origin:top;
    transition:transform 0.25s ease;
  }
  .exp-card.open::before { transform:scaleY(1); }
  .exp-card:hover { background:${SURFACE2}; border-color:rgba(124,58,237,0.2); }
  .exp-card.open { background:${SURFACE2}; border-color:rgba(124,58,237,0.3); }
  .exp-top { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
  .exp-role { font-family:'Space Grotesk',sans-serif; font-size:17px; font-weight:700; color:${TEXT}; margin-bottom:3px; }
  .exp-co { font-size:13px; color:${VIOLET_LIGHT}; font-weight:500; }
  .exp-right { display:flex; flex-direction:column; align-items:flex-end; gap:5px; flex-shrink:0; }
  .exp-period { font-family:'JetBrains Mono',monospace; font-size:11px; color:${MUTED}; }
  .exp-badge {
    font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;
    padding:2px 9px; border-radius:99px;
    background:rgba(124,58,237,0.12); color:${VIOLET_LIGHT};
    border:1px solid rgba(124,58,237,0.2);
  }
  .exp-badge.ppo { background:rgba(34,197,94,0.1); color:#4ADE80; border-color:rgba(34,197,94,0.2); }
  .exp-body {
    margin-top:20px; padding-top:20px; border-top:1px solid ${BORDER};
    display:flex; flex-direction:column; gap:9px;
  }
  .exp-bullet { display:flex; gap:10px; font-size:13px; color:${MUTED}; line-height:1.65; }
  .exp-arr { color:${VIOLET}; flex-shrink:0; margin-top:2px; }
  .exp-bullet strong { color:${TEXT}; font-weight:500; }
  .exp-toggle { font-size:10px; color:${MUTED2}; font-family:'JetBrains Mono',monospace; margin-top:14px; text-align:right; }

  /* ── PROJECTS ── */
  .projects-section { background:${SURFACE}; border-top:1px solid ${BORDER}; }
  .projects-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:${BORDER}; }
  .proj-card {
    background:${BG}; padding:36px; cursor:pointer; position:relative;
    overflow:hidden; display:flex; flex-direction:column; transition:all 0.25s;
  }
  .proj-card:hover { background:${SURFACE2}; }
  .proj-glow {
    position:absolute; top:-60px; right:-60px; width:200px; height:200px; border-radius:50%;
    background:radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%);
    opacity:0; transition:opacity 0.4s;
  }
  .proj-card:hover .proj-glow { opacity:1; }
  .proj-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
  .proj-icon {
    width:44px; height:44px; border-radius:10px;
    background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.2);
    display:flex; align-items:center; justify-content:center; font-size:20px;
  }
  .proj-link {
    font-family:'JetBrains Mono',monospace; font-size:11px; color:${MUTED};
    border:1px solid ${BORDER}; border-radius:4px; padding:4px 10px;
    text-decoration:none; transition:all 0.2s; display:flex; align-items:center; gap:4px;
  }
  .proj-link:hover { border-color:${VIOLET}; color:${VIOLET_LIGHT}; }
  .proj-name { font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:700; color:${TEXT}; margin-bottom:8px; letter-spacing:-0.3px; }
  .proj-desc { font-size:13px; color:${MUTED}; line-height:1.7; margin-bottom:18px; flex-grow:1; }
  .proj-win {
    font-size:11px; color:#4ADE80; font-weight:600;
    background:rgba(34,197,94,0.08); border:1px solid rgba(34,197,94,0.15);
    border-radius:4px; padding:5px 12px; margin-bottom:16px;
    display:inline-flex; align-items:center; gap:6px;
  }
  .proj-stack { display:flex; flex-wrap:wrap; gap:5px; }
  .stk-tag {
    font-family:'JetBrains Mono',monospace; font-size:10px; color:${MUTED};
    background:${SURFACE2}; border:1px solid ${BORDER}; border-radius:3px; padding:2px 8px;
  }

  /* ── ACHIEVEMENTS ── */
  .ach-section { border-top:1px solid ${BORDER}; }
  .ach-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:${BORDER}; }
  .ach-card {
    background:${SURFACE}; padding:28px 24px; transition:all 0.2s;
    position:relative; overflow:hidden;
  }
  .ach-card:hover { background:${SURFACE2}; }
  .ach-num {
    font-family:'Space Grotesk',sans-serif; font-size:40px; font-weight:700;
    line-height:1; letter-spacing:-2px; color:${TEXT}; margin-bottom:8px;
    opacity:0.15; position:absolute; top:16px; right:20px;
  }
  .ach-icon { font-size:24px; margin-bottom:12px; }
  .ach-title { font-size:14px; font-weight:600; color:${TEXT}; margin-bottom:4px; line-height:1.3; }
  .ach-sub { font-size:12px; color:${MUTED}; line-height:1.5; }

  /* ── CONTACT ── */
  .contact-section {
    width:100%; padding:100px 5vw;
    border-top:1px solid ${BORDER}; background:${SURFACE};
  }
  .contact-layout { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
  .avail-pill {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(34,197,94,0.08); border:1px solid rgba(34,197,94,0.2);
    border-radius:99px; padding:7px 16px;
    font-size:12px; font-weight:600; color:#4ADE80;
    margin-bottom:24px; letter-spacing:0.04em;
  }
  .avail-dot { width:7px; height:7px; border-radius:50%; background:#22C55E; position:relative; }
  .avail-dot::after {
    content:''; position:absolute; inset:-3px; border-radius:50%;
    border:1px solid #22C55E; animation:pulseRing 2s ease-out infinite;
  }
  .contact-links { display:flex; flex-direction:column; gap:10px; margin-top:32px; }
  .c-link {
    display:flex; align-items:center; gap:14px; padding:16px 20px;
    background:${BG}; border:1px solid ${BORDER}; border-radius:8px;
    text-decoration:none; color:${TEXT}; font-size:14px; font-weight:500;
    transition:all 0.2s;
  }
  .c-link:hover { border-color:rgba(124,58,237,0.4); transform:translateX(6px); background:rgba(124,58,237,0.04); }
  .c-link-icon { width:36px; height:36px; border-radius:8px; background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.2); display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
  .c-link-sub { font-size:12px; color:${MUTED}; font-weight:400; }
  .form { display:flex; flex-direction:column; gap:12px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .finput, .ftarea {
    background:${BG}; border:1px solid ${BORDER}; border-radius:8px;
    padding:13px 16px; font-size:14px; color:${TEXT};
    font-family:'Inter',sans-serif; outline:none; width:100%;
    transition:border-color 0.2s; resize:none;
  }
  .finput::placeholder, .ftarea::placeholder { color:${MUTED2}; }
  .finput:focus, .ftarea:focus { border-color:${VIOLET}; }
  .fsend {
    background:${VIOLET}; color:white; border:none;
    padding:15px 28px; border-radius:8px; font-size:15px; font-weight:700;
    cursor:pointer; font-family:'Inter',sans-serif; transition:all 0.25s;
    box-shadow:0 0 30px rgba(124,58,237,0.3);
  }
  .fsend:hover { background:#6D28D9; transform:translateY(-1px); }
  .fnote { font-size:12px; color:${MUTED2}; text-align:center; }

  /* ── FOOTER ── */
  .footer {
    width:100%; padding:28px 5vw;
    border-top:1px solid ${BORDER}; background:${BG};
    display:flex; justify-content:space-between; align-items:center;
  }
  .footer-l { font-size:13px; color:${MUTED}; }
  .footer-r { font-family:'JetBrains Mono',monospace; font-size:11px; color:${MUTED2}; }

  /* ── RESPONSIVE ── */
  @media (max-width:1100px) {
    .services-grid { grid-template-columns:repeat(2,1fr); }
    .ach-grid { grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:900px) {
    .hero-layout { grid-template-columns:1fr; }
    .hero-visual { display:none; }
    .exp-layout { grid-template-columns:1fr; }
    .exp-sidebar { position:static; padding-right:0; padding-bottom:32px; }
    .exp-list { border-left:none; padding-left:0; border-top:1px solid ${BORDER}; padding-top:32px; }
    .hero-stats-bar { grid-template-columns:repeat(2,1fr); gap:24px; }
    .stat-item { border-left:none; padding-left:0; }
    .projects-grid { grid-template-columns:1fr; }
    .skill-row-4, .skill-row-5, .skill-row-3, .skill-row-6 { grid-template-columns:120px 1fr 1fr; }
  }
  @media (max-width:640px) {
    .nav { padding:14px 20px; }
    .nav-center { display:none; }
    .hero { padding:110px 20px 60px; }
    .section, .contact-section { padding:64px 20px; }
    .services-grid { grid-template-columns:1fr; }
    .ach-grid { grid-template-columns:repeat(2,1fr); }
    .contact-layout { grid-template-columns:1fr; gap:48px; }
    .form-row { grid-template-columns:1fr; }
    .hero-stats-bar { grid-template-columns:repeat(2,1fr); gap:20px; margin-top:40px; padding-top:32px; }
    .footer { flex-direction:column; gap:8px; padding:20px; text-align:center; }
    .skill-row-4, .skill-row-5, .skill-row-3, .skill-row-6 { grid-template-columns:100px 1fr 1fr; }
  }
`;

const TYPED = [
  "building scalable backends...",
  "shipping AI pipelines...",
  "indexing with Elasticsearch...",
  "automating lead generation...",
  "ready for your project.",
];

function Typer() {
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const cur = TYPED[li];
    let t;
    if (!del && ci < cur.length) t = setTimeout(() => { setTxt(cur.slice(0,ci+1)); setCi(c=>c+1); }, 50);
    else if (!del && ci===cur.length) t = setTimeout(() => setDel(true), 2000);
    else if (del && ci > 0) t = setTimeout(() => { setTxt(cur.slice(0,ci-1)); setCi(c=>c-1); }, 22);
    else if (del && ci===0) { setDel(false); setLi(i=>(i+1)%TYPED.length); }
    return () => clearTimeout(t);
  }, [ci, del, li]);
  return (
    <div className="hero-terminal mono">
      <span className="terminal-prompt">~$</span>
      <span>{txt}</span>
      <span className="cursor" />
    </div>
  );
}

const skillRows = [
  { cat: "Languages", tags: ["C++", "Python", "Java", "JavaScript", "TypeScript"], cls: "skill-row-5" },
  { cat: "Backend", tags: ["FastAPI", "Django-DRF", "Spring Boot", "Node.js", "Express", "WebSockets"], cls: "skill-row-6" },
  { cat: "Frontend", tags: ["React", "Next.js", "Angular", "Tailwind CSS"], cls: "skill-row-4" },
  { cat: "AI / ML", tags: ["LangChain", "RAG", "Ollama", "OCR", "Tesseract"], cls: "skill-row-5" },
  { cat: "Databases", tags: ["MongoDB", "PostgreSQL", "MySQL", "Oracle SQL", "Redis"], cls: "skill-row-5" },
  { cat: "Infra", tags: ["Docker", "Kubernetes", "Elasticsearch", "Redis Streams", "Temporal"], cls: "skill-row-5" },
  { cat: "Tools", tags: ["Git", "Playwright", "GraphQL", "Prisma", "Blockchain"], cls: "skill-row-5" },
  { cat: "CS Cores", tags: ["System Design", "DSA 800+", "OOPS", "DBMS", "Networking"], cls: "skill-row-5" },
];

const experiences = [
  {
    role: "Software Engineer",
    company: "Recepto.ai",
    period: "Aug 2025 – Present",
    badge: "Current",
    bullets: [
      <><strong>Architected 3-service microservice system</strong> (Tool-Core, Intent Engine, Profiler) automating entire manual lead-generation pipeline with Python, FastAPI, MongoDB, Redis Streams + Temporal.</>,
      <><strong>Config-driven universal scraper</strong> (Python + Playwright) — cut onboarding for new websites by <strong>5×</strong>, eliminated all repeated custom-scraper development.</>,
      <><strong>Agentic workflow engine</strong> converts plain-English business requirements into executable AI-driven lead strategies via Temporal orchestration.</>,
      <>Designed <strong>fault-tolerant real-time pipeline</strong> with retry handling and guaranteed message delivery for high-throughput enrichment at scale.</>,
    ],
  },
  {
    role: "Software Engineer",
    company: "Schlumberger (SLB) Digital",
    period: "May – Jul 2025",
    badge: "PPO Received",
    badgeClass: "ppo",
    bullets: [
      <><strong>Elasticsearch search layer</strong> across PDFs, HTML pages, and videos — reduced retrieval latency from <strong>minutes to seconds</strong>.</>,
      <>Full-stack content management (Angular + Spring Boot + Oracle SQL) reducing manual effort by <strong>&gt;80%</strong>.</>,
      <><strong>Pre-Placement Offer</strong> received based on performance — joining full-time.</>,
    ],
  },
  {
    role: "Blockchain Developer",
    company: "Calimero Network",
    period: "Feb – Apr 2025",
    badge: "Contract",
    bullets: [
      <>Improved CLI usability for node and context management tooling.</>,
      <>Proposed and implemented <strong>macro-based transport abstraction</strong> to simplify multi-protocol blockchain transport declaration.</>,
    ],
  },
  {
    role: "Backend Developer",
    company: "Kinetic Codes",
    period: "Apr – May 2025",
    badge: "Contract",
    bullets: [
      <>Migrated REST APIs to <strong>WebSocket-based real-time communication</strong> in Node.js — eliminated polling, instant server-to-client push.</>,
    ],
  },
  {
    role: "Chief Maintainer",
    company: "IMG, IIT Roorkee",
    period: "Mar 2023 – Present",
    badge: "Leadership",
    bullets: [
      <>Leading <strong>Chakra CMS</strong> powering <strong>13,000+ web pages</strong> for IIT Roorkee on React + Django-DRF + MySQL.</>,
      <>Implemented caching strategies, built reusable components, resolved critical production issues.</>,
    ],
  },
];

const projects = [
  {
    icon: "🔍", name: "MedLens AI",
    desc: "Healthcare document QA system. Extracts insights from complex medical PDFs via OCR + semantic chunking + RAG. Custom LangChain pipeline with Ollama LLM for accurate multi-document answers.",
    win: "🏆 1st Runner-Up · HiLabs AI Quest 2025",
    stack: ["OCR", "LangChain", "RAG", "Ollama", "Tesseract", "Python"],
    link: "https://bit.ly/Medlens_AI",
  },
  {
    icon: "⚙️", name: "Universal Web Scraper",
    desc: "Config-driven scraping framework built at Recepto.ai. Zero custom-scraper code — any forum or listing site scraped from a JSON config. Rate-limit safe, fault-tolerant, Redis-backed delivery.",
    stack: ["Python", "Playwright", "FastAPI", "Redis Streams", "MongoDB"],
  },
  {
    icon: "🌐", name: "Chakra CMS",
    desc: "Large-scale content management system serving 13,000+ pages for IIT Roorkee. Built reusable component library, caching layer, resolved critical production incidents on distributed stack.",
    stack: ["React", "Django-DRF", "MySQL", "Python"],
    link: "https://bit.ly/Chakra",
  },
  {
    icon: "📊", name: "Smart Lab Report",
    desc: "Full-stack lab report analyzer with AI-driven health advice, interactive visualizations, and offline PDF access. Built and deployed solo end-to-end.",
    win: "🏆 1st Place · IMG IITR Hackathon 2024",
    stack: ["React", "Node.js", "Express", "MongoDB Atlas"],
    link: "https://bit.ly/Wellness-Analytics",
  },
];

const achievements = [
  { icon: "🎓", title: "IIT Roorkee", sub: "ECE · GPA 7.944 · 2026", n: "01" },
  { icon: "📈", title: "JEE Advanced AIR 4757", sub: "Top 3.2% of 150,000+", n: "02" },
  { icon: "🏅", title: "JEE Main 99.18%ile", sub: "Top 0.82% of 1M+", n: "03" },
  { icon: "🌍", title: "CF Global Rank 771", sub: "Round 1011 Div.2 · 25K+ contestants", n: "04" },
  { icon: "🥇", title: "Hackathon Winner", sub: "BREAK-A-SPHERE · IMG IIT Roorkee", n: "05" },
  { icon: "🥈", title: "1st Runner-Up", sub: "AI Quest · HiLabs 2025", n: "06" },
  { icon: "⚡", title: "CF Specialist 1544", sub: "Handle: pommpomms", n: "07" },
  { icon: "💻", title: "800+ Problems", sub: "LeetCode + InterviewBit", n: "08" },
];

const services = [
  { n:"01", title:"AI / RAG Pipeline", desc:"End-to-end document QA, semantic search, or LLM integration. LangChain, Ollama, vector DBs, OCR. Delivered as a production API.", price:"From $600 · 2 weeks" },
  { n:"02", title:"Web Scraping System", desc:"Config-driven or custom scrapers for any site. Extraction, transformation, and delivery pipelines. Playwright, Python, rate-limit safe.", price:"From $400 · 1 week" },
  { n:"03", title:"Search Infrastructure", desc:"Elasticsearch across documents, HTML, and media. Fast, relevant, scalable. Direct enterprise-grade experience from SLB.", price:"From $500 · 1–2 weeks" },
  { n:"04", title:"Full-Stack MVP", desc:"React + Node/Django + MongoDB/PostgreSQL. From wireframe to deployed product. TypeScript, clean APIs, production-ready.", price:"From $800 · 3 weeks" },
];

const marqueeItems = ["Python","FastAPI","Elasticsearch","React","LangChain","Redis Streams","Temporal","Playwright","Docker","MongoDB","TypeScript","Spring Boot","Node.js","RAG Pipelines","Kubernetes","GraphQL"];

function ExpCard({ e }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`exp-card${open?" open":""}`} onClick={()=>setOpen(o=>!o)}>
      <div className="exp-top">
        <div>
          <div className="exp-role">{e.role}</div>
          <div className="exp-co">{e.company}</div>
        </div>
        <div className="exp-right">
          <span className="exp-period">{e.period}</span>
          {e.badge && <span className={`exp-badge${e.badgeClass?" "+e.badgeClass:""}`}>{e.badge}</span>}
        </div>
      </div>
      {open && (
        <div className="exp-body">
          {e.bullets.map((b,i)=>(
            <div className="exp-bullet" key={i}>
              <span className="exp-arr">→</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      )}
      <div className="exp-toggle">{open?"collapse ↑":"expand ↓"}</div>
    </div>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo grotesk">dhruv<span>.</span>dev</div>
        <div className="nav-center">
          {["skills","services","experience","projects","contact"].map(s=>(
            <a key={s} className="nav-link" onClick={()=>goto(s)}>{s}</a>
          ))}
        </div>
        <button className="nav-cta" onClick={()=>goto("contact")}>Hire me →</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-grid-bg"/>
        <div className="hero-glow"/>
        <div className="hero-glow2"/>
        <div className="hero-layout">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-dot"/>
              Available for freelance · Remote worldwide
            </div>
            <h1 className="hero-h1 grotesk">
              <span className="hero-h1-grad">Backend &amp;<br/>AI Systems</span><br/>
              Engineer.
            </h1>
            <Typer/>
            <p className="hero-desc">
              IIT Roorkee ECE · Incoming SDE at <strong>Schlumberger (SLB)</strong>.<br/>
              I build <strong>production-grade backends, AI pipelines, and search systems</strong> that ship fast and scale reliably.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={()=>goto("contact")}>Start a project →</button>
              <button className="btn-outline" onClick={()=>goto("projects")}>View work</button>
            </div>
          </div>
          {/* Orbit visual */}
          <div className="hero-visual">
            <div className="orbit-ring orbit-r1"/>
            <div className="orbit-ring orbit-r2"/>
            <div className="orbit-center">⚡</div>
            <div className="orbit-node orbit-n1" style={{fontSize:11}}>PY</div>
            <div className="orbit-node orbit-n2" style={{fontSize:11}}>ES</div>
            <div className="orbit-node orbit-n3" style={{fontSize:11}}>AI</div>
            <div className="orbit-node orbit-n4" style={{fontSize:10,borderRadius:"50%",width:28,height:28}}>RX</div>
            <div className="orbit-node orbit-n5" style={{fontSize:10,borderRadius:"50%",width:28,height:28}}>K8</div>
          </div>
        </div>
        {/* Stats */}
        <div className="hero-stats-bar">
          <div className="stat-item"><div className="stat-num grotesk">3<em>+</em></div><div className="stat-lbl">Industry internships</div></div>
          <div className="stat-item"><div className="stat-num grotesk">5<em>×</em></div><div className="stat-lbl">Faster scraper onboarding</div></div>
          <div className="stat-item"><div className="stat-num grotesk">&gt;80<em>%</em></div><div className="stat-lbl">Manual effort cut at SLB</div></div>
          <div className="stat-item"><div className="stat-num grotesk">800<em>+</em></div><div className="stat-lbl">DSA problems solved</div></div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((t,i)=>(
            <span className="marquee-item" key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <section className="skills-section" id="skills" style={{borderTop:`1px solid ${BORDER}`,background:SURFACE}}>
        <div className="skills-header">
          <div className="sec-label">Technical stack</div>
          <h2 className="sec-title grotesk">Tools I ship with</h2>
          <p className="sec-sub">Every entry here has been used in production. No fluff.</p>
        </div>
        <div className="skills-strips">
          {skillRows.map(row=>(
            <div className={`skill-row ${row.cls}`} key={row.cat}>
              <div className="skill-row-cat">{row.cat}</div>
              {row.tags.map(t=>(
                <div className="skill-cell" key={t}>
                  <span className="skill-dot"/>
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section" id="services">
        <div className="sec-label">What I offer</div>
        <h2 className="sec-title grotesk">Productized services</h2>
        <p className="sec-sub">Fixed scope. Fixed price. You know exactly what you're getting and when.</p>
        <div className="services-grid">
          {services.map(s=>(
            <div className="service-card" key={s.n}>
              <div className="svc-num mono">{s.n} ——</div>
              <div className="svc-title grotesk">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-price mono">{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section exp-section" id="experience">
        <div className="exp-layout">
          <div className="exp-sidebar">
            <div className="sec-label">Work history</div>
            <h2 className="sec-title grotesk">Where I've shipped</h2>
            <p className="sec-sub">Click any role to expand. Everything here is production work.</p>
          </div>
          <div className="exp-list">
            {experiences.map((e,i)=><ExpCard e={e} key={i}/>)}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section projects-section" id="projects">
        <div className="sec-label">Selected projects</div>
        <h2 className="sec-title grotesk">Things I've built</h2>
        <p className="sec-sub">Hackathon wins, open-source tools, and production systems used daily.</p>
        <div className="projects-grid">
          {projects.map((p,i)=>(
            <div className="proj-card" key={i}>
              <div className="proj-glow"/>
              <div className="proj-top">
                <div className="proj-icon">{p.icon}</div>
                {p.link && <a className="proj-link" href={p.link} target="_blank" rel="noreferrer">↗ view</a>}
              </div>
              <div className="proj-name grotesk">{p.name}</div>
              <div className="proj-desc">{p.desc}</div>
              {p.win && <div className="proj-win">{p.win}</div>}
              <div className="proj-stack">{p.stack.map(t=><span className="stk-tag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section ach-section" id="achievements" style={{background:SURFACE,borderTop:`1px solid ${BORDER}`}}>
        <div className="sec-label">Background</div>
        <h2 className="sec-title grotesk">Credentials &amp; milestones</h2>
        <p className="sec-sub">Competitive programming, elite academics, and hackathon podiums.</p>
        <div className="ach-grid">
          {achievements.map((a,i)=>(
            <div className="ach-card" key={i}>
              <div className="ach-num">{a.n}</div>
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-title">{a.title}</div>
              <div className="ach-sub">{a.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <div className="contact-section" id="contact">
        <div className="contact-layout">
          <div>
            <div className="sec-label">Get in touch</div>
            <h2 className="sec-title grotesk">Let's build<br/>something real.</h2>
            <div className="avail-pill"><span className="avail-dot"/>&nbsp;Open to freelance · 1–2 spots/month</div>
            <p style={{fontSize:15,color:MUTED,lineHeight:1.75,marginBottom:8}}>
              I take on freelance projects alongside my full-time role at SLB. Response within 24 hours. No commitment to reach out.
            </p>
            <div className="contact-links">
              <a className="c-link" href="mailto:goeldhruv9876@gmail.com">
                <span className="c-link-icon">✉</span>
                <div><div>goeldhruv9876@gmail.com</div><div className="c-link-sub">Email · fastest response</div></div>
              </a>
              <a className="c-link" href="https://linkedin.com/in/dhruv-goel-430384252" target="_blank" rel="noreferrer">
                <span className="c-link-icon">in</span>
                <div><div>linkedin.com/in/dhruv-goel-430384252</div><div className="c-link-sub">LinkedIn</div></div>
              </a>
              <a className="c-link" href="https://github.com/iamgoeldhruv" target="_blank" rel="noreferrer">
                <span className="c-link-icon">⌥</span>
                <div><div>github.com/iamgoeldhruv</div><div className="c-link-sub">GitHub · see the code</div></div>
              </a>
              <a className="c-link" href="tel:+916307513024">
                <span className="c-link-icon">📞</span>
                <div><div>+91 63075 13024</div><div className="c-link-sub">WhatsApp / Call</div></div>
              </a>
            </div>
          </div>
          <div>
            <p style={{fontSize:13,color:MUTED,marginBottom:20,lineHeight:1.6}}>
              Describe your project briefly — I'll reply with a scope and timeline estimate within 24 hours.
            </p>
            {sent ? (
              <div style={{background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,padding:"48px 32px",textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:16}}>✓</div>
                <div style={{color:"#4ADE80",fontWeight:700,fontSize:18,marginBottom:8}}>Message sent!</div>
                <div style={{fontSize:14,color:MUTED}}>I'll respond within 24 hours.</div>
              </div>
            ) : (
              <div className="form">
                <div className="form-row">
                  <input className="finput" placeholder="Your name"/>
                  <input className="finput" placeholder="Email address"/>
                </div>
                <input className="finput" placeholder="Project type (e.g. RAG pipeline, scraper, full-stack MVP)"/>
                <textarea className="ftarea" rows={5} placeholder="Describe what you need — the more detail, the better my estimate will be."/>
                <button className="fsend" onClick={()=>setSent(true)}>Send message →</button>
                <div className="fnote">No commitment. Scope estimate within 24h.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-l">© 2026 Dhruv Goel · IIT Roorkee · Incoming SDE @ SLB Digital</div>
        <div className="footer-r">dhruv.dev</div>
      </footer>
    </>
  );
}