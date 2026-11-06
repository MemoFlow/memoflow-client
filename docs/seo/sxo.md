# SXO : analyse SERP à rebours, 4 requêtes têtes

Relevé du 06/11/2026. Skill `seo-sxo`, mode analyse à rebours : le site n'est pas en ligne, il n'y a aucune page à scorer. Le but est de choisir le format **avant** d'écrire. Pas de score SXO Gap (il faut une page cible pour le calculer).

Faits produit : uniquement `docs/seo/product-facts.md`. Rien d'autre n'est affirmé sur MemoFlow.

## Lire ceci d'abord : ce qui a été observé et ce qui ne l'a pas été

- **SERP google.fr non accessible.** google.fr renvoie vers le mur de consentement, Bing tronque la requête au premier mot, DuckDuckGo sert un captcha. Le budget WebSearch de la session (partagé avec les autres sous-agents) a été épuisé après la première salve.
- **Ce qui est réel :**
  - 1 recherche WebSearch par requête (index US, résultats francophones) : on a les domaines qui ressortent, pas les positions google.fr.
  - Les suggestions de l'autocomplétion Google FR (`hl=fr`, `gl=fr`) : c'est le meilleur signal disponible sur le parcours de recherche.
  - 12 pages concurrentes ouvertes pour noter leur format (longueur, modèles téléchargeables, exemples, FAQ, date).
- **Non observé, donc absent de ce document :** PAA, AI Overview, carrousel vidéo, extraits optimisés, annonces, positions exactes, volumes. Les colonnes correspondantes sont marquées « non observé ». À compléter avec une capture manuelle de google.fr (navigation privée, 4 requêtes) avant de rédiger.

## Synthèse des verdicts

| Requête | Type dominant | Consensus | Verdict de format |
|---|---|---|---|
| comment rédiger un mémoire | Guide long (article) + guides PDF d'université | Fort (article) | Article pilier + checklist téléchargeable |
| plan de mémoire | Plan type en PDF/.docx + article d'exemples | Mixte | Article + plan type téléchargeable + 2 exemples complets (recherche, professionnel) |
| rapport de stage | Fragmenté : consignes PDF, galerie de modèles (Canva), exemples complets, hubs | Fragmenté | Ne pas viser la tête avec un article. Hub + exemple complet + modèle téléchargeable, ciblé licence/master |
| problématique mémoire exemple | Liste d'exemples par discipline | Fort (liste) | Article-liste d'exemples par filière + checklist de validation |

---

## 1. « comment rédiger un mémoire »

### Paysage SERP
- **Domaines qui ressortent :** letudiant.fr, diplomeo.com, digischool.fr, scribbr (guide PDF sur cdn.scribbr.com), location-etudiant.fr, plusieurs cours universitaires en PDF (Algérie, ENS Lyon, UNIL), un cours gratuit cursa.app.
- **Type dominant :** article-guide (Blog Post au sens de la taxonomie). Les PDF d'université font office de guides méthodologiques. Consensus fort sur l'intention informationnelle.
- **Profondeur observée :** L'Étudiant fait environ 900-1 000 mots, 7 H2 en prose, aucune liste, aucune checklist, aucun modèle, publié en janvier 2022 sans mise à jour. La barre est basse.
- **Ordre type des H2 chez les concurrents :** définir le sujet → problématique → documentation → plan détaillé → rédaction et gestion du temps → pièges → soutenance.
- **PAA, AI Overview, vidéos, annonces :** non observé.

### Parcours (autocomplétion Google FR)
de master · de master 2 · professionnel · de licence · de recherche · de soutenance · pdf · *en défense* · *technique pour appel d'offre*.
Les deux derniers sont un autre sens du mot (juridique, marchés publics) : bruit à exclure, mais à neutraliser dans le title pour ne pas attirer le mauvais clic.

