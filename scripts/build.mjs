/**
 * ArsStolas Project, 2026
 * Created by: "ArsStolas"
 * Last Updated by: "ArsStolas"
 * Class: "ProfileAssets" - Github Profile SVG Generator
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'assets');
await mkdir(out, { recursive: true });
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const media = async name => `data:image/webp;base64,${(await readFile(path.join(out, 'projects', `${name}.webp`))).toString('base64')}`;
const photos = Object.fromEntries(await Promise.all(['etheria','orbit','gobelins'].map(async n => [n, await media(n)])));
const themes = {
  dark: { bg:'#101820', ink:'#f5f0e6', muted:'#a7b9ba', line:'#32424b', accent:'#e6bd81', soft:'#18252e', green:'#b9d6bd', grid:'#718892' },
  light: { bg:'#f3f0e8', ink:'#243b43', muted:'#526c70', line:'#c9d0c9', accent:'#976227', soft:'#e6e8df', green:'#386c5b', grid:'#61767d' }
};
const text = (x,y,label,size=16,fill='currentColor',extra='') => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" ${extra}>${esc(label)}</text>`;
const mono = 'font-family="Consolas,Monaco,monospace"';
const motion = `<style>
  .float-a{animation:float 7s ease-in-out infinite}.float-b{animation:float 9s ease-in-out -3s infinite}.float-c{animation:float 8s ease-in-out -5s infinite}
  .spark{animation:twinkle 5s ease-in-out infinite}.spark:nth-child(3n){animation-delay:-2s}.spark:nth-child(2n){animation-delay:-3.5s}
  .orbit{animation:orbit 40s linear infinite;transform-origin:265px 234px}.cursor{animation:blink 1.3s steps(1) infinite}.eyes{animation:eyes 8s infinite;transform-box:fill-box;transform-origin:center}
  .dash{animation:dash 16s linear infinite}.breath{animation:breath 6s ease-in-out infinite}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes twinkle{0%,100%{opacity:.25}50%{opacity:.9}}
  @keyframes orbit{to{transform:rotate(360deg)}}
  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  @keyframes eyes{0%,44%,48%,100%{transform:scaleY(1)}46%{transform:scaleY(.1)}}
  @keyframes dash{to{stroke-dashoffset:-180}}
  @keyframes breath{0%,100%{opacity:.035}50%{opacity:.1}}
  @media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style>`;
const svg = (w,h,label,body) => `<!--
/**
 * ArsStolas Project, 2026
 * Created by: "ArsStolas"
 * Last Updated by: "ArsStolas"
 * Class: "ProfileArtwork" - ${esc(label)}
 */
-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${esc(label)}</title><g font-family="Segoe UI,Arial,sans-serif">${body}</g></svg>\n`;

function owl(x,y,c) {
  return `<g transform="translate(${x} ${y})" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 9L2 0L16 8Q24 4 32 8L46 0L43 10C52 22 48 40 24 48C0 40 -4 22 5 9Z"/>
    <path d="M4 18Q13 4 24 18Q35 4 44 18M24 18V29M20 28L24 33L28 28M11 35L17 39M37 35L31 39"/>
    <g class="eyes"><circle cx="13" cy="21" r="3" fill="${c}" stroke="none"/><circle cx="35" cy="21" r="3" fill="${c}" stroke="none"/></g>
  </g>`;
}

function worlds(t) {
  const portal = (id,x,y,w,h,file,label,color,anim) => `<g transform="translate(${x} ${y})"><g class="${anim}">
    <path d="M0 ${h}V${w/2}A${w/2} ${w/2} 0 0 1 ${w} ${w/2}V${h}Z" fill="#142731" stroke="${color}" stroke-width="1.5"/>
    <clipPath id="${id}"><path d="M6 ${h-6}V${w/2}A${w/2-6} ${w/2-6} 0 0 1 ${w-6} ${w/2}V${h-6}Z"/></clipPath>
    <image href="${photos[file]}" x="6" y="6" width="${w-12}" height="${h-12}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <path d="M6 ${h-6}V${w/2}A${w/2-6} ${w/2-6} 0 0 1 ${w-6} ${w/2}V${h-6}Z" fill="url(#glass)" stroke="${color}" stroke-opacity=".5"/>
    <path d="M11 ${h-10}V${w/2}A${w/2-11} ${w/2-11} 0 0 1 ${w-11} ${w/2}" fill="none" stroke="#ffffff" stroke-opacity=".22"/>
    ${text(w/2,h+25,label,12,t.muted,`text-anchor="middle" ${mono}`)}
  </g></g>`;
  const stars = Array.from({length:23},(_,i) => {
    const x = 15+(i*97)%520, y=20+(i*61)%320;
    return `<circle class="spark" cx="${x}" cy="${y}" r="${i%4===0?1.8:1}" fill="${t.accent}" opacity=".4"/>`;
  }).join('');
  return `<defs><linearGradient id="glass" x2=".8" y2="1"><stop stop-color="#dcebd9" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#07141d" stop-opacity=".4"/></linearGradient><radialGradient id="halo"><stop stop-color="${t.green}" stop-opacity=".17"/><stop offset="1" stop-color="${t.bg}" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="268" cy="241" rx="240" ry="240" fill="url(#halo)"/>
    <circle cx="265" cy="234" r="206" stroke="${t.line}" stroke-dasharray="3 8" fill="none"/>
    <g class="orbit"><circle cx="265" cy="28" r="4" fill="${t.accent}"/><circle cx="265" cy="440" r="2" fill="${t.green}"/></g>
    ${stars}
    <ellipse cx="274" cy="403" rx="225" ry="39" fill="none" stroke="${t.line}"/>
    <ellipse class="breath" cx="274" cy="402" rx="175" ry="23" fill="${t.green}" opacity=".04"/>
    <path d="M48 403H500M105 420L212 374M435 420L326 374M274 367V442" stroke="${t.line}" stroke-width="1" fill="none"/>
    ${portal('portal-left',18,136,130,218,'gobelins','COMBAT','#aabf9a','float-b')}
    ${portal('portal-right',372,106,138,244,'orbit','PHYSIQUE','#bab4d9','float-c')}
    ${portal('portal-main',150,47,213,329,'etheria','DES MONDES À EXPLORER',t.green,'float-a')}
    <path d="M475 45V63M466 54H484M479 50L471 58M471 50L479 58" stroke="${t.accent}" stroke-width="1.5"/>
    <path d="M106 53V65M100 59H112" stroke="${t.green}"/>
    ${owl(455,395,t.accent)}`;
}

function typewriter(x,y,t) {
  const phrases=['Et c’est déjà pas mal.','Toujours un truc à tester.','Bon, encore une idée.'];
  const duration=6, cycle=phrases.length*duration;
  return `<g transform="translate(${x} ${y})" aria-hidden="true"><style>
    @keyframes typing-phase{0%{opacity:1}33.333333%,100%{opacity:0}}
    ${phrases.map((phrase,i)=>{
      const width=phrase.length*10.8;
      return `@keyframes typing-reveal-${i}{0%,8%,100%{width:0}45%,78%{width:${width}px}95%{width:0}}
      @keyframes typing-caret-${i}{0%,8%,100%{transform:translateX(0)}45%,78%{transform:translateX(${width}px)}95%{transform:translateX(0)}}
      .typing-phase-${i}{opacity:${i===0?1:0};animation:typing-phase ${cycle}s steps(1) ${i*duration-cycle}s infinite}
      .typing-clip-${i}{animation:typing-reveal-${i} ${duration}s steps(${phrase.length},end) infinite}
      .typing-caret-${i}{transform:translateX(${width}px);animation:typing-caret-${i} ${duration}s steps(${phrase.length},end) infinite}`;
    }).join('')}
    @media(prefers-reduced-motion:reduce){.typing-caret{display:none}}
    </style>${phrases.map((phrase,i)=>{
      const width=phrase.length*10.8;
      return `<g class="typing-phase-${i}"><defs><clipPath id="typing-clip-${i}"><rect class="typing-clip-${i}" x="0" y="-22" width="${width}" height="30"/></clipPath></defs>
      <g clip-path="url(#typing-clip-${i})">${text(0,0,phrase,18,t.muted,`${mono} textLength="${width}" lengthAdjust="spacingAndGlyphs"`)}</g>
      <g class="typing-caret typing-caret-${i}"><rect class="cursor" x="2" y="-15" width="8" height="19" fill="${t.accent}"/></g></g>`;
    }).join('')}</g>`;
}

function hero(t,mobile=false) {
  const w=mobile?640:1200, h=mobile?930:550;
  const left=mobile?40:56;
  return svg(w,h,'Léo Queiros Da Silva · ArsStolas. Développeur jeux vidéo et full stack. Je développe des jeux. Et des applis.',`
    ${motion}<rect width="${w}" height="${h}" rx="18" fill="${t.bg}"/>
    <rect x="1" y="1" width="${w-2}" height="${h-2}" rx="18" stroke="${t.line}" fill="none"/>
    <path d="M${left} 76H${w-left}" stroke="${t.line}"/>
    ${text(left,48,'github.com/ArsStolas',14,t.accent,`${mono} letter-spacing="2"`)}
    ${text(left,220,'Léo.',mobile?122:138,t.ink,'font-weight="700" letter-spacing="-7"')}
    ${text(left+3,259,'QUEIROS DA SILVA',19,t.muted,'letter-spacing="4"')}
    ${text(left,329,'Je développe des jeux.',mobile?29:31,t.ink,'font-weight="500"')}
    ${text(left,371,'Et des applis.',mobile?29:31,t.ink,'font-weight="500"')}
    <path d="M${left} 401Q${left+125} 392 ${left+237} 402" stroke="${t.accent}" stroke-width="2" fill="none"/>
    ${typewriter(left,448,t)}
    <g transform="translate(${mobile?57:636} ${mobile?472:81}) scale(${mobile?1:1})">${worlds(t)}</g>
    ${text(left,h-22,'DES IDÉES, DU CODE, PAS MAL D’ESSAIS',11,t.muted,`${mono} letter-spacing="1"`)}
  `);
}

function chapter(t,number,title,subtitle,mobile=false) {
  if(mobile) return svg(640,116,title,`<path d="M0 4H640" stroke="${t.line}"/>${text(0,46,number,16,t.accent,mono)}${text(43,48,title,30,t.ink,'font-weight="600"')}${text(43,84,subtitle,17,t.muted)}`);
  return svg(1200,115,title,`<path d="M0 4H1200" stroke="${t.line}"/><g>${text(0,51,number,14,t.accent,mono)}${text(50,53,title,31,t.ink,'font-weight="600"')}${text(50,88,subtitle,17,t.muted)}</g><path d="M1152 36V60M1140 48H1164" stroke="${t.accent}" stroke-width="1.5"/>`);
}

function footer(t,mobile=false) {
  if(mobile) return svg(640,170,'Merci d’être passé. À bientôt, Léo.',`${motion}<path d="M0 8H640" stroke="${t.line}"/>${owl(12,56,t.accent)}${text(90,67,'Merci d’être passé.',27,t.ink,'font-weight="500"')}${text(90,102,'On se retrouve sur LinkedIn ?',27,t.ink,'font-weight="500"')}${text(90,143,'À bientôt, Léo.',19,t.muted)}`);
  return svg(1200,145,'Merci d’être passé. À bientôt, Léo.',`${motion}<path d="M0 20H1200" stroke="${t.line}"/><path class="dash" d="M340 78C470 32 545 124 680 78S890 40 1030 78" stroke="${t.accent}" stroke-width="1.5" stroke-dasharray="4 8" fill="none" opacity=".35"/>${owl(18,50,t.accent)}${text(108,75,'Merci d’être passé.',24,t.ink,'font-weight="500"')}${text(108,109,'À bientôt, Léo.',15,t.muted)}${text(1180,83,'À BIENTÔT ↗',15,t.accent,`${mono} text-anchor="end"`)}`);
}

function button(label,width,color) {
  return svg(width+16,58,label,`<g transform="translate(8 8)"><rect x=".5" y=".5" width="${width-1}" height="41" rx="8" fill="${color}"/>${text(width/2,27,label,14,'#142630','font-weight="600" text-anchor="middle"')}</g>`);
}

for (const [name,t] of Object.entries(themes)) {
  await writeFile(path.join(out,`hero-${name}.svg`),hero(t));
  await writeFile(path.join(out,`hero-mobile-${name}.svg`),hero(t,true));
  await writeFile(path.join(out,`games-${name}.svg`),chapter(t,'01','Des mondes à jouer.','IA, physique, multijoueur… et quelques gobelins.'));
  await writeFile(path.join(out,`games-mobile-${name}.svg`),chapter(t,'01','Des mondes à jouer.','IA, physique, multijoueur… et quelques gobelins.',true));
  await writeFile(path.join(out,`apps-${name}.svg`),chapter(t,'02','Et de l’autre côté de l’écran.','Des applications que l’on peut utiliser au quotidien.'));
  await writeFile(path.join(out,`apps-mobile-${name}.svg`),chapter(t,'02','De l’autre côté de l’écran.','Des applications à utiliser au quotidien.',true));
  await writeFile(path.join(out,`footer-${name}.svg`),footer(t));
  await writeFile(path.join(out,`footer-mobile-${name}.svg`),footer(t,true));
}
await writeFile(path.join(out,'linkedin.svg'),button('Discutons sur LinkedIn ↗',210,'#e6bd81'));
await writeFile(path.join(out,'repositories.svg'),button('Explorer mon GitHub ↗',205,'#c3d6c7'));

const cards = [
  ['etheria','etheria','ETHERIA’S END','UNREAL ENGINE · C++','#b8d8be'],
  ['orbit-jumper','orbit','ORBIT JUMPER','PHYSIQUE · C++','#c7c1e4'],
  ['gobelins','gobelins','GOBELINS & GRIMOIRES','COMBAT · MULTIJOUEUR','#c5cea7'],
  ['chivalry-is-dead','chivalry','CHIVALRY IS DEAD','RÉSEAU · IA · VOIX','#e4c6a3'],
  ['attraction-park','attraction','ATTRACTION PARK','SOLO · 3 JOURS','#e7b8d8'],
  ['frogs','frogs','FROG’S','UNITY · C# · MOBILE','#bdd184'],
  ['eukleo','eukleo-agenda','EUKLEO','NEXT.JS · DJANGO','#f1c27c'],
  ['draw-of-the-day','draw','DRAW OF THE DAY','FULL STACK · TEMPS RÉEL','#baadff'],
  ['sapify','sapify','SAPIFY','REACT NATIVE · FIREBASE','#bada9d'],
  ['drop-that-shit','drop','DROP THAT SH!T','EN PRÉPRODUCTION','#ffdc36']
];
await mkdir(path.join(out,'cards'),{recursive:true});
for (const [slug,file,title,tech,color] of cards) {
  const image = await media(file);
  const portrait=['sapify','drop'].includes(file);
  const body = `<defs><clipPath id="crop"><rect width="640" height="300" rx="12"/></clipPath><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="#0b1520" stop-opacity="0"/><stop offset="1" stop-color="#0b1520" stop-opacity=".96"/></linearGradient></defs>
    <g clip-path="url(#crop)"><rect width="640" height="300" fill="#12222c"/>
    ${portrait?`<rect width="640" height="300" fill="${color}" opacity=".06"/><path d="M-80 300L180 0M20 300L280 0M120 300L380 0M220 300L480 0M320 300L580 0M420 300L680 0M520 300L780 0" stroke="${color}" opacity=".13"/>`:''}
    <image href="${image}" x="${file==='frogs'?-100:portrait?230:0}" y="${file==='frogs'?-140:portrait?-15:0}" width="${file==='frogs'?800:portrait?410:640}" height="${file==='frogs'?500:portrait?410:300}" preserveAspectRatio="${portrait?'xMidYMin meet':'xMidYMid slice'}"/>
    <rect width="640" height="300" fill="url(#fade)"/>
    <path d="M26 245V279" stroke="${color}" stroke-width="3"/>
    ${text(41,258,title,title.length>22?23:29,'#f7f5f0','font-weight="700" letter-spacing=".5"')}
    ${text(42,282,tech,12,color,`${mono} letter-spacing="1.4"`)}</g>`;
  await writeFile(path.join(out,'cards',`${slug}.svg`),svg(640,300,title,body));
}
console.log('Generated 28 SVG assets. All imagery and animations are self-contained.');
