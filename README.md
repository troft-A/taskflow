# TaskFlow

TaskFlow est un projet étudiant d’application web de gestion de tâches. Il vise à aider un binôme ou un étudiant à noter ses tâches, suivre leur avancement et retrouver ses priorités.

> **L’IA propose, le binôme décide.** Les outils d’IA peuvent aider à explorer des idées et à formuler des propositions ; les choix finaux, leur vérification et leur adaptation au projet appartiennent au binôme.

## Objectifs

- Définir un socle clair de gestion de tâches, avec des critères d’acceptation vérifiables.
- Permettre à l’utilisateur de créer, consulter, modifier, terminer et supprimer ses tâches.
- Prévoir une sauvegarde locale automatique afin de retrouver les tâches dans le même navigateur.
- Garder une base simple, adaptée à un projet étudiant et à une réalisation progressive.

## Technologies prévues

La réalisation de l’application est prévue plus tard en **HTML, CSS et JavaScript natifs**, sans framework obligatoire. Les tâches devraient être conservées dans le `localStorage` du navigateur. Ces éléments décrivent la cible envisagée : **ce dépôt est pour l’instant consacré à la documentation et ne contient pas l’application**.

## Structure du dépôt

```text
.
├── README.md                 # Présentation, objectifs et organisation du projet
├── PROMPTS.md                # Journal des échanges IA et décisions du binôme
└── docs/
    └── USER_STORIES.md       # Stories et critères d’acceptation
```

Les fichiers d’application (par exemple `index.html`, une feuille CSS et des scripts JavaScript) ne seront ajoutés que lors d’une étape ultérieure, si le binôme décide de commencer l’implémentation.

## User stories

Le périmètre fonctionnel est détaillé dans [`docs/USER_STORIES.md`](docs/USER_STORIES.md) :

### Socle
- **US-01 — Créer une tâche** avec un titre, une priorité et une échéance facultative.
- **US-02 — Afficher la liste** des tâches, leurs priorités et leurs échéances.
- **US-03 — Modifier une tâche** existante.
- **US-04 — Terminer une tâche** et visualiser l’avancement.
- **US-05 — Supprimer une tâche** devenue inutile.
- **US-06 — Sauvegarder automatiquement** les changements dans le navigateur.

### Bonus
- **US-07 — Trier les tâches** par priorité ou échéance.
- **US-08 — Filtrer par statut** : toutes, à faire ou terminées.

## Équipe

À compléter par le binôme :

- Membre 1 : **Nom à compléter**
- Membre 2 : **Nom à compléter**
- Classe / groupe : **À compléter**
