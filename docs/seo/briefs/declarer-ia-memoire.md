# Brief D2 : déclarer l'usage de l'IA dans un mémoire

Relevé du 06/11/2026. Mode : nouvelle page. Pilier `ia-memoire`, spoke S2 du cluster `docs/seo/clusters/ia-ecriture-academique.md`. La partie « format de citation par norme » revient à D3 `citer-chatgpt-memoire` (vague 2, pas de lien).

**SERP.** Revérifiée avec WebSearch (3 requêtes, géolocalisées US, pas google.fr) : « déclarer l'usage de l'IA dans un mémoire modèle déclaration », « déclaration d'utilisation de l'IA générative mémoire master université », « où mentionner utilisation ChatGPT dans son mémoire annexe introduction ». Sources : texte complet extrait des PDF avec `pdftotext`, et du DOCX de Paris 1 avec `textutil` (WebFetch ne lit pas le DOCX).

## Content Brief : déclarer l'usage de l'IA dans un mémoire

### Search Intent
Informationnelle, how-to avec modèle. L'étudiant (L3-M2, souvent alternant) a utilisé ou va utiliser l'IA, sait qu'il faut le dire, et cherche quoi écrire et où le mettre. La SERP récompense des formulaires (DOCX, PDF) d'établissements, presque tous suisses ou québécois (UNIGE, Fribourg, Neuchâtel, Laval, INRS). Côté France : le formulaire de l'ED 441 de Paris 1 et la charte de Lorraine. La variante « où écrire qu'on a utilisé ChatGPT » est polluée par l'aide d'OpenAI sur la fonction « mémoire » de ChatGPT : personne n'y répond.

### Competitor Analysis
| # | URL | Sections clés | Mots est. | Score | Manque principal |
|---|-----|---------------|-----------|-------|------------------|
| 1 | ed-histoire-de-l-art.pantheonsorbonne.fr (formulaire ED 441, DOCX) | Engagements, déclaration sur l'honneur, grille oui/non par étape | ~580 | 21/40 | Conçu pour les thèses, DOCX, aucune explication |
| 2 | unige.ch/sciences (modèles de déclaration) | Modèles FR et EN | n.c. | 20/40 | Suisse, propre à une faculté |
| 3 | fesp.ulaval.ca (déclaration obligatoire, PDF) | Déclaration dans l'avant-propos | n.c. | 19/40 | Québec, règle locale |
| 4 | the-intelligence-academy.com/blog/intelligence-artificielle-rediger-memoire | Guide général IA + FAQ | ~3 000 | 22/40 | Une seule phrase-modèle, pas de comparaison des formats |

### Content Gaps and Opportunities
- **Topic gap** : personne ne compare où les établissements français veulent la déclaration. Angers : section dédiée, annexe, note de bas de page ou introduction. Lorraine : mention dans le texte + déclaration en annexe. LLASIC : normes bibliographiques ou tableau. UPEC : outil, finalité, passages.
- **Topic gap** : déclarer un usage et citer un passage sont deux choses. LLASIC demande les deux (référencer les passages issus de l'IA, déclarer les outils dans un tableau). Lorraine donne la phrase à mettre dans le texte. Aucune page ne l'explique.
- **Depth gap** : les blogs donnent une phrase, pas un modèle complet. Ici, un modèle composite construit à partir des champs que les chartes demandent.
- **Depth gap** : le journal d'IA (UPEC) et les prompts numérotés (Lorraine) sont la matière première de la déclaration. Montrer un carnet d'exemple.
- **Quality gap** : modèles étrangers ou non datés. Ici, textes français datés de 2025-2026.

### Winning Outline

**H1 :** = title
**URL Slug :** /blog/declarer-ia-memoire/
**Target Word Count :** ~1 400 mots (fourchette du cluster : 1 200 à 1 500)

**Chapô (~90 mots), FS target.** Quoi déclarer : l'outil, ce que tu lui as demandé, les parties concernées, et les prompts si ta formation l'exige. Où : ça dépend de l'établissement (annexe, section dédiée, intro, note). Primaire dans la 1re phrase. Lien hub tôt, lien `/blog/ia-autorisee-memoire/` (« d'abord vérifier que l'usage est permis »).

**H2 1 : Que faut-il déclarer, et où, selon les chartes ? (~400 mots).** Tableau FS target, 6 lignes : établissement et texte, ce qu'il faut indiquer, où, format. UCA, UPEC, Angers, LLASIC, Lorraine, Paris 1 ED 441. Puis 2 constats courts : le contenu se ressemble (outil + usage + parties), l'emplacement varie ; à Clermont c'est l'enseignant qui formalise la façon de signaler l'IA pour chaque travail. Finir sur une phrase qui amène le CTA générique (noter ses usages section par section). Secondaire : « mention IA mémoire ».

**H2 2 : Un modèle de déclaration d'usage de l'IA à adapter (~350 mots).** Annoncé comme modèle composite, pas comme formulaire officiel, à confronter aux consignes de l'établissement. Bloc : en-tête (nom, titre, formation, encadrant), tableau usage/outil et version/parties/commentaire en trois blocs (LLASIC), engagements (Paris 1 : responsable du contenu, sources lues, contenus vérifiés), date et signature. Variante « aucun outil utilisé » (Paris 1 : « J'ai utilisé / je n'ai pas utilisé »). Secondaire : « déclaration IA mémoire modèle ».

**H2 3 : Déclarer un usage ou citer un contenu généré : quelle différence ? (~300 mots).** Déclaration = vue d'ensemble, en annexe ou section. Citation = au passage, dans le texte (LLASIC : référencer selon les normes ; Lorraine : « Ce paragraphe a été reformulé à l'aide d'un outil d'IA, cf. prompt n°1 en annexe »). Troisième cas : une source trouvée via l'IA se cite comme la source d'origine, vérifiée (UCA, Paris 1). Rappel : citer un paragraphe généré ne le rend pas permis (LLASIC proscrit la rédaction automatique de paragraphes). Le format par norme renvoie à un futur article, pas de lien. Secondaire : « citer ChatGPT mémoire ».

