# Cluster : rapport d'alternance / rapport de stage

Relevé du 06/11/2026. Seed : « rapport d'alternance », voisine : « rapport de stage ». Cible : étudiants FR L3-M2, alternants, stagiaires.

## À lire avant tout

- **Pas de volumes.** Zéro outil payant. La priorité vient de l'intention et de ce que montre la SERP, pas d'un nombre de recherches.
- **SERP approchée.** Le WebSearch disponible n'est pas google.fr (moteur basé US, résultats en français). Il remonte beaucoup de PDF d'école que Google.fr classe peut-être moins haut. Le recouvrement est compté sur les ~15-20 résultats visibles, pas sur un top 10 strict.
- **20 requêtes passées, puis budget de recherche épuisé** (quota partagé avec les autres agents). Non vérifiées : « comment rédiger un rapport de stage », Studocu, « rapport d'étonnement », « bilan personnel / compétences acquises ». Elles sont marquées `[SERP non vérifiée]`.
- Rien de ce qui est dit sur MemoFlow ne sort de `docs/seo/product-facts.md`.

## Verdict : deux clusters, reliés

Recouvrement entre « rapport d'alternance » et « rapport de stage » : **0 URL commune** (AuFutur sort sur les deux, mais avec deux articles différents). Selon la grille (0-1 = séparé), ce sont deux clusters. Les SERP sont aussi de nature différente :

- **« rapport de stage »** : SERP éditoriale saturée. L'Etudiant, Scribbr, Digischool, AuFutur, Quillbot, Canva, Jobijoba, Diplomeo ont chacun un article par sous-sujet (plan, intro, conclusion, remerciements). Beaucoup de consignes de collège (stage de 3e) en plus : la requête nue attire hors cible.
- **« rapport d'alternance »** : SERP quasi vide d'éditorial. Ce sont surtout des PDF d'école (IUT Grenoble, Cnam, Centrale Méditerranée, ICN, Inalco, IUT Bordeaux, Paris-Saclay) plus **un seul** article éditorial (AuFutur). Les sous-requêtes (intro, conclusion, exemple, problématique) retombent toutes sur ces mêmes PDF : Google n'a pas de page dédiée à leur servir.

Conséquence : **le cluster alternance passe en premier.** La concurrence est faible et le public (alternant L3-M2) colle à la cible. Le cluster stage vient ensuite, en se différenciant par le niveau (master, BUT) plutôt qu'en attaquant L'Etudiant de front.

Les deux hubs se lient entre eux. Les sections communes (remerciements, page de garde, soutenance) vivent **une seule fois** côté stage et le hub alternance y renvoie, pour ne pas dupliquer.

## Recouvrements mesurés (URLs communes, résultats visibles)

| Paire | Communes | Décision |
|---|---|---|
| rapport d'alternance / rapport de stage | 0 | Deux clusters |
| rapport d'alternance / plan rapport d'alternance | ~7 (AuFutur, Cnam, IUT Grenoble S5, Centrale CEE2, Inalco, AN) | Même page : le hub cible les deux |
| rapport d'alternance / rapport d'activité alternance | ~6 (AuFutur, Cnam, Grenoble S5, Centrale, iredu, OpenClassrooms) | Même cluster, absorbé par le hub (section dédiée) |
| rapport d'alternance / exemple rapport d'alternance | ~5 | Même cluster, spoke distinct (intention « exemple ») |
| introduction rapport d'alternance / conclusion rapport d'alternance | ~7 (Grenoble S3 forme, S5 fond, Bordeaux BUT, Paris-Saclay APP3/APP5, AuFutur, Cnam) | Fusion en un seul spoke |
| rapport de stage / plan rapport de stage | ~5 (Scribbr structure, ESA, Twinger, Sciences Po Lille, Digischool) | Même cluster, spoke distinct |
| rapport de stage / exemple rapport de stage | ~3-4 (AuFutur exemple, Canva, Jobijoba) | Spoke distinct |
| introduction rapport de stage / conclusion rapport de stage | ~1 (univ-bejaia) | Deux spokes |
| mémoire d'alternance / rapport d'alternance | ~1 (guide ICN) | Pas le même sujet, voir recouvrements inter-agents |

## Où la SERP est tenue par des exemples et modèles téléchargeables

