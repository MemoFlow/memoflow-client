# Brief SEO : rapport ou mémoire d'alternance (A4)

Relevé du 06/11/2026. Mode : nouvelle page. Slug : `/blog/rapport-ou-memoire-d-alternance/`. Pilier `rapport-d-alternance`, spoke, CTA `generique`.

**SERP revérifiée** avec WebSearch (2 requêtes : « différence rapport et mémoire d'alternance », « mémoire professionnel vs rapport d'alternance différence consignes »). Moteur basé US, résultats en français : approximation de google.fr. Les PDF ont été téléchargés puis lus avec `pdftotext`, parce que WebFetch ne sait pas en extraire le texte (même méthode que la relecture pilote).

**Source écartée** : le guide méthodologique du pôle transports de la fac de droit d'AMU (`pole-transports-facdedroit.univ-amu.fr/.../memoires_methodologie_v2_0.pdf`), sorti en 1re position sur la 2e requête et cité par le cluster. Il renvoie **404** le 06/11/2026 (WebFetch et curl). Son contenu (rapport d'alternance en deux volets, rapport d'activité + mémoire professionnel) n'est connu que par l'extrait du moteur, donc il ne se cite pas. AMU reste représentée par la fiche du master STAPS Management du sport. Le PDF « Mémoire d'alternance » de l'IAE Savoie Mont Blanc (cluster) renvoie aussi 404.

## Content Brief : différence rapport et mémoire d'alternance

### Search Intent
Informationnelle, explication-comparaison. L'alternant (L3 à M2) a reçu une consigne qui dit « rapport », « mémoire », « mémoire professionnel » ou « dossier » et veut savoir ce que ça change pour lui : faut-il une problématique, des lectures, combien de pages, qui note. La SERP ne sert aucune page qui compare les deux pour l'alternance : un article L'Étudiant de 2007 (mémoire vs rapport de stage), AuFutur (rapport d'alternance seul), et des PDF d'écoles. Format récompensé : réponse courte + tableau comparatif.

### Competitor Analysis
| # | URL | Key H2 Sections | Est. Words | Score | Main Gap |
|---|-----|-----------------|------------|-------|----------|
| 1 | letudiant.fr/etudes/memoire-et-rapport-de-stage-quelles-differences-1.html | Pas de H2 ; H3 « Les rapports de stage », « Les mémoires » ; typologie (rapport simple, de recherche, de synthèse ; mémoire de compilation, de recherche, de terrain) | ~1 050 | 18/40 (D5 F4 S5 U4) | Publié le 21/05/2007, jamais mis à jour. Ne parle ni d'alternance ni de mémoire professionnel. Aucune consigne d'école citée |
| 2 | aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/ | Définition, éléments du rapport, conseils | ~2 200 | 19/40 | Ne compare pas avec le mémoire (relevé `flow-find.md`) |
| 3 | inspe.univ-poitiers.fr, guide M2 IPHD 2023-2024 (PDF) | UE5 rapport de stage ou d'alternance ; UE6 mémoire de recherche | ~11 000 | 22/40 en contenu | Propre à un master ; la distinction est là mais éclatée sur 40 pages |
| 4 | univ-reunion.fr, guide du mémoire professionnel M2 Économie (PDF) | Qu'est-ce qu'un mémoire professionnel ; fond ; forme ; soutenance ; critères | ~13 000 | 24/40 en contenu | Une seule formation ; ne dit rien du rapport d'alternance |
| 5 | isf.assas-universite.fr, cahier des charges du mémoire d'alternance (PDF) | Préambule ; coordination ; méthodes ; plan ; confidentialité ; évaluation ; soutenance | ~4 200 | 25/40 en contenu | Une seule formation, pas de comparaison |

Exclus : core.ac.uk, numerev, loterre (académique hors intention), guru99 et eastondev (mémoire informatique, homonymie).

### Content Gaps and Opportunities
- **Topic gap, le plus net** : personne ne compare rapport et mémoire **d'alternance**. L'Étudiant compare mémoire et rapport de stage, avant l'essor de l'apprentissage dans le supérieur.
- **Quality gap** : la frontière n'est pas nette, et aucun concurrent ne le dit. À Poitiers, le rapport d'alternance est « problématisé », avec une bibliographie APA. ICN demande une bibliographie dans ses rapports. Le comparatif doit montrer un dégradé, sans opposition caricaturale.
- **Topic gap** : les noms. Le Cnam intitule « Expérience professionnelle et rapport d'activité » une unité qui prépare un mémoire professionnel. ICN demande un rapport de projet en entreprise aux apprentis de PGE2, puis un mémoire de fin d'études en PGE3. AMU (master Management du sport) prévoit pour les alternants un « dossier personnel d'alternance ». Poitiers fait rendre les deux écrits dans le même M2.
- **Depth gap** : chiffres de longueur et de notation, sourcés. Rapport : 15-20 p. (Grenoble), une vingtaine (ICN), 20-26 (Poitiers). Mémoire : 30 ± 3 à 6 (La Réunion), 30-50 (Assas), 35/40 minimum (Gustave Eiffel), 10 000 mots (Lyon 3). Notation Assas 30/50/20 ; entreprise « enveloppe de 6 points » à Gustave Eiffel.
- **Variante rapport de stage vs rapport d'alternance** : Poitiers évalue stagiaires et alternants « sur les mêmes attentes et avec les mêmes critères ». Une phrase suffit.

Priorité : 1. réponse + tableau, 2. noms qui varient, 3. problématique et bibliographie, 4. questions à poser.

### Winning Outline

