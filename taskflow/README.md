# TaskFlow

TaskFlow est une petite application de gestion de tâches réalisée en HTML, CSS et JavaScript natifs. Elle convient à un projet étudiant : aucun framework, aucune installation et aucun serveur ne sont nécessaires. Les tâches sont conservées dans le stockage local du navigateur.

## Lancer l’application

Ouvrez simplement `index.html` dans un navigateur récent. Les données restent dans le navigateur utilisé ; elles ne sont pas synchronisées entre appareils.

## Fonctionnalités

- Créer une tâche avec titre, priorité (basse, moyenne ou haute) et échéance facultative. Un titre vide est refusé.
- Consulter les tâches et repérer les priorités par couleur et les dates d’échéance.
- Modifier une tâche, la marquer comme terminée ou la supprimer.
- Filtrer la liste par statut : toutes, à faire ou terminées.
- Trier par date d’ajout, priorité ou échéance (les tâches sans échéance apparaissent à la fin).
- Enregistrer automatiquement les changements dans `localStorage`.
- Échapper l’affichage des données utilisateur avec les API DOM (`textContent`) plutôt qu’en interprétant leur contenu comme du HTML.
- Interface responsive et utilisable au clavier.

## Structure du projet

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
```

## Vérifications développeur

La logique métier est exportée par `app.js` pour pouvoir être testée avec Node.js, sans dépendances :

```sh
node --check app.js
node --test tests/core.test.js
```

## Équipe

À compléter par le binôme :

- Membre 1 : **Nom à compléter**
- Membre 2 : **Nom à compléter**
- Classe / groupe : **À compléter**
