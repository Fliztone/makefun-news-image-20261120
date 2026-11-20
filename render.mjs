import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';

const W = 1024, H = 1024;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PAPER = '#f5f0e6', INK = '#191714', RED = '#b3261e', MUTED = '#5c564c', NAVY = '#152238', CREAM = '#f5f0e6', LINE = '#cdc4b2', GOLD = '#e8b64c';

const parts = [];
const rect = (x, y, w, h, fill, extra = '') => parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`);
const line = (x1, y1, x2, y2, stroke, w = 2) => parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"/>`);
const text = (x, y, s, { size = 20, fill = INK, weight = 'normal', family = 'Arial, Helvetica, sans-serif', anchor = 'start', spacing = 0 } = {}) =>
  parts.push(`<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}">${esc(s)}</text>`);

rect(0, 0, W, H, PAPER);

// masthead
text(W / 2, 56, 'THE WORLD IN ONE DAY', { size: 44, weight: 'bold', family: "Georgia, 'Times New Roman', serif", anchor: 'middle', spacing: 3 });
line(40, 76, W - 40, 76, INK, 3);
line(40, 82, W - 40, 82, INK, 1);
text(W / 2, 120, 'FRIDAY · NOVEMBER 20, 2026', { size: 34, weight: 'bold', family: "Georgia, 'Times New Roman', serif", anchor: 'middle' });
text(W / 2, 142, 'WORLD NEWS · GLOBAL EDITION', { size: 16, weight: 'bold', fill: RED, anchor: 'middle', spacing: 4 });
line(40, 152, W - 40, 152, INK, 2);

// lead band: GTA 6 launch
const LY = 164, LH = 232;
rect(40, LY, W - 80, LH, NAVY);
// Vice-style sun + palm + VI badge motif on the right
const gx = 884, gy = LY + 110;
parts.push(`<circle cx="${gx}" cy="${gy}" r="70" fill="${GOLD}"/>`);
for (let i = 0; i < 7; i += 1) { const y = gy - 10 + i * 12; parts.push(`<rect x="${gx - 72}" y="${y}" width="144" height="${4 + i}" fill="${NAVY}"/>`); }
parts.push(`<circle cx="${gx}" cy="${gy}" r="70" fill="none" stroke="${CREAM}" stroke-width="2"/>`);
// palm silhouette
parts.push(`<path d="M ${gx - 95} ${LY + 210} q 6 -70 18 -120" stroke="${CREAM}" stroke-width="7" fill="none"/>`);
for (const a of [-2.5, -2.0, -1.5, -1.0, -0.5]) { parts.push(`<path d="M ${gx - 77} ${LY + 90} q ${Math.cos(a) * 40} ${Math.sin(a) * 30 - 18} ${Math.cos(a) * 62} ${Math.sin(a) * 44}" stroke="${CREAM}" stroke-width="5" fill="none"/>`); }
text(gx, gy + 16, 'VI', { size: 40, weight: 'bold', fill: NAVY, family: "Georgia, serif", anchor: 'middle' });
text(70, LY + 48, 'LEAD · CULTURE & TECH', { size: 19, weight: 'bold', fill: GOLD, spacing: 3 });
text(70, LY + 96, 'GRAND THEFT AUTO VI', { size: 42, weight: 'bold', fill: CREAM, family: "Georgia, 'Times New Roman', serif" });
text(70, LY + 140, 'GOES LIVE WORLDWIDE', { size: 42, weight: 'bold', fill: CREAM, family: "Georgia, 'Times New Roman', serif" });
text(70, LY + 180, 'After 13 years and a reported $1 billion, Rockstar\'s blockbuster launches', { size: 20, fill: '#d9d2c4' });
text(70, LY + 206, 'to record crowds — the biggest entertainment launch in history.', { size: 20, fill: '#d9d2c4' });

// cards
const cards = [
  { tag: 'GEOPOLITICS', head: ['TRUMP, XI & PUTIN', 'ISSUE PEACE PLEDGE'], body: ['At the Shenzhen APEC summit the three', 'leaders sign a joint peace declaration.'], icon: 'globe' },
  { tag: 'BUSINESS', head: ['ANTHROPIC IPO', 'SMASHES RECORD'], body: ['The AI firm\'s $81.3B debut beats SpaceX;', 'priced at $83, targeting ~$1.5T value.'], icon: 'chart' },
  { tag: 'MIDDLE EAST', head: ['ISRAEL ENTERS', 'CENTRAL GAZA'], body: ['A ground operation begins in', 'Hamas-controlled central Gaza.'], icon: 'map' },
  { tag: 'ENERGY & SECURITY', head: ['OIL TANKERS HIT', 'MINES AT HORMUZ'], body: ['Three tankers catch fire after striking', 'mines east of the Strait of Hormuz.'], icon: 'ship' },
  { tag: 'SOUTH ASIA', head: ['BANGLADESH', 'SHUTDOWN'], body: ['Hasina\'s party protests shut parts of', 'the country; Yunus\'s home set ablaze.'], icon: 'flame' },
  { tag: 'CLIMATE', head: ['CYCLONE AKVAN:', '50,000 EVACUATED'], body: ['Odisha evacuates 50,000; Chennai on', 'rain alert; 10 trains cancelled.'], icon: 'storm' },
];

