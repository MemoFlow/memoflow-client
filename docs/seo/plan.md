# Plan SEO/GEO du blog MemoFlow

Relevé du 06/11/2026, branche `seo-geo`. Niveau stratégie uniquement : les clusters de mots-clés et l'analyse SXO sont produits à part.
Faits produit : uniquement `docs/seo/product-facts.md`. Tout ce qui n'y figure pas est marqué `[À VÉRIFIER]`.

## 0. Méthode et limites (à lire avant le reste)

- **Aucun volume de recherche dans ce document.** Zéro outil payant (pas de DataForSEO, Ahrefs, SE Ranking…). Les priorités reposent sur l'intention de recherche, sur ce que la SERP montre et sur l'adéquation avec ce que MemoFlow fait vraiment. Les chiffres viendront de Search Console une fois le site indexé.
- **Source SERP : WebSearch, 15 requêtes FR** (rapport d'alternance, plan de mémoire, rapport de stage, problématique, remerciements, Harvard, rétroplanning, IA et mémoire, Compilatio, outils IA, BibGuru). Limite : l'outil n'est pas une SERP google.fr localisée et ne remonte ni les People Also Ask ni l'autocomplétion. Les observations ci-dessous sont donc des tendances fortes, pas un relevé de positions. À recouper à la main dans un navigateur en navigation privée, google.fr, avant de figer les piliers.
- **Saisonnalité supposée** (rendus de rapports et mémoires concentrés au printemps et en été) : hypothèse non vérifiée. À confirmer avec Google Trends (gratuit) avant de caler l'ordre de publication.

## 1. Le constat SERP : qui occupe la place

Ce qui ressort de manière constante sur les requêtes testées :

| Famille | Exemples vus | Ce qu'ils captent | Faille exploitable |
|---|---|---|---|
| **Établissements** (PDF de guides, notices, grilles d'évaluation) | IUT Grenoble (BUT GMP), Cnam (notice rapport L3 alternance), ICN, Centrale Méditerranée, Paris 1, Paris Nanterre, Aix-Marseille, Lyon 3, Paris-Saclay, Montpellier | Une grosse partie des résultats sur « plan rapport d'alternance », « plan mémoire problématique », « mémoire vs rapport d'alternance » | Chaque PDF ne vaut que pour une formation. Personne ne les compare. Format PDF, aucun exemple rédigé, pas de réponse directe. |
| **Médias étudiants** | L'Étudiant, AuFutur, Digischool, Studi, Jobijoba, Planète Grandes Écoles, MisterPrepa, Diplomeo, Student.be | Les requêtes « exemple / modèle » (conclusion, remerciements, rapport de stage) | Contenus génériques, rarement sourcés, souvent orientés stage de 3e ou de BTS. Rien de spécifique à l'alternant en M1/M2. |
| **Éditeurs d'outils** | Scribbr (guides PDF et modèles .docx), Quillbot (remerciements), Canva (modèles de rapport), Grafiati (Harvard, « alternative à BibGuru ») | Méthodologie du mémoire, citations, modèles | Scribbr est la référence méthodo du mémoire de recherche. Il est faible sur l'alternance. Grafiati occupe la citation Harvard en FR. |
| **Anti-plagiat / détection IA** | Compilatio, présent via la presse (JDN, Presse-citron, LaLibre) et cité dans les consignes d'universités (dépôt Moodle, Magister+) | « ChatGPT rapport de stage détecté », « Compilatio IA » | Son blog n'est pas ressorti. Le sujet « ai-je le droit d'utiliser l'IA » est traité par la presse et par des chartes d'école, pas par un guide pratique côté étudiant. |
| **Outils IA de rédaction** | Thotis IA Mémoire, Jenni, Yomu (contenus surtout anglophones, comparateurs agrégateurs) | « IA pour rédiger son mémoire » | Aucun acteur FR crédible n'apparaît sur l'angle alternance. |
| **BibGuru** | Quasi absent en FR, sauf via Grafiati qui se positionne contre lui | — | Pas un concurrent SEO réel en FR. Inutile de le cibler. |

Trois conclusions :

1. **On ne bat pas les écoles sur leur propre légitimité.** Google les met en avant parce qu'elles sont la source primaire. La stratégie, c'est de devenir la page qui les synthétise et les cite, pas celle qui les contredit.
2. **Le mémoire de recherche générique est verrouillé** (Scribbr, universités, médias). Y aller en premier, c'est se battre là où MemoFlow n'a aucun avantage.
3. **L'alternant est mal servi.** Les SERP « rapport d'alternance » mélangent PDF d'IUT, conseils pour stagiaires et contenus BTS. Personne ne traite son vrai problème : retrouver ce qu'il a fait sur 12 à 24 mois de missions éparpillées dans ses outils. C'est exactement le blocage « retrouver ce que j'ai fait » de l'onboarding, et ce que font les connecteurs MemoFlow (notes et wikis, tâches et Kanban, fichiers Markdown et dépôts).

## 2. Positionnement du blog

**Promesse éditoriale :** « Le guide pratique du rapport d'alternance, du rapport de stage et du mémoire, qui compare ce que demandent vraiment les écoles. »

- **Cœur de cible au démarrage : l'alternant (L3 à M2) qui doit rendre un rapport ou un mémoire d'alternance.** Le stagiaire et l'étudiant en mémoire viennent ensuite, sur les sujets où la méthode est la même.
- **Angle différenciant, vérifiable dans le produit :** partir de ce que tu as déjà fait (traces dans Notion, Trello, Teams, Slack, mails, Drive), le structurer, puis rédiger. Pas « l'IA écrit ton mémoire ».
- **Ligne rouge éditoriale sur l'IA.** Les chartes d'école vues en SERP (UGA LLASIC, IUT d'Angers) exigent une déclaration d'usage et interdisent parfois toute rédaction par IA. Compilatio Magister+ détecte les textes IA. Le blog ne promet jamais de « faire le mémoire à ta place ». Il se place du côté « structurer, retrouver, organiser, citer ». C'est à la fois plus honnête, plus défendable face aux écoles (qui sont un canal d'acquisition suivi dans l'onboarding) et plus citable par les moteurs IA.
- **Ton :** tutoiement, comme l'onboarding. Phrases courtes, réponse d'abord.

## 3. Architecture d'URL

Principe : deux niveaux maximum sous `/blog/`, pas de date dans l'URL, slugs en français sans accents, tirets. Un hub par pilier.

```
/                                  landing (n'existe pas : / affiche la connexion aujourd'hui)
/inscription                       URL d'inscription dédiée (aujourd'hui un état React, pas une URL)
/blog/                             accueil du blog : les 4 piliers + derniers guides
/blog/rapport-d-alternance/        hub pilier 1
/blog/rapport-d-alternance/<slug>  articles du pilier 1
/blog/memoire/                     hub pilier 2
/blog/memoire/<slug>
/blog/rapport-de-stage/            hub pilier 3
/blog/rapport-de-stage/<slug>
/blog/ia-et-ecrits-academiques/    hub pilier 4
/blog/ia-et-ecrits-academiques/<slug>
/blog/methode-editoriale           comment on écrit, on source, on relit (pièce E-E-A-T)
/a-propos                          qui fait MemoFlow
```

Choix tranchés :

- **Hiérarchique plutôt que plat**, parce que les piliers suivent le type de document que l'étudiant doit rendre. Cette taxonomie ne bougera pas. Fil d'Ariane et maillage s'en déduisent. Un sujet transverse (citations Harvard, problématique) va dans le pilier où l'intention dominante se trouve. Les autres piliers y renvoient, sans doublon.
- **Pas de `/compare/` ni de pages « alternative à X » au lancement.** Une page comparative exige des faits sur MemoFlow (prix, export, normes) qui sont aujourd'hui non vérifiés. À ouvrir quand `product-facts.md` les contient.
- **Pas de `/blog/category/`, `/tag/`, ni de pagination indexée.** Les hubs font ce travail.

### Prérequis techniques bloquants (décision, pas code)

1. **Le blog doit être servi en HTML statique.** L'app est une SPA Vite/React sans routeur. GPTBot, PerplexityBot, ClaudeBot et une partie des crawlers n'exécutent pas le JavaScript. Un blog rendu côté client est invisible pour la moitié de l'objectif (les réponses IA). Deux options : un générateur statique séparé servi sous `/blog/`, ou du prérendu dans le build actuel. Tranchage à faire avec la stack de prod, aujourd'hui inconnue.
2. **Une vraie URL d'inscription** (`/inscription`) pour que les CTA soient des liens, mesurables et indexables, et pas un changement d'état React.
3. **Domaine de prod.** Placeholder `https://memoflow.example` partout tant qu'il n'est pas choisi. Canonicals, sitemap et schéma en dépendent.
4. **`robots.txt`** qui autorise explicitement les crawlers IA de recherche sur `/blog/` et bloque l'app authentifiée.

## 4. Piliers

Ordre de priorité = ordre de production.

### Pilier 1 : Rapport d'alternance (priorité absolue)
Intention : informationnelle avec un livrable concret (plan, structure, missions, bilan de compétences). SERP dominée par des PDF d'école disparates. Lien produit direct : connecteurs, blocage « retrouver ce que j'ai fait », modèles.
Pages structurantes :
- Le hub : rapport d'alternance, ce que demandent les écoles (synthèse comparée de guides publics, voir §6).
- Présenter ses missions et son bilan de compétences (structure contexte, actions, résultats, déjà attendue par les grilles Cnam et Le Mans).
- Retrouver ce qu'on a fait en alternance à partir de ses outils (l'article le plus différenciant du blog).
- Rapport d'alternance vs mémoire d'alternance vs rapport de stage (la confusion est visible en SERP, les consignes varient selon les écoles).

### Pilier 2 : Mémoire (M1, M2, mémoire professionnel / d'alternance)
Intention : méthode (problématique, plan, hypothèses, revue de littérature, citations). SERP verrouillée sur le générique. Entrer par l'angle « mémoire professionnel / mémoire d'alternance », où le sujet se choisit avec l'entreprise (consignes AMU), puis élargir.
Pages structurantes : trouver sa problématique à partir de sa mission en entreprise, construire le plan, citer en Harvard (seule norme gérée par le produit, voir `ContextCenter`), rétroplanning du mémoire.

### Pilier 3 : Rapport de stage (L3, stagiaires)
Intention : très « exemple / modèle » (introduction, conclusion, remerciements). Concurrence de médias sur des requêtes peu différenciantes. Pilier de volume, à traiter après P1 et P2, en ciblant le stage long de L3/M1 et pas le stage de 3e.

### Pilier 4 : IA et écrits académiques
Intention : « ai-je le droit », « est-ce détecté », « comment déclarer ». Ces questions arrivent naturellement dans ChatGPT et Perplexity. Aujourd'hui, seuls la presse et les chartes répondent. Pilier GEO par excellence, qui justifie aussi le positionnement de MemoFlow.
Pages structurantes : ce que disent les chartes IA des écoles (synthèse sourcée), déclarer son usage de l'IA dans un mémoire, détection IA par Compilatio (ce qui est public, sans promesse de contournement).
**Interdit sur ce pilier :** tout contenu sur le contournement de la détection. Risque de réputation auprès des écoles, et contraire à la ligne éditoriale.

## 5. Données structurées

| Type de page | Schéma | Notes |
|---|---|---|
| Landing `/` | `Organization`, `WebSite`, `SoftwareApplication` | `SoftwareApplication` avec `applicationCategory` et la description issue des faits produit. **Pas de `offers`, `price`, `aggregateRating`** tant que prix et avis ne sont pas vérifiés : un schéma inventé est une violation des consignes Google. |
| Hub pilier | `CollectionPage` + `BreadcrumbList` + `ItemList` des articles | |
| Article | `BlogPosting` + `BreadcrumbList` | `author` = l'`Organization` MemoFlow tant qu'aucun auteur réel n'est identifié, jamais une personne inventée. `datePublished` / `dateModified` réels. `citation` vers les guides d'école cités. |
| Méthode éditoriale, À propos | `AboutPage` + `Organization` | Relie les articles à une entité claire. |

À ne pas faire : `FAQPage` pour obtenir un résultat enrichi (supprimé en mai 2026, à garder seulement si une vraie FAQ visible existe), `HowTo` (plus de résultat enrichi), `Review`. Le détail JSON-LD se génère page par page avec `seo-schema` au moment de l'intégration.

## 6. E-E-A-T pour un site neuf sans auteur expert

**Risque principal du plan.** Le sujet touche à la réussite du diplôme et à l'intégrité académique. Un blog neuf, signé par une marque d'outil, sans enseignant, sans jury, sans auteur identifié, part avec un déficit de confiance face aux écoles, à Scribbr et à L'Étudiant. Les moteurs IA citent de préférence des sources identifiables. Ce risque ne disparaît pas avec de bons articles, il se réduit avec des preuves.

Ce qu'on fait sans expert :

1. **Sourcer sur la source primaire.** Chaque affirmation de méthode renvoie au guide d'école, à la notice ou à la charte publique d'où elle vient, avec la date de consultation. C'est l'avantage structurel du blog : les écoles sont la référence, on les cite mieux que personne.
2. **Produire une donnée propre : la synthèse comparée des consignes.** Relever N guides publics de rapport d'alternance et de mémoire (longueur demandée, parties exigées, problématique obligatoire ou non, norme de citation, règles IA), puis publier le tableau, sa méthode et la liste des sources. Aucun concurrent ne le fait. C'est le contenu le plus citable par les moteurs IA, et il se met à jour chaque année.
3. **Page Méthode éditoriale** : comment un article est écrit, sourcé, relu, mis à jour, et quelle place l'IA y prend. Transparente et datée.
4. **Signature honnête** : « Équipe MemoFlow » et un vrai `dateModified` tant qu'aucune personne réelle ne signe.
5. **De l'expérience vécue dès qu'elle existe** : témoignages d'alternants (avec accord), exemples réels anonymisés, captures du produit. Rien d'inventé, pas de faux étudiant.

Décisions à prendre par François :
- **Un relecteur identifiable** (enseignant, tuteur pédagogique, ex-membre de jury) qui relit les piliers 1 et 2 et accepte d'être nommé. C'est le levier E-E-A-T le plus fort et il ne coûte qu'une relation.
- **François comme auteur** : alternant lui-même, il a une expérience directe du rapport d'alternance. Une signature réelle avec un bio vérifiable vaut mieux qu'une marque. À trancher, avec ce que ça implique d'exposition.

## 7. Conversion : du lecteur à l'inscription

Le lecteur arrive avec un livrable à rendre et un blocage précis. La conversion tient si le CTA propose de lever ce blocage dans l'app, pas si on lui présente l'app.

1. **Un CTA par article, lié au blocage traité**, placé après la première réponse utile (pas en haut, pas uniquement en bas) :
   - Article missions / bilan → « Connecte Notion, Trello ou ton Drive et retrouve ce que tu as fait » (connecteurs).
   - Article plan / structure → « Génère un plan à partir de ton contexte » (planificateur).
   - Article citations → « Impose le style Harvard dans ton espace » (option du centre de contexte).
2. **Le modèle comme contrepartie.** L'article donne le plan type en clair (pour Google et pour les IA, rien de caché). Le modèle prêt à remplir est dans l'app, où certains modèles sont réservés aux comptes (`TemplatesPage`). C'est la seule mécanique « contenu contre inscription » appuyée sur un fait vérifié.
3. **Lien direct vers `/inscription`** avec le contexte de l'article transmis (pilier, slug, type de document), pour pré-remplir l'onboarding (document, profil) et mesurer quel article convertit.
4. **Mesurer le GEO, aujourd'hui invisible.** L'onboarding suit ami, école, TikTok, Instagram, LinkedIn, Google, mais pas « ChatGPT / Perplexity / une IA ». Sans cette option, les inscriptions venues des réponses IA tombent dans « Google » ou nulle part. Ajout à prévoir côté produit (hors périmètre de ce plan, pas de code ici).
5. **Pas de promesse non vérifiée dans un CTA** : ni « gratuit », ni « essai », ni « export Word », ni « anti-plagiat » tant que `product-facts.md` ne les confirme pas.

## 8. Indicateurs

Pas de cibles chiffrées sur le trafic ou les positions : sans volume ni site en ligne, ce serait inventé. Point de départ partout à zéro.

- **Résultat (ce qui compte) :** inscriptions attribuées au blog (paramètre de l'article sur `/inscription`) et inscriptions déclarant une IA comme canal (après l'ajout au §7).
- **Visibilité IA :** panel fixe d'une vingtaine de questions posées à ChatGPT, Perplexity et Google (AI Overviews), testé à la main à intervalle régulier. On note si MemoFlow est cité ou mentionné. Gratuit, manuel, comparable dans le temps.
- **Visibilité Google :** pages indexées, impressions et clics Search Console par pilier, taux de clic hub → article → `/inscription`.
- **Production (sous contrôle) :** nombre de pages publiées par pilier, part des articles avec au moins une source primaire citée (cible : toutes).

## 9. Ordre d'exécution (par dépendance, pas par calendrier)

1. **Fondations** : domaine, rendu statique du blog, `/inscription`, `robots.txt`, sitemap, Search Console et Bing Webmaster Tools, schéma `Organization` / `WebSite`, page À propos, page Méthode éditoriale.
2. **Landing** sur `/` avec la promesse du §2. Sans elle, le blog convertit vers un écran de connexion.
3. **Pilier 1 complet** (hub + articles structurants) et la synthèse comparée des consignes d'école. Lot publié d'un coup avant ouverture, pour que le hub ne soit pas vide.
4. **Pilier 4** (IA et écrits académiques), le plus rentable en GEO, appuyé sur les mêmes chartes relevées en étape 3.
5. **Pilier 2**, par l'angle mémoire professionnel / d'alternance.
6. **Pilier 3**, puis pages comparatives quand les faits produit le permettent.
7. **Boucle continue** : mise à jour annuelle de la synthèse des consignes, panel IA, ajustement des CTA selon les articles qui convertissent.

## 10. Risques

| Risque | Gravité | Parade |
|---|---|---|
| Aucun auteur expert identifié (E-E-A-T) | Haute | §6 : sources primaires, synthèse propriétaire, relecteur nommé, signature réelle |
| Blog rendu en JS, invisible pour les crawlers IA | Haute | HTML statique, prérequis bloquant §3 |
| Être perçu comme un outil de triche par les écoles | Haute | Ligne rouge §2 et §4, aucun contenu de contournement |
| Écart entre le contenu et le produit (fonction promise qui n'existe pas) | Haute | Tout fait produit passe par `product-facts.md`, sinon `[À VÉRIFIER]` |
| Priorités fondées sur l'intention sans volumes | Moyenne | Revue des priorités dès les premières données Search Console |
| Lecture SERP partielle (WebSearch non localisé, pas de PAA) | Moyenne | Contrôle manuel google.fr avant de figer les piliers |
| Saisonnalité inconnue | Moyenne | Google Trends avant de fixer l'ordre de publication |
| Inscriptions IA non mesurées | Moyenne | Option « IA » dans l'onboarding (§7) |

## Sources SERP consultées (06/11/2026)

- Établissements : [IUT Grenoble, rapport S5](https://chamilo.univ-grenoble-alpes.fr/courses/IUT1GMPK/document/Chamilo-BUT3-MA/Rapport_S5-2024-2025_fond.pdf), [Cnam, notice rapport L3 alternance](https://bedeo.cnam.fr/uploads/c114bfaa11256fb5b7a92b91f3b7abfc_Notice%20rapport%20d'activite%CC%81%20L3%202024%20(alternance).pdf), [Centrale Méditerranée, rapport d'alternance](https://syllabus.centrale-med.fr/plugins/odf-web/odf/_content/course-cee-2-rapport-d-alternance-2a-fr-fr/CEE%202%20-%20Rapport%20d'alternance%202A.pdf), [AMU, méthodologie des mémoires](https://pole-transports-facdedroit.univ-amu.fr/sites/pole-transports-facdedroit.univ-amu.fr/files/public/memoires_methodologie_v2_0.pdf), [Assas, cahier des charges mémoire ISF](https://isf.assas-universite.fr/sites/default/files/master_isf/cahier_des_charges_memoire_masterisf_0.pdf), [Paris Nanterre, vademecum mémoire](https://hclassiques.parisnanterre.fr/medias/fichier/vademecum-memoire-master-humanites-classiques-humanites-numeriques_1621603814701-pdf), [UGA LLASIC, charte IA](https://llasic.univ-grenoble-alpes.fr/ufr-llasic/charte-ia--1567289.kjsp), [IUT d'Angers, formulaire IA](https://labua.univ-angers.fr/wp-content/uploads/2023/02/Formulaire-etudiants.pdf)
- Médias : [AuFutur, rapport d'alternance](https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/), [L'Étudiant, mémoire vs rapport de stage](https://www.letudiant.fr/etudes/memoire-et-rapport-de-stage-quelles-differences-1.html), [L'Étudiant, remerciements](https://www.letudiant.fr/jobsstages/conseils-stages/article/remerciements-de-rapport-de-stage-nos-conseils-et-notre-modele-prets-a-l-emploi.html), [Digischool, problématique](https://www.digischool.fr/articles/master/comment-formuler-ta-problematique-de-memoire/), [Studi, portfolio alternance](https://www.studi.com/fr/blog/la-vie-pro/portfolio-alternance-experience)
- Outils : [Scribbr, rédiger un mémoire (PDF)](https://cdn.scribbr.com/wp-content/uploads/2020/06/Comment-rédiger-un-mémoire-_.pdf), [Quillbot, remerciements](https://quillbot.com/fr/blog/ecrits-academiques/remerciement-rapport-de-stage/), [Canva, exemple de rapport](https://www.canva.com/fr_fr/decouvrir/exemple-rapport-de-stage/), [Grafiati, Harvard](https://www.grafiati.com/fr/info/harvard/dissertation/), [Grafiati, alternative BibGuru](https://www.grafiati.com/fr/blogs/bibguru-alternative/), [Thotis IA Mémoire](https://blog-ia.com/rtcl_listing/thotis-ia-memoire/)
- Compilatio et IA : [JDN, précision Compilatio](https://www.journaldunet.com/intelligence-artificielle/1542833-98-5-de-precision-cette-solution-francaise-peut-elle-vraiment-identifier-les-textes-generes-par-ia/), [LePtiDigital, avis Compilatio](https://www.leptidigital.fr/outils/avis-compilatio-89517/)
