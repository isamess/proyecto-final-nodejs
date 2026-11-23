// Genera src/views/portada.js a partir de docs/arquitectura.svg.
// Uso: npm run portada
//
// El SVG se incrusta en el HTML para que la portada funcione igual en local
// y en Vercel, sin depender de archivos estáticos ni de rutas externas.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origen = resolve(raiz, 'docs/arquitectura.svg');
const destino = resolve(raiz, 'src/views/portada.js');
const destinoHtml = resolve(raiz, 'docs/portada.html');

const svg = readFileSync(origen, 'utf8').trim();

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>API de Productos — Proyecto Final Node.js</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #f1f5f9;
    color: #0f172a;
    font-family: 'Segoe UI', system-ui, -apple-system, Arial, sans-serif;
  }
  .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 20px 56px; }
  header { text-align: center; margin-bottom: 28px; }
  h1 {
    font-size: clamp(26px, 4vw, 40px);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
  }
  .sub { margin: 0; color: #475569; font-size: clamp(13px, 1.6vw, 16px); }
  .badge {
    display: inline-block;
    margin-top: 16px;
    padding: 6px 12px;
    border-radius: 999px;
    background: #dcfce7;
    color: #166534;
    font-size: 12px;
    font-weight: 600;
  }
  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 14px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  }
  .card svg { display: block; width: 100%; height: auto; border-radius: 10px; }
  .links { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 22px; }
  .links a {
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 600;
    padding: 9px 14px;
    border-radius: 10px;
    background: #0f172a;
    color: #ffffff;
  }
  .links a.alt { background: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; }
  footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 26px; }
  footer code { color: #334155; }
  @media (max-width: 640px) {
    .wrap { padding: 26px 12px 40px; }
    .card { padding: 8px; }
  }
</style>
</head>
<body>
<main class="wrap">
  <header>
    <h1>Bienvenido a mi API de productos</h1>
    <p class="sub">API REST con Node.js · Express 5 · Firebase Firestore · JWT</p>
    <span class="badge">Proyecto Final — Talento Tech</span>
  </header>

  <section class="card" aria-label="Diagrama de arquitectura del proyecto">
    ${svg}
  </section>

  <nav class="links">
    <a href="/api/products">Ver productos</a>
    <a class="alt" href="https://github.com/isamess/proyecto-final-nodejs#readme">Documentación en GitHub</a>
  </nav>

  <footer>
    <code>GET /api/products</code> · <code>POST /auth/login</code> · <code>POST /api/products/create</code>
  </footer>
</main>
</body>
</html>
`;

const modulo = `// Archivo generado automáticamente por scripts/generar-portada.js.
// No editar a mano: modificá docs/arquitectura.svg y ejecutá "npm run portada".

export function renderPortada() {
  return ${JSON.stringify(html)};
}

export default renderPortada;
`;

mkdirSync(dirname(destino), { recursive: true });
writeFileSync(destino, modulo, 'utf8');
writeFileSync(destinoHtml, html, 'utf8');

console.log(`Portada generada: ${destino}`);
console.log(`Vista previa: ${destinoHtml}`);
console.log(`SVG incrustado: ${svg.length} caracteres`);
