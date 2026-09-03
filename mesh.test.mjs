// mesh.test.mjs — the collective collapse law, falsifiable. Load-bearing claims:
// NO CENTER (arrival/order/partition never shape the verdict), PROVENANCE (coupled, not
// merged), φ-IDENTITY (no collision), DOORS at the mesh level, the κ boundary exact to the
// bit, and the photonic twin's distribution EQUAL to the support shares — pinned numerically,
// never derived from the exports (a test that follows the code follows the mutant).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as K from './mesh.mjs';
import { KAPPA as RENDER_KAPPA } from './render.mjs';
import { KAPPA as PHOTON_KAPPA } from './photon.mjs';

const F = (name, desc) => ({ name, desc });
const MESH = [
  { node: 'gary', folds: [F('nexus', 'typed graph renders on observation'), F('dreamer', 'tiered memory reorganised overnight')] },
  { node: 'didy', folds: [F('seam', 'collapse capability on intent then fold back'), F('bell', 'a mutation verdict rings as sound')] },
  { node: 'guild', folds: [F('chorus', 'signed work over the air admission')] },
];

test('THE CHORD — one κ across all three kernels, pinned numerically', () => {
  assert.equal(K.KAPPA, 0.618);
  assert.equal(RENDER_KAPPA, 0.618);
  assert.equal(PHOTON_KAPPA, 0.618);
});

test('SHARD — stamped with its holder; refusals name the law', () => {
  const s = K.shard('gary', [{ name: 'nexus', desc: 'graph', url: 'https://x' }]);
  assert.ok(s.ok);
  assert.equal(s.shard.folds[0].node, 'gary');
  assert.equal(s.shard.folds[0].url, 'https://x', 'extra properties survive the stamp');
  assert.ok(K.shard('fresh', []).ok, 'a node may hold zero folds — it may join before it owns');
  assert.match(K.shard('', [F('a', 'b')]).why, /unowned fold has no sovereign/);
  assert.match(K.shard('n', 'x').why, /must be a list/);
  assert.match(K.shard('n', [{ desc: 'no name' }]).why, /invisible to every seam/);
});

test('UNION — couples, never merges: provenance, dedupe, deterministic order, no mutation', () => {
  const dup = [
    { node: 'b', folds: [F('same', 'x'), F('same', 'x'), F('zeta', 'z')] },
    { node: 'a', folds: [F('same', 'different estate, same name')] },
  ];
  const snapshot = JSON.stringify(dup);
  const u = K.union(dup);
  assert.ok(u.ok);
  assert.deepEqual(u.folds.map((f) => f.node + '/' + f.name), ['a/same', 'b/same', 'b/zeta'],
    'within a node duplicates collapse to one; ACROSS nodes the same name is two folds — provenance is identity');
  assert.deepEqual(u.nodes, ['a', 'b']);
  assert.equal(JSON.stringify(dup), snapshot, 'the union never mutates the shards');
  assert.match(K.union([]).why, /empty mesh casts no shadow/);
  assert.match(K.union([{ node: 'x', folds: [{}] }]).why, /invisible/);
});

test('φ-IDENTITY — golden phases never collide; the gap is pinned', () => {
  const p = K.nodePhases(['a', 'b', 'c', 'd', 'e']);
  assert.ok(p.ok);
  assert.equal(p.phases.length, 5);
  assert.equal(p.phases[0].theta, 0);
  assert.ok(Math.abs(p.gap - 0.9167043820063747) < 1e-12, 'the 5-node minimum gap, pinned: got ' + p.gap);
  assert.ok(K.nodePhases(Array.from({ length: 89 }, (_, i) => 'n' + i)).gap > 0, 'no collision even at 89 nodes');
  assert.match(K.nodePhases(['solo']).why, /sovereignty needs company/);
  assert.match(K.nodePhases(['x', 'x']).why, /cannot share a name/);
});

test('NO CENTER — arrival, listing order, and partition never shape the verdict', () => {
  const intent = 'ring the mutation verdict as sound';
  const base = K.collectiveCollapse(intent, MESH, 'gary');
  assert.ok(base.ok);
  assert.equal(base.mode, 'reuse');
  assert.equal(base.fold.name, 'bell');
  assert.equal(base.holder, 'didy', 'the verdict names WHO holds the answer');
  assert.equal(base.arrival.at, 'gary', 'an intent from gary reuses a fold held by didy — locality transcended');
  const strip = (r) => ({ ...r, arrival: null });
  // arrival never shapes it
  assert.deepEqual(strip(K.collectiveCollapse(intent, MESH, 'guild')), strip(base));
  assert.deepEqual(strip(K.collectiveCollapse(intent, MESH)), strip(base));
  // listing order never shapes it
  assert.deepEqual(strip(K.collectiveCollapse(intent, [...MESH].reverse(), 'gary')), strip(base));
  // partition never shapes it: didy's folds split across two shard entries
  const repartitioned = [MESH[0], { node: 'didy', folds: [MESH[1].folds[0]] }, { node: 'didy', folds: [MESH[1].folds[1]] }, MESH[2]];
  assert.deepEqual(strip(K.collectiveCollapse(intent, repartitioned, 'gary')), strip(base));
  // a stranger cannot collapse the shared shadow
  assert.match(K.collectiveCollapse(intent, MESH, 'zeta').why, /stranger cannot collapse/);
  assert.match(K.collectiveCollapse(intent, MESH, 7).why, /must be a name or nothing/);
});