- **exemple rapport de stage** : modèles L'Etudiant (« inspirez-vous de notre modèle »), Canva, Jobijoba « exemples et modèles », Quillbot, Scribbr en .docx, plus des PDF spam (« Rapport de stage comptabilité »).
- **page de garde rapport de stage** : Canva, Ordio (modèle), Scribbr PDF, et une ferme de pages spam (fpc-dev.cron.cl). Intention purement « modèle ».
- **rapport de stage modèle word gratuit** : PDF spam, Canva, Slidesgo, Ordio. Aucun vrai .docx en tête.
- **remerciements** : L'Etudiant « modèle prêt à l'emploi », Quillbot « liste d'exemples ».
- **conclusion** : Scribbr sert un .docx d'exemple, Canva a une page.
- **rapport d'alternance (toutes variantes)** : PDF de consignes d'écoles (IUT Grenoble, Cnam, Centrale Méditerranée, ICN, Bordeaux, Paris-Saclay). Ce sont des consignes, pas des exemples rédigés. Plusieurs recherches le confirment : aucun exemple complet de rapport d'alternance n'est en ligne en éditorial.
- **Studocu** : pas apparu dans les 20 requêtes, mais pas cherché spécifiquement `[SERP non vérifiée]`. Scribbr apparaît surtout via ses PDF `cdn.scribbr.com` (artefact probable du moteur).

Lecture pour MemoFlow : sur les requêtes « modèle / exemple / page de garde », l'intention est de télécharger un fichier. Un article de méthode y perd. On n'attaque ces requêtes que si on fournit un vrai exemple annoté, et sans promettre d'export Word (non vérifié dans le produit).

## Hub A — Rapport d'alternance (priorité 1)

- **Requête cible** : rapport d'alternance (+ plan rapport d'alternance, rapport d'activité alternance, rapport d'apprentissage)
- **Intention** : informationnelle large (comment le faire, ce qu'on attend)
- **Type de page dominant** : PDF de consignes d'école, un seul guide éditorial
- **Concurrents vus** : https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/ · https://bedeo.cnam.fr/uploads/c114bfaa11256fb5b7a92b91f3b7abfc_Notice%20rapport%20d'activite%CC%81%20L3%202024%20(alternance).pdf · https://chamilo.univ-grenoble-alpes.fr/courses/IUT1GMPK/document/Chamilo-BUT3-MA/Rapport_S5-2024-2025_fond.pdf
- **Slug** : `/rapport-d-alternance`
- **Format** : guide complet, 2500-3500 mots
- **Contenu** : ce qu'est le rapport (dossier de synthèse noté par l'école), plan type en 2-3 parties, longueur selon les écoles (le Cnam demande 10-15 pages), rapport d'activité vs rapport d'apprentissage, lien avec une problématique, notation (note école + tuteur), calendrier (commencer tôt). Renvoie vers les spokes stage pour remerciements, page de garde, soutenance.
- **Angle MemoFlow** : l'alternant a passé un an dans Trello, Notion, Teams, Slack, ses mails, Drive. Le vrai blocage est souvent de retrouver ce qu'il a fait (blocage proposé dans l'onboarding). L'app relie ces outils pour remettre ses traces sous les yeux. `[À VÉRIFIER : les connecteurs vérifiés couvrent notes/wikis, Kanban, Markdown/dépôts de code ; Teams, Slack, mails et Drive sont listés dans l'onboarding, leur connecteur reste à confirmer]`

### Spokes alternance

**A1. Retrouver ce qu'on a fait pendant son alternance** (priorité 1, différenciateur)
- Requête cible : retrouver ses missions d'alternance / journal de bord alternance
- Intention : informationnelle, problème
- Type dominant : aucune page dédiée. AuFutur conseille un « petit cahier » au détour de son guide ; le reste est hors sujet (fiches journal de bord de formation, crèche, pilote)
- Concurrents vus : https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/ · https://www.atelier.fdh.org/IMG/pdf/fiche_journal_de_bord.pdf
- Slug : `/rapport-d-alternance/retrouver-ses-missions`
- 1500 mots. Méthode : relire ses cartes Trello, pages Notion, fils Teams/Slack, mails envoyés, fichiers Drive ; reconstruire une chronologie ; en tirer missions, résultats, difficultés. C'est l'article où MemoFlow est la réponse naturelle.
- Réserve : pas de preuve de demande sur la formulation exacte. C'est un pari éditorial, à tester avec Search Console après publication.

**A2. Exemple de rapport d'alternance** (priorité 1)
- Requête cible : exemple rapport d'alternance
- Intention : informationnelle, recherche de modèle
- Type dominant : PDF de consignes d'école, aucun exemple rédigé en éditorial
- Concurrents vus : https://chamilo.univ-grenoble-alpes.fr/courses/IUTGMPCAMS/document/Rapport_S3_V2_forme.pdf · https://docushare.icn-artem.com/dsweb/Get/Document-167109/Guide Rapport Alternance PGE2 PGE3 2020-2021 V4_10 220607.pdf · https://aufutur.fr/methodologie/exemple-rapport-de-stage/
- Slug : `/rapport-d-alternance/exemple`
- 1500-1800 mots. Un exemple annoté (fictif, déclaré comme tel), section par section, en M1 ou BUT3.

**A3. Introduction et conclusion du rapport d'alternance** (priorité 1, fusion)
- Requête cible : introduction rapport d'alternance (+ conclusion rapport d'alternance)
- Intention : informationnelle, how-to avec exemples
- Type dominant : PDF d'IUT (consignes de forme), AuFutur
- Concurrents vus : https://chamilo.univ-grenoble-alpes.fr/courses/IUTGMPCAMS/document/Rapport_S3_V2_forme.pdf · https://intranet.iut.u-bordeaux.fr/info/pedago/uploads/Consignes-rapport-soutenance/Consignes-rapport-soutenance/Consignes_Rapport_soutenance_BUT_V8.pdf · https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/
- Slug : `/rapport-d-alternance/introduction-conclusion`
- 1500 mots. Recouvrement ~7 entre les deux SERP : une seule page. Les questions de l'IUT Grenoble (pourquoi cette entreprise, ce service, ce sujet, l'alternance dans mon projet) donnent la trame.

