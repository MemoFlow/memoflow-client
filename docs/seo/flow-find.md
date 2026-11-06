# FLOW · Find : angles et questions réelles pour le blog MemoFlow

Framework and prompts © Daniel Agrici, CC BY 4.0: github.com/AgriciDaniel/flow

Relevé du 06/11/2026. Base produit : `docs/seo/product-facts.md`. Site non en ligne : tout part de la SERP.

## Méthode et limites (à lire avant d'exploiter)

- Outils : WebSearch et WebFetch uniquement, aucun outil payant, **aucun volume de recherche** (on n'en a pas, on n'en invente pas).
- **Pas de People Also Ask observé.** Le moteur de WebSearch rend des liens, pas les encadrés PAA de Google, et il tourne depuis les US. Aucune question ci-dessous n'est étiquetée « PAA ». Les preuves sont : (a) ce que la SERP renvoie sur une requête donnée, (b) des fils de forum lus en entier, (c) des pages concurrentes lues pour vérifier ce qu'elles traitent ou non.
- **Reddit inaccessible** : le domaine refuse l'agent de recherche (erreur 400 sur `reddit.com`). Quora n'est sorti sur aucune requête. Studocu non testé (budget de recherche épuisé, partagé avec les autres sous-agents).
- Conséquence : la preuve « voix étudiante » repose sur peu de fils (info.fr, infirmiers.com, témoignage L'Étudiant). Elle est solide sur la forme des blocages, faible sur leur fréquence. Voir la checklist de vérification en fin de fichier.

## Résumé

Les concurrents éditoriaux (Scribbr, L'Étudiant, Sherpas, digiSchool, aufutur) couvrent bien le mémoire de recherche « classique » : plan type, introduction, conclusion, citation. Ils couvrent mal trois choses qui collent pile aux blocages de l'onboarding MemoFlow :

1. **L'alternant, pas l'étudiant générique.** Rapport d'alternance vs mémoire professionnel, problématique tirée des missions, confidentialité des données de l'entreprise : sur ces requêtes, la SERP renvoie surtout des PDF d'écoles (cahiers des charges, livrets) et presque aucune page éditoriale. Les PDF sont précis mais propres à une école, donc mal citables par une IA pour une question générale.
2. **« Retrouver ce que j'ai fait. »** Tout le monde dit « tiens un journal de bord dès le début ». Personne n'explique quoi faire quand on ne l'a pas tenu, alors que c'est le cas de la plupart des gens au moment d'écrire.
3. **L'IA et le mémoire, version concrète.** Les chartes IA des universités se multiplient en 2025-2026 (Angers, Lorraine, Reims, UPEC, UCA, Toulouse 3, Picardie, Laval, UCLouvain). Aucune page éditoriale FR trouvée ne les compare ni ne montre comment rédiger la déclaration d'usage. Scribbr parle d'« essai » et vend son propre détecteur : il ne peut pas traiter les faux positifs de façon neutre.

Ce sont nos meilleures chances d'être cités par les IA : des questions précises, où la seule matière disponible est éclatée dans des PDF d'écoles, et qu'une page de synthèse sourcée peut couvrir mieux que n'importe qui.

## Les angles, par priorité

Colonne « Lien produit » : uniquement ce que `product-facts.md` permet d'affirmer.

| # | Angle (requête cible formulée comme l'étudiant) | Ce que montre la SERP | Trou chez les concurrents | Lien produit | Priorité |
|---|---|---|---|---|---|
| 1 | Rapport d'alternance : retrouver ses missions quand on n'a pas pris de notes | Requête `"rapport d'alternance" "je ne me souviens" missions journal de bord` : uniquement des conseils « tiens un carnet » (aufutur, Unige, fiches journal de bord) | aufutur (page lue) : « Prends des notes dès le début de l'alternance », rien pour reconstituer après coup, à part demander au tuteur | Blocage onboarding « retrouver ce que j'ai fait » ; outils déclarés (Trello, Notion, Teams, Slack, mails, Drive) ; connecteurs notes, wikis, Kanban | Très haute |
| 2 | Rapport d'alternance ou mémoire professionnel : quelle différence, faut-il deux écrits ? | Requête `différence rapport d'alternance et mémoire professionnel` : PDF AMU, Assas ISF, Cnam, Nanterre ; une seule page éditoriale, et elle compare mémoire et **rapport de stage** (L'Étudiant) | Scribbr : aucune page rapport d'alternance (recherche sur scribbr.fr, seul le DCG en alternance sort) ; aufutur ne compare pas (page lue) | Documents proposés à l'onboarding : mémoire, rapport d'alternance, rapport de stage | Très haute |
| 3 | IA et mémoire : ce que disent les chartes des universités, et comment déclarer son usage | Requête `charte usage IA générative mémoire master université déclarer utilisation` : une dizaine de chartes 2025-2026, règles très différentes | Scribbr (page lue) : parle d'« essai »/« dissertation », pas de déclaration, pas de charte. Aucune synthèse comparative FR trouvée | Thème central d'un outil d'aide à la rédaction ; ne rien affirmer sur le modèle d'IA (non vérifié) | Très haute |
| 4 | Mémoire d'alternance : quelles données de l'entreprise ai-je le droit de mettre ? | Requête `mémoire alternance confidentialité entreprise données ce que je peux mettre` : **zéro résultat pertinent** (RGPD générique, politiques de confidentialité). Reformulée : procédures de huis clos de thèse, EPFL, INSA Rennes, Neuchâtel | Personne. C'est le trou le plus net du relevé | Indirect (contexte importé depuis les outils de l'entreprise). Ne rien affirmer sur la sécurité ou le RGPD de MemoFlow (non vérifié) | Haute |
| 5 | Trouver sa problématique de mémoire à partir de ses missions en alternance | Requête `comment trouver sa problématique de mémoire exemple alternance` : la SERP part sur la **mémoire humaine** (amnésie, Alzheimer). Reformulée : livret Univ. Gustave Eiffel (forme « Comment… pour… ? », exemple du salon international), Cnam, AMU | Matière seulement dans des PDF d'écoles. L'Étudiant traite la problématique en général, pas à partir des missions | Blocages « démarrer » et « structurer » ; le planificateur génère un plan à partir du contexte | Haute |
| 6 | Détecteur IA (Compilatio) : faux positif, que faire si on est accusé à tort ? | Requête `Compilatio détection IA mémoire faux positif étudiant` : JDN (test favorable sur 12 textes), Unifr a désactivé le module IA, un cas d'étudiants accusés à tort et diplômes bloqués (Phonandroid) | Scribbr vend un détecteur : conflit d'intérêts. Pas de guide étudiant « que faire » trouvé | Aucun lien direct. Ne pas évoquer d'anti-plagiat MemoFlow (non vérifié). Angle de confiance et d'autorité | Moyenne-haute |
| 7 | Rapport de stage court (2 mois) : plan par missions ou par compétences, missions sans intérêt, annexes | Fil info.fr (lu, avril 2026) : « j'ai aucune idée de comment m'y prendre », « des tonnes de notes mais j'ai peur de faire un truc trop long et ennuyeux », « parties selon les missions ou plutôt selon les compétences acquises ? », « les annexes, ça compte dans le nombre de pages ? » | Scribbr couvre intro, conclusion, plan de rapport de stage. Le choix missions/compétences et le cas « missions peu intéressantes » sont traités en passant | Blocages « structurer », « rédiger » ; modèles de documents | Moyenne |
| 8 | Commencer son mémoire quand le directeur est absent ou ne répond pas | Fil infirmiers.com (lu, 2016) : « quel est l'ordre pour commencer le mémoire? », « elle n'est pas là pendant 2 semaines », « je ne sais pas par quoi commencer... ». Requête `directeur de mémoire ne répond pas que faire` : aucun fil, seulement vade-mecum Unige et livret Orléans | Aucune page éditoriale trouvée | Blocage « démarrer » | Moyenne |

### Angles secondaires (preuve plus faible ou concurrence installée)

- **Mener mémoire, rapport et alternance en même temps.** Témoignage L'Étudiant (Claire, maj 12/02/2025) : « Je n'ai trouvé […] mon sujet de mémoire qu'en janvier », « mon mémoire est donc passé à la trappe en juillet ». Engagement Jeunes : la charge s'accélère à l'approche du mémoire. Lyon 3 : mémoire et rapport partent des mêmes missions avec des problématiques distinctes. Lien produit : blocage « le temps ». Bon angle, mais difficile à rendre citable sans données propres.
- **Revue de littérature : combien de sources ?** Requête `revue de littérature mémoire master comment faire combien de sources` : seul chiffre trouvé, 50 à 200+ sources, chez un éditeur commercial (PapersFlow) ; les universités (UCLouvain, Fribourg) parlent de pertinence, pas de nombre. Angle « il n'y a pas de chiffre, voici comment ton école le fixe » possible, mais Scribbr et les guides universitaires occupent déjà le terrain.
- **Bibliographie et normes.** Scribbr domine avec son générateur de citations. Ne pas l'attaquer de front. Seul fait produit utilisable : option « Imposer le style de citation Harvard ». Aucune autre norme ne peut être affirmée.

## Questions réelles relevées (verbatim, avec source)

| Question ou phrase | Source |
|---|---|
| « franchement j'ai aucune idée de comment m'y prendre » | Fil info.fr, ChloeZoe, 08/04/2026 — https://info.fr/forum/aide-entraide/besoin-daide-pour-structurer-mon-rapport-de-stage/ |
| « J'ai des tonnes de notes mais j'ai peur de faire un truc trop long et ennuyeux » | Même fil |
| « faire des parties selon les missions ou plutôt selon les compétences acquises ? » | Même fil |
| « pour les annexes, ça compte dans le nombre de pages ? » | Même fil |
| « elle a pas vraiment expliqué comment rédiger » (à propos de la tutrice) | Même fil |
| « En gros, quel est l'ordre pour commencer le mémoire? » | Forum infirmiers.com, mariet92, 20/02/2016 — https://www.infirmiers.com/forum/topic154172.html |
| « je ne peux pas prendre de RDV mémoire avec mon directeur de mémoire » / « Je suis complètement perduuuuuue » | Même fil |
| « Je n'ai trouvé […] mon sujet de mémoire qu'en janvier » | L'Étudiant, témoignage de Claire — https://www.letudiant.fr/etudes/3es-cycles-et-masters/memoire-le-temoignage-de-claire-qui-court-apres-le-temps.html |
| « les plannings étaient mobiles ; on découvrait notre emploi du temps au mieux une semaine à l'avance » | Même page |

## Pages lues pour vérifier les trous

- aufutur, rapport d'alternance — https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/ : ne traite ni la reconstitution après coup, ni la confidentialité, ni l'IA, ni la différence avec le mémoire.
- Scribbr, outils d'écriture IA — https://www.scribbr.fr/questions-frequentes/comment-puis-je-utiliser-les-outils-decriture-artificielle/ : « L'utilisation d'outils d'IA (comme ChatGPT) pour rédiger votre essai est généralement considérée comme du plagiat ». Ni déclaration, ni charte, ni alternance.
- Scribbr, détecteur IA — https://www.scribbr.fr/questions-frequentes/le-detecteur-dia-reconnait-il-le-contenu-genere-par-chatgpt-gpt4-et-google-bard/ (vu en SERP, non lu).
- Scribbr, rubrique rapport de stage — https://www.scribbr.fr/category/rapport-de-stage/ (vu en SERP : intro, conclusion, plan ; pas de rapport d'alternance).

## Sources institutionnelles à citer dans les articles

Chartes IA et déclaration d'usage :
- Polytech Angers — https://bienvenue.univ-angers.fr/wp-content/uploads/sites/30/2026/06/POLYTECH-Charte-IA.pdf
- Université Laval, déclaration obligatoire — https://www.fesp.ulaval.ca/system/files/public/memoires-theses/declaration_obligatoire_IA_generative.pdf
- Université de Lorraine, SHS Metz — https://shs-metz.univ-lorraine.fr/wp-content/uploads/2026/03/charte-des-bons-usages_ia.pdf
- UPEC — https://www.u-pec.fr/medias/fichier/del-ca-approbation-de-la-charte-relative-a-l-usage-de-l-intelligence-artificielle-au-sein-de-l-universite_1774866747115-pdf
- UCA — https://www.uca.fr/medias/fichier/delib-ca-20250627-04-charte-ia_1751379185214-pdf
- Université de Picardie — https://www.u-picardie.fr/sites/default/files/media/2026-04/charte-ia.pdf
- Reims, UFR SEN — https://www.univ-reims.fr/ufrsesg/media-files/74285/charte_ia_ufr_sen_2026.pdf
- UGA, UFR LLASIC — https://llasic.univ-grenoble-alpes.fr/ufr-llasic/charte-ia--1567289.kjsp

Détection IA :
- JDN sur Compilatio — https://www.journaldunet.com/intelligence-artificielle/1542833-98-5-de-precision-cette-solution-francaise-peut-elle-vraiment-identifier-les-textes-generes-par-ia/
- Unifr, alternatives aux outils de détection — https://www3.unifr.ch/it/fr/assets/public/documents/MaterielsLogiciels/AlternativesOutilsDetection_Final.pdf
- Étudiants accusés à tort — https://www.phonandroid.com/?p=2526556

Rapport d'alternance, mémoire professionnel, problématique :
- AMU, méthodologie mémoires — https://pole-transports-facdedroit.univ-amu.fr/sites/pole-transports-facdedroit.univ-amu.fr/files/public/memoires_methodologie_v2_0.pdf
- Assas, master ISF — https://isf.assas-universite.fr/sites/default/files/master_isf/cahier_des_charges_memoire_masterisf_0.pdf
- Univ. Gustave Eiffel, livret mémoire d'entreprise — https://lcs.univ-gustave-eiffel.fr/fileadmin/redaction/LCS/Formations/M1CIT-Livret-Mem-Entrepr-21-22.pdf
- Lyon 3, cahier des charges mémoire et stage/alternance M2 — https://www.univ-lyon3.fr/medias/fichier/faculte-des-langues-cahier-des-charges-25-26-memoire-et-stage-alt-m2_1759331784177-pdf
- Cnam, mémoire professionnel — https://www.cnam.fr/formation/memoire-professionnel-3
- L'Étudiant, mémoire vs rapport de stage — https://www.letudiant.fr/etudes/memoire-et-rapport-de-stage-quelles-differences-1.html

Confidentialité :
- EPFL, directives projet de master — https://www.epfl.ch/schools/ic/wp-content/uploads/2022/01/PROJET-DE-MASTER-Directives-FR-UPDATED.pdf
- INSA Rennes, mémoire master — https://biblio.insa-rennes.fr/wp-content/uploads/2016/09/ADA_mémoire_master.pdf
- Université de Neuchâtel, convention de confidentialité — https://www.unine.ch/seco/wp-content/uploads/sites/21/UNINE_FSE_Convention_et_declaration_de_confidentialite.pdf

Encadrement :
- Unige, vade-mecum du directeur de mémoire — https://unige.ch/medecine/download_file/view/226/1507
- Orléans, livret mémoire — https://www.univ-orleans.fr/upload/public/2025-07/Livret%20m%C3%A9moire_juin2025.pdf

## Ce qui rend ces angles citables par une IA

Pour chacun des angles 1 à 6 :
- Répondre à la question dans le premier paragraphe, en 2 ou 3 phrases autonomes.
- Un tableau de synthèse quand la réponse varie selon l'école (chartes IA, confidentialité, rapport vs mémoire), avec un lien vers chaque PDF source. C'est la valeur ajoutée : personne n'agrège.
- Dire explicitement « il n'existe pas de règle nationale » quand c'est le cas (confidentialité, nombre de sources, nombre de pages), puis donner la démarche pour trouver la règle de son école.
- Ne rien affirmer sur MemoFlow hors `product-facts.md`.

## Mesure (une fois le site en ligne)

- Search Console : impressions et clics par article, requêtes réelles qui remontent (elles corrigeront ce relevé fait sans volumes).
- Citations IA : poser chaque requête du tableau à ChatGPT, Perplexity et Google (AI Overviews), noter si la page est citée. Relevé une fois par mois.
- Événement de conversion : clic vers l'inscription depuis l'article. L'inscription n'a pas d'URL (`view = 'signup'`), donc l'événement doit être posé côté front avant de juger quoi que ce soit.

## Checklist de vérification avant rédaction

- [ ] Ouvrir Google en navigation privée, localisation France, et relever les PAA réels sur les 8 requêtes du tableau. Ce relevé n'a pas pu les voir.
- [ ] Chercher manuellement sur Reddit (r/etudiants, r/france) et Studocu les formulations des angles 1, 4 et 5. Reddit était inaccessible à l'agent.
- [ ] Vérifier que Scribbr n'a pas publié depuis une page rapport d'alternance ou déclaration d'usage de l'IA.
- [ ] Relire chaque charte IA citée avant de la résumer : les extraits viennent de la SERP, pas de la lecture intégrale des PDF.
- [ ] Le chiffre « 50 à 200+ sources » (PapersFlow) est commercial : ne pas le publier comme norme.
- [ ] Le test JDN sur Compilatio porte sur 12 textes : le citer avec cette taille d'échantillon, ou pas du tout.

Pour un clustering plus fin par SERP : `/seo cluster <requête>` sur les angles 1, 2 et 3.
