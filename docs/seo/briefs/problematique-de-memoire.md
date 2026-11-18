# Brief B4 : problématique de mémoire

Relevé du 06/11/2026. Mode : nouvelle page. Pilier `rediger-un-memoire`, sous-hub du cluster `docs/seo/clusters/problematique.md`, verdict SXO n°4 (`docs/seo/sxo.md`).

**Limite de la SERP.** Deux recherches WebSearch (index US, résultats francophones), pas de google.fr, pas de PAA ni d'AI Overview. Elles confirment le relevé du cluster : digischool.fr, letudiant.fr (deux pages), Scribbr en PDF, puis des cours universitaires en PDF ou Moodle (Algérie surtout, UNIL, Paris-Saclay, USMB). Les sources ont été ouvertes avec WebFetch ; pour les PDF que WebFetch ne sait pas lire, le texte a été extrait avec `pdftotext` (même méthode que la relecture du pilote). Le guide du M2 Droits africains de Paris 1 dépasse la taille limite de WebFetch : écarté des sources.

## Content Brief : problématique de mémoire

### Search Intent
Informationnelle large, en trois temps : comprendre ce qu'est une problématique de mémoire, la trouver, voir des exemples pour vérifier la sienne. La SERP récompense l'article-liste d'exemples et l'article de méthode avec quelques exemples. Lecteur : L3-M2, souvent alternant ou stagiaire en école de commerce ou en fac de gestion/droit, qui a un thème mais pas de question, ou une question que son directeur a renvoyée. L'autocomplétion pousse vers « exemple dans ma filière » (contrôle de gestion, immobilier, stage).

### Competitor Analysis
| # | URL | Key H2 Sections | Est. Words | Score | Main Gap |
|---|-----|-----------------|------------|-------|----------|
| 1 | scribbr.fr/memoire/exemples-de-problematique/ (relevé SXO) | Paires sujet / problématique par discipline | ~4 000 | 27/40 | Volume sans méthode ni critère ; aucun avant/après ; 2021 |
| 2 | letudiant.fr/…/comment-poser-une-problematique-de-memoire-de-master-1.html | Définition, pourquoi, comment, 5 exemples, conseils | ~800 | 22/40 | Exemples isolés, pas de méthode pas à pas, « question ouverte » posée sans nuance |
| 3 | letudiant.fr/…/la-checklist-pour-rediger-une-problematique-de-memoire-pertinente.html | 6 checkpoints, 3 exemples | ~1 300 | 23/40 | Impose la question fermée, contredit l'autre page du même site ; 2022 |
| 4 | digischool.fr/articles/master/comment-formuler-ta-problematique-de-memoire/ | Définition, méthode, 4 exemples | ~700 | 20/40 | Exemples hors cible (astronomie, littérature), court |

### Content Gaps and Opportunities
- **Topic gap** : aucun concurrent ne montre d'avant/après. Le guide du M1 CIME de Paris 8 le fait sur trois questions (« trop larges, trop vagues ») : on le cite, puis on applique la même méthode à nos exemples.
- **Topic gap** : la divergence question ouverte / fermée. L'Etudiant dit « ouverte » (Damie, 2025), la checklist L'Etudiant-Superprof dit « fermée » (2022), le guide L3 droit de Paris-Saclay dit « peut être » fermée. Trancher : les deux formes passent, ce qui compte est la précision. Passage très citable.
- **Depth gap** : la distinction problématique / question de recherche / hypothèse est floue partout. Le guide du mémoire MEEF de l'UGA (nov. 2023) la pose nettement : synthèse de la littérature, puis question, puis hypothèse « comme réponse attendue ».
- **Quality gap** : exemples de filières hors cible. Ici : gestion, contrôle de gestion, marketing, RH, droit, finance, immobilier, communication, informatique, tous annoncés comme exemples fictifs.
- **Gap cible** : l'alternant. Traité dans `/blog/problematique-memoire-alternance/` : ici un paragraphe et un lien.

### Winning Outline

**H1 (title du gabarit)** : Problématique de mémoire : méthode, exemples, checklist
**URL Slug** : /blog/problematique-de-memoire/
**Target Word Count** : ~2 200 mots (concurrents éditoriaux : ~700 à 1 300 ; Scribbr ~4 000 en liste brute). Pas de remplissage : la longueur vient des exemples.

