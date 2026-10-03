/**
 * ArsStolas Project, 2026
 * Created by: "ArsStolas"
 * Last Updated by: "ArsStolas"
 * Class: "ProfilePreview" - Github Profile Local Preview
 */

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const types={'.svg':'image/svg+xml','.webp':'image/webp','.md':'text/plain; charset=utf-8','.html':'text/html; charset=utf-8'};
const styles = `
  :root{color-scheme:dark;--bg:#0d1117;--panel:#0d1117;--fg:#e6edf3;--muted:#8b949e;--line:#30363d;--code:#30363d;--link:#b9d6bd}
  html[data-theme=light]{color-scheme:light;--bg:#f6f8fa;--panel:#fff;--fg:#1f2328;--muted:#59636e;--line:#d1d9e0;--code:#eff1f3;--link:#3c6c5b}
  html[data-theme=light] article [href$="#gh-dark-mode-only"],html[data-theme=dark] article [href$="#gh-light-mode-only"]{display:none}
  *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
  .toolbar{max-width:980px;margin:25px auto 18px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:0 12px;color:var(--muted);font-size:13px}.toolbar strong{margin-right:auto;color:var(--fg)}
  button{font:inherit;color:var(--fg);background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:7px 12px;cursor:pointer}button[aria-pressed=true]{border-color:#b39262;box-shadow:inset 0 -2px #b39262}button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid #d8b174;outline-offset:4px}
  main{max-width:980px;margin:0 auto 40px;border:1px solid var(--line);border-radius:7px;background:var(--panel)}.filebar{font:12px ui-monospace,Consolas,monospace;color:var(--muted);border-bottom:1px solid var(--line);padding:14px 30px}
  article{padding:32px;overflow-wrap:break-word}article>:first-child{margin-top:0}h2{font-size:24px;border-bottom:1px solid var(--line);padding-bottom:.3em;margin:24px 0 16px;line-height:1.25}h3{font-size:20px;line-height:1.25;margin:20px 0 16px}p{margin:0 0 16px}a{color:var(--link);text-decoration:none}a:hover{text-decoration:underline}strong{font-weight:600}em,sub{color:var(--muted)}sub{font-size:12px;vertical-align:baseline}
  img{max-width:100%;height:auto;vertical-align:middle}p[align=center] img{height:42px;width:auto;margin-top:12px}picture{display:block}code{padding:.2em .4em;font:85% ui-monospace,SFMono-Regular,Consolas,monospace;background:var(--code);border-radius:6px;white-space:normal;box-decoration-break:clone;line-height:2}
  table{border-spacing:0;border-collapse:collapse;width:100%;margin-bottom:16px;table-layout:fixed}td{padding:16px;border:1px solid var(--line);vertical-align:top}td p:last-child{margin-bottom:0}td h3{margin-top:14px}summary{cursor:pointer;padding:8px 0}details{margin:12px 0 20px}details>p,details>img{margin-top:14px}details[open]{padding-bottom:12px}
  .note{max-width:950px;margin:12px auto 28px;color:var(--muted);font-size:12px;padding:0 12px}html[data-size=mobile] main{max-width:390px}html[data-size=mobile] article{padding:16px}html[data-size=mobile] td{padding:8px}html[data-size=mobile] h3{font-size:18px}html[data-size=mobile] .filebar{padding:12px 16px}
  @media(max-width:640px){main{border-left:0;border-right:0;border-radius:0}article{padding:16px}td{padding:8px}h3{font-size:18px}.toolbar{margin-top:14px}.filebar{padding:12px 16px}}`;

function preview(readme) {
  return `<!doctype html><html lang="fr" data-theme="dark" data-size="desktop"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ArsStolas · Aperçu du README</title><style>${styles}</style></head><body>
    <nav class="toolbar" aria-label="Prévisualisation"><strong>ArsStolas / README.md</strong><button type="button" data-theme="dark" aria-pressed="true">Sombre</button><button type="button" data-theme="light" aria-pressed="false">Clair</button><button type="button" id="mobile" aria-pressed="false">Mobile</button><button type="button" id="motion" aria-pressed="false">Pause animations</button></nav>
    <main><div class="filebar">ArsStolas / README.md</div><article>${readme}</article></main>
    <p class="note">Aperçu local du README et de ses fichiers réels. La mise en page GitHub peut légèrement varier. Les contrôles ci-dessus ne font pas partie du profil.</p>
    <script>
    const root=document.documentElement;let paused=false;
    function images(){
      const mobile=root.dataset.size==='mobile';
      document.querySelectorAll('article picture').forEach(p=>{

        p.querySelectorAll('source').forEach(s=>{
          s.media=mobile?'all':'(max-width: 640px)';
          s.srcset=s.getAttribute('srcset').split('?')[0]+(paused?'?still=1':'');
        });
        const img=p.querySelector('img');
        img.src=img.getAttribute('src').split('?')[0]+(paused?'?still=1':'');
      });
    }
    document.querySelectorAll('button[data-theme]').forEach(b=>b.addEventListener('click',()=>{root.dataset.theme=b.dataset.theme;document.querySelectorAll('button[data-theme]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));images()}));
    document.getElementById('mobile').addEventListener('click',e=>{const active=root.dataset.size!=='mobile';root.dataset.size=active?'mobile':'desktop';e.currentTarget.setAttribute('aria-pressed',String(active));images()});
    document.getElementById('motion').addEventListener('click',e=>{paused=!paused;e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.textContent=paused?'Reprendre les animations':'Pause animations';images()});
    addEventListener('resize',images);images();
    </script></body></html>`;
}

const server=http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://127.0.0.1');
    let pathname=decodeURIComponent(url.pathname);
    if(pathname==='/favicon.ico'){res.writeHead(204);res.end();return;}
    if(pathname==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(preview(await readFile(path.join(root,'README.md'),'utf8')));return;}
    if(!pathname.startsWith('/assets/') && pathname!=='/README.md') {res.writeHead(404);res.end('Not found');return;}
    const target=path.resolve(root,'.'+pathname);
    if(!target.startsWith(root.endsWith(path.sep)?root:root+path.sep)){res.writeHead(403);res.end();return;}
    let content=await readFile(target);
    if(url.searchParams.has('still')&&path.extname(target)==='.svg')content=Buffer.from(content.toString().replace('</svg>','<style>*{animation:none!important}</style></svg>'));
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(content);
  } catch {res.writeHead(404);res.end('Not found');}
});
server.listen(4174,'127.0.0.1',()=>console.log('README preview: http://127.0.0.1:4174/'));
