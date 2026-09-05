// Vista previa local: npm run serve -> http://localhost:8899
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'dist');
const MT = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
};
const PORT = process.env.PORT || 8899;

http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  let f = path.join(ROOT, u);
  try { if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); } catch { /* noop */ }
  fs.readFile(f, (e, d) => {
    if (e) {
      return fs.readFile(path.join(ROOT, '404.html'), (e2, d2) => {
        r.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        r.end(e2 ? '404' : d2);
      });
    }
    r.writeHead(200, { 'Content-Type': MT[path.extname(f)] || 'application/octet-stream' });
    r.end(d);
  });
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
