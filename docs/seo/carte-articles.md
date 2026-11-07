# Carte des articles du blog MemoFlow

Synthèse du 06/11/2026, tirée de `plan.md`, `clusters/*.md`, `sxo.md`, `flow-find.md`. Faits produit : `product-facts.md`.

## Limites de la recherche
- Aucun volume de recherche (règle zéro outil payant). Les priorités se fondent sur l'intention, la faiblesse de la SERP en face et le lien avec le produit.
- WebSearch interroge depuis les États-Unis, pas google.fr, et ne donne ni People Also Ask ni autocomplétion. Les recouvrements de SERP sont donc des tendances. **Avant de rédiger un article, son brief revérifie la SERP google.fr de sa requête cible.**
- Le quota de recherche partagé s'est épuisé pendant la recherche : les clusters revue de littérature et rapport d'alternance/stage reposent sur environ 20 SERP chacun.

## Ce que dit la recherche
1. **L'alternance est l'angle libre.** Sur « rapport d'alternance », on ne trouve que des PDF d'écoles et un seul article (AuFutur). Le mémoire générique est déjà occupé par Scribbr, L'Étudiant, Diplomeo et les facs. La cible de l'onboarding (alternants, stagiaires, L3-M2) tombe au même endroit.
2. **Le différenciateur produit correspond à un trou dans la SERP** : retrouver ce qu'on a fait pendant son alternance à partir de ses outils. Aucune page n'en parle. C'est un pari, parce que rien ne prouve que la demande existe.
3. **Le format compte autant que le sujet** (SXO). « Plan de mémoire » appelle un plan type et des exemples, pas un article seul. Sur « rapport de stage » nue, la SERP est éclatée et une grosse part de la demande vient du collège et du BTS, hors cible : on ne vise pas cette requête de front. Les requêtes « générateur de bibliographie » ne renvoient que des outils, on les écarte.
4. **L'IA est le pilier GEO.** Les questions « ai-je le droit », « comment déclarer », « accusé à tort » arrivent directement dans ChatGPT et Perplexity. Aujourd'hui, seules les chartes d'universités et la presse y répondent.

