import fs from 'node:fs'; import path from 'node:path';
const OUT='dist'; let files=[]; let errors=0, warns=0;
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
  e.isDirectory()?walk(p):e.name.endsWith('.html')&&files.push(p);}})(OUT);
const urls=new Set(files.map(f=>'/'+path.relative(OUT,f).replace(/index\.html$/,'').replace(/\\/g,'/')).map(u=>u==='/'?'/':u));
for(const f of files){
  const h=fs.readFileSync(f,'utf8'); const rel='/'+path.relative(OUT,f);
  // JSON-LD
  const m=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if(!m.length){console.log('✗ no JSON-LD',rel);errors++;}
  for(const [,j] of m){try{JSON.parse(j)}catch(e){console.log('✗ bad JSON-LD',rel,e.message);errors++}}
  // meta
  for(const [re,name] of [[/<title>[^<]{10,75}<\/title>/,'title 10-75ch'],[/<link rel="canonical" href="https:\/\//,'canonical'],[/<meta name="description" content="[^"]{50,180}"/,'desc 50-180ch']]){
    if(!re.test(h)){console.log('⚠',name,rel);warns++;}
  }
  // h1 exactly one
  const h1=(h.match(/<h1[ >]/g)||[]).length;
  if(h1!==1 && !rel.includes('404')){console.log('✗ h1 count',h1,rel);errors++;}
  // internal links resolve
  for(const [,href] of h.matchAll(/href="(\/[^"#?]*)"/g)){
    if(href.startsWith('/assets/')||href.endsWith('.xml')||href.endsWith('.txt')||href.endsWith('.webmanifest')||href.endsWith('.html'))continue;
    if(!urls.has(href)){console.log('✗ dead link',href,'in',rel);errors++;}
  }
  // alt en imgs
  for(const [tag] of h.matchAll(/<img [^>]*>/g)) if(!/alt="/.test(tag)){console.log('⚠ img sin alt',rel);warns++;}
}
// hreflang reciprocity
let pairs=0;
for(const f of files){const h=fs.readFileSync(f,'utf8');const alt=h.match(/hreflang="(es-US|en-US)" href="https:\/\/www\.xpresstirecenter\.com([^"]+)"/);
  if(alt){pairs++; const target=path.join(OUT,alt[2],'index.html');
    if(!fs.existsSync(target)){console.log('✗ hreflang target missing',alt[2],'from','/'+path.relative(OUT,f));errors++;}}}
console.log(`\n${files.length} html · ${pairs} con hreflang · ${errors} errores · ${warns} avisos`);
process.exit(errors?1:0);