test('DOORS hold at the mesh level — and the candidates are not even lit', () => {
  const r = K.collectiveCollapse('pay the invoice for the guild', MESH, 'didy');
  assert.ok(r.ok);
  assert.equal(r.mode, 'door');
  assert.deepEqual(r.doors, ['money']);
  assert.equal(r.spectrum, null, 'a door verdict carries NO spectrum');
  assert.match(r.meshWhy, /not even lit/);
  assert.equal(K.renderEvent(r, 1).ok, false);
  assert.match(K.renderEvent(r, 1).why, /never rendered — not even as light/);
});

test('THE κ BOUNDARY — exact to the bit: 309 of 500 reuses, 308 does not', () => {
  const words = Array.from({ length: 500 }, (_, i) => 'w' + String(i).padStart(3, '0'));
  const intent = words.join(' ');
  const mk = (n) => [{ node: 'solo', folds: [F('edge', words.slice(0, n).join(' '))] }];
  const at = K.collectiveCollapse(intent, mk(309));
  assert.equal(at.mode, 'reuse');
  assert.equal(at.support, 0.618, '309/500 IS κ — the same double');
  assert.equal(K.collectiveCollapse(intent, mk(308)).mode, 'generate');
});

test('SPECTRUM — every fold speaks its interference; the law and the light agree', () => {
  const shards = [
    { node: 'a', folds: [F('signer', 'sign envelope sovereign keys tool')] },
    { node: 'b', folds: [F('meshy', 'sovereign mesh')] },
  ];
  const r = K.collectiveCollapse('sign every envelope with sovereign keys', shards, 'b');
  assert.equal(r.mode, 'reuse');
  assert.equal(r.fold.name, 'signer');
  assert.equal(r.holder, 'a');
  assert.deepEqual(r.spectrum, [
    { name: 'signer', node: 'a', support: 0.8 },
    { name: 'meshy', node: 'b', support: 0.2 },
  ], 'the full spectrum, sorted by support — the collapse is inspectable, not oracular');
  // the twin: distribution EQUALS the support shares, and the law's fold carries the most light
  const ev = K.renderEvent(r, 5);
  assert.ok(ev.ok);
  assert.deepEqual(ev.distribution, [
    { name: 'signer', node: 'a', p: 0.8 },
    { name: 'meshy', node: 'b', p: 0.2 },
  ], 'Born shares = support shares — the twin renders the SAME collapse, it does not invent one');
  assert.deepEqual(K.renderEvent(r, 5), ev, 'seeded — a run is reproducible');
  assert.match(ev.twin, /simulated light/, 'the honest split is stamped on the event itself');
  assert.match(K.renderEvent({ ok: true, mode: 'reuse' }, 1).why, /carries no spectrum/);
  assert.match(K.renderEvent(null, 1).why, /collapse first/);
});

test('DARK FOLDS stay dark — zero support never enters the flash', () => {
  const shards = [
    { node: 'a', folds: [F('signer', 'sign envelope sovereign keys tool')] },
    { node: 'b', folds: [F('meshy', 'sovereign mesh')] },
    { node: 'c', folds: [F('unrelated', 'quantum turnip harvest')] },
  ];
  const r = K.collectiveCollapse('sign every envelope with sovereign keys', shards);
  assert.equal(r.spectrum.length, 3, 'the spectrum SHOWS the dark fold honestly');
  assert.equal(r.spectrum[2].support, 0);
  const ev = K.renderEvent(r, 9);
  assert.equal(ev.distribution.length, 2, 'but a fold with no interference carries no light — it cannot fire');
  assert.ok(ev.distribution.every((d) => d.name !== 'unrelated'));
});

test('SPECTRUM tie-break — equal support sorts by node THEN name, even when they conflict', () => {
  const shards = [
    { node: 'a', folds: [F('zzz', 'alpha bravo')] },
    { node: 'b', folds: [F('aaa', 'alpha bravo')] },
  ];
  const r = K.collectiveCollapse('alpha bravo charlie delta echo', shards);
  assert.deepEqual(r.spectrum.map((s) => s.node + '/' + s.name), ['a/zzz', 'b/aaa'],
    'node outranks name — provenance is the first identity');
});