**A4. Rapport d'alternance ou mémoire d'alternance : la différence** (priorité 2, pont)
- Requête cible : différence rapport d'alternance et mémoire
- Intention : informationnelle, explication
- Type dominant : PDF d'université + un article L'Etudiant (mémoire vs rapport de stage)
- Concurrents vus : https://www.letudiant.fr/etudes/memoire-et-rapport-de-stage-quelles-differences-1.html · https://pole-transports-facdedroit.univ-amu.fr/sites/pole-transports-facdedroit.univ-amu.fr/files/public/memoires_methodologie_v2_0.pdf · https://formations-iae.univ-smb.fr/plugins/odf-web/iae/_content/course-memoire-et-soutenance-2/M%C3%A9moire%20d'alternance.pdf
- Slug : `/rapport-d-alternance/difference-memoire`
- 1200 mots. Rapport d'activité, mémoire professionnel, mémoire de recherche : qui demande quoi. Lien vers le cluster mémoire.

**A5. Trouver la problématique de son rapport d'alternance** (priorité 2)
- Requête cible : problématique rapport d'alternance
- Intention : informationnelle, how-to
- Type dominant : PDF de méthode (Lorraine, Grenoble) mêlés à des rapports institutionnels sur l'alternance (France Compétences, PPA) : intention mal servie
- Concurrents vus : https://arche.univ-lorraine.fr/pluginfile.php/4403419/mod_resource/content/1/Guide%20pour%20la%20r%C3%A9daction%20du%20rapport%20de%20projet%201A.pdf · https://chamilo.univ-grenoble-alpes.fr/courses/IUTGMPCAMS/document/Rapport_S3_V2_fond.pdf · https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/
- Slug : `/rapport-d-alternance/problematique`
- 1200-1500 mots. Partir d'un constat terrain (méthode constat → conséquence → question de l'IUT Grenoble), pas d'une question de recherche.

## Hub B — Rapport de stage (priorité 2)

