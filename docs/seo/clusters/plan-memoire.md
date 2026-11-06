# Cluster SEO : « plan de mémoire »

Relevé du 06/11/2026. Seed : « plan de mémoire ». Marché France, google.fr, français.
Faits produit : `docs/seo/product-facts.md` (seule source autorisée sur MemoFlow).

## Méthode et limites

- **Aucun volume.** Zéro outil payant : pas de DataForSEO, Ahrefs, SE Ranking ni Firecrawl. La priorité repose sur l'intention, sur la qualité de la SERP (est-ce qu'une page éditoriale solide occupe déjà la place ?) et sur l'adéquation avec le produit.
- **SERP approchée.** Les requêtes passent par WebSearch, dont le moteur n'est pas google.fr. Les listes rendues (10 à 20 liens) font la part belle aux PDF universitaires et aux sites francophones hors France (Algérie, Belgique, Suisse). Le recouvrement entre requêtes est compté sur ces listes : c'est un ordre de grandeur, pas un top 10 google.fr. Avant de rédiger, vérifier les 3 requêtes prioritaires dans un vrai navigateur sur google.fr.
- **22 requêtes passées**, dont 2 avec un filtre de domaine (scribbr.fr, puis mystudies/copeps/etudier/memoireonline) pour repérer les pages éditoriales.
- **Homonymies à neutraliser dans les titres :** « mémoire technique » (appels d'offres : marche-public.fr, tensoria.fr sortent sur « plan détaillé mémoire »), « mémoire » au sens cognitif (sortent sur « plan de mémoire » et « plan mémoire psychologie »), et surtout « plan + discipline » lu comme un plan d'entreprise (voir le gabarit plus bas).

## Recouvrement de SERP mesuré (URLs partagées)

| Paire | Partagées | Décision |
|---|---|---|
| plan de mémoire / exemple de plan de mémoire | 6 | fusion dans le hub |
| plan de mémoire / comment faire un plan de mémoire | 4 | fusion dans le hub (même intention) |
| exemple de plan / comment faire un plan | 3 | fusion (les deux sont absorbées par le hub) |
| plan de mémoire / 2 ou 3 parties | 3 | spoke distinct, lien croisé |
| plan de mémoire / plan type mémoire de recherche | 3 | spoke distinct, lien croisé |
| comment faire un plan / annonce du plan | 3 | spoke distinct |
| plan détaillé / plan mémoire master | 3 | même cluster |
| plan mémoire professionnel / plan mémoire master | 3 | même cluster |
| plan de mémoire / sommaire mémoire | 2 | spoke distinct |
| plan de mémoire / plan détaillé | 2 | spoke distinct |
| plan de mémoire / problématique + hypothèses | 2 | lien seulement, pas d'article ici |
| plan de mémoire / plan mémoire master | 1 | spoke à part, risque avec la seed « rédiger un mémoire » |
| plan de mémoire / plan mémoire alternance | 1 | spoke à part, risque avec la seed « rapport d'alternance » |
| plan de mémoire / plan rapport de stage | 1 | hors cluster, appartient à la seed « rapport de stage » |
| plan de mémoire / transition entre parties | 0 | spoke à part (autre type de page) |
| plan de mémoire / plan mémoire IA | 0 | spoke à part, appartient d'abord à la seed « IA » |

Ce qui revient le plus dans les SERP du cluster : scribbr.fr (pages et PDF), letudiant.fr (série « mémoire, rapport de stage »), des guides PDF d'université (Lorraine, Bordeaux INP, Paris Nanterre, Cnam, Sherbrooke). **Le seul concurrent éditorial français vraiment installé est Scribbr.** Le reste, ce sont des PDF universitaires (bons sur le fond, illisibles sur mobile), des sites de vente de documents (mystudies, etudier.com, memoireonline) et des contenus faibles (synonyme-du-mot.com, comeup). L'ouverture se situe là : une page claire, avec des exemples commentés, peut se placer face aux PDF.

## Architecture

### Hub (pilier)

**Plan de mémoire : méthode, exemple commenté et plan type**
- Requête cible : `plan de mémoire`
- Absorbe : `exemple de plan de mémoire`, `comment faire un plan de mémoire`, `plan type mémoire`
- Intention : informationnelle, how-to avec exemple
- Type de page dominant : guide méthodologique long (PDF universitaire ou guide éditorial), presque toujours avec un plan d'exemple
- Concurrents vus :
  - https://www.scribbr.fr/memoire/exemple-plan-de-memoire/
  - https://www.letudiant.fr/jobsstages/nos-conseils/memoire-rapport-de-stage-comment-construire-un-plan.html
  - https://www.letudiant.fr/jobsstages/nos-conseils/memoire-rapport-de-stage-les-dix-regles-d-or-du-plan.html
- Slug : `/plan-de-memoire`
- Format : guide complet, 2 500 à 3 500 mots. Contenu : étapes (sujet, lectures, problématique, plan provisoire, plan détaillé), un plan type annoté, une section courte « M1, M2, alternance : ce qui change » qui renvoie aux spokes, et une FAQ reprenant les PAA.
- Lien produit autorisé : le planificateur de MemoFlow « rassemble le contexte et rédige le plan », qu'il ajoute ensuite comme section de l'espace d'écriture (fait vérifié). Ne rien promettre de plus.

### Cluster A : structure et formats

**A1. Plan de mémoire en 2 ou 3 parties : lequel choisir**
- Requête : `plan de mémoire en 2 parties ou 3 parties`
- Intention : informationnelle, comparaison
- Type de page : guides universitaires et règles de méthode, sans page comparative dédiée. Le terrain est libre.
- Concurrents :
  - https://www.letudiant.fr/jobsstages/nos-conseils/memoire-rapport-de-stage-les-dix-regles-d-or-du-plan.html
  - https://shs-nancy.univ-lorraine.fr/wp-content/uploads/sites/12/2025/07/guide-des-masterant-es-pris-2025-26.pdf
  - https://www.scribbr.fr/memoire/exemple-plan-de-memoire/
- Slug : `/plan-de-memoire/2-ou-3-parties`

**A2. Plan type du mémoire de recherche (IMRaD)**
- Requête : `plan type mémoire de recherche`
- Intention : informationnelle, explication avec modèle
- Type de page : PDF de cours de méthodologie, plus la page méthodologie de Scribbr
- Concurrents :
  - https://www.scribbr.fr/memoire/methodologie/
  - https://orbi.uliege.be/bitstream/2268/211662/1/Aide%20rédaction%20mémoire_juin2013.pdf
  - https://cours.univ-paris1.fr/pluginfile.php/2095116/mod_resource/content/0/M1Geo_Methodo_memoire_recherche_geo_hum_EPI.pdf
- Slug : `/plan-de-memoire/memoire-de-recherche-imrad`

**A3. Sommaire de mémoire : exemple, et différence avec la table des matières**
- Requête : `sommaire mémoire exemple`
- Intention : informationnelle, modèle à reproduire
- Type de page : modèles téléchargeables (docx, PDF) et guides de présentation
- Concurrents :
  - https://www.scribbr.fr/wp-content/uploads//2019/06/Scribbr-structure-type-memoire-1-1.pdf
  - https://ethique.unistra.fr/websites/sciences-sociales/4-instituts/CEERE/03_etudiants/MODELE_MEMOIRE.docx
  - https://ufr-culture-communication.univ-paris8.fr/IMG/pdf/methodologie_du_memoire_licence-3-2.pdf
- Slug : `/plan-de-memoire/sommaire-exemple`

**A4. Plan de mémoire de master : ce qui change entre M1 et M2**
- Requête : `plan mémoire master`
- Intention : informationnelle
- Type de page : vade-mecum et cahiers des charges d'université, plus L'Étudiant
- Concurrents :
  - https://www.letudiant.fr/etudes/3es-cycles-et-masters/comment-rediger-un-memoire-de-master.html
  - https://shs-nancy.univ-lorraine.fr/wp-content/uploads/sites/12/2025/07/guide-des-masterant-es-pris-2025-26.pdf
  - https://cours.univ-paris1.fr/pluginfile.php/1799833/mod_resource/content/1/Ecrire%20un%20memoire%20de%20master_V9.pdf
- Slug : `/plan-de-memoire/master`
- **Risque de cannibalisation** avec la seed « rédiger un mémoire » (page « mémoire de master » probable). Trancher avec l'orchestrateur : soit ce spoke ne traite que la structure, soit il devient une section du hub.

### Cluster B : construire le plan, étape par étape

**B1. Plan détaillé de mémoire : à quoi il ressemble, exemple**
- Requête : `plan détaillé mémoire exemple`
- Intention : informationnelle, avec un livrable à rendre (beaucoup de formations exigent un plan détaillé de 5 à 15 pages pour le tuteur)
- Type de page : PDF de formation ; la SERP est polluée par le mémoire technique d'appel d'offres. Aucune page éditoriale forte.
- Concurrents :
  - https://formation.bordeaux-inp.fr/plugins/odf-web/odf/_content/course-memoire-intermediaire-plan-detaille-2-fr/Plan%20d%C3%A9taill%C3%A9%20du%20m%C3%A9moire.pdf
  - https://www.usherbrooke.ca/histoire/fileadmin/sites/histoire/espace-etudiant/plan_cours/HST814.pdf
  - https://comeup.com/fr/service/463393/vous-aider-a-ameliorer-ou-refaire-le-plan-detaille-de-votre-memoire
- Slug : `/plan-de-memoire/plan-detaille`
- Le titre doit lever l'ambiguïté : « mémoire universitaire » ou « mémoire de fin d'études ».

**B2. Annonce du plan dans l'introduction : méthode et exemples**
- Requête : `annonce du plan mémoire`
- Intention : informationnelle, exemples de phrases à copier
- Type de page : page d'exemples courte
- Concurrents :
  - https://www.scribbr.fr/plan-memoire/annonce-de-plan-memoire/
  - https://www.synonyme-du-mot.com/les-articles/comment-annoncer-le-plan-du-memoire
  - https://cursa.app/fr/article/reussir-lintroduction-dune-dissertation-ou-dun-memoire-accroche-problematique-et-plan
- Slug : `/plan-de-memoire/annonce-du-plan`
- Recouvrement probable avec la seed « problématique » (introduction de mémoire). Ce spoke ne couvre que l'annonce du plan et renvoie vers leur page sur l'introduction.

**B3. Transitions entre les parties d'un mémoire : exemples**
- Requête : `transition entre deux parties mémoire exemple`
- Intention : informationnelle, exemples
- Type de page : listes de connecteurs et PDF de cours. Aucune page dédiée au mémoire n'occupe la place.
- Concurrents :
  - https://www.synonyme-du-mot.com/les-articles/cest-quoi-la-phrase-de-transition
  - https://copeps.fr/actualites/comment-faire-une-transition-en-tpe/
  - https://is.muni.cz/el/1421/podzim2008/UZFJB916/um/de_l_intro_a_la_conclu_-_notes.pdf
- Slug : `/plan-de-memoire/transitions`
- Peut aussi revenir à la seed « rédiger un mémoire ». Le placer ici parce qu'une transition sert à rendre le plan visible.

**B4. Faire son plan de mémoire avec l'IA (sans tricher)**
- Requête : `plan mémoire IA` / `plan mémoire ChatGPT`
- Intention : informationnelle teintée de commercial (l'étudiant cherche un outil)
- Type de page : guides d'usage de l'IA par les universités belges et pages de médias tech, sans page française dédiée au plan
- Concurrents :
  - https://webresearch.ichec.be/donatien_grolaux/redaction_tips/ia_thesis
  - https://www.clubic.com/guide-536147-nos-conseils-essentiels-en-matiere-d-ia-pour-tout-etudiant.html
  - https://www.uclouvain.be/fr/system/files/uclouvain_assetmanager/groups/cms-editors-psad/NEW%202025/M%C3%A9moires/Les%20IA%20g%C3%A9n%C3%A9ratives%20et%20le%20m%C3%A9moire%20PSAD%207%20avril%202026.pdf
- Slug : `/plan-de-memoire/avec-ia`
- **Meilleure adéquation produit du cluster** (le planificateur). **Recouvrement direct avec la seed « IA et écriture académique »** : à attribuer à une seule seed. Recommandation : ce spoke reste ici, centré sur le plan, et la seed IA garde la page générale « IA et mémoire : ce qui est autorisé ».

### Cluster C : par type de mémoire et par discipline (gabarit)

**C1. Plan de mémoire d'alternance (mémoire professionnel)**
- Requêtes : `plan mémoire alternance`, `plan mémoire professionnel` (fusionnées : 3 URLs partagées via le cluster master, même intention)
- Intention : informationnelle
- Type de page : cahiers des charges d'école ou d'université (Assas, Angers, Cnam, Lyon 3)
- Concurrents :
  - https://isf.assas-universite.fr/sites/default/files/master_isf/cahier_des_charges_memoire_masterisf_0.pdf
  - https://formations.univ-angers.fr/plugins/odf-web/odf/_content/course-memoire-alternant-2/M%C3%A9moire%20Alternant.pdf
  - https://www.cnam.fr/formation/memoire-fin-detudes-1
- Slug : `/plan-de-memoire/alternance`
- Cœur de cible (alternants). **Recouvrement avec la seed « rapport d'alternance »** : le mémoire d'alternance, qui défend une problématique, n'est pas le rapport d'alternance, qui raconte des missions. Les deux pages se lient entre elles et chacune explique la différence en une phrase.

**C2 à C5. Plan de mémoire par discipline**

| # | Requête | Slug | Concurrents vus | État de la SERP |
|---|---|---|---|---|
| C2 | `plan mémoire droit` | `/plan-de-memoire/droit` | scribbr.fr/etudes-de-droit/memoire-droit/ · doc-du-juriste.com/blog/conseils-juridiques/memoire-droit-methode-14-08-2018.html · jm.universite-paris-saclay.fr (guide méthodologique L3, PDF) | intention propre, guides de fac et Scribbr |
| C3 | `plan mémoire marketing` | `/plan-de-memoire/marketing` | mystudies.com/fr-fr/marketing/theories-marketing/guide-pratique/10-propositions-sujets-plans-memoire-marketing-963473.html · mystudies.com/fr-fr/methodologies/memoire-marketing.html · memoireonline.com | polluée par « plan marketing » (mailchimp, clickup, modelesdebusinessplan) |
| C4 | `plan mémoire RH` | `/plan-de-memoire/ressources-humaines` | mystudies.com (sujets marketing RH) · etudier.com/sujets/m%C3%A9moire-master-rh/0 · memoireonline.com (GRH) | très polluée par « plan d'action RH » (factorial, lucca, welcometothejungle) |
| C5 | `plan mémoire finance` | `/plan-de-memoire/finance` | copeps.fr/actualites/memoire-en-finance/ · mystudies.com (mémoires en finance) · letudiant.fr/etudes/3es-cycles-et-masters/memoire-gery-met-des-mois-a-trouver-son-plan.html | polluée par « plan de financement » |

Intention : informationnelle, avec la demande d'un exemple adapté à la discipline. Type de page dominant : site de vente de documents (sujets plus plan) ou guide de fac.

En réserve, à ne pas lancer avant d'avoir des données : psychologie (IMRaD imposé, SERP polluée par la mémoire cognitive), management (SERP polluée par la gestion mémoire informatique), TFE infirmier (scribbr.fr/memoire/plan-tfe-infirmier/, infirmiers.com, appines.fr ; vertical propre, mais hors du cœur L3-M2 école de commerce), master MEEF (scribbr.fr/master-meef/memoire-master-meef/).

## Gabarit programmatique : oui, mais pas tout de suite

**Le gabarit existe.** Scribbr le décline déjà à la main (droit, TFE infirmier, MEEF). Mystudies le décline à grande échelle (« sujets et plans pour un mémoire en {discipline} »). Forme proposée :

> Plan de mémoire en {discipline} : plan type commenté + {3} plans selon le type de sujet
> Blocs variables : conventions propres à la discipline (droit : plan en 2 ou 3 parties, défendu dans l'introduction ; psychologie : IMRaD ; marketing et RH : cadre théorique, terrain, recommandations), 3 exemples de sujets avec leur plan, erreurs fréquentes, lien vers le hub.

**Pourquoi attendre :**
1. Pas de volumes. Rien ne prouve que « plan mémoire {discipline} » pèse plus que la longue traîne. Les SERP montrent une demande (des pages existent pour y répondre), pas sa taille.
2. Homonymie. En marketing, RH et finance, Google lit d'abord « plan marketing », « plan d'action RH », « plan de financement ». Le gabarit doit écrire « plan de mémoire en {discipline} » en entier dans le title et le H1, jamais « plan {discipline} ».
3. Risque de contenu fin. Une page n'a de valeur que si son bloc « conventions » change vraiment d'une discipline à l'autre. Sur 10 disciplines, je n'en vois que 4 ou 5 qui ont des conventions réellement différentes.

**Reco :** rédiger C2 (droit), C3 (marketing) et C4 (RH) à la main, puis regarder dans Search Console les impressions par discipline. On n'industrialise que si elles montent. Les disciplines candidates à la suite : finance, management, communication, psychologie, sciences de l'éducation, logistique.

## Hors cluster (ne pas rédiger ici)

- `problématique mémoire`, `hypothèses` : seed « problématique ». On y met seulement un lien (2 URLs partagées).
- `plan rapport de stage` : seed « rapport de stage » (1 URL partagée ; SERP digischool, letudiant, scribbr rapport).
- `mémoire technique appel d'offres`, `plan de cours mémoire` : hors sujet.

## Priorités (sans volumes : intention, faiblesse de la SERP, adéquation produit)

1. Hub `/plan-de-memoire`
2. B1 plan détaillé : livrable réel, SERP faite de PDF
3. B4 plan avec l'IA : adéquation produit maximale, à arbitrer avec la seed IA
4. C1 alternance : cœur de cible
5. A1 2 ou 3 parties : question récurrente, aucune page dédiée
6. B2 annonce du plan
7. A3 sommaire
8. C2 à C4 disciplines (pilote du gabarit)
9. A2 IMRaD, B3 transitions, A4 master (après arbitrage), C5 finance

## Maillage interne

Règles : chaque spoke renvoie vers le hub et le hub vers chaque spoke, avec la requête cible comme ancre ; 2 ou 3 liens entre spokes d'un même cluster ; au plus 1 lien vers un autre cluster ; au moins 3 liens entrants par page.

| Depuis | Vers (ancre) |
|---|---|
| hub | tous les spokes (ancre = requête cible) |
| tous les spokes | hub (« plan de mémoire ») |
| A1 2 ou 3 parties | A2 (« plan IMRaD »), A3 (« sommaire du mémoire »), lien externe au cluster vers B1 (« plan détaillé ») |
| A2 IMRaD | A1, A4 (« plan de mémoire de master »), lien externe au cluster vers C2 (« plan de mémoire en droit » : contre-exemple sans IMRaD) |
| A3 sommaire | A1, A4 |
| A4 master | A1, A2, lien externe au cluster vers C1 (« mémoire d'alternance ») |
| B1 plan détaillé | B2 (« annonce du plan »), B3 (« transitions entre les parties »), B4 (« faire son plan avec l'IA »), lien externe au cluster vers A3 |
| B2 annonce du plan | B1, B3, B4, plus un lien vers la page introduction de la seed problématique |
| B3 transitions | B1, B2, lien externe au cluster vers A1 |
| B4 IA | B1, B2, plus un lien vers la page générale de la seed IA |
| C1 alternance | C2 à C5 (« plan de mémoire en {discipline} »), lien externe au cluster vers A4, plus un lien vers la page rapport d'alternance |
| C2 à C5 disciplines | C1, les 3 autres pages discipline, lien externe au cluster vers A1 |

Liens entrants (hub compris) : A1 9, C2 6, C1 6, B1 5, C3 à C5 5 chacune, A4 4, B2 4, A2 3, A3 3, B3 3, B4 3. Minimum de 3 respecté, aucune page orpheline, tout à 2 clics au plus du hub.

## Rappels pour la rédaction

- Sur MemoFlow, n'affirmer que ce que contient `product-facts.md` : planificateur qui produit un plan à partir du contexte, espace d'écriture en sections, modèles de documents, connecteurs (notes, Kanban, Markdown), option citation Harvard. Pas de prix, pas de gratuité, pas d'export Word/PDF, pas d'anti-plagiat.
- Pas de landing : `/` affiche la connexion. Les appels à l'action pointent vers `https://memoflow.example` (placeholder) tant que le domaine n'est pas connu.
- Ton : tutoiement, comme dans l'onboarding (à confirmer pour le blog).