const CX0 = 40, CY0 = 412, CW = 308, CH = 248, GAP = 10;
function icon(kind, cx, cy, color) {
  const s = [];
  if (kind === 'globe') {
    s.push(`<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="${color}" stroke-width="3"/>`);
    s.push(`<ellipse cx="${cx}" cy="${cy}" rx="10" ry="22" fill="none" stroke="${color}" stroke-width="2"/>`);
    s.push(line(cx - 22, cy, cx + 22, cy, color, 2));
  } else if (kind === 'chart') {
    s.push(line(cx - 22, cy + 20, cx + 22, cy + 20, color, 3));
    s.push(line(cx - 22, cy + 20, cx - 22, cy - 20, color, 3));
    s.push(`<path d="M ${cx - 16} ${cy + 12} L ${cx - 4} ${cy - 2} L ${cx + 6} ${cy + 6} L ${cx + 18} ${cy - 16}" fill="none" stroke="${color}" stroke-width="3"/>`);
  } else if (kind === 'map') {
    s.push(`<path d="M ${cx - 18} ${cy - 18} L ${cx - 6} ${cy - 12} L ${cx + 8} ${cy - 18} L ${cx + 18} ${cy - 10} L ${cx + 18} ${cy + 18} L ${cx + 4} ${cy + 12} L ${cx - 10} ${cy + 18} L ${cx - 18} ${cy + 10} Z" fill="none" stroke="${color}" stroke-width="2.5"/>`);
    s.push(`<circle cx="${cx + 2}" cy="${cy}" r="4" fill="${color}"/>`);
  } else if (kind === 'ship') {
    s.push(`<path d="M ${cx - 22} ${cy + 6} L ${cx + 22} ${cy + 6} L ${cx + 14} ${cy + 18} L ${cx - 14} ${cy + 18} Z" fill="${color}"/>`);
    s.push(`<rect x="${cx - 8}" y="${cy - 12}" width="16" height="16" fill="${color}"/>`);
    s.push(line(cx - 24, cy + 22, cx + 24, cy + 22, color, 2));
  } else if (kind === 'flame') {
    s.push(`<path d="M ${cx} ${cy - 22} Q ${cx + 18} ${cy - 3} ${cx + 12} ${cy + 15} Q ${cx + 7} ${cy + 23} ${cx} ${cy + 22} Q ${cx - 12} ${cy + 22} ${cx - 12} ${cy + 8} Q ${cx - 12} ${cy - 2} ${cx} ${cy - 22} Z" fill="${color}"/>`);
    s.push(`<path d="M ${cx} ${cy - 3} Q ${cx + 7} ${cy + 7} ${cx} ${cy + 17} Q ${cx - 7} ${cy + 10} ${cx} ${cy - 3} Z" fill="#fbf8f1"/>`);
  } else if (kind === 'storm') {
    s.push(`<path d="M ${cx - 20} ${cy - 6} a 12 12 0 0 1 6 -22 a 14 14 0 0 1 26 4 a 10 10 0 0 1 2 20 z" fill="${color}"/>`);
    s.push(`<path d="M ${cx - 2} ${cy + 2} L ${cx - 10} ${cy + 16} L ${cx - 2} ${cy + 16} L ${cx - 8} ${cy + 28}" fill="none" stroke="${color}" stroke-width="3"/>`);
  }
  parts.push(...s);
}

cards.forEach((c, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = CX0 + col * (CW + GAP), y = CY0 + row * (CH + GAP);
  rect(x, y, CW, CH, '#fbf8f1', `stroke="${LINE}" stroke-width="1.5"`);
  rect(x, y, CW, 6, RED);
  icon(c.icon, x + 32, y + 44, NAVY);
  text(x + 62, y + 40, c.tag, { size: 14, weight: 'bold', fill: RED, spacing: 1 });
  text(x + 20, y + 88, c.head[0], { size: 21, weight: 'bold', family: "Georgia, 'Times New Roman', serif" });
  text(x + 20, y + 116, c.head[1], { size: 21, weight: 'bold', family: "Georgia, 'Times New Roman', serif" });
  line(x + 20, y + 136, x + CW - 20, y + 136, LINE, 1.5);
  text(x + 20, y + 166, c.body[0], { size: 15, fill: MUTED });
  text(x + 20, y + 190, c.body[1], { size: 15, fill: MUTED });
});

// sport footer
const FY = 930;
rect(40, FY, W - 80, 52, NAVY);
parts.push(`<circle cx="76" cy="${FY + 26}" r="14" fill="none" stroke="${CREAM}" stroke-width="2.5"/>`);
line(66, FY + 19, 86, FY + 33, CREAM, 2);
text(104, FY + 22, 'SPORT', { size: 16, weight: 'bold', fill: GOLD, spacing: 2 });
text(104, FY + 42, 'India v NZ 1st Test: Kiwis fight back to 243/5 · Gukesh defends chess title from Nov 24 · Jepchirchir banned 3y', { size: 15, fill: CREAM });

line(40, 998, W - 40, 998, INK, 1.5);
text(W / 2, 1014, "One image · the world's news of 20 November 2026 · compiled from wire reports", { size: 14, fill: MUTED, anchor: 'middle' });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join('')}</svg>`;
writeFileSync('entry.svg', svg);
const png = new Resvg(svg, { fitTo: { mode: 'width', value: W }, font: { loadSystemFonts: true } }).render().asPng();
writeFileSync('entry.png', png);
console.log('entry.png bytes:', png.length);