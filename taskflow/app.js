/* TaskFlow — logique de tâches et interface, sans dépendance externe. */
(function (root) {
  'use strict';

  const STORAGE_KEY = 'taskflow.tasks.v1';
  const PRIORITY_ORDER = { haute: 0, moyenne: 1, basse: 2 };

  // La logique métier est isolée afin de rester simple à tester avec Node.js.
  const TaskFlowCore = {
    load(storage) {
      try {
        const raw = storage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter(TaskFlowCore.isValidTask) : [];
      } catch (_) {
        return [];
      }
    },
    save(storage, tasks) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
      } catch (_) {
        return false;
      }
    },
    isValidTask(task) {
      return task && typeof task.id === 'string' && typeof task.title === 'string'
        && task.title.trim().length > 0
        && Object.prototype.hasOwnProperty.call(PRIORITY_ORDER, task.priority)
        && typeof task.completed === 'boolean';
    },
    create(title, priority, dueDate, id, createdAt) {
      const cleanTitle = typeof title === 'string' ? title.trim() : '';
      if (!cleanTitle) return null;
      if (!Object.prototype.hasOwnProperty.call(PRIORITY_ORDER, priority)) return null;
      return {
        id: id || `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title: cleanTitle,
        priority,
        dueDate: dueDate || '',
        completed: false,
        createdAt: createdAt || new Date().toISOString()
      };
    },
    update(tasks, id, changes) {
      const index = tasks.findIndex((task) => task.id === id);
      if (index < 0) return false;
      const title = typeof changes.title === 'string' ? changes.title.trim() : '';
      if (!title || !Object.prototype.hasOwnProperty.call(PRIORITY_ORDER, changes.priority)) return false;
      tasks[index] = { ...tasks[index], title, priority: changes.priority, dueDate: changes.dueDate || '' };
      return true;
    },
    toggle(tasks, id) {
      const task = tasks.find((item) => item.id === id);
      if (!task) return false;
      task.completed = !task.completed;
      return true;
    },
    remove(tasks, id) {
      const index = tasks.findIndex((task) => task.id === id);
      if (index < 0) return false;
      tasks.splice(index, 1);
      return true;
    },
    // Le tri porte sur une copie : changer l’ordre d’affichage ne réécrit pas les tâches.
    sort(tasks, mode) {
      const copy = [...tasks];
      if (mode === 'priority') {
        return copy.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
          || (b.createdAt || '').localeCompare(a.createdAt || ''));
      }
      if (mode === 'dueDate') {
        return copy.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return (b.createdAt || '').localeCompare(a.createdAt || '');
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        });
      }
      return copy.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    },
    // Les filtres sont uniquement visuels ; le tableau enregistré reste intact.
    filter(tasks, status) {
      if (status === 'a-faire') return tasks.filter((task) => !task.completed);
      if (status === 'terminees') return tasks.filter((task) => task.completed);
      return [...tasks];
    }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = TaskFlowCore;
  if (root) root.TaskFlowCore = TaskFlowCore;
  if (typeof document === 'undefined') return;

  const byId = (id) => document.getElementById(id);
  const form = byId('task-form');
  const titleInput = byId('task-title');
  const priorityInput = byId('task-priority');
  const dueInput = byId('task-due');
  const idInput = byId('task-id');
  const titleError = byId('title-error');
  const list = byId('task-list');
  const emptyState = byId('empty-state');
  const count = byId('task-count');
  const doneCount = byId('done-count');
  const submitButton = byId('submit-button');
  const cancelButton = byId('cancel-edit');
  const sortSelect = byId('sort-select');
  const storageWarning = byId('storage-warning');
  const storage = {
    getItem(key) { return root.localStorage.getItem(key); },
    setItem(key, value) { return root.localStorage.setItem(key, value); }
  };
  let tasks = TaskFlowCore.load(storage);
  let activeFilter = 'toutes';
  let storageAvailable = true;

  function saveTasks() {
    storageAvailable = TaskFlowCore.save(storage, tasks);
    storageWarning.hidden = storageAvailable;
  }

  // Les contenus venant de l’utilisateur sont toujours injectés avec textContent.
  // Aucun HTML fourni par une tâche n’est interprété par le navigateur.
  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function renderTask(task) {
    const item = makeElement('li', `task-item${task.completed ? ' is-done' : ''}`);
    const checkbox = makeElement('input', 'task-check');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `${task.completed ? 'Marquer comme à faire' : 'Terminer'} : ${task.title}`);
    checkbox.addEventListener('change', () => {
      TaskFlowCore.toggle(tasks, task.id);
      saveTasks();
      render();
    });

    const copy = makeElement('div', 'task-copy');
    copy.appendChild(makeElement('span', 'task-title', task.title));
    const meta = makeElement('span', 'task-meta');
    const priority = makeElement('span', 'priority-tag', task.priority);
    priority.dataset.priority = task.priority;
    meta.appendChild(priority);
    if (task.dueDate) {
      const date = makeElement('time', 'due-date', formatDate(task.dueDate));
      date.dateTime = task.dueDate;
      if (!task.completed && task.dueDate < new Date().toISOString().slice(0, 10)) date.classList.add('is-overdue');
      meta.appendChild(date);
    }
    copy.appendChild(meta);

    const actions = makeElement('div', 'task-actions');
    const edit = makeElement('button', 'icon-button', '✎');
    edit.type = 'button';
    edit.title = `Modifier : ${task.title}`;
    edit.setAttribute('aria-label', edit.title);
    edit.addEventListener('click', () => beginEdit(task));
    const remove = makeElement('button', 'icon-button delete', '×');
    remove.type = 'button';
    remove.title = `Supprimer : ${task.title}`;
    remove.setAttribute('aria-label', remove.title);
    remove.addEventListener('click', () => {
      TaskFlowCore.remove(tasks, task.id);
      if (idInput.value === task.id) resetForm();
      saveTasks();
      render();
    });
    actions.append(edit, remove);
    item.append(checkbox, copy, actions);
    return item;
  }

  function render() {
    const visible = TaskFlowCore.sort(TaskFlowCore.filter(tasks, activeFilter), sortSelect.value);
    list.replaceChildren(...visible.map(renderTask));
    emptyState.hidden = visible.length > 0;
    count.textContent = String(tasks.length);
    doneCount.textContent = String(tasks.filter((task) => task.completed).length);
  }

  function formatDate(date) {
    const parts = date.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return date;
    return new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function resetForm() {
    form.reset();
    idInput.value = '';
    titleError.hidden = true;
    const addIcon = makeElement('span', '', '＋');
    addIcon.setAttribute('aria-hidden', 'true');
    submitButton.replaceChildren(addIcon, document.createTextNode(' Ajouter la tâche'));
    cancelButton.hidden = true;
    byId('form-heading').textContent = 'Ajouter une tâche';
  }

  function beginEdit(task) {
    idInput.value = task.id;
    titleInput.value = task.title;
    priorityInput.value = task.priority;
    dueInput.value = task.dueDate || '';
    titleError.hidden = true;
    submitButton.textContent = 'Enregistrer les changements';
    cancelButton.hidden = false;
    byId('form-heading').textContent = 'Modifier la tâche';
    titleInput.focus();
    byId('form-heading').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    if (!title) {
      titleError.hidden = false;
      titleInput.setAttribute('aria-invalid', 'true');
      titleInput.focus();
      return;
    }
    titleError.hidden = true;
    titleInput.removeAttribute('aria-invalid');
    if (idInput.value) {
      TaskFlowCore.update(tasks, idInput.value, { title, priority: priorityInput.value, dueDate: dueInput.value });
    } else {
      const task = TaskFlowCore.create(title, priorityInput.value, dueInput.value);
      if (task) tasks.push(task);
    }
    saveTasks();
    resetForm();
    render();
  });

  cancelButton.addEventListener('click', resetForm);
  titleInput.addEventListener('input', () => {
    if (titleInput.value.trim()) {
      titleError.hidden = true;
      titleInput.removeAttribute('aria-invalid');
    }
  });
  sortSelect.addEventListener('change', render);
  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll('.filter-button').forEach((tab) => {
        const selected = tab === button;
        tab.classList.toggle('is-active', selected);
        tab.setAttribute('aria-pressed', String(selected));
      });
      render();
    });
  });

  const today = new Date();
  byId('today-label').textContent = today.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  render();
  storageWarning.hidden = storageAvailable;
})(typeof window !== 'undefined' ? window : globalThis);