- **Requête cible** : rapport de stage (+ comment rédiger un rapport de stage `[SERP non vérifiée]`)
- **Intention** : informationnelle large, mélangée (collège 3e, BTS, licence, master)
- **Type dominant** : guides éditoriaux + consignes d'établissements + modèles Canva
- **Concurrents vus** : https://www.letudiant.fr/tag/rapport-de-stage.html · https://diplomeo.com/actualite-rapport_de_stage · https://aufutur.fr/methodologie/exemple-rapport-de-stage/
- **Slug** : `/rapport-de-stage`
- **Format** : guide complet, 2500-3500 mots, cadré « stage de licence ou de master » dès le H1 pour écarter le public 3e
- **Angle** : même argument que le hub A pour le stagiaire (retrouver ce qu'on a fait), avec renvoi vers A1.

### Spokes stage

**B1. Plan du rapport de stage** (priorité 1 du cluster)
- Requête cible : plan rapport de stage
- Intention : informationnelle, structure
- Type dominant : PDF de méthode (Scribbr, écoles) + Digischool + L'Etudiant (version collège)
- Concurrents vus : https://cdn.scribbr.com/wp-content/uploads/2020/05/La-structure-dun-rapport-de-stage.pdf · https://www.digischool.fr/articles/orientation/stage/sommaire-rapport-de-stage/ · https://www.letudiant.fr/college/rapport-de-stage-comment-faire-un-plan-detaille.html
- Slug : `/rapport-de-stage/plan`
- 1500 mots. Plan type de master, plan analytique vs descriptif. Lien produit factuel : le planificateur de MemoFlow génère un plan à partir du contexte.

**B2. Introduction du rapport de stage**
- Requête cible : introduction rapport de stage
- Intention : informationnelle, how-to + exemple
- Type dominant : guides éditoriaux
- Concurrents vus : https://www.letudiant.fr/jobsstages/conseils-stages/article/exemple-d-introduction-de-rapport-de-stage.html · https://aufutur.fr/methodologie/introduction-rapport-stage-utilite-conseils-exemples-erreur/ · https://business-cool.com/featured/introduction-rapport-de-stage/
- Slug : `/rapport-de-stage/introduction`
- 1200-1500 mots.

**B3. Conclusion du rapport de stage**
- Requête cible : conclusion rapport de stage
- Intention : informationnelle, how-to + exemple
- Type dominant : guides éditoriaux, Scribbr .docx d'exemple, Canva
- Concurrents vus : https://www.digischool.fr/articles/orientation/stage/conclusion-rapport-de-stage/ · https://sherpas.com/blog/conclusion-rapport-stage/ · https://www.letudiant.fr/jobsstages/conseils-stages/article/exemple-de-conclusion-de-rapport-de-stage.html
- Slug : `/rapport-de-stage/conclusion`
- 1200-1500 mots.

**B4. Exemple de rapport de stage (master)**
- Requête cible : exemple rapport de stage
- Intention : recherche de modèle, quasi transactionnelle
- Type dominant : modèles téléchargeables (L'Etudiant, Canva, Jobijoba, Quillbot)
- Concurrents vus : https://www.letudiant.fr/jobsstages/conseils-stages/article/exemple-de-rapport-de-stage-inspirez-vous-de-notre-modele.html · https://www.canva.com/fr_fr/decouvrir/exemple-rapport-de-stage/ · https://www.jobijoba.com/fr/dossiers/conseils-cv/rapport-de-stage-exemples-et-modeles
- Slug : `/rapport-de-stage/exemple`
- 1500-1800 mots. Ne vaut que si l'exemple est vraiment rédigé et annoté, niveau master. Sinon, ne pas faire.

**B5. Présentation de l'entreprise et des missions**
- Requête cible : présentation de l'entreprise rapport de stage
- Intention : informationnelle, how-to
- Type dominant : consignes de collège (stage de 3e), un guide master (Lyon 2)
- Concurrents vus : https://gserpette.loire-atlantique.e-lyco.fr/wp-content/uploads/sites/31/2024/01/Rapport-de-stage-en-entreprise-2024.pdf · https://lesla.univ-lyon2.fr/medias/fichier/guide-methodologique-rapport-de-stage-m1-m2-cinema-et-audiovisuel_1779375251664-pdf · https://www.scribbr.com/wp-content/uploads/2020/06/Introduction-du-rapport-de-stage.pdf
- Slug : `/rapport-de-stage/presentation-entreprise-missions`
- 1200 mots. Trou pour le niveau sup : la SERP sert des collégiens. Sert aussi les alternants (lien depuis le hub A).

**B6. Remerciements du rapport de stage** (section partagée stage + alternance)
- Requête cible : remerciements rapport de stage
- Intention : informationnelle, modèle
- Type dominant : guides éditoriaux avec modèles prêts à l'emploi
- Concurrents vus : https://www.letudiant.fr/jobsstages/conseils-stages/article/remerciements-de-rapport-de-stage-nos-conseils-et-notre-modele-prets-a-l-emploi.html · https://quillbot.com/fr/blog/ecrits-academiques/remerciement-rapport-de-stage/ · https://www.planetegrandesecoles.com/remerciements-rapport-de-stage
- Slug : `/rapport-de-stage/remerciements`
- 1000-1200 mots. Priorité 3 : SERP pleine, faible lien avec le produit.

**B7. Soutenance du rapport de stage ou d'alternance** (section partagée)
- Requête cible : soutenance rapport de stage / soutenance rapport d'alternance
- Intention : informationnelle, how-to
- Type dominant : PDF d'université (Nanterre, Bordeaux, Paris-Saclay), Futura Sciences
- Concurrents vus : https://www.futura-sciences.com/formation/questions-reponses/examens-diplomes-bien-preparer-soutenance-stage-18951/ · https://formations.parisnanterre.fr/plugins/odf-web/odf/_content/course-soutenance-et-valorisation-9-fr-fr-fr/Soutenance%20et%20valorisation.pdf · https://ecampus.paris-saclay.fr/pluginfile.php/3493160/mod_resource/content/0/24-CONSEILS_rapport.et_oral.pdf
- Slug : `/rapport-de-stage/soutenance`
- 1200 mots. Priorité 3.

### Écartés ou repoussés

- **page de garde rapport de stage** : SERP de modèles et de spam. À traiter en section de B1, pas en page.
- **rapport de stage modèle word gratuit** : intention téléchargement, et l'export Word n'est pas vérifié dans le produit. Écarté.
- **rapport de stage 3e / seconde** : hors cible (L3-M2). Écarté.
- **rapport d'étonnement**, **bilan personnel / compétences acquises**, **Studocu** : `[SERP non vérifiée]`, à rechercher dans une prochaine passe.

## Ordre de production

1. Hub A `/rapport-d-alternance`
2. A1 retrouver ses missions (différenciateur)
3. A2 exemple rapport d'alternance
4. A3 introduction et conclusion du rapport d'alternance
5. B1 plan rapport de stage
6. A4 différence avec le mémoire
7. Hub B `/rapport-de-stage`
8. A5 problématique, B5 présentation entreprise, B2, B3
9. B4, B6, B7 si la barre « vrai exemple annoté » est tenue

## Maillage interne

Règles : chaque spoke ↔ son hub (obligatoire), 2-3 liens entre spokes du même cluster, 0-1 lien vers l'autre cluster, ancre = requête cible ou variante proche, liens dans le corps du texte.

| Depuis | Vers | Ancre |
|---|---|---|
| Hub A | A1, A2, A3, A4, A5 | requête cible de chaque spoke |
| Hub A | Hub B | rapport de stage |
| Hub A | B6, B7, B5 | remerciements, soutenance, présentation de l'entreprise |
| A1–A5 | Hub A | rapport d'alternance |
| A1 | A2, A3 | exemple de rapport d'alternance, introduction du rapport d'alternance |
| A2 | A3, A5 | introduction et conclusion, problématique du rapport d'alternance |
| A3 | A2, A1 | exemple de rapport d'alternance, retrouver ses missions |
| A4 | A5, cluster mémoire | problématique, rédiger un mémoire |
| A5 | A4, A3 | rapport ou mémoire d'alternance, introduction du rapport d'alternance |
| Hub B | B1–B7 | requête cible de chaque spoke |
| Hub B | Hub A, A1 | rapport d'alternance, retrouver ce qu'on a fait en stage |
| B1–B7 | Hub B | rapport de stage |
| B1 | B2, B3, B5 | introduction, conclusion, présentation de l'entreprise |
| B2 | B3, B1 | conclusion du rapport de stage, plan du rapport de stage |
| B3 | B2, B7 | introduction du rapport de stage, soutenance |
| B4 | B1, A2 | plan du rapport de stage, exemple de rapport d'alternance |
| B5 | B1, B2 | plan, introduction |
| B6 | B3, Hub A | conclusion, rapport d'alternance |
| B7 | B3, A3 | conclusion, conclusion du rapport d'alternance |

Chaque page reçoit au moins 3 liens entrants, toutes sont à 2 clics max d'un hub.

## Recouvrements probables avec les autres agents

- **Rédiger un mémoire** : « mémoire d'alternance » / « mémoire professionnel » est à cheval. Ici on ne garde que le pont A4 (la différence) ; la méthode du mémoire d'alternance revient au cluster mémoire. À arbitrer.
- **Problématique** : A5 risque de cannibaliser. Proposition : le cluster problématique garde la requête générique, A5 ne vise que « problématique rapport d'alternance » avec l'angle constat terrain.
- **Plan de mémoire** : B1 (plan rapport de stage) est un autre exercice, mais les deux pages devront se lier sans se répéter.
- **Soutenance** : si le cluster mémoire fait « soutenance de mémoire », B7 reste centré stage/alternance, avec un lien croisé.
- **Bibliographie / normes** : faible. Le rapport de stage demande rarement une biblio fournie ; un lien depuis B1 suffit.
- **IA et écriture académique** : A1 (retrouver ses missions) parle d'outils, pas d'IA qui écrit. Garder la frontière pour ne pas se marcher dessus.