### Personas et user stories
- **Alternant M2, mémoire professionnel** (signaux : « mémoire professionnel », « master 2 » ; blocage produit « retrouver ce que j'ai fait »).
  En tant qu'alternant en M2, je veux savoir par quoi commencer mon mémoire professionnel, parce que l'échéance approche et que mon travail est éparpillé sur un an d'entreprise, mais je ne sais pas comment transformer mes missions en matière de mémoire.
- **Étudiant M1/M2 recherche** (signal : « de recherche »).
  En tant qu'étudiant en master recherche, je veux une méthode étape par étape, parce que c'est mon premier travail long, mais les guides restent abstraits et ne me disent pas dans quel ordre faire les choses.
- **Étudiant L3** (signal : « de licence », « pdf »).
  En tant qu'étudiant de licence, je veux un guide que je peux garder sous la main (PDF), parce que je veux cocher les étapes au fil de l'eau, mais les articles sont des murs de texte.

### Verdict
**Un article suffit, à condition d'être nettement meilleur que l'existant : article pilier + checklist téléchargeable.**
- Article en étapes numérotées (le format liste est ce qui manque chez L'Étudiant), une section par type de mémoire (recherche / professionnel), un rétroplanning.
- La checklist en PDF répond au signal « pdf » de l'autocomplétion et sert d'aimant.
- Ce texte devient la page pilier ; plan et problématique sont des pages filles.

### Ce que MemoFlow peut dire (faits vérifiés seulement)
- Les blocages proposés dans l'onboarding (démarrer, retrouver ce que j'ai fait, structurer, rédiger, le temps) peuvent structurer l'article : une section par blocage.
- Pour l'alternant : l'app propose des connecteurs pour importer du contexte (pages de notes et wikis, cartes de tâches Kanban, fichiers Markdown, dépôts de code). L'onboarding cite Trello, Notion, Teams, Slack, mails, Drive comme endroits où l'étudiant laisse des traces. CTA honnête : « retrouver ce que tu as fait en entreprise ».
- Espace d'écriture organisé en sections avec sauvegarde automatique.
- **Ne pas écrire :** gratuit, essai, export Word/PDF, anti-plagiat, normes autres que Harvard.

---

## 2. « plan de mémoire »

### Paysage SERP
- **Domaines qui ressortent :** une majorité de documents d'université et d'école en PDF ou .docx (Bordeaux INP « Plan détaillé du mémoire », Paris Nanterre « élaboration du plan », CNAM, Sherbrooke, Mustansiriyah), L'Étudiant (« les dix règles d'or du plan », 2013, aucun plan d'exemple concret), scribbr, scribd, hastewire.
- **Bruit :** mémoire technique d'appel d'offres, programmes sur la mémoire humaine, même un billet « Doter Claude d'une mémoire ». La requête nue est ambiguë.
- **Type dominant :** le document « plan type » (souvent téléchargeable) avec l'article d'exemples. Consensus mixte entre article et modèle.
- **Référence concurrente :** Scribbr « Exemple de plan de mémoire » fait 600-800 mots, propose un plan type en .docx et un seul exemple rédigé (Internet et la mode), daté de 2020. Pas d'exemple de mémoire professionnel ou d'alternance.
- **PAA, AI Overview, vidéos, annonces :** non observé.

### Parcours (autocomplétion Google FR)
exemple · de master · master 2 · licence pdf · licence · droit exemple · en droit · juridique · professionnel.
Lecture : on veut **voir un plan** (exemple, pdf) et un plan **pour son cas** (niveau, discipline, professionnel).

### Personas et user stories
- **Alternant M2 qui doit relier missions et problématique** (signal : « professionnel »).
  En tant qu'alternant, je veux un exemple de plan de mémoire professionnel, parce que je dois rendre un plan à mon tuteur, mais les exemples disponibles sont des plans de recherche qui ne laissent pas de place à mes missions.
- **Étudiant en droit** (signaux : « droit exemple », « juridique »).
  En tant qu'étudiant en droit, je veux un plan qui respecte les codes de ma discipline (deux parties), parce que mon directeur l'exige, mais les modèles génériques sont en trois chapitres.
- **Étudiant L3 qui veut un fichier** (signal : « licence pdf »).
  En tant qu'étudiant de licence, je veux télécharger un plan type et le remplir, parce que la page blanche me bloque, mais je ne trouve que des PDF non modifiables.

### Verdict
**Un article seul ne suffit pas. Article + plan type téléchargeable (modifiable) + au moins 2 exemples complets : un mémoire de recherche, un mémoire professionnel d'alternance.**
- Le modèle téléchargeable est ce que la SERP récompense (les PDF d'école dominent). Le fichier est produit par le blog lui-même, pas par l'app (export Word non vérifié).
- L'exemple « mémoire professionnel / alternance » est le trou visible chez les concurrents observés et colle à la cible MemoFlow.
- Le droit : une variante à part (page fille « plan de mémoire en droit »), pas dans l'article principal.

### Ce que MemoFlow peut dire
- L'app contient un « planificateur » qui génère un plan à partir du contexte et l'ajoute comme section. C'est le CTA naturel de la page : « génère ton plan à partir de tes notes ».
- L'app propose des modèles de documents et des modèles personnels.
- **Ne pas écrire :** que le planificateur est gratuit, qu'il est accessible sans compte, ni comment il fonctionne en détail (non vérifié). Certains modèles sont réservés aux comptes : ne pas promettre l'accès libre.
- Attention : `/` affiche la connexion, l'inscription n'a pas d'URL propre. Le CTA pointe vers `https://memoflow.example` en attendant.

---

## 3. « rapport de stage »

### Paysage SERP
- **Domaines qui ressortent :** beaucoup de consignes officielles en PDF (collège Marcel Chamontin, collège Twinger, Sciences Po Lille, Université Paris Cité, Paris 8, Paris-Saclay, UNIL, BFH, FRQ), page tag de L'Étudiant, Canva (galerie de modèles), aufutur.fr (exemple complet), jobijoba (exemples et modèles), diplomeo, scribbr (PDF), plus des pages de spam.
- **Type dominant :** aucun. Consignes PDF, galerie de modèles, exemples complets et guides se partagent la page. Consensus fragmenté.
- **Formats concurrents observés :**
  - aufutur : environ 3 500 mots avec un exemple complet (stage de 3 mois en entreprise de logiciel), sans modèle téléchargeable.
  - jobijoba : environ 1 500 mots, un plan type en 8 parties, pas de fichier.
  - diplomeo : 8 min de lecture, exemples de sommaire (BTS CG), d'introduction (master marketing), de remerciements, pas de fichier, mis à jour en 2024.
  - Scribbr : un hub de plus de 20 pages filles (page de garde, remerciements, sommaire, introduction, conclusion, bilan, annexes, mise en page, soutenance, exemples complets) avec un plan type en .docx et une présentation en .pptx. Canva n'a pas pu être lu (403), mais l'URL `/decouvrir/exemple-rapport-de-stage/` indique une galerie de modèles.
- **PAA, AI Overview, vidéos, annonces :** non observé.

### Parcours (autocomplétion Google FR)
exemple · 3eme · pdf · en anglais · seconde · page de garde · bts · dcg · bts cg.
Lecture : une grosse part de la demande vient du **collège (3e) et du lycée (seconde)** et du **BTS**, donc hors cible MemoFlow (L3 à M2, « autre bac+3 à bac+5 »). Le reste veut un **exemple** ou un **fichier**.

### Personas et user stories
- **Stagiaire de licence ou master** (cible ; profil « stagiaire » de l'onboarding).
  En tant que stagiaire de M1, je veux voir un rapport de stage complet de mon niveau, parce que je ne sais pas ce qu'on attend de moi, mais les exemples sont des rapports de 3e ou de BTS.
- **Stagiaire qui a besoin d'un modèle** (signaux : « pdf », « page de garde »).
  En tant que stagiaire, je veux un modèle avec page de garde déjà mise en page, parce que je veux me concentrer sur le fond, mais je perds du temps sur la forme.
- **Collégien de 3e** (signal : « 3eme »). Hors cible : à ne pas servir, sous peine de trafic sans valeur.

### Verdict
**Ne pas attaquer la tête « rapport de stage » avec un article. La SERP est fragmentée, dominée par des consignes d'établissement et des modèles, et une bonne part de la demande est hors cible.**
Format recommandé :
1. Une page hub « rapport de stage licence et master » avec un plan type téléchargeable.
2. Une page « exemple de rapport de stage » complet et rédigé, niveau master (le gros format qui fonctionne chez aufutur).
3. Des pages filles longue traîne : page de garde (avec modèle), introduction, conclusion.
Le cas le plus aligné avec MemoFlow est le **rapport d'alternance**, qui est dans l'onboarding (à vérifier côté cluster : la requête est sans doute moins concurrentielle).

### Ce que MemoFlow peut dire
- Le rapport de stage et le rapport d'alternance sont des documents proposés à l'onboarding ; le profil « stagiaire » existe.
- Le blocage « retrouver ce que j'ai fait » et les connecteurs (notes, Kanban) collent à la section « missions réalisées » du rapport.
- **Ne pas écrire :** « modèle MemoFlow téléchargeable » ou export Word/PDF (non vérifié). Le modèle téléchargeable est un fichier statique du blog.

---

## 4. « problématique mémoire exemple »

### Paysage SERP
- **Domaines qui ressortent :** digischool.fr, letudiant.fr (comment poser une problématique de M1 ; checklist), scribbr (PDF), futura-sciences, major-prepa, nombreux cours universitaires en PDF (Djelfa, Tlemcen, Constantine, Alger, CNAM, Paris-Saclay, USMB).
- **Type dominant :** l'article-liste d'exemples, avec un article de méthode qui contient quelques exemples. Consensus fort sur « je veux voir des exemples ».
- **Formats concurrents observés :**
  - Scribbr « 1001 exemples » : environ 4 000 mots, à peu près 250 problématiques réelles (le titre en annonce 1 001) dans 13 disciplines, en paires « Sujet » / « Problématique », sans fichier ni FAQ, mis à jour en 2021.
  - Digischool : environ 700 mots, 4 exemples (management, astronomie, littérature, éducation), mis à jour le 21/10/2026, avec un encart « Et si l'IA vous aidait à trouver la bonne problématique ».
  - L'Étudiant checklist : environ 1 300 mots, 6 « checkpoints » numérotés, 3 exemples, publié en 2022.
- **PAA, AI Overview, vidéos, annonces :** non observé.

### Parcours (autocomplétion Google FR)
sujet mémoire exemple · problématique mémoire de recherche exemple · exemple problématique mémoire contrôle de gestion · immobilier · de stage.
Lecture : on cherche un exemple **dans sa filière**, et les filières qui remontent sont **business / alternance** (contrôle de gestion, immobilier) et le **stage**.

### Personas et user stories
- **Alternant en contrôle de gestion ou immobilier** (signaux directs de l'autocomplétion).
  En tant qu'alternant en contrôle de gestion, je veux des exemples de problématique dans ma filière, parce que je dois valider mon sujet avec mon tuteur, mais les listes générales parlent d'astronomie et de littérature.
- **Étudiant qui doute de sa formulation** (signal : la checklist de L'Étudiant est un format repris).
  En tant qu'étudiant de M1, je veux vérifier que ma problématique tient la route, parce que mon directeur m'a déjà renvoyé une version, mais je ne sais pas ce qui cloche.
- **Stagiaire** (signal : « de stage »).
  En tant que stagiaire, je veux une problématique tirée de ce que j'ai fait en stage, parce que mon rapport l'exige, mais je ne vois pas de question dans mes missions.

### Verdict
**Article-liste d'exemples organisée par filière, avec une checklist de validation. Un article suffit, mais c'est un format liste, pas un essai.**
- Viser moins d'exemples mais réels et classés par filière de la cible (gestion, contrôle de gestion, marketing, RH, immobilier, communication, informatique), plutôt que de jouer au volume contre Scribbr.
- Ajouter une section « problématique de mémoire d'alternance / de stage : partir de ses missions » : c'est le trou observé.
- Pages filles longue traîne par filière ensuite (« exemple problématique mémoire contrôle de gestion », etc.), validées par l'autocomplétion.
- Une page outil (« testeur de problématique ») n'est **pas** recommandée : aucune fonction de ce type n'est vérifiée dans l'app.

### Ce que MemoFlow peut dire
- Le centre de contexte permet d'ajouter des fichiers de recherche et des personas de lecteurs : un CTA du type « pose ton contexte, puis travaille ta question » reste dans les faits.
- Les connecteurs pour la section « partir de ses missions ».
- **Ne pas écrire :** que MemoFlow « trouve » ou « génère » une problématique (aucune fonction vérifiée), ni le modèle d'IA utilisé.

---

## Actions prioritaires

1. **Capturer google.fr à la main** sur les 4 requêtes (PAA, AI Overview, vidéos, top 10). C'est ce qui manque pour verrouiller le verdict de « rapport de stage » et pour savoir si une vidéo est attendue.
2. **Produire 2 fichiers téléchargeables** avant d'écrire : un plan type de mémoire (recherche et professionnel), un plan type de rapport de stage avec page de garde. Ce sont les actifs que la SERP récompense et qu'aucun concurrent observé ne propose pour l'alternance.
3. **Écrire dans cet ordre :** pilier « comment rédiger un mémoire » → « plan de mémoire » (avec fichier) → « problématique mémoire exemple » (liste par filière) → hub « rapport de stage » ciblé licence/master.
4. **Angle transverse : l'alternance.** Les signaux d'autocomplétion (professionnel, contrôle de gestion, immobilier, de stage) et les faits produit (profil alternant, rapport d'alternance, blocage « retrouver ce que j'ai fait », connecteurs) vont dans le même sens. Les concurrents observés ne le couvrent pas.

## Renvois vers d'autres skills
- Schema (Article, plus éventuellement `DigitalDocument` pour les fichiers) → `/seo schema` une fois les pages écrites.
- Rédaction de chaque page → `/seo content-brief`, puis `no-ai-slop` en dernière passe.
- Citation dans les réponses IA → `/seo geo` quand le site est en ligne.

## Limites
- Pas de SERP google.fr réelle (mur de consentement), et le budget WebSearch a été épuisé par la session : les « domaines qui ressortent » viennent d'un index US, pas d'un classement google.fr.
- Aucun volume de recherche : pas d'outil payant, et rien n'a été estimé.
- L'autocomplétion Google FR est réelle (`suggestqueries.google.com`, `hl=fr`, `gl=fr`) mais ne donne ni volume ni ordre fiable de popularité.
- Les longueurs de page sont des estimations faites à la lecture de chaque page.
- Canva n'a pas pu être lu (403).
- Pas de score SXO Gap ni de score par persona : il faut une page cible.

## Sources
- [L'Étudiant : comment rédiger un mémoire](https://www.letudiant.fr/jobsstages/nos-conseils/comment-rediger-un-memoire.html)
- [L'Étudiant : les dix règles d'or du plan](https://www.letudiant.fr/jobsstages/nos-conseils/memoire-rapport-de-stage-les-dix-regles-d-or-du-plan.html)
- [L'Étudiant : checklist problématique](https://www.letudiant.fr/etudes/3es-cycles-et-masters/la-checklist-pour-rediger-une-problematique-de-memoire-pertinente.html)
- [Digischool : formuler sa problématique](https://www.digischool.fr/articles/master/comment-formuler-ta-problematique-de-memoire/)
- [Scribbr : exemples de problématique](https://www.scribbr.fr/memoire/exemples-de-problematique/)
- [Scribbr : exemple de plan de mémoire](https://www.scribbr.fr/memoire/exemple-plan-de-memoire/)
- [Scribbr : hub rapport de stage](https://www.scribbr.fr/category/rapport-de-stage/)
- [Scribbr : catégorie mémoire](https://www.scribbr.fr/category/memoire/)
- [Scribbr : guide PDF comment rédiger un mémoire](https://cdn.scribbr.com/wp-content/uploads/2020/06/Comment-rédiger-un-mémoire-_.pdf)
- [aufutur : exemple de rapport de stage](https://aufutur.fr/methodologie/exemple-rapport-de-stage/)
- [Jobijoba : rapport de stage, exemples et modèles](https://www.jobijoba.com/fr/dossiers/conseils-cv/rapport-de-stage-exemples-et-modeles)
- [Diplomeo : rapport de stage](https://diplomeo.com/actualite-rapport_de_stage)
- [Diplomeo : rédiger un mémoire de recherche](https://diplomeo.com/actualite-comment_rediger_un_memoire)
- [Canva : exemple de rapport de stage](https://www.canva.com/fr_fr/decouvrir/exemple-rapport-de-stage/) (non lu, 403)
- [Bordeaux INP : plan détaillé du mémoire](https://formation.bordeaux-inp.fr/plugins/odf-web/odf/_content/course-memoire-intermediaire-plan-detaille-2-fr/Plan%20d%C3%A9taill%C3%A9%20du%20m%C3%A9moire.pdf)
