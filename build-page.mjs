#!/usr/bin/env node
// build-page.mjs — the page inlines the REAL gated kernels VERBATIM (kernel-backed pages:
// the gated logic IS the live logic). Three kernels, three marker pairs, plus the generated
// shards. The only transforms are mechanical: strip `export ` keywords, drop mesh.mjs's
// import lines (the page provides those names via the vendored kernels' IIFEs), and escape
// `</script`. A FIXPOINT: rebuilding from the same inputs yields the same bytes — CI diffs it.
import { readFileSync, writeFileSync } from 'node:fs';

const strip = (src, dropImports) => src
  .split('\n')
  .filter((l) => !(dropImports && /^import /.test(l)))
  .map((l) => l.replace(/^export (const|function)/, '$1'))
  .join('\n')
  .replace(/<\/script/g, '<\\/script');

const photon = strip(readFileSync('photon.mjs', 'utf8'), false);
const render = strip(readFileSync('render.mjs', 'utf8'), false);
const mesh = strip(readFileSync('mesh.mjs', 'utf8'), true);
const shards = readFileSync('shards.json', 'utf8').trim();

const splice = (page, tag, body) => {
  const a = '/*__' + tag + '_START__*/', b = '/*__' + tag + '_END__*/';
  const i = page.indexOf(a), j = page.indexOf(b);
  if (i < 0 || j < 0) { console.error('REFUSED: marker ' + tag + ' missing — a page that cannot say where its kernel goes gets no kernel'); process.exit(1); }
  return page.slice(0, i + a.length) + '\n' + body + '\n' + page.slice(j);
};

let page = readFileSync('page.template.html', 'utf8');
page = splice(page, 'PHOTON', photon);
page = splice(page, 'RENDER', render);
page = splice(page, 'MESH', mesh);
page = splice(page, 'SHARDS', 'const SHARDS = ' + shards + ';');
writeFileSync('index.html', page);
console.log('index.html — ' + page.length + ' bytes, three kernels inlined verbatim + generated shards');
