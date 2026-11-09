// Vérifications de la logique métier avec le module de test natif de Node.js.
const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../app.js');

function task(id, title, priority, dueDate, completed = false) {
  return { id, title, priority, dueDate, completed, createdAt: `2026-10-${id === 'a' ? '01' : '02'}T12:00:00.000Z` };
}

test('création refuse un titre vide et nettoie les espaces', () => {
  assert.equal(core.create('   ', 'haute'), null);
  assert.equal(core.create('  Lire  ', 'moyenne', '', 'id-1', 'date').title, 'Lire');
  assert.equal(core.create('Lire', 'urgent'), null);
});

test('modification, bascule et suppression ciblent la bonne tâche', () => {
  const tasks = [task('a', 'Départ', 'basse', '')];
  assert.equal(core.update(tasks, 'a', { title: '  Révisée ', priority: 'haute', dueDate: '2026-11-03' }), true);
  assert.deepEqual([tasks[0].title, tasks[0].priority, tasks[0].dueDate], ['Révisée', 'haute', '2026-11-03']);
  assert.equal(core.update(tasks, 'a', { title: ' ', priority: 'basse' }), false);
  assert.equal(core.toggle(tasks, 'a'), true);
  assert.equal(tasks[0].completed, true);
  assert.equal(core.remove(tasks, 'a'), true);
  assert.equal(tasks.length, 0);
});

test('tri priorité et échéance, tâches sans échéance à la fin', () => {
  const tasks = [task('a', 'Sans date', 'basse', ''), task('b', 'Bientôt', 'haute', '2026-11-02')];
  assert.deepEqual(core.sort(tasks, 'priority').map((item) => item.id), ['b', 'a']);
  assert.deepEqual(core.sort(tasks, 'dueDate').map((item) => item.id), ['b', 'a']);
});

test('filtrage par statut et persistance locale', () => {
  const tasks = [task('a', 'Faire', 'moyenne', ''), task('b', 'Fait', 'basse', '', true)];
  assert.deepEqual(core.filter(tasks, 'a-faire').map((item) => item.id), ['a']);
  assert.deepEqual(core.filter(tasks, 'terminees').map((item) => item.id), ['b']);
  const values = new Map();
  const storage = { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  assert.equal(core.save(storage, tasks), true);
  assert.deepEqual(core.load(storage), tasks);
});

test('chargement et sauvegarde résistent aux erreurs de stockage et données mal formées', () => {
  assert.deepEqual(core.load({ getItem: () => '{bad json' }), []);
  assert.deepEqual(core.load({ getItem: () => '[null, {"id":"x"}]' }), []);
  assert.equal(core.save({ setItem: () => { throw new Error('quota'); } }, []), false);
});

test('tri ne modifie pas la liste source et filtre inconnu reste inclusif', () => {
  const tasks = [task('a', 'À faire', 'basse', ''), task('b', 'Terminée', 'haute', '', true)];
  const originalOrder = tasks.map((item) => item.id);
  assert.deepEqual(core.sort(tasks, 'priority').map((item) => item.id), ['b', 'a']);
  assert.deepEqual(tasks.map((item) => item.id), originalOrder);
  assert.deepEqual(core.filter(tasks, 'inconnu').map((item) => item.id), originalOrder);
});
