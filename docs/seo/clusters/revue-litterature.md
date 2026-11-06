# Grappe SEO : revue de littérature

Seed : « revue de littérature ». Variantes : état de l'art, partie théorique du mémoire, trouver des sources.
Marché : France, français, google.fr. Relevé du 06/11/2026.
Faits produit : `docs/seo/product-facts.md` uniquement.

## À lire avant d'exploiter ce plan

- **Pas de volumes.** Aucun outil payant (pas de DataForSEO, Ahrefs, SE Ranking, Firecrawl). Les priorités viennent de l'intention et de ce que montre la SERP, jamais d'un volume estimé.
- **SERP approchée.** Le WebSearch disponible tourne depuis les États-Unis et n'est pas un google.fr. Les URLs citées sont celles qu'il a renvoyées pour des requêtes en français. Elles donnent une bonne idée du type de page qui répond, pas un classement google.fr. Scribbr.fr, qui sort probablement sur google.fr, n'est pas apparu : à vérifier à la main avant rédaction.
- **21 SERP relevées**, puis le quota de recherche partagé entre agents a été épuisé. Le recouvrement a été mesuré sur les URLs exactes visibles dans chaque résultat (jusqu'à 10 à 18 URLs). Les seuils de la méthode (7+ fusion, 4-6 même grappe, 2-3 maillage) n'ont jamais été atteints au-delà de 3 : la SERP est très éclatée. Les regroupements combinent donc recouvrement mesuré et règle de la méthode (« variantes longue traîne d'une même tête = même grappe »).
- **Autocomplete et PAA** : WebSearch ne les expose pas. Les variantes viennent des pistes de recherche connexes renvoyées et des questions récurrentes dans les pages vues.

## Ce que dit la SERP

Le type de page dominant, sur presque toutes les requêtes, est **le PDF ou le cours d'université** : ULiège (orbi), UVSQ (HAL), HES-SO, Laval, Polytechnique Montréal, beaucoup de Moodle algériens. Peu d'articles de blog éditoriaux, et quand il y en a ce sont des acteurs étudiants généralistes (letudiant.fr, student.be, digischool, diplomeo) ou des outils IA (papersflow.ai/fr).

Conséquence : la concurrence éditoriale est faible, mais Google récompense la profondeur méthodologique. Un article léger ne battra pas un cours de 30 pages de l'ULiège. Il faut des pages qui font le travail du cours en plus court et plus concret : exemples, modèles, étapes.

Deuxième signal : sur « revue de littérature mémoire », des annonces de services payants (comeup.com) sortent dans le top. L'intention « qu'on m'aide à la faire » existe. C'est l'angle MemoFlow, à condition de rester dans les faits vérifiés.

## Ce que MemoFlow peut dire (et ne pas dire) sur ce sujet

Affirmable, d'après `product-facts.md` :
- Le centre de contexte permet d'ajouter des fichiers de recherche.
- Option « Imposer le style de citation Harvard ».
- Espace d'écriture organisé en sections, sauvegarde automatique.
- Le planificateur génère un plan à partir du contexte et l'ajoute comme section.

Interdit : MemoFlow ne cherche pas de sources, ne vérifie pas leur fiabilité, ne fait pas de fiche de lecture automatique, ne gère pas APA ni ISO 690, ne détecte pas le plagiat. Rien de tout cela n'est vérifié. Les CTA doivent porter sur « range tes lectures dans le centre de contexte, puis fais générer le plan de ta partie théorique », pas sur la recherche documentaire.

## Architecture

Un pilier, quatre grappes, 14 articles satellites.

```
Pilier : revue de littérature (guide complet)
├── A. Comprendre et structurer
│   ├── A1 état de l'art (définition, différence)
│   ├── A2 exemple de revue de littérature
│   ├── A3 plan d'une revue de littérature
│   └── A4 types de revue (narrative, systématique, PRISMA)
├── B. La partie théorique du mémoire
│   ├── B1 partie théorique du mémoire
│   ├── B2 cadre théorique
│   └── B3 revue de littérature en mémoire d'alternance
├── C. Trouver les sources
│   ├── C1 trouver des sources pour son mémoire
│   ├── C2 moteurs de recherche académiques
│   ├── C3 sources fiables
│   └── C4 équation de recherche
└── D. Lire et synthétiser
    ├── D1 fiche de lecture d'un article scientifique
    ├── D2 tableau de synthèse
    └── D3 IA pour la revue de littérature
```

Slugs au format `/blog/<slug>`, cohérent avec les autres grappes.

### Pilier

**Revue de littérature : définition, méthode en 5 étapes et exemple**
- Requête cible : revue de littérature
- Fusionnées dans la même page : comment faire une revue de littérature, revue de littérature mémoire, rédiger une revue de littérature, revue de littérature combien de pages, où placer la revue de littérature (ces deux dernières en FAQ : la SERP renvoie des consignes d'établissement contradictoires, 7-9 pages à Reims, 15-20 à Ottawa, ce qui justifie une FAQ et pas un article)
- Intention : informationnelle large
- Type de page dominant : cours ou guide universitaire en PDF
- Concurrents vus :
  - https://hal.uvsq.fr/hal-02988035/document
  - https://orbi.uliege.be/bitstream/2268/257931/1/Redac_memoire_5mars2021.pdf
  - https://fluxdeconnaissances.com/information/page/read/130585-comment-faire-une-revue-de-litterature-pour-un-memoire
  - https://papersflow.ai/fr/blog/comment-rediger-une-revue-de-litterature
- Slug : `/blog/revue-de-litterature`
- Gabarit : guide complet, 2 500 à 3 500 mots
- Points à couvrir : ce n'est pas un résumé d'articles (analyse puis synthèse) ; elle fait apparaître les manques qui justifient le mémoire ; la problématique en découle ; 5 étapes (question, recherche, tri, lecture, rédaction thématique) ; FAQ longueur et place.

### Grappe A. Comprendre et structurer

**A1. État de l'art : définition, différence avec la revue de littérature, exemple**
- Requête cible : état de l'art mémoire
- Secondaires : différence revue de littérature et état de l'art, état de l'art exemple
- Intention : informationnelle (définition)
- Type dominant : cours universitaire (docx, PDF)
- Concurrents vus :
  - https://orbi.uliege.be/bitstream/2268/306853/1/R%c3%a9aliser%20un%20%c3%a9tat%20de%20l%27art%20Pr%c3%a9sentation%20-%20Exercices%20-%20Antoine%20DENIS.docx
  - https://cyberlearn.hes-so.ch/pluginfile.php/530023/mod_resource/content/1/Article%201%20%20Revue%20de%20la%20litt%C3%A9rature%20-%20%C3%A9tat%20de%20lart.pdf
  - https://thedre.imag.fr/wp-content/uploads/2025/10/V7_Construire_structurer_etat_art.docx
- Slug : `/blog/etat-de-l-art-memoire`
- Recouvrement : 2 URLs partagées avec le pilier (orbi.uliege) → page distincte, maillage fort. La SERP « état de l'art mémoire exemple » est polluée par « l'art de la mémoire » (mnémotechnie) : garder « mémoire de fin d'études » dans le title.

**A2. Exemple de revue de littérature commenté (modèle à reprendre)**
- Requête cible : exemple de revue de littérature
- Secondaires : revue de littérature exemple pdf, modèle revue de littérature
- Intention : informationnelle (exemple), forte attente de document téléchargeable
- Type dominant : PDF de cours, aucun modèle complet en français dans le top
- Concurrents vus :
  - https://cyberlearn.hes-so.ch/pluginfile.php/530020/mod_resource/content/3/Cours%20Etat%20de%20la%20litte%CC%81rature.pdf
  - https://annualreport.r4d.org/wp-content/uploads/Guide-for-conducting-a-literature-review-FR.pdf
  - https://ecampusontario.pressbooks.pub/competencesavanceesenrecherche/chapter/revues-de-la-litterature/
- Slug : `/blog/exemple-revue-de-litterature`
- Angle : un vrai extrait rédigé (2 pages) sur un sujet de mémoire de gestion, annoté paragraphe par paragraphe. C'est le trou de la SERP.

**A3. Plan d'une revue de littérature : thématique, chronologique ou méthodologique**
- Requête cible : plan revue de littérature
- Secondaires : structurer une revue de littérature, revue de littérature thématique
- Intention : informationnelle (how-to)
- Type dominant : guides anglophones (Grad Coach) et un PDF CIRAD. Peu de français.
- Concurrents vus :
  - https://gradcoach.com/how-should-i-structure-my-literature-review
  - https://collaboratif.cirad.fr/alfresco/s/d/workspace/SpacesStore/22aac5a1-9e55-4e30-83b3-1c70fd9c8a1d/rédiger-un-article-de-synthèse-2019.pdf
  - https://answerthis.io/blog/literature-review-structure-strategic-guide-organizing-research
- Slug : `/blog/plan-revue-de-litterature`
- Lien produit possible : le planificateur génère un plan à partir du contexte (fait vérifié). Ne pas promettre qu'il produit un plan thématique de revue.

**A4. Types de revue de littérature : narrative, systématique, scoping (et PRISMA)**
- Requête cible : types de revue de littérature
- Secondaires : revue systématique, revue narrative, méthode PRISMA
- Intention : informationnelle (explainer)
- Type dominant : guides de bibliothèques québécoises, documents santé
- Concurrents vus :
  - https://www.bibl.ulaval.ca/fichiers_site/portails/education/comparaison-des-types-de-revues-de-litt%C3%A9rature-final.pdf
  - https://www.inspq.qc.ca/publications/2780
  - https://moodle.univ-lyon1.fr/pluginfile.php/2476697/mod_page/content/4/PRISMA.pdf
- Slug : `/blog/types-revue-de-litterature`
- Priorité basse : public M2 recherche et santé, loin du cœur alternant. PRISMA reste une section, pas un article.

### Grappe B. La partie théorique du mémoire

**B1. Partie théorique du mémoire : comment la rédiger**
- Requête cible : partie théorique mémoire
- Secondaires : rédiger la partie théorique, première partie mémoire théorique
- Intention : informationnelle (how-to)
- Type dominant : supports de cours (Algérie surtout), un PDF Scribbr, quelques sites étudiants
- Concurrents vus :
  - https://cdn.scribbr.com/wp-content/uploads/2020/06/Comment-rédiger-un-mémoire-_.pdf
  - https://diplomeo.com/actualite-comment_rediger_un_memoire
  - https://ds.univ-oran2.dz:8443/bitstream/123456789/4627/1/polycopi%c3%a9%20Methodologie%20de%20la%20recherche%20et%20PV%20de%20CS.pdf
- Slug : `/blog/partie-theorique-memoire`
- Pourquoi en tête : la SERP n'a aucune page française dédiée et bien faite. C'est la requête la plus proche du blocage « structurer » et « rédiger » de l'onboarding.

**B2. Cadre théorique : définition, rôle et exemple**
- Requête cible : cadre théorique mémoire
- Secondaires : cadre théorique définition, cadre conceptuel
- Intention : informationnelle (définition)
- Type dominant : cours universitaires, un site de fiches (StudySmarter), mémoires DUMAS
- Concurrents vus :
  - https://www.studysmarter.fr/resumes/sciences-de-leducation/conception-de-programmes-detudes/cadre-theorique/
  - https://orbi.uliege.be/bitstream/2268/201293/1/Guide%20de%20la%20r%c3%a9daction%20du%20m%c3%a9moire2015.pdf
  - https://elearning-facll.univ-annaba.dz/mod/resource/view.php?id=2494
- Slug : `/blog/cadre-theorique-memoire`
- Recouvrement avec B1 : 1 URL (polycopié Oran). Pages distinctes selon la méthode. Risque de cannibalisation réel, intentions voisines (définir vs rédiger). À fusionner dans B1 si la Search Console montre les deux pages sur les mêmes requêtes.

**B3. Revue de littérature dans un mémoire d'alternance ou professionnel**
- Requête cible : revue de littérature mémoire alternance
- Secondaires : partie théorique mémoire professionnel, cadre théorique rapport d'alternance
- Intention : informationnelle, segment précis
- Type dominant : PDF de formation (AMU, Toulouse, Cnam), une annonce de service payant
- Concurrents vus :
  - https://fss.univ-amu.fr/sites/default/files/media-ressource/MASTER%201%20MS%20-%20S2%20-%20BCC3%20-%20MEMOIRE%20ALTERNANCE.pdf
  - https://dante.univ-tlse2.fr/files/original/0c0d1d769141ee4cfbc55dbb510ef9736d36a4a9.pdf
  - https://comeup.com/fr/service/513532/vous-aider-pour-la-revue-de-litterature-de-votre-memoire
- Slug : `/blog/revue-de-litterature-memoire-alternance`
- Angle : relier la littérature à une mission d'entreprise. C'est le profil n°1 de MemoFlow (alternant). Requête de niche : la SERP est vide d'articles, ce qui signale une faible demande autant qu'une opportunité.

### Grappe C. Trouver les sources

**C1. Trouver des sources pour son mémoire : méthode et nombre de références**
- Requête cible : trouver des sources pour son mémoire
- Fusionnée : combien de sources pour un mémoire (2 URLs partagées, letudiant.fr et unine.ch, et la SERP ne donne aucun chiffre : une section suffit)
- Intention : informationnelle (how-to)
- Type dominant : sites étudiants et guides de BU
- Concurrents vus :
  - https://www.letudiant.fr/etudes/3es-cycles-et-masters/memoire-le-choix-des-sources.html
  - https://www.student.be/fr/student-life/comment-choisir-des-sources-fiables-pour-ton-memoire-ou-ton-tfe
  - https://cdn.univ-lyon2.fr/scd/formdoc/MemoireThese/MemoireThese.pdf
- Slug : `/blog/trouver-des-sources-memoire`
- Points : effet boule de neige des bibliographies, mémoires et thèses existants (DUMAS, theses.fr), parler au bibliothécaire.

**C2. Moteurs de recherche académiques : Google Scholar, Cairn, HAL, Isidore…**
- Requête cible : moteur de recherche académique
- Secondaires : trouver des articles scientifiques gratuits, Google Scholar mémoire, Cairn étudiant
- Intention : informationnelle (liste), légèrement commerciale
- Type dominant : listicles de blogs outils et PDF de BU
- Concurrents vus :
  - https://outilstice.com/meilleurs-moteurs-de-recherche-pour-etudiants/
  - https://tool-advisor.fr/blog/moteur-recherche-academique/
  - https://www.student.be/fr/student-life/ou-trouver-des-articles-scientifiques-pour-un-travail-academique
- Slug : `/blog/moteurs-recherche-academiques`

**C3. Sources fiables : comment vérifier une source pour son mémoire**
- Requête cible : sources fiables mémoire
- Secondaires : comment savoir si une source est fiable, évaluer une source
- Intention : informationnelle (checklist)
- Type dominant : grilles d'évaluation (cégeps, CLEMI), sites étudiants
- Concurrents vus :
  - https://www.student.be/fr/student-life/comment-choisir-des-sources-fiables-pour-ton-memoire-ou-ton-tfe
  - https://www.cegeplimoilou.ca/media/1288682/aide-memoire-evaluation-source_7e-ed.pdf
  - https://www.clemi.fr/sites/default/files/clemi/Dossier%20P%C3%A9dagogique/DP2026/DP2026fichesPDF/SPME2026_p8_%C3%89valuer%20la%20fiabilit%C3%A9%20d'une%20information%20-%20retour%20aux%20sources.pdf
- Slug : `/blog/sources-fiables-memoire`
- Recouvrement avec C1 : 1 URL (student.be). Page distincte. Inclure « vérifier ce que l'IA affirme » (signal vu sur student.be), en renvoyant vers la grappe IA.

**C4. Équation de recherche : mots-clés et opérateurs booléens**
- Requête cible : équation de recherche
- Secondaires : opérateurs booléens recherche documentaire, mots-clés recherche documentaire mémoire
- Intention : informationnelle (how-to)
- Type dominant : fiches méthode de BU (Bordeaux, Littoral, Lyon 1, ULB)
- Concurrents vus :
  - https://bibliotheques.u-bordeaux.fr/download_file/view/62f26c4a-8aa2-4161-bc57-d14a966bf2d3/538
  - https://uv.ulb.ac.be/pluginfile.php/3945414/mod_resource/content/1/equation_recherche_2024.pdf
  - https://methodoc.univ-littoral.fr/wp-content/uploads/2020/10/V2-les-astuces-de-recherche.pdf
- Slug : `/blog/equation-de-recherche`

### Grappe D. Lire et synthétiser

**D1. Fiche de lecture d'un article scientifique (grille et modèle)**
- Requête cible : fiche de lecture article scientifique
- Secondaires : grille de lecture article scientifique, fiche de lecture mémoire
- Intention : informationnelle (modèle)
- Type dominant : modèles universitaires (ULiège en Creative Commons, Paris-Sud)
- Concurrents vus :
  - https://orbi.uliege.be/handle/2268/306855
  - https://www.lri.fr/~waller/cours/fr/mcr/ecrit1.pdf
  - https://elearning.univ-bejaia.dz/mod/resource/view.php?id=387812
- Slug : `/blog/fiche-de-lecture-article-scientifique`
- Attention : « fiche de lecture » seule renvoie surtout aux fiches de lecture de romans (lycée). Toujours qualifier « article scientifique ».

**D2. Tableau de synthèse pour revue de littérature (modèle)**
- Requête cible : tableau de synthèse revue de littérature
- Secondaires : matrice de synthèse, organiser sa revue de littérature sur Excel
- Intention : informationnelle (modèle)
- Type dominant : guides anglophones et pages de modèles spam. Aucune page française vue.
- Concurrents vus :
  - https://usi.libguides.com/literature-review-basics/tables
  - https://www.thebricks.com/resources/guide-how-to-organize-literature-review-in-excel
  - https://annualreport.r4d.org/wp-content/uploads/Guide-for-conducting-a-literature-review-FR.pdf
- Slug : `/blog/tableau-synthese-revue-de-litterature`
- Priorité basse : aucune preuve de demande en français. À garder si on veut un aimant à lien (modèle téléchargeable), sinon section de A2.

**D3. IA pour faire sa revue de littérature : Elicit, Consensus et leurs limites**
- Requête cible : IA revue de littérature
- Secondaires : outil IA revue de littérature gratuit, Elicit avis, Elicit vs Consensus
- Intention : commerciale (comparatif)
- Type dominant : blogs d'éditeurs d'outils IA, souvent concurrents entre eux
- Concurrents vus :
  - https://papersflow.ai/fr/blog/elicit-vs-consensus-ai
  - https://papersflow.ai/fr/blog/meilleures-alternatives-a-elicit-2026
  - https://creati.ai/fr/ai-tools/elicit/
- Slug : `/blog/ia-revue-de-litterature`
- Garde-fous : l'étude CJILS comparant Elicit, SciSpace et Consensus a été rétractée, ne pas la citer. Les offres gratuites changent : vérifier sur les sites officiels à la rédaction. MemoFlow n'est pas un outil de recherche documentaire : le positionner après la recherche (ranger les fichiers dans le centre de contexte, rédiger par sections), jamais comme alternative à Elicit.

## Écartés

- **synthèse documentaire** : la SERP parle de l'épreuve d'examen (DELF, concours), pas du mémoire. Hors intention.
- **Zotero / gestion bibliographique** : porté par la grappe bibliographie (`/blog/zotero-bibliographie-memoire`). Liens sortants depuis C1 et D1.
- **revue de littérature scribbr** : navigationnelle.
- **revue de littérature thèse** : doctorat absent de l'onboarding, hors cible.

## Priorités

Sans volumes, l'ordre combine trois critères : proximité avec le public de l'onboarding (alternant, L3-M2), faiblesse éditoriale de la SERP, possibilité d'un lien produit vérifié.

1. Pilier `/blog/revue-de-litterature`
2. B1 `/blog/partie-theorique-memoire`
3. C1 `/blog/trouver-des-sources-memoire`
4. A1 `/blog/etat-de-l-art-memoire`
5. B3 `/blog/revue-de-litterature-memoire-alternance`
6. A2 `/blog/exemple-revue-de-litterature`
7. D1, B2, C2, A3, D3
8. C3, C4
9. A4, D2 (preuve de demande faible)

## Maillage interne

Règles : chaque satellite pointe vers le pilier et le pilier vers chaque satellite ; 2 liens intra-grappe par article ; 0 à 1 lien inter-grappe ; ancre = requête cible ou variante proche.

| De | Vers | Ancre |
|---|---|---|
| Pilier | les 14 satellites | requête cible de chacun |
| Chaque satellite | Pilier | revue de littérature |
| A1 | A2, A3 | exemple de revue de littérature ; plan de la revue de littérature |
| A2 | A1, A3 | état de l'art ; structurer une revue de littérature |
| A3 | A2, A4 | exemple ; types de revue de littérature |
| A4 | A1, A3 | état de l'art ; plan thématique |
| A3 | B1 (inter) | partie théorique du mémoire |
| B1 | B2, B3 | cadre théorique ; mémoire d'alternance |
| B2 | B1, A1 (inter) | partie théorique ; état de l'art |
| B3 | B1, B2 | partie théorique ; cadre théorique |
| C1 | C2, C3 | moteurs de recherche académiques ; sources fiables |
| C2 | C1, C4 | trouver des sources ; équation de recherche |
| C3 | C1, C2 | trouver des sources pour son mémoire ; Google Scholar |
| C4 | C2, C1 | moteur de recherche académique ; trouver des sources |
| C4 | D1 (inter) | fiche de lecture d'un article scientifique |
| D1 | D2, D3 | tableau de synthèse ; IA pour la revue de littérature |
| D2 | D1, A2 (inter) | fiche de lecture ; exemple de revue de littérature |
| D3 | D1, C3 (inter) | fiche de lecture ; vérifier une source |

Liens entrants par satellite avec le tableau ci-dessus (pilier compris) : A1 4, A2 4, A3 4, B1 4, B2 3, C1 4, C2 4, C3 3, D1 4. Cinq articles n'en ont que 2 : A4, B3, C4, D2, D3. Liens à ajouter pour atteindre le minimum de 3 :

| De | Vers | Ancre |
|---|---|---|
| A1 | A4 | revue systématique |
| B2 | B3 | cadre théorique en mémoire d'alternance |
| C1 | C4 | équation de recherche |
| A3 | D2 | tableau de synthèse |
| C2 | D3 | outils IA de recherche documentaire |

Profondeur : tout satellite est à 1 clic du pilier. Pas d'orphelin.

## Recouvrements avec les autres grappes

- **Rédiger un mémoire** (`rediger-memoire.md`) : le pilier doit lier vers `/blog/rediger-un-memoire` et `/blog/nombre-de-pages-memoire`. Leur fichier prévoit des liens sortants vers ce pilier.
- **Problématique** (`problematique.md`) : la problématique « émane » de la revue de littérature (UVSQ, Paris 1). Pilier et B1 → `/blog/problematique-de-memoire` et `/blog/question-de-recherche-memoire`. Leur A2 renvoie déjà vers ce pilier.
- **Plan de mémoire** (`plan-memoire.md`) : risque sur A3. Ici, c'est le plan de la seule revue, pas celui du mémoire. Le title de A3 doit dire « revue de littérature » en tête. Lien A3 et B1 → hub plan de mémoire.
- **Bibliographie et normes** : Zotero, citer ses sources, Harvard. Leur fichier propose de porter Zotero : d'accord, c'est écarté ici. C1, C3, D1 → `/blog/citer-ses-sources-memoire` et `/blog/zotero-bibliographie-memoire`. Paraphrase : `/blog/paraphraser-sans-plagier` depuis le pilier (étape rédaction).
- **IA et écriture académique** : leur fichier cède « outils IA de recherche documentaire » à cette grappe. D3 est donc ici. D3 → `/blog/outils-ia-memoire` et `/blog/declarer-ia-memoire` ; leur S7 renvoie vers le pilier.
- **Rapport d'alternance / stage** : B3 touche « mémoire professionnel ». Lien B3 → `/blog/memoire-professionnel-ou-recherche` et `/blog/problematique-memoire-alternance`. À vérifier qu'aucun de leurs articles ne vise « partie théorique rapport d'alternance ».

## Risques ouverts

- SERP mesurée hors google.fr : refaire 5 requêtes têtes à la main (pilier, A1, B1, C1, B3) dans un navigateur français avant de lancer la rédaction.
- B1 et B2 peuvent se cannibaliser. Trancher quand la Search Console a des données sur les deux pages, pas avant.
- Pas de domaine de prod ni de landing (`/` affiche la connexion) : les CTA de ces articles n'ont pas encore de page d'inscription vers laquelle pointer.