test('DREAM at the minimum — exactly two folds interfere; WAKE takes the held state directly', () => {
  const two = [{ node: 'x', folds: [F('one', 'alpha bravo'), F('two', 'charlie delta')] }];
  const d = K.dream(two, 2);
  assert.ok(d.ok, 'two folds ARE enough to interfere — the boundary is exact');
  assert.equal(d.power, 1);
  const viaWrapper = K.wake(d, 11);
  const viaHeld = K.wake(d.held, 11);
  assert.deepEqual(viaHeld, viaWrapper, 'wake accepts the wrapper or the held state itself — same collapse');
  assert.equal(K.wake(null, 1).ok, false, 'garbage is refused, never thrown');
  assert.match(K.wake(null, 1).why, /needs a held dream/);
  assert.equal(K.wake(undefined, 1).ok, false);
});

test('RECOMBINE across nodes — two holders named, coverage at law', () => {
  const shards = [
    { node: 'north', folds: [F('abc', 'alpha bravo charlie')] },
    { node: 'south', folds: [F('de', 'delta echo')] },
  ];
  const r = K.collectiveCollapse('alpha bravo charlie delta echo foxtrot', shards, 'south');
  assert.equal(r.mode, 'recombine');
  assert.equal(r.coverage, 0.833);
  assert.deepEqual(r.holder, ['north', 'south'], 'a composition can span sovereign nodes — that is the mesh');
});

test('DREAM — held, un-collapsed, power conserved, deterministic; WAKE collapses it', () => {
  const shards = [
    { node: 'gary', folds: [F('nexus', 'typed graph renders'), F('dreamer', 'tiered memory')] },
    { node: 'didy', folds: [F('seam', 'collapse intent'), F('bell', 'verdict rings')] },
  ];
  const d = K.dream(shards, 3);
  assert.ok(d.ok);
  assert.equal(d.power, 1, 'no photon lost, none invented — conservation through the whole mesh');
  assert.deepEqual(d.held.folds.map((f) => f.node + '/' + f.name), ['didy/bell', 'didy/seam', 'gary/dreamer', 'gary/nexus']);
  assert.ok(Math.abs(d.held.state[0][0] - 0.1933731309829073) < 1e-12, 'pinned: the dream is deterministic arithmetic, not a mood');
  assert.ok(Math.abs(d.held.state[0][1] - 0.3823774811934455) < 1e-12);
  assert.ok(Math.abs(d.held.state[3][0] - 0.7820136513812382) < 1e-12);
  assert.deepEqual(K.dream(shards, 3), d, 'no randomness enters until wake');
  assert.ok(d.held.state.some(([re, im]) => Math.abs(im) > 1e-9), 'phases are LIVE — this is superposition, not a list of probabilities');
  const w = K.wake(d, 42);
  assert.deepEqual(w, { ok: true, fold: { name: 'nexus', node: 'gary' }, probability: 0.612, seed: 42 }, 'pinned wake');
  assert.deepEqual(K.wake(d, 42), w, 'same seed, same collapse — the record of a run is not random');
  assert.match(K.dream([{ node: 'x', folds: [F('one', 'alone')] }], 2).why, /needs at least two/);
  assert.match(K.dream(shards, 0).why, /depth must be a positive integer/);
  assert.match(K.wake({ state: [[1, 0]] }, 1).why, /needs a held dream/);
});

test('THE FUZZ — 250 random meshes: total, deterministic, order-blind, doors never lit', () => {
  let seed = 6180;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const WORDS = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliet', 'pay', 'delete', 'publish'];
  const pick = () => WORDS[Math.floor(rnd() * WORDS.length)];
  for (let t = 0; t < 250; t++) {
    const shards = Array.from({ length: 1 + Math.floor(rnd() * 4) }, (_, i) => ({
      node: 'node' + i,
      folds: Array.from({ length: Math.floor(rnd() * 5) }, (_, j) => F('f' + i + j, pick() + ' ' + pick() + ' ' + pick())),
    }));
    const intent = pick() + ' ' + pick() + ' ' + pick();
    const a = K.collectiveCollapse(intent, shards, 'node0');
    const b = K.collectiveCollapse(intent, shards, 'node0');
    assert.deepEqual(a, b, 'no moods');
    assert.equal(typeof a.ok, 'boolean');
    if (a.ok) {
      assert.ok(['door', 'reuse', 'recombine', 'generate'].includes(a.mode));
      if (a.mode === 'door') assert.equal(a.spectrum, null, 'a door is never lit — fuzz holds the law');
      else {
        for (let i = 1; i < a.spectrum.length; i++) assert.ok(a.spectrum[i - 1].support >= a.spectrum[i].support, 'spectrum sorted');
        const ev = K.renderEvent(a, t);
        if (ev.ok) {
          const total = ev.distribution.reduce((s, d) => s + d.p, 0);
          assert.ok(Math.abs(total - 1) < 0.005, 'the distribution is a distribution');
          assert.ok(a.spectrum.some((s) => s.name === ev.fold.name && s.node === ev.fold.node), 'the flash lands inside the spectrum');
        }
      }
      const shuffled = [...shards].reverse();
      const c = K.collectiveCollapse(intent, shuffled, 'node0');
      assert.deepEqual({ ...c, arrival: null }, { ...a, arrival: null }, 'order-blind at every fuzz point');
    }
  }
});
