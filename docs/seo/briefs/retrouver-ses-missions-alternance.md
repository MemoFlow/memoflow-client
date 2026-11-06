## Content Brief: retrouver ce qu'on a fait en alternance

Article A1 du pilote (`docs/seo/carte-articles.md`). Brief du 06/11/2026.

**Limite de ce brief : la SERP n'a pas pu être revérifiée.** Le quota WebSearch partagé était épuisé au moment du brief (3 requêtes tentées, 0 passée : « retrouver ce qu'on a fait en alternance missions rapport d'alternance sans journal de bord », « je ne me souviens plus de mes missions rapport d'alternance », « lister ses missions alternance rapport présenter missions »). L'analyse concurrentielle repose sur `docs/seo/clusters/rapport-alternance-stage.md` et `docs/seo/flow-find.md` (relevés du même jour) et sur la relecture de la page AuFutur. À revérifier sur google.fr, en navigation privée, après publication.

### Search Intent
Informationnelle, orientée problème : l'alternant doit rendre son rapport, il n'a pas tenu de journal de bord et ne se souvient plus de ce qu'il a fait. Aucune page dédiée n'existe : la SERP sert des conseils « tiens un carnet » (AuFutur) et des fiches journal de bord hors sujet. Format attendu : méthode pas à pas + checklist, avec la syntaxe de recherche concrète de chaque outil. Lecteur : L3-M2 ou BUT3 en alternance, à l'aise avec ses outils, pressé. La demande sur la formulation exacte n'est pas prouvée : l'article doit aussi capter « missions rapport d'alternance », « lister ses missions d'alternance », « rapport d'alternance sans journal de bord ».

### Competitor Analysis
| # | URL | Key H2 Sections | Est. Words | Score | Main Gap |
|---|-----|-----------------|------------|-------|----------|
| 1 | https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/ | Qu'est-ce qu'un rapport d'alternance ; éléments à mettre ; conseils de rédaction ; erreurs | ~2000 | 23/40 (D5 F6 S6 U6) | « Prends des notes dès le début » et « un petit cahier » ; rien pour reconstituer après coup, à part demander au tuteur. Daté du 27/01/2024 |
| 2 | https://www.atelier.fdh.org/IMG/pdf/fiche_journal_de_bord.pdf | Fiche journal de bord (formation) | court | 10/40 | Hors sujet : modèle de journal à remplir, pas de reconstitution |
| 3 | PDF d'écoles (Centrale Méditerranée CEE2, IUT 1 Grenoble S5, Cnam L3) | Consignes : contenu attendu des missions | 1-15 p. | n/a | Disent quoi présenter, jamais comment retrouver la matière |

Pas d'autre concurrent éditorial identifié (relevés clusters et flow-find).

