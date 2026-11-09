# User stories — TaskFlow

## Socle

### US-01 — Créer une tâche
**En tant qu’** utilisateur, **je veux** saisir une tâche avec un titre, une priorité et une échéance facultative, **afin de** noter ce que j’ai à faire.

**Critères d’acceptation**
- La tâche peut être créée avec un titre non vide, une priorité basse, moyenne ou haute, et éventuellement une échéance.
- Un titre vide ou composé uniquement d’espaces est refusé ; un message explique l’erreur et aucune tâche n’est créée.
- Après validation, la nouvelle tâche apparaît dans la liste.

### US-02 — Afficher la liste
**En tant qu’** utilisateur, **je veux** voir mes tâches avec leur priorité et leur échéance, **afin de** savoir ce qui m’attend.

**Critères d’acceptation**
- Chaque tâche affiche son titre et sa priorité.
- Les priorités basse, moyenne et haute se distinguent par des couleurs.
- Une échéance choisie est affichée au format lisible ; aucune date n’est inventée lorsqu’elle est absente.
- Une liste vide présente un état vide explicatif.

### US-03 — Modifier une tâche
**En tant qu’** utilisateur, **je veux** modifier le titre, la priorité ou l’échéance d’une tâche, **afin de** tenir ma liste à jour.

**Critères d’acceptation**
- L’action Modifier préremplit le formulaire avec les valeurs existantes.
- Après validation, la tâche concernée est mise à jour sans créer de doublon.
- Un titre vide est refusé aussi lors d’une modification.
- L’utilisateur peut annuler la modification.

### US-04 — Terminer une tâche
**En tant qu’** utilisateur, **je veux** marquer une tâche comme terminée, **afin de** visualiser mon avancement.

**Critères d’acceptation**
- Une case à cocher permet de basculer l’état de la tâche.
- Une tâche terminée apparaît barrée et le nombre de tâches terminées est mis à jour.
- La tâche peut être remise à faire en décochant la case.

### US-05 — Supprimer une tâche
**En tant qu’** utilisateur, **je veux** supprimer une tâche, **afin de** retirer un élément devenu inutile.

**Critères d’acceptation**
- L’action de suppression enlève la tâche de la liste.
- Le nombre total de tâches est recalculé.
- La suppression est conservée dans le stockage local.

### US-06 — Sauvegarder automatiquement
**En tant qu’** utilisateur, **je veux** que mes changements soient enregistrés automatiquement, **afin de** retrouver mes tâches lors d’une prochaine visite dans le même navigateur.

**Critères d’acceptation**
- La création, la modification, le changement d’état et la suppression mettent à jour `localStorage` sans bouton de sauvegarde.
- Au rechargement de la page, les tâches valides sauvegardées sont restaurées.
- L’application reste utilisable si le stockage local est indisponible ; elle avertit alors que les changements ne seront pas conservés.

## Bonus

### US-07 — Trier les tâches
**En tant qu’** utilisateur, **je veux** trier les tâches par priorité ou par échéance, **afin de** choisir ce qui mérite mon attention en premier.

**Critères d’acceptation**
- Le contrôle de tri propose au minimum priorité et échéance, en plus de l’ordre récent.
- Le tri par priorité place haute avant moyenne puis basse.
- Le tri par échéance place les dates les plus proches en premier et les tâches sans date à la fin.
- Le tri ne modifie ni ne supprime les tâches enregistrées.

### US-08 — Filtrer par statut
**En tant qu’** utilisateur, **je veux** filtrer les tâches selon leur statut, **afin de** me concentrer sur les tâches à faire ou de revoir celles terminées.

**Critères d’acceptation**
- Les filtres « Toutes », « À faire » et « Terminées » sont disponibles.
- « À faire » n’affiche que les tâches non terminées ; « Terminées » n’affiche que les tâches terminées.
- Changer de filtre ne modifie pas le statut des tâches.
