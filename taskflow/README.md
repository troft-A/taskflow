# 🚀 TaskFlow

> **TaskFlow** est une application web de gestion de tâches réalisée en HTML, CSS et JavaScript natifs. Conçue pour un projet étudiant, elle ne nécessite aucun framework, aucune installation lourde ni aucun serveur.

---

## 📌 Philosophie du projet

> **L’IA propose, c’est nous qui décidons.**  
> Les outils d’IA peuvent aider à trouver des idées et à formuler des propositions, mais les choix finaux et leur vérification appartiennent au binôme.

---

## 🎯 Objectifs

- **Socle clair** : Définir un ensemble fonctionnel solide doté de critères d’acceptation vérifiables.
- **Cycle de vie complet** : Permettre à l'utilisateur de créer, consulter, modifier, terminer et supprimer ses tâches.
- **Persistance locale** : Assurer une sauvegarde automatique dans le `localStorage` pour retrouver ses données d'une session à l'autre.
- **Légèreté et simplicité** : Garder une base épurée en technologies web natives (`HTML5`, `CSS3`, `JavaScript Vanilla`).

---

## ✨ Fonctionnalités

- **Création** : Ajouter une tâche avec un titre (obligatoire), une priorité (*basse*, *moyenne* ou *haute*) et une échéance facultative.
- **Affichage & Suivi** : Consulter les tâches, identifier les priorités par couleur et repérer les dates d’échéance.
- **Gestion** : Modifier une tâche, la basculer en terminée ou la supprimer.
- **Filtres et Tris** : Filtrer par statut (*toutes*, *à faire*, *terminées*) et trier par date d’ajout, priorité ou échéance (les tâches sans échéance s'affichent en fin de liste).
- **Sécurité & Robustesse** : Échappement des données utilisateur via les API DOM (`textContent`) pour contrer les risques XSS.
- **Accessibilité & Ergonomie** : Interface responsive et pensée pour l'utilisation au clavier.

---

## 🚀 Lancer l’application

Ouvrez simplement le fichier `index.html` dans un navigateur web récent. 
*Note : Les données restent stockées localement dans le navigateur utilisé et ne sont pas synchronisées entre différents appareils.*

---

## 📂 Structure du projet

```text
.
├── index.html          # Structure de la page
├── style.css           # Présentation responsive
├── app.js              # Logique, interface et stockage local
├── README.md           # Présentation et mode d’emploi
├── PROMPTS.md          # Journal de conception assistée par IA
├── .gitignore          # Fichiers à exclure de Git
├── docs/
│   └── USER_STORIES.md # Stories et critères d’acceptation
└── tests/
    └── core.test.js    # Tests Node.js sans dépendance