**H2 4 : Tenir un journal d'IA pour remplir la déclaration (~250 mots).** UPEC (journal : prompts, sorties, corrections), Lorraine (prompts numérotés, IA, développeur, date de consultation), Paris 1 (versions des outils). Carnet d'exemple fictif en tableau. Alternants : pas de données internes de l'entreprise dans le prompt (Angers), lien `/blog/rapport-d-alternance/`.

**H2 5 : Si ta formation ne donne aucun modèle (~120 mots).** Demander à l'encadrant (Paris 1, LLASIC). Angers : l'absence de mention peut entraîner un refus du mémoire. Ligne d'action finale.

### Recommended Meta Tags
**Title** : `Déclarer l'usage de l'IA dans son mémoire : modèle à adapter` (60 car.)
**Meta Description** : `Ce que 6 chartes françaises demandent de déclarer et où le mettre, un modèle de déclaration à adapter, et la différence avec citer un texte généré.` (148 car.)

### Unique Angle and Information Gain
Le seul guide français qui met côte à côte ce que six établissements demandent de déclarer et à quel endroit du mémoire, avec un modèle construit à partir de leurs champs communs et la distinction, absente de la SERP, entre la déclaration globale et la mention au passage d'un contenu généré.

### E-E-A-T Requirements
- Chaque texte nommé avec établissement, périmètre et date, lien vers la source.
- Citations courtes et littérales.
- Le modèle est annoncé comme composite ; le carnet comme fictif.
- Paris 1 ED 441 : préciser que le formulaire vise les thèses.
- Aucune généralisation au-delà des textes lus.

### Internal Linking Opportunities
- `/blog/ia-memoire/` (hub, obligatoire) : « utiliser l'IA pour son mémoire », chapô.
- `/blog/ia-autorisee-memoire/` (obligatoire) : « l'IA est-elle autorisée pour un mémoire », chapô.
- `/blog/rapport-d-alternance/` : section journal, données de l'entreprise.

### CTA
`generique` (espace en sections, sauvegarde automatique). MemoFlow au plus une fois dans le corps, zéro de préférence.

### Sources retenues (ouvertes et lues le 06/11/2026)
1. UCA, charte, CA du 27/06/2025 : https://www.uca.fr/medias/fichier/delib-ca-20250627-04-charte-ia_1751379185214-pdf
2. UPEC, charte, CA du 13/03/2026 : https://www.u-pec.fr/medias/fichier/del-ca-approbation-de-la-charte-relative-a-l-usage-de-l-intelligence-artificielle-au-sein-de-l-universite_1774866747115-pdf
3. Angers (Polytech) : https://bienvenue.univ-angers.fr/wp-content/uploads/sites/30/2026/06/POLYTECH-Charte-IA.pdf
4. UGA, UFR LLASIC, mars 2026 : https://llasic.univ-grenoble-alpes.fr/ufr-llasic/charte-ia--1567289.kjsp
5. Lorraine, Master Urbanisme (Metz), 12/03/2026 : https://shs-metz.univ-lorraine.fr/wp-content/uploads/2026/03/charte-des-bons-usages_ia.pdf
6. Paris 1, ED 441 histoire de l'art, formulaire de déclaration (DOCX, septembre 2025 d'après l'URL) : https://ed-histoire-de-l-art.pantheonsorbonne.fr/sites/default/files/2025-09/declaration_ia_ed441.docx

Écartées : UPJV (renvoie aux consignes, rien sur le format), UFR SEN de Reims (une phrase sur la déclaration), Laval, UNIGE, Fribourg, Neuchâtel (hors France), balise de Sherbrooke (Québec).