- **Chapô (sans H2, ~80 mots)** : définition en 2-3 phrases (la question à laquelle ton mémoire répond, dont découlent plan et parties) + promesse : méthode en 5 étapes, exemples par filière, checklist. Lien hub `/blog/rediger-un-memoire/` dès le 2e paragraphe. Mot-clé principal dans la 1re phrase. FS target (définition).
- **H2 Qu'est-ce qu'une problématique de mémoire ? (~250 mots)** : la question centrale + exemple Paris 8 « toutes les questions ne sont pas des problématiques » + elle se place dans l'introduction et commande le plan (Paris 8 : introduction, « Pour répondre à cette problématique… »). Lien `/blog/plan-de-memoire/`. Finit sur : chaque partie répond à un morceau de la question → amène le CTA « section par section ».
- **H2 Problématique, question de recherche, hypothèses : la différence (~200 mots)** : section courte, source UGA MEEF. Petit tableau 3 lignes (ce que c'est, où ça se place, exemple fictif). FS target.
- **H2 Comment trouver ta problématique de mémoire en 5 étapes (~550 mots)** : liste numérotée. 1. Thème → 2. sujet délimité (USMB : « du thème au sujet, du sujet à la problématique » ; Paris 1 écarté) → 3. lire et noter les tensions, ce qui manque (UGA : la littérature fait apparaître manques et limites) → 4. écrire plusieurs questions, en garder une → 5. valider avec le directeur (Saclay : sujet validé par le directeur ; L'Etudiant : « Formulez différentes questions possibles… »). Un fil rouge fictif (marketing) traverse les 5 étapes.
- **H2 Question ouverte ou fermée ? (~180 mots)** : la divergence, tranchée. Sources L'Etudiant ×2, Saclay, Paris 8 (une reformulation fermée est validée).
- **H2 Exemples de problématique de mémoire par filière (~600 mots)** : annoncés fictifs. H3 par filière (gestion/contrôle de gestion, marketing, RH, droit, finance, immobilier, communication, informatique). Pour chacune : sujet, version faible, version reformulée, pourquoi. Format liste courte, pas de tableau (lisible mobile).
- **H2 Et si tu es en alternance ? (~90 mots)** : un paragraphe, lien `/blog/problematique-memoire-alternance/`, renvoi éventuel à `/blog/rapport-ou-memoire-d-alternance/`.
- **H2 Checklist : ta problématique tient-elle la route ? (~200 mots)** : 8 cases à cocher, critères sourcés (Saclay : met en lien des concepts, simple, précise, concise, cohérente, originale ; L'Etudiant : un seul problème ; Paris 8 : ni trop large ni vague ; UGA : on peut y répondre avec les données).
- **H2 Les erreurs qui font renvoyer une problématique (~150 mots)** : confondre thème et problématique, question descriptive, question trop large, question sans réponse possible avec tes moyens. Lien `/blog/ia-memoire/` : la charte de Lorraine range « Propose-moi une problématique et des hypothèses » parmi les mauvais usages (déjà vérifié au pilote D1) → ne pas le citer sans la source, donc ne lier que vers le hub IA sans rapporter la charte. Fin : ligne d'action.

Mot-clé principal : title, chapô, H2 n°1 et n°3, une fois dans « exemples ». Secondaires : trouver sa problématique, exemple de problématique de mémoire, question de recherche, hypothèses, question ouverte ou fermée, problématique trop large, directeur de mémoire.

### Recommended Meta Tags

**Title** : Problématique de mémoire : méthode, exemples, checklist (55 car.)

**Meta Description** : Trouve ta problématique de mémoire en 5 étapes, avec des exemples avant/après par filière (gestion, marketing, RH, droit, finance) et une checklist. (≤ 160 car.)

### Unique Angle and Information Gain
Des exemples avant/après par filière de la cible (gestion, RH, immobilier, droit…) au lieu d'une liste brute, construits avec la règle de reformulation d'un guide d'université (Paris 8), et la contradiction ouverte/fermée tranchée avec quatre sources datées. Distinction problématique / question / hypothèse posée en trois lignes sur un guide de master (UGA).

### E-E-A-T Requirements
- Auteur nommé (gabarit), date du 06/11/2026.
- Chaque règle attribuée à un établissement nommé et daté dans le texte.
- Exemples annoncés comme fictifs.
- Aucune expérience inventée ; MemoFlow : CTA générique seulement, aucune mention dans le corps (rien dans product-facts sur la problématique).

### Internal Linking Opportunities
- `/blog/rediger-un-memoire/` (hub, obligatoire) : ancre « rédiger un mémoire », chapô.
- `/blog/plan-de-memoire/` : ancre « plan de mémoire », section 1.
- `/blog/problematique-memoire-alternance/` (obligatoire) : ancre « problématique de mémoire d'alternance ».
- `/blog/rapport-ou-memoire-d-alternance/` : dans le paragraphe alternance.
- `/blog/ia-memoire/` : section erreurs, une ligne.

## Sources retenues
1. Université Paris 8, IEE, Guide de rédaction du mémoire de Master 1 CIME (2019-2020) — non-problématiques et reformulations, place dans l'introduction.
2. Université Paris-Saclay, Faculté Jean Monnet, Guide méthodologique du mémoire de L3 mention droit — critères d'une bonne problématique, question fermée possible, validation du sujet.
3. Université Grenoble Alpes, Guide du mémoire Master MEEF (nov. 2023) — problématique, question, hypothèse.
4. Université Savoie Mont Blanc, IAE, fiche Workshop mémoire (maj 10/12/2024) — « Du thème au sujet, du sujet à la problématique ».
5. L'Etudiant, Comment poser une problématique de mémoire de master 1 (maj 06/02/2025) — question ouverte, plusieurs questions à discuter avec le directeur.
6. L'Etudiant et Superprof, La checklist pour rédiger une problématique de mémoire pertinente (22/06/2022) — question fermée.