## Règles d'architecture
- **URLs plates** : `/blog/<slug>/`, hubs compris. Ça s'écarte de la hiérarchie proposée dans `plan.md` §3. Raisons : un article peut changer de pilier sans redirection, le test de build reste `dist/blog/<slug>/index.html`, et le fil d'Ariane vient du champ `pilier` du frontmatter, pas de l'URL.
- Slugs en français, sans accents. Le mot « mémoire » est toujours qualifié dans les titles (« mémoire » seul ramène la RAM ou Alzheimer).
- Maillage : chaque satellite pointe vers son hub (et son sous-hub s'il en a un), plus 2 ou 3 liens latéraux au maximum. Chaque hub liste tous ses satellites.
- Pas de `/tag/`, pas de `/category/`, pas de pagination indexée, pas de pages « MemoFlow vs X » tant que les faits produit manquent.

## Les 4 piliers et leurs articles
Vague : P = pilote, 1, 2, 3 = vagues suivantes. ★ = lien direct avec une fonction vérifiée du produit.

### A. Rapport d'alternance (priorité 1) : hub `/blog/rapport-d-alternance/`
| # | Slug | Requête cible | Format | Vague |
|---|---|---|---|---|
| A0 | rapport-d-alternance | rapport d'alternance | Hub : ce que demandent les écoles (consignes publiques comparées, sourcées) | **P** |
| A1 | retrouver-ses-missions-alternance | retrouver ce qu'on a fait en alternance | Méthode + checklist ★ connecteurs | **P** |
| A2 | exemple-rapport-d-alternance | exemple rapport d'alternance | Exemple rédigé et commenté (aucun en ligne) | 1 |
| A3 | introduction-conclusion-rapport-d-alternance | introduction rapport d'alternance | Article + modèles de phrases | 1 |
| A4 | rapport-ou-memoire-d-alternance | différence rapport et mémoire d'alternance | Comparatif sourcé (consignes AMU, Cnam, Assas) | 1 |
| A5 | problematique-memoire-alternance | problématique mémoire alternance | Article + exemples (SERP presque hors sujet) | 1 |
| A6 | donnees-entreprise-memoire-alternance | données confidentielles mémoire alternance | Article (le trou le plus net vu par flow-find) | 1 |
| A7 | presenter-ses-missions-rapport | présenter ses missions rapport d'alternance | Méthode contexte, actions, résultats ★ connecteurs | 2 |
| A8 | citer-document-interne-entreprise | citer un document interne d'entreprise | Article court, aucune page en face | 2 |
| A9 | revue-de-litterature-memoire-alternance | revue de littérature mémoire alternance | Article | 3 |

### B. Mémoire : hub `/blog/rediger-un-memoire/`
Sous-hubs : B1 plan, B4 problématique, B7 revue de littérature, B16 bibliographie.
| # | Slug | Requête cible | Format | Vague |
|---|---|---|---|---|
| B0 | rediger-un-memoire | rédiger un mémoire | Hub : étapes, checklist (L'Étudiant fait environ 1 000 mots et date de 2022) | 1 |
| B1 | plan-de-memoire | plan de mémoire | Sous-hub : plan type en clair, 2 exemples (recherche, pro) ★ planificateur | 1 |
| B2 | plan-detaille-memoire | plan détaillé mémoire | Exemple (la SERP n'a que des PDF) | 2 |
| B3 | plan-memoire-2-ou-3-parties | plan en 2 ou 3 parties | Article court | 3 |
| B4 | problematique-de-memoire | problématique de mémoire | Sous-hub : méthode + exemples par filière | 1 |
| B5 | difference-problematique-question-de-recherche | problématique ou question de recherche | Article | 2 |
| B6 | hypotheses-de-recherche-memoire | hypothèses de recherche mémoire | Article + exemples | 2 |
| B7 | revue-de-litterature | revue de littérature | Sous-hub (la SERP est faite de PDF de cours) | 2 |
| B8 | partie-theorique-memoire | partie théorique mémoire | Article | 2 |
| B9 | trouver-des-sources-memoire | trouver des sources pour son mémoire | Article ★ fichiers de recherche | 2 |
| B10 | etat-de-l-art-memoire | état de l'art mémoire | Article | 3 |
| B11 | retroplanning-memoire | rétroplanning mémoire | Article + tableau (SERP générique gestion de projet) | 1 |
| B12 | commencer-memoire-page-blanche | par où commencer son mémoire | Article ★ blocage « démarrer » | 2 |
| B13 | introduction-memoire | introduction de mémoire | Article + modèles | 2 |
| B14 | conclusion-memoire | conclusion de mémoire | Article + modèles | 3 |
| B15 | memoire-professionnel-ou-recherche | mémoire professionnel ou de recherche | Comparatif | 2 |
| B16 | bibliographie-memoire-normes | bibliographie mémoire normes | Sous-hub : quelle norme choisir | 2 |
| B17 | norme-harvard-bibliographie | norme Harvard | Article + exemples | 1 |
| B18 | apa-ou-harvard-differences | APA ou Harvard | Comparatif (presque rien en français) | 2 |
| B19 | citer-ses-sources-memoire | citer ses sources dans un mémoire | Article | 3 |

### C. Rapport de stage (L3, M1, stage long) : hub `/blog/rapport-de-stage/`
| # | Slug | Requête cible | Format | Vague |
|---|---|---|---|---|
| C0 | rapport-de-stage | rapport de stage licence master | Hub, cadré L3/M1 (pas la requête nue) | 2 |
| C1 | plan-rapport-de-stage | plan rapport de stage | Plan type en clair | 2 |
| C2 | exemple-rapport-de-stage | exemple rapport de stage licence | Exemple commenté | 3 |
| C3 | rapport-de-stage-2-mois | rapport de stage 2 mois | Article (parties par missions ou par compétences) | 2 |
| C4 | introduction-conclusion-rapport-de-stage | introduction rapport de stage | Article + modèles | 3 |
| C5 | problematique-rapport-de-stage | problématique rapport de stage | Article | 3 |

Écartés pour l'instant : remerciements, page de garde, modèle Word. Ces SERP sont tenues par des modèles téléchargeables (Canva, Scribbr). À rouvrir si l'app propose un vrai modèle (non vérifié).

### D. IA et écrits académiques : hub `/blog/ia-memoire/`
| # | Slug | Requête cible | Format | Vague |
|---|---|---|---|---|
| D0 | ia-memoire | utiliser l'IA pour son mémoire | Hub : usages légitimes, limites | 1 |
| D1 | ia-autorisee-memoire | l'IA est-elle autorisée pour le mémoire | Synthèse sourcée des chartes IA 2025-2026 | **P** |
| D2 | declarer-ia-memoire | déclarer l'usage de l'IA dans un mémoire | Article + modèle de déclaration | 1 |
| D3 | citer-chatgpt-memoire | citer ChatGPT | Article + exemples par norme | 2 |
| D4 | accuse-ia-faux-positif | accusé à tort d'avoir utilisé l'IA | Article (faux positifs, recours) | 2 |
| D5 | compilatio-detecteur-ia | détecteur IA Compilatio | Ce qui est public, sans promesse de contournement | 3 |
| D6 | plan-memoire-ia | faire son plan de mémoire avec l'IA | Article ★ planificateur (SERP vide) | 1 |
| D7 | ia-rapport-de-stage | IA rapport de stage | Article | 3 |

**Hors ligne éditoriale, jamais ciblé** : contourner Compilatio, IA indétectable, humaniser un texte IA, reformuler pour éviter le plagiat, faire rédiger son mémoire par ChatGPT.

## Pilote (3 articles)
1. **A0 `rapport-d-alternance`** : le hub du pilier prioritaire. Tous les satellites de la vague 1 pointent vers lui.
2. **A1 `retrouver-ses-missions-alternance`** : l'article différenciant, avec le lien produit le plus fort (connecteurs). Il sert aussi à tester la demande, puisqu'elle n'est pas prouvée.
3. **D1 `ia-autorisee-memoire`** : pilier GEO, très citable, des sources publiques datées.

Ce trio couvre un hub, un article produit et un article GEO. Si le ton passe sur ces trois formats, il passera sur le reste.

## Conversion (rappel de `plan.md` §7)
- Un CTA par article, lié au blocage traité, placé après la première réponse utile.
- Les CTA pointent vers `/inscription`, une vraie URL. Aujourd'hui l'inscription n'est qu'un état React.
- Aucune promesse non vérifiée dans un CTA : ni « gratuit », ni export, ni anti-plagiat.
- Le suivi des inscriptions venues des IA demande d'ajouter une option « ChatGPT / une IA » dans `CHANNEL_CHOICES`. C'est une décision produit, pas du code SEO.

## Volume
44 pages : 4 hubs, 4 sous-hubs et 36 articles. Une fois le pilote fait, il en reste 41, à produire par vagues de 8 à 10.
