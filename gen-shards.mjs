#!/usr/bin/env node
// gen-shards.mjs — the demo shards are GENERATED from the estate index, never typed
// (the one-kernel rule: estate-fact surfaces regenerate from the source of truth).
// REFUSES a missing or undescribed fold: an undescribed repo is invisible to every seam,
// and a generator that silently drops content ships a lie (audit-before-the-url).
// Local-only: CI never runs this — it diffs against the committed shards.json.
import { readFileSync, writeFileSync } from 'node:fs';

const INDEX = 'C:/Users/sjgan/.claude/projects/C--Users-sjgan--claude/memory/estate-index.json';
const NODES = {
  'the-rail': ['witness', 'acg-assessor', 'the-bell'],
  'the-soul': ['end-of-software', 'fall-remember', 'the-dreamer'],
  'the-light': ['photonic-konomi', 'falllight', 'one-ladder'],
  'the-world': ['fallworld', 'fallnet', 'airgap', 'the-kg', 'the-rotor'],
};

const idx = JSON.parse(readFileSync(INDEX, 'utf8'));
const all = Array.isArray(idx.nodes) ? idx.nodes : Object.values(idx.nodes || idx);
const shards = [];
for (const [node, names] of Object.entries(NODES)) {
  const folds = [];
  for (const name of names) {
    const r = all.find((x) => x.name === name);
    if (!r) { console.error('REFUSED: "' + name + '" is not in the index — a shard cannot hold what the estate does not'); process.exit(1); }
    if (!r.desc || r.desc.length < 20) { console.error('REFUSED: "' + name + '" is undescribed — invisible to every seam; describe it or drop it'); process.exit(1); }
    folds.push({ name: r.name, desc: r.desc, url: r.url || ('https://github.com/sjgant80-hub/' + r.name) });
  }
  shards.push({ node, folds });
}
writeFileSync('shards.json', JSON.stringify(shards, null, 2) + '\n');
console.log('shards.json — ' + shards.length + ' nodes, ' + shards.reduce((s, x) => s + x.folds.length, 0) + ' folds, every one described');
