# 📝 Journal des prompts & Arbitrages techniques

Ce journal documente la traçabilité des échanges avec les assistants IA, les limites rencontrées, et les choix de conception réels validés par le binôme. L’objectif est de montrer une utilisation critique, technique et maîtrisée de l'IA (pas de simple copier-coller aveugle).

---

## 📋 Historique des échanges

| Date / Contexte | Prompt adressé à l’IA | Synthèse de la réponse & Limites / Bugs | Décision du binôme | Justification technique |
|---|---|---|---|---|
| **Phase 1 – Cadrage** | « Rédige six user stories socle pour une application étudiante TaskFlow : créer, afficher, modifier, terminer, supprimer, localStorage + 2 bonus (tri/filtre). » | Proposition de 8 stories bien structurées avec critères d’acceptation observables. | **Reformulé** | Conservation du périmètre d'origine et précision des critères dans `docs/USER_STORIES.md` pour validation directe lors des tests. |
| **Phase 1 – Archi** | « Est-ce qu'on doit utiliser Tailwind CSS via CDN pour aller plus vite ? » | Suggestion d'utiliser Tailwind pour styliser rapidement l'interface. | **Rejeté** | Volonté de garder un fichier `style.css` natif et épuré pour éviter les dépendances externes et maîtriser 100% du code. |
| **Phase 2 – Logique** | « Écris la fonction de tri par priorité et échéance pour `app.js`, en gérant les tâches sans date. » | Proposition d'une fonction de tri avec une logique de comparaison de dates. | **Reformulé** | Le code généré plantait lorsque la date était `null` ou vide. On a réécrit la condition pour traiter explicitement les valeurs `undefined` et placer les dates manquantes en fin de tableau de manière robuste. |
| **Phase 2 – Tests** | « Écris un test Node.js pour vérifier la suppression d'une tâche. » | Code de test fonctionnel mais s'appuyant sur un framework externe (Jest). | **Reformulé** | Adapté pour utiliser exclusivement le module natif `node:test` afin de respecter la contrainte "zéro dépendance". |

---

## 📌 Modèle pour les prochaines entrées

Dès que vous avancez dans le code ou que vous corrigez un bug avec l'aide de l'IA, ajoutez une ligne en suivant ce format :

| Date / Contexte | Prompt adressé à l’IA | Synthèse de la réponse & Limites / Bugs | Décision du binôme | Justification technique |
|---|---|---|---|---|
| **[Ex: Phase 2 - Bug Fix]** | « [Votre prompt exact ou résumé] » | [Ce que l'IA a sorti et ce qui posait problème] | **[Gardé / Reformulé / Rejeté]** | [Pourquoi vous avez validé ou modifié le résultat] |