**H1 (title) :** Rapport ou mémoire d'alternance : quelle différence ?
**URL Slug :** /blog/rapport-ou-memoire-d-alternance/
**Target Word Count :** ~1 400 mots (concurrent éditorial : ~1 050 ; cluster : 1 200). Le tableau et les noms qui varient justifient un peu plus.

**Chapô, sans H2 (~80 mots), FS target** : rapport = rendre compte des missions ; mémoire = répondre à une question tirée des missions, avec problématique, lectures et méthode. Fourchettes de longueur sourcées. Les noms varient, ta consigne prime. Mot-clé principal dans la 1re phrase. Lien hub tôt (dans le 2e paragraphe).

**H2 1 — Ce qui sépare un rapport d'un mémoire d'alternance (~250 mots)**, FS target
Utile seul (CTA juste après). Rapport : Grenoble « exercice de synthèse », ICN (entreprise, missions, résultats, recul). Mémoire : citations Assas, La Réunion, Lyon 3, Cnam, AMU (« Ce que le mémoire n'est pas »). Finir sur une phrase qui amène l'écriture section par section sans contredire le CTA générique.

**H2 2 — Rapport et mémoire d'alternance, critère par critère (~300 mots)**
Tableau 3 colonnes : critère / rapport / mémoire. Lignes : finalité, problématique, lectures et bibliographie, longueur, plan type, qui note, soutenance. Une phrase de méthode avant (documents publics lus le 06/11/2026). Liste des sources après.

**H2 3 — Faut-il une problématique dans un rapport d'alternance ? (~180 mots)**
Mémoire : toujours (Gustave Eiffel « obligatoirement », Assas, La Réunion, Lyon 3). Rapport : parfois (Poitiers « problématisé », Grenoble S3 « le contexte et/ou la problématique »). Lien latéral vers `/blog/problematique-memoire-alternance/`.

**H2 4 — Quelle place pour les lectures et la bibliographie ? (~170 mots)**
Assas : « Un mémoire sans références bibliographiques n'a pas sa place parmi les documents universitaires ». La Réunion : revue de la littérature. AMU : cadre théorique, revue de littérature. Côté rapport : ICN et Poitiers demandent aussi une bibliographie. Écart = le rôle des lectures.

**H2 5 — Combien de pages, et qui note ? (~200 mots)**
Liste des longueurs. Notation : Assas 30/50/20 ; Gustave Eiffel 6 points pour l'entreprise ; La Réunion jury des deux tuteurs ; rapport ICN et Grenoble (renvoi au hub pour le détail).

**H2 6 — Mémoire professionnel, rapport d'activité, dossier : les noms changent selon l'école (~220 mots)**
Cnam UADR17, ICN, AMU, Poitiers (deux écrits la même année), Paris 1 (« mémoire professionnel (alternance ou stage) »). Rapport de stage vs rapport d'alternance : Poitiers, mêmes critères. Message : lire sa consigne, pas l'intitulé.

**H2 7 — Comment savoir ce que ton école attend ? (~120 mots)**
Checklist de 5 questions. Lien vers `/blog/rediger-un-memoire/` pour la méthode du mémoire.

Pas de FAQ : les H2 sont des questions ou y répondent.

### Recommended Meta Tags

**Title**
Rapport ou mémoire d'alternance : quelle différence ? (52 caractères ; « mémoire » qualifié par « d'alternance »)

**Meta Description**
Problématique, bibliographie, pages, notation : les consignes de 11 formations comparées (Assas, Cnam, AMU, Lyon 3…). Lis ensuite les tiennes. (142 caractères)

### Unique Angle and Information Gain
Le seul comparatif rapport / mémoire écrit pour l'alternance, appuyé sur les consignes publiques de 11 formations lues et datées. Il montre que la frontière dépend de l'école : un rapport d'alternance peut être problématisé et sourcé (Poitiers, ICN), une unité « rapport d'activité » peut être un mémoire (Cnam). L'Étudiant oppose les deux en 2007 sans une seule consigne citée.

### E-E-A-T Requirements
- Auteur nommé (François Hatem), bio à fournir (`[BIO À FOURNIR]`, bloquant connu de la relecture pilote).
- Chaque chiffre et chaque citation renvoie au document de l'école, nommé dans la phrase.
- Date de relevé visible (6 novembre 2026), `dateModified` à jour.
- Aucune expérience inventée.

### Internal Linking Opportunities
- Hub : `/blog/rapport-d-alternance/`, ancre « rapport d'alternance » (chapô, obligatoire).
- `/blog/problematique-memoire-alternance/`, ancre « trouver la problématique de ton mémoire d'alternance » (H2 3).
- `/blog/rediger-un-memoire/`, ancre « rédiger un mémoire » (H2 7).
- Pas plus de 2 latéraux : `/blog/retrouver-ses-missions-alternance/` est déjà poussé par le hub.

## Passe seo-geo (06/11/2026, brouillon)
Périmètre : contenu seulement. Robots, rendu serveur et schema relèvent du socle déjà audité (gate `/seo audit`), donc pas de GEO-ANALYSIS.md séparé.
- Réponse directe dans les 60 premiers mots, avec les deux définitions et les fourchettes de longueur : OK.
- Tableau comparatif sourcé, H2 en questions sauf le tableau et les noms : OK.
- Corrigé : 7 ouvertures de passage disaient « le rapport » ou « le mémoire » sans qualificatif. Extraites seules, elles perdaient l'entité ; elles disent maintenant « rapport d'alternance » ou « mémoire d'alternance ».
- Non tenu : aucun signal d'expérience de première main tant que la bio de l'auteur manque (bloquant connu du pilote).
