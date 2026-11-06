# Relecture à froid des 3 articles pilotes

Relecture du 06/11/2026, branche `seo-geo`, sur les sources Markdown (`blog/src/content/articles/`) et le HTML servi par `vite preview` (http://localhost:4173). Skills passées : `seo-content` (avec `content_humanize.py`) et `seo-page` (avec `metadata_template.py`). Les sources citées ont été rouvertes une par une : WebFetch, puis `pdftotext` sur les PDF que WebFetch ne savait pas lire. Les scores sont des repères internes, pas des signaux Google.

Connus et hors périmètre : domaine `memoflow.example`, pas d'image OG.

## Points communs aux trois articles

### Bloquant
- **La page auteur affiche `[BIO À FOURNIR]` en clair** (`/blog/auteur/francois-hatem/`), alors que les trois articles y renvoient depuis leur signature. Correctif : ne pas publier avant que François fournisse la bio. Elle doit dire en une ou deux phrases pourquoi il écrit sur l'alternance (s'il est lui-même alternant, c'est le meilleur signal d'expérience du blog), sans rien inventer.

### À corriger
- **Aucun signal d'expérience directe.** Les articles reposent uniquement sur la documentation, sans vécu. Correctif : une fois la bio écrite, ajouter dans chaque article une phrase de première main signée par l'auteur (ce qu'il a lui-même cherché ou vécu). Il faut une info réelle venant de François, pas une anecdote inventée.
- **Les sections s'ouvrent en répétant le H2.** C'est un tic GEO qui sonne machine quand il revient partout, par exemple : « Pour transformer tes traces en missions de rapport d'alternance, regroupe-les par objectif » ou « Ce que tu peux sortir de l'entreprise pour ton rapport d'alternance dépend… ». Correctif : garder la réponse directe, mais sans recopier la question. Exemples dans chaque article ci-dessous.

### Mineur
- Le schema `BlogPosting` n'a pas de `image`, et `Person` n'a ni `description` ni `sameAs`. À ajouter avec l'image OG et la bio.
- Pas de `twitter:card`. Ajouter `<meta name="twitter:card" content="summary_large_image">` quand l'image OG existera.
- `docs/seo/carte-articles.md` §Conversion dit encore « Aucune promesse … ni « gratuit » ». La décision du 06/11 dans `product-facts.md` autorise « Commence gratuitement ». Les CTA sont conformes à la décision : c'est la carte qu'il faut mettre à jour.

Vérifié sans problème : aucun caractère Unicode invisible (source et HTML), aucune tournure IA détectée par `content_humanize.py`, metas non templatées, un seul H1 par page, hiérarchie Hn propre, canonical auto-référent, `lang="fr"`, tableaux défilables sur mobile (`overflow-x:auto`), `/inscription?from=…` et la page auteur répondent en 200.

---

## 1. Hub `rapport-d-alternance` : à corriger

Contenu : 78/100. Citabilité IA : 85/100. Environ 2 300 mots, 146 phrases de 12,9 mots en moyenne. C'est le plus solide des trois sur le fond : tableau comparatif sourcé, chiffres exacts, liste de questions utile.

### Contrôle anti-hallucination : 4 confirmées / 0 déformée / 0 introuvable
| Affirmation | Source | Verdict |
|---|---|---|
| IUT 1 Grenoble S3 : 15 à 20 pages, note = moyenne pondérée maître d'apprentissage + tuteur pédagogique, SAÉ à « très fort coefficient », rendu le 20/12/2024 | PDF S3 « la forme » | Confirmée, mot pour mot |
| ICN PGE2 : « une vingtaine de page (volume indicatif hors annexes) », pas de soutenance publique, notation par le T.P. avec questionnaire en ligne au M.A. | Livret ICN v4.10 du 07/06/22 | Confirmée |
| Lyon 3 : au moins 10 000 mots / « une quarantaine de pages de développement », soutenance d'1 h (25 min + 25 min), six critères dont l'évaluation de l'entreprise, Calibri 11 / 1,15 / 2,5 cm | Cahier des charges 2025-2026 | Confirmée |
| Paris Nanterre, M1 DEFI : oral avec support devant un jury d'enseignants, « Présentation orale avec support (100%) » | Fiche « Soutenance et valorisation » | Confirmée |

Également vérifiés et confirmés : la citation Centrale (enjeux… résultats, rapport écrit + évaluation entreprise, 5 ECTS), l'IUT S5 (« Quelle est votre mission? », « souvent une partie que vous négligez (voire que vous oubliez) », 24/01/2025), AMU (« Modalités d'évaluations envisagées », « Oral avec poster + dossier personnel d'alternance »), et la citation du Cnam. Les écarts trouvés concernent la façon dont l'article généralise ces faits. Ils sont listés ci-dessous.

### Bloquant
Aucun propre à l'article (voir la bio, commune aux trois).

### À corriger
1. **« 7 établissements » est faux pour le tableau.** On le trouve dans la meta description (« les consignes publiques de 7 établissements comparées ») et à la ligne 38 (« Ce guide compare les consignes publiques de 7 établissements »). Le tableau compare **6 établissements** sur 7 lignes (Grenoble y figure deux fois, S3 et S5). Le Cnam n'est cité qu'une fois, plus bas. Correctif : « 7 consignes de 6 établissements », ou ajouter une ligne Cnam au tableau.
2. **La règle « l'entreprise note dès que la note est détaillée » est contredite par le tableau.** Ligne 65 : « Dès qu'un document détaille la note, l'entreprise y participe. » Ligne 137 : « une note où l'entreprise a son mot à dire, dès que la consigne détaille la notation. » Or la ligne Nanterre détaille la note (oral à 100 %, jury d'enseignants) et l'entreprise n'y intervient pas. Correctif : « Dans les quatre consignes qui détaillent la note de l'écrit, l'entreprise y participe. » Même précision à la ligne 137.
3. **Compilatio et l'exemplaire pour l'entreprise viennent de la section PGE3 du livret ICN, pas PGE2.** Ligne 122 : « Tu le déposes aussi sur Compilatio… et tu en remets un exemplaire à ton entreprise. » Dans le PDF, ces deux consignes sont sous « Durant la 2ème année de master (PGE3) ». Seule la mention CONFIDENTIEL est dans les remarques générales. Correctif : « En PGE3, tu le déposes aussi sur Compilatio… ».
4. **Le livret ICN date de 2022 (échéance au 3 juin 2022), mais le tableau le présente comme une consigne actuelle.** L'âge n'est signalé qu'à la ligne 67, en bas. Correctif : écrire « ICN Business School, PGE2 (niveau M1), livret 2022 » dans la colonne Formation.
5. **Le chapô est lourd pour un étudiant pressé.** Ligne 36 : « Les deux consignes de rapport qui donnent un chiffre demandent 15 à 20 pages pour l'une, une vingtaine de pages hors annexes pour l'autre. » Correctif : « Compte 15 à 20 pages à l'IUT 1 de Grenoble, une vingtaine hors annexes chez ICN : ce sont les deux seules consignes du relevé qui donnent un chiffre. »

### Mineur
- Le tic « lus / lues » revient 6 fois (« des documents lus », « les consignes lues », « lus ici »). Correctif : le dire une fois dans le paragraphe de méthode (ligne 53), puis écrire simplement « ces documents ».
- Ligne 120, phrase trop chargée : « Un rapport d'alternance parle d'une entreprise réelle, et certaines écoles encadrent par écrit ce que tu peux en dire, comment le dépôt est contrôlé et comment l'IA est traitée : ». Correctif : « Ton rapport parle d'une vraie entreprise. Deux écoles du relevé encadrent par écrit la confidentialité, le contrôle anti-plagiat et l'IA : ».
- Ligne 65, résumé en trois phrases qui redit le chapô (« Le nombre de pages est rarement écrit. Dès qu'un… La soutenance varie le plus… »). Correctif : supprimer ce paragraphe, ou n'en garder que la phrase corrigée du point 2.
- ICN distingue l'« apprenti » (rapport de projet) de l'« alternant » (rapport de stage). Le tableau ne garde que le rapport de projet. Ajouter « (apprentis) » à la ligne ICN.
- Méthode : une phrase sur la façon dont les 7 documents ont été choisis (documents publics trouvés le 06/11, sans visée exhaustive) renforcerait la confiance. On ne sait pas aujourd'hui pourquoi ces écoles-là.
- Le texte nomme MemoFlow deux fois (CTA après la 1re section, puis la dernière phrase, ligne 160). Ça reste acceptable, mais la dernière phrase fait doublon avec le CTA. Option : la couper.

### Les 3 pires phrases (ton)
1. « Les deux consignes de rapport qui donnent un chiffre demandent 15 à 20 pages pour l'une, une vingtaine de pages hors annexes pour l'autre. » (l. 36)
2. « Un rapport d'alternance parle d'une entreprise réelle, et certaines écoles encadrent par écrit ce que tu peux en dire, comment le dépôt est contrôlé et comment l'IA est traitée : » (l. 120)
3. « La note d'un rapport d'alternance mêle l'avis de l'école et celui de l'entreprise dans les quatre documents lus qui détaillent la notation : IUT 1 de Grenoble, ICN Business School, Centrale Méditerranée et Lyon 3. » (l. 98). La phrase répète le H2 et le ton administratif. Correctif : « École et entreprise notent ensemble dans quatre consignes : Grenoble, ICN, Centrale et Lyon 3. »

### Faits MemoFlow
- Ligne 160, « MemoFlow peut se connecter à Notion, Trello et GitHub pour importer ce contexte dans ton espace d'écriture » : conforme à `product-facts.md`.
- CTA, « Connecte Notion, Trello ou GitHub à MemoFlow et retrouve au même endroit ce que tu as fait » : les connecteurs existent, mais « retrouve ce que tu as fait » promet plus qu'un import de pages, cartes et dépôts. Correctif : « …et importe tes pages, cartes et dépôts au même endroit. »

---

## 2. `retrouver-ses-missions-alternance` : à corriger

Contenu : 74/100. Citabilité IA : 70/100 (méthode concrète et opérateurs exacts, mais peu de chiffres à citer). Environ 1 700 mots, 14,9 mots par phrase en moyenne, 8 phrases de plus de 30 mots.

### Contrôle anti-hallucination : 4 confirmées / 0 déformée / 0 introuvable
| Affirmation | Source | Verdict |
|---|---|---|
| Google Agenda : filtres par participants et dates via la flèche à droite du champ, « Les résultats de recherche sont limités à 200 événements » | Aide Google Agenda | Confirmée |
| Trello : `@me` = cartes dont tu es membre, `board:`, `created:` / `edited:` + nombre de jours, exemple `edited:21` | Atlassian Support | Confirmée (exemple identique) |
| Gmail : `from:me`, `after:` / `before:` au format `2004/04/16`, `has:attachment` | Aide Gmail | Confirmée |
| Drive : `owner:`, `after:` / `before:` sur la date de modification au format AAAA-MM-JJ, `type:` | Aide Drive | Confirmée |

Également confirmés : Outlook (`to:` dans Éléments envoyés, `hasattachment:yes`, `received:`), Slack (`from:`, `in:`, `during:` sur un mois ou une année), Notion (`cmd/ctrl + P`, filtres « Created by », « In », date), GitHub (`author:`, `org:`, qualificatifs de date), les trois citations d'AuFutur (mot pour mot), Centrale, Lyon 3 (déclaration de confidentialité) et IUT S5.

### Bloquant
1. **L'article pousse à connecter les outils de l'entreprise à MemoFlow avant de dire de vérifier ce qu'on a le droit de sortir.** Ligne 84 : « MemoFlow peut relier Notion, Trello et GitHub pour importer ce contexte au même endroit ». Le CTA de la ligne 58 (« Connecte Notion, Trello ou GitHub ») tombe aussi avant la section « Qu'as-tu le droit de sortir de l'entreprise ». Or l'article pilote sur l'IA cite Angers et Clermont, qui interdisent de transmettre des données internes d'une entreprise d'accueil. Un lecteur attentif y verra une contradiction, et un tuteur, un risque. Correctif en une clause, ligne 84 et dans le CTA : « …si ton entreprise t'autorise à connecter ces outils à un service externe (voir plus bas) ».

### À corriger
1. **L'ordre de la méthode se contredit.** Le H3 « Ton agenda » arrive en premier, puis la section suivante dit « Commence par tes mails envoyés » (l. 70). Correctif : remplacer par « Tes mails envoyés contiennent tes livrables et tes comptes rendus. »
2. **GitHub : la limite principale manque.** La doc dit « only the default branch of a repository is searched ». Le travail resté sur une branche non fusionnée n'apparaîtra pas. Correctif, à ajouter ligne 82 : « La recherche ne couvre que la branche principale : cherche aussi tes pull requests (`is:pr author:ton-pseudo`). »
3. **Les ouvertures de section répètent le H2 :**
   - l. 52 « Quand tu ne te souviens plus de tes missions d'alternance, commence par une frise… » → « Commence par une frise, avant même d'ouvrir ton rapport. »
   - l. 62 « Tes missions d'alternance ont laissé des traces dans ton agenda, tes mails, tes messageries, tes outils de tâches, ton code et tes fichiers. » Elle redit le chapô presque mot pour mot. Correctif : la supprimer et commencer par « Chaque outil a sa recherche avancée… ».
   - l. 96 « Pour transformer tes traces en missions de rapport d'alternance, regroupe-les par objectif. » → « Regroupe tes traces par objectif. »
   - l. 117 « Ce que tu peux sortir de l'entreprise pour ton rapport d'alternance dépend des consignes de ton école et des règles de ton entreprise. » → « Avant d'exporter quoi que ce soit, vérifie trois choses. » (la phrase existe déjà juste après).

### Mineur
- Teams n'a aucun filtre (l. 74), alors que tous les autres outils en ont et que Teams n'a pas de source. Correctif : soit ajouter les filtres de recherche de Teams avec la page d'aide Microsoft, soit assumer en une phrase que Teams n'a pas de recherche par période aussi fine.
- Outlook : dans Éléments envoyés, `received:` filtre sur la date d'arrivée de l'élément. Ça marche, mais la doc ne liste pas de `sent:`. Rien à changer, simplement ne pas ajouter `sent:`.
- L'exemple de fiche mission (l. 108-111) est bon, mais les résultats restent en crochets. Remplir avec des résultats inventés et marqués comme tels (« -30 % de relances, exemple fictif ») rendrait l'exemple plus parlant. L'article dit déjà « L'exemple est inventé ».
- La ligne 104 sur l'IUT S5 vient un peu comme un cheveu sur la soupe après la grille Centrale. Option : la fusionner dans le paragraphe d'avant.

### Les 3 pires phrases (ton)
1. « Tes missions d'alternance ont laissé des traces dans ton agenda, tes mails, tes messageries, tes outils de tâches, ton code et tes fichiers. » (l. 62), doublon du chapô.
2. « Pour transformer tes traces en missions de rapport d'alternance, regroupe-les par objectif. » (l. 96), mot-clé forcé.
3. « Ce que tu peux sortir de l'entreprise pour ton rapport d'alternance dépend des consignes de ton école et des règles de ton entreprise. » (l. 117)

À garder tel quel, c'est le bon ton : « Sur Slack et Teams, tu retrouves les décisions, les demandes et les « c'est en prod ». »

### Faits MemoFlow
Ligne 84 et CTA conformes à `product-facts.md` (Notion, Trello, GitHub uniquement ; Teams, Slack, mails et Drive ne sont pas présentés comme des connecteurs). Pour la réserve de fond, voir le bloquant ; pour « retrouve au même endroit ce que tu as fait », voir le correctif proposé pour le hub.

---

## 3. `ia-autorisee-memoire` : à corriger

Contenu : 80/100. Citabilité IA : 88/100. C'est le plus citable des trois : règle par défaut comparée, citations datées, tableau. Environ 1 600 mots, 15,5 mots par phrase en moyenne.

### Contrôle anti-hallucination : 4 confirmées / 0 déformée / 0 introuvable
| Affirmation | Source | Verdict |
|---|---|---|
| Clermont : pour les mémoires et rapports, IA « par défaut autorisé sauf s'il est expressément interdit par l'enseignant », déclaration systématique, « Le fait d'utiliser l'IAG sans le dire pourra être considéré comme une fraude » | Charte UCA, CA du 27/06/2025 | Confirmée, mot pour mot |
| UPEC : « autorisation expresse et préalable de l'enseignant », interdit de « Rédiger intégralement ou substantiellement un chapitre ou une section », détecteurs = « qu'un indice », journal d'IA recommandé | Charte UPEC. La date du 13/03/2026 est vérifiée sur la page de délibération scannée | Confirmée |
| Picardie : « Par défaut, sans autres consignes de l'enseignant responsable, il est interdit d'utiliser une IAg pour produire tout ou partie d'un rendu », déclaration placée dans la colonne « Recommandations » | Charte UPJV, CA du 12/03/2026 | Confirmée |
| Angers : refus du rapport ou du mémoire, commission disciplinaire, « sanctions pouvant aller jusqu'à l'exclusion en cas de fraude avérée », interdit de transmettre des « données internes à une entreprise d'accueil de stage » | Charte Angers (Polytech) | Confirmée |

Également confirmés : LLASIC (mise à jour de mars 2026, « Sont proscrites la rédaction automatique de paragraphes », tableau en trois blocs, soutenance « revenir sur son cheminement, ses lectures, ses prises de positions »), Lorraine (validée le 12/03/2026, annexe avec prompts numérotés, IA, développeur et date de consultation, mauvais usage « Propose-moi une problématique et des hypothèses »), et « cinq des six chartes renvoient à la consigne de l'enseignant » (seule Lorraine n'en parle pas).

### Bloquant
Aucun propre à l'article.

### À corriger
1. **Le CTA du planificateur est mal placé et mal cadré.** Il arrive juste après « Aucune charte ne laisse l'IA faire le mémoire à ta place » (l. 51) et juste avant le passage où Lorraine range « Propose-moi une problématique » parmi la sous-traitance de la réflexion. Vendre un outil qui « rédige un plan » à cet endroit ressemble à un clin d'œil, et la Picardie interdit par défaut de produire une partie d'un rendu. Correctif : déplacer le CTA après la puce « Aider à structurer un plan » (l. 61), puis ajouter au texte du CTA « Si ta charte l'autorise, déclare-le comme aide à la structuration. »
2. **Le chapô généralise un peu trop.** Ligne 30 : « Les six chartes … demandent toutes de déclarer ton usage de l'IA ». La Picardie ne fait que le recommander, ce que l'article dit lui-même à la ligne 49. Correctif : « …demandent ou recommandent toutes de déclarer ton usage de l'IA ».
3. **Le registre juridique est recopié tel quel.** Ligne 106 : « La fraude peut se caractériser par l'incapacité de l'étudiant à expliquer ou justifier son travail, notamment lors d'une interrogation orale ou écrite. » Correctif : « Concrètement : si tu ne sais pas expliquer ton travail à l'oral, ça peut suffire à caractériser la fraude. Un détecteur d'IA, lui, ne suffit pas comme preuve. »
4. **L'article finit en queue de poisson.** La dernière phrase porte sur la soutenance LLASIC, sans prochaine étape. Correctif : terminer par une ligne d'action (« Avant d'ouvrir un outil : trouve ta charte, demande la consigne par écrit, garde ton journal d'IA »). Ajouter le lien vers D2 `declarer-ia-memoire` quand il existera.

### Mineur
- Ligne 59 : « parce que l'IA peut inventer des références ». Les chartes parlent d'hallucinations et de faits inventés, pas spécialement de références. Correctif : « parce que l'IA peut inventer des faits et des sources ».
- Ligne 36, phrase sans verbe : « Pour chacun, la règle qui s'applique à un écrit rendu hors examen sur table, comme un mémoire ou un rapport. » Correctif : « Pour chacun, on a relevé la règle qui vaut pour un écrit rendu à la maison : mémoire, rapport. »
- Pas de hub : `pilier: ia-memoire` affiche « IA et écrits académiques » sans lien, et le fil d'Ariane s'arrête à Blog. C'est prévu (D0 en vague 1), mais l'article reste orphelin de pilier jusque-là.
- Méthode : une phrase sur le choix des six chartes (trouvées en ligne le 06/11, datées 2025-2026, sans visée représentative).

### Les 3 pires phrases (ton)
1. « La fraude peut se caractériser par l'incapacité de l'étudiant à expliquer ou justifier son travail, notamment lors d'une interrogation orale ou écrite. » (l. 106)
2. « Pour chacun, la règle qui s'applique à un écrit rendu hors examen sur table, comme un mémoire ou un rapport. » (l. 36)
3. « Le droit d'utiliser l'IA pour ton mémoire dépend de ton établissement, parce que chaque université, et parfois chaque UFR ou chaque master, fixe sa propre règle dans une charte IA. » (l. 30). Correctif : « Ça dépend de ta fac : chaque université, parfois chaque UFR ou chaque master, a sa propre charte IA. »

À garder : « Tu ne peux donc pas transposer ce que fait un ami dans une autre fac. »

### Faits MemoFlow
Le CTA (« Le planificateur de MemoFlow rassemble ton contexte et rédige un plan, ajouté comme section de ton document ») est conforme à `product-facts.md`. Aucune autre affirmation sur le produit. Pour le cadrage, voir le point 1 de « À corriger ».

---

## SEO de page (seo-page), synthèse
| | Hub | Retrouver | IA |
|---|---|---|---|
| Title (car.) | 59 ✔ | 52 ✔ | 56 ✔ |
| Meta description (car.) | 152 ✔ (chiffre « 7 » à corriger) | 154 ✔ | 146 ✔ |
| H1 unique / Hn | ✔ / ✔ | ✔ / ✔ (H3 par outil) | ✔ / ✔ |
| Liens internes | 2 satellites + CTA | hub ×2 + fil d'Ariane | 1 latéral (hub D0 absent) |
| Schema | BlogPosting, BreadcrumbList, ItemList, citation | BlogPosting, BreadcrumbList (3 niveaux), citation | BlogPosting, BreadcrumbList, citation |
| Manque | image, twitter:card | idem | idem + hub |