### Content Gaps and Opportunities
- **Topic gap (le cœur)** : personne n'explique comment reconstituer 1 à 3 ans de missions sans journal. Tout le monde conseille de tenir un carnet, trop tard pour le lecteur.
- **Depth gap** : aucune page ne donne la syntaxe de recherche réelle des outils (Gmail `from:me`, Outlook `to:`, Slack `from:` `during:`, Trello `@me` `edited:`, Notion filtre « Created by », GitHub `author:`, Drive `owner:` `after:`, Google Agenda filtre « Participants » et « Période »). C'est le contenu le plus citable.
- **Depth gap** : passage traces → mission rédigée. Les consignes d'école listent les attendus (Centrale : enjeux, contexte, solutions envisagées, solution retenue, mise en œuvre, résultats) sans montrer la transformation.
- **Quality gap** : confidentialité. Personne ne dit quoi sortir de l'entreprise. Pas de règle nationale à inventer : renvoyer aux consignes de l'école (exemple Lyon 3 : déclaration de confidentialité remplie par l'entreprise) et à la charte de l'entreprise.
- Priorité : méthode outil par outil (impact fort, effort faible) > traces → missions > confidentialité > checklist.

### Winning Outline

**H1:** Retrouver ce qu'on a fait en alternance : la méthode (rendu par le gabarit depuis `title`, pas de H1 dans le corps)
**URL Slug:** /blog/retrouver-ses-missions-alternance/
**Target Word Count:** ~1600 mots (concurrent éditorial unique : ~2000 mots, mais généraliste ; cluster : 1500)

**Réponse directe (avant tout H2, ~70 mots, FS target)**
- 2-3 phrases autonomes : les missions ont laissé des traces (agenda, mails envoyés, messageries, outils de tâches, code, fichiers, documents RH, tuteur) ; on les extrait période par période, on les regroupe en missions, on rédige chaque mission en contexte, actions, résultats.
- Mot-clé principal dans la 1re phrase. Lien vers le hub `/blog/rapport-d-alternance/` (ancre « rapport d'alternance ») dans ce bloc.

**H2 1 : Par où commencer quand on ne se souvient plus de ses missions ? (~250 mots)**
- Doit être utile seul (le CTA connecteurs s'insère juste après). Les 5 étapes en liste numérotée : frise par mois, fouille des outils, regroupement en missions, rédaction contexte/actions/résultats, relecture par le tuteur.
- Variante « je ne me souviens plus de mes missions » dans le H2. Corps : mention de « journal de bord » (rappel : AuFutur conseille le carnet, ici on fait sans).

**H2 2 : Où retrouver les traces de ton alternance, outil par outil ? (~600 mots)**
- H3 par source, chacun avec la recherche exacte documentée par l'aide officielle :
  - Agenda (Google Agenda : Participants, Période ; limite de 200 résultats)
  - Mails envoyés (Gmail `from:me`, `after:`, `has:attachment` ; Outlook `to:` dans Éléments envoyés, `hasattachment:yes`, `received:`)
  - Messageries (Slack `from:`, `in:`, `during:` ; Teams : recherche générique, aucune syntaxe vérifiée, ne pas en inventer)
  - Outils de tâches (Trello `@me`, `board:`, `created:`, `edited:` ; Notion filtres Created by, Date, In ; raccourci cmd/ctrl + P)
  - Code (GitHub `author:`, `author-date:`, `org:`)
  - Fichiers (Drive `owner:`, `after:`, `before:`, `type:`)
  - Documents RH et humains : entretiens annuels, fiche de poste et contrat, tuteur, collègues (pas de syntaxe, conseils simples)
- Une seule mention de MemoFlow ici (Notion, Trello, GitHub uniquement, aucune autre affirmation).
- Secondaire : « lister ses missions d'alternance ».

**H2 3 : Comment transformer ces traces en missions pour ton rapport d'alternance ? (~350 mots)**
- Regrouper par objectif, pas par outil. Grille contexte, actions, résultats, raccrochée aux attendus d'école (Centrale Méditerranée ; IUT 1 Grenoble : « Quelle est votre mission ? », rapport bilan des deux années).
- Exemple de fiche mission présenté explicitement comme illustration, pas comme témoignage.
- Secondaire : « missions rapport d'alternance », « présenter ses missions ».

**H2 4 : Qu'as-tu le droit de sortir de l'entreprise pour ton rapport ? (~250 mots)**
- Pas de règle unique : ça dépend de ton école et de ton entreprise. Lyon 3 : déclaration de confidentialité remplie par l'entreprise. Démarche : consignes de l'école, charte/règlement informatique de l'entreprise, accord du tuteur. Garder des notes résumées plutôt qu'exporter des documents. Aucune règle juridique inventée.

**H2 5 : Que faire si une période reste vide ? (~120 mots)**
- Demander au tuteur et aux collègues (AuFutur le conseille), regarder les entretiens, assumer une période résumée.

**Checklist finale (~100 mots)** : liste à cocher des sources à fouiller.

### Recommended Meta Tags

**Title**
Retrouver ce qu'on a fait en alternance : la méthode (52 car.)

**Meta Description**
Pas de journal de bord ? Retrouve tes missions d'alternance à partir de ton agenda, tes mails, Trello, Notion ou GitHub, puis rédige-les pour ton rapport. (154 car., sous le plafond schéma de 160)

### Unique Angle and Information Gain
Première page qui part du cas réel (aucun journal tenu) et qui donne, pour chaque outil où l'alternant a laissé des traces, la recherche exacte à taper, vérifiée sur l'aide officielle de l'outil. Puis la grille pour passer de ces traces aux missions attendues par les écoles, et la démarche (pas une règle inventée) pour savoir ce qu'on peut sortir de l'entreprise.

### E-E-A-T Requirements
- Auteur nommé (François Hatem, page auteur existante), dates visibles.
- Chaque syntaxe de recherche renvoie à l'aide officielle de l'outil, consultée le 06/11/2026.
- Attendus de rédaction sourcés sur des consignes d'école publiques (Centrale Méditerranée, IUT 1 Grenoble, Lyon 3).
- Aucun témoignage inventé, aucune expérience à la première personne, aucun chiffre non sourcé.

### Internal Linking Opportunities
- Spoke vers son hub : `/blog/rapport-d-alternance/`, ancre « rapport d'alternance », dans la réponse d'ouverture (obligatoire).
- Optionnel : `/blog/ia-autorisee-memoire/` si l'article évoque l'IA (ce n'est pas prévu : on n'ajoute pas le lien pour le principe).
- Plus tard (pages inexistantes, ne pas lier aujourd'hui) : A2 exemple de rapport d'alternance, A3 introduction, A6 données confidentielles, A7 présenter ses missions.
