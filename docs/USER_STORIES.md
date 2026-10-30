# 💬 TaskFlow — Journal des Prompts

Ce fichier consigne les interactions clés menées avec l'intelligence artificielle lors de la conception du projet **TaskFlow**. 

> **Rappel de la philosophie du projet :**  
> *L’IA propose, c’est nous qui décidons.* Les outils d’IA aident à formuler et structurer, mais les choix finaux, l'arbitrage et la vérification appartiennent entièrement au binôme.

---

## 📋 Tableau de bord des interactions

| N° & Sujet | Prompt adressé à l’IA | Résumé de la réponse de l’IA | Décision | Justification & Retours du binôme |
| :---: | :--- | :--- | :---: | :--- |
| **01**<br>✨ **User stories** | *« Propose six user stories pour une application étudiante de gestion de tâches, puis deux idées bonus pour le tri et les filtres. »* | Une proposition de huit stories : créer, afficher, modifier, terminer, supprimer et sauvegarder des tâches, puis les trier et les filtrer. | 🔄 **Reformulé** | On a gardé les idées utiles, puis on a adapté les formulations pour qu'elles collent parfaitement à notre vision du projet. |
| **02**<br>🎯 **Critères d'acceptation** | *« Donne des critères simples pour créer une tâche avec un titre, une priorité et une échéance facultative. Pense aussi au titre vide. »* | Des critères pour accepter les champs, afficher la tâche et refuser un titre vide. | ✅ **Gardé** | Ces critères sont faciles à vérifier. On les a ajoutés à la story en les ajustant au reste du document. |
| **03**<br>🗂️ **Structure de données** | *« Quelles informations minimales faut-il garder pour une tâche ? Pas de code. »* | L’IA propose un identifiant, un titre, une priorité, une échéance facultative, un statut, et suggère une date de création. | 🔄 **Reformulé** | C’est une piste précieuse pour plus tard. On vérifiera les champs strictement nécessaires avant de figer le modèle final. |
| **04**<br>📊 **Priorisation MoSCoW** | *« Classe les fonctions avec MoSCoW pour qu’on commence par un petit socle utile. »* | Les fonctions de base sont classées comme indispensables (*Must have*) ; le tri et les filtres sont proposés en bonus (*Nice to have*). | ✅ **Gardé** | Cela correspond exactement à notre découpage entre socle et bonus. On pourra réajuster l’ordre si le timing devient serré. |
| **05**<br>🔍 **Relecture critique** | *« Relis nos user stories et signale les phrases floues ou difficiles à vérifier, sans ajouter de fonctions. »* | L’IA relève des questions sur la gestion des dates, le stockage local et la distinction entre trier et modifier une tâche. | 🔄 **Reformulé** | On a exploité ces remarques pertinentes pour affiner et clarifier nos critères, sans élargir le périmètre initial. |
| **06**<br>❌ **Idées hors périmètre** | *« Ajoute des comptes utilisateurs, une synchronisation cloud, des notifications et des statistiques. »* | L’IA détaille la mise en place de comptes, de services en ligne et d'une architecture backend. | ❌ **Rejeté** | C’est beaucoup trop ambitieux pour notre version étudiante. On reste volontairement sur une application locale simple et maîtrisée. |
| **07**<br>📂 **Architecture fichiers** | *« Quelle architecture de fichiers pour le dépôt ? (README.md, PROMPTS.md, éventuellement dossier si utile) »* | L’IA suggère de commencer avec un README pour le projet et ses stories, et un PROMPTS pour les échanges. Un sous-dossier n'est pas nécessaire. | ✅ **Gardé** | C’est simple et amplement suffisant pour l'étape documentaire actuelle. L'arborescence évoluera lors de l'implémentation du code. |
| **08**<br>⚙️ **Commandes Git** | *« Comment déposer le projet sur Git (git init, add, commit, remote, push) ? »* | L’IA propose les étapes : initialisation, ajout des fichiers, commit, configuration du dépôt distant et envoi des modifications. | 🔄 **Reformulé** | Les grandes étapes donnent une bonne vue d’ensemble, mais nous devons impérativement utiliser l’adresse de notre dépôt et les consignes du cours. |
| **09**<br>📝 **Rendu & Vérification** | *« Qu’est-ce qu’on doit faire exactement pour le rendu / les étapes à suivre ? »* | L’IA propose une liste de vérification : relecture des stories, normalisation des noms, contrôle des fichiers et suivi des consignes académiques. | 🔄 **Reformulé** | Cette to-do list aide à structurer notre démarche, mais elle ne remplace pas les consignes officielles. C'est à nous de valider chaque livrable. |

---

## 📌 Bilan des choix techniques et méthodologiques

- **Autonomie de décision :** Aucune proposition de l'IA n'a été intégrée aveuglément ; chacune a fait l'objet d'un arbitrage au sein du binôme.
- **Maîtrise du périmètre :** Le rejet des fonctionnalités cloud et des comptes utilisateurs (Prompt 06) illustre notre volonté de garder un projet réaliste, fonctionnel et livrable dans les temps impartis.