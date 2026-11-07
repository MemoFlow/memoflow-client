# Brief D3 : citer ChatGPT dans un mémoire

Relevé du 07/11/2026. Mode : nouvelle page. Pilier `ia-memoire`, spoke 4.3 du cluster `bibliographie-normes.md`, confié à la grappe IA (`ia-ecriture-academique.md`, S2 côté format). D2 `declarer-ia-memoire` garde la déclaration d'usage : ici on la résume en deux phrases et on y renvoie.

**SERP.** Revérifiée avec WebSearch (5 requêtes, géolocalisées US, pas google.fr) : « citer ChatGPT dans un mémoire norme APA », « APA Style blog citing generative AI references 2025 », « citer une IA générative ISO 690 bibliothèque universitaire guide », « citer ChatGPT norme Harvard bibliographie exemple bibliothèque université », « BU guide citer contenu généré par IA ISO 690 ». Le blog APA bloque WebFetch et curl (Incapsula) : lu en entier avec agent-browser en mode fenêtre, texte extrait le 07/11/2026. Chartes relues avec `pdftotext`.

## Content Brief : citer ChatGPT dans un mémoire

### Search Intent
Informationnelle, how-to avec modèles à copier. L'étudiant (L3-M2) a une phrase ou une idée tirée de ChatGPT et veut la bonne référence, dans la norme que sa formation impose. La SERP mélange une page d'intégrité canadienne (Moncton), l'aide de Compilatio, des blogs (ClickUp, Editor World) et des LibGuides anglophones. Le format qui gagne : un modèle par norme, un exemple rempli, puis les cas limites (prompt, lien de partage).

### Competitor Analysis
| # | URL | Sections clés | Mots est. | Score | Manque principal |
|---|-----|---------------|-----------|-------|------------------|
| 1 | umoncton.ca/integrite/print/70 | Citer le texte de ChatGPT, créer une référence, autres questions | ~600 | 20/40 | Format APA de 2023 (archivé par l'APA en septembre 2025), APA seul |
| 2 | support.compilatio.net (Comment citer ChatGPT) | Citation dans le texte, référence | n.c. (403) | n.c. | Vu en extrait : « (ChatGPT, OpenAI, 2025) », forme absente du blog APA |
| 3 | clickup.com/fr-FR/blog/244501/comment-citer-les-outils-dia | Plusieurs styles | n.c. | n.c. | Éditeur de logiciel, pas de source institutionnelle |
| 4 | bu.univ-amu.libguides.com (Comment citer les IA ?) | Gabarit APA, transcription, invite, date | ~300 | 22/40 | Gabarit APA à numéro de version, rien sur Harvard ni ISO 690 |

### Content Gaps and Opportunities
- **Quality gap (le plus net)** : presque toute la SERP francophone donne encore le format APA de 2023 (« ChatGPT (Mar 14 version) [Large language model] »). Le blog APA l'a remplacé le 9 septembre 2025 : on cite la conversation (date complète, titre, lien de partage) ou l'outil, sans numéro de version.
- **Topic gap** : Harvard n'a pas de modèle unique. UCL (pas d'auteur, type « communication personnelle ») et UCD (le créateur de l'outil en auteur) se contredisent. Personne ne le montre côte à côte.
- **Topic gap** : ISO 690. HEIA-FR (Fribourg) donne un modèle « logiciel » rempli. Aucune page éditoriale française n'en donne.
- **Topic gap** : où mettre le prompt. APA 2025 : jamais dans la référence, dans le texte ou en annexe. Lorraine : prompts numérotés en annexe, renvoi « cf. prompt n°1 en annexe ».
- **Topic gap** : le lien de partage. L'APA le demande dans la référence d'une conversation ; le tableau de paramètres de la charte de l'UPEC recommande de désactiver le partage par défaut. UCD : sans lien, transcription en annexe. APA : citer l'outil en général quand citer la conversation serait inapproprié.

### Winning Outline

**H1 :** = title
**URL Slug :** /blog/citer-chatgpt-memoire/
**Target Word Count :** ~1 500 mots (cluster : 1 200 ; on ajoute Harvard, ISO 690 et le lien de partage)

**Chapô (~90 mots), FS target.** APA depuis septembre 2025 : OpenAI en auteur, date de la conversation, titre de la conversation, [Generative AI chat], ChatGPT, lien de partage. Dans le texte (OpenAI, 2025). Le prompt ne va pas dans la référence. Harvard et ISO 690 : pas de modèle unique, guide de la BU. Lien hub `/blog/ia-memoire/` tôt.

**H2 1 : Comment citer ChatGPT en norme APA ? (~380 mots).** Deux cas du blog APA : une conversation précise (gabarit + exemple du blog), l'outil en général (gabarit + exemple). Quand choisir l'un ou l'autre (APA : conversation quand c'est utile au lecteur ; outil pour relire, corriger, traduire son propre texte). Exemple fictif en français, annoncé comme fictif. Plus de numéro de version (APA 2025) ; l'ancien format circule encore, y compris dans le guide de la BU d'Aix-Marseille (mis à jour le 1er juillet 2026). Finir sur une phrase qui amène le CTA générique (noter dans la section la conversation qui l'a nourrie). Secondaire : « citer une IA APA ».

**H2 2 : Où mettre le prompt quand tu cites ChatGPT ? (~280 mots).** APA 2025 : prompt hors référence (4 raisons, en citer 2), dans le texte ou en annexe, avec l'enseignant. Phrase-modèle adaptée de l'APA. BU d'Aix-Marseille : transcription, invite, date, annexe. Lorraine : prompts numérotés en annexe avec IA, développeur, date ; formule dans le texte. Secondaire : « citer un prompt ».

**H2 3 : Comment citer ChatGPT en norme Harvard ? (~260 mots).** Pas de Harvard unique. UCL : AI jamais auteur ni dans la liste comme source d'outil ; si la sortie doit être référencée, œuvre sans auteur, type communication personnelle ; exemple. UCD : créateur en auteur, lien de partage sinon annexe ; exemple. Lien `/blog/norme-harvard-bibliographie/`. Secondaire : « référence ChatGPT bibliographie ».

**H2 4 : Comment citer ChatGPT en ISO 690 ? (~180 mots).** HEIA-FR : l'IA n'est pas une source documentaire mais se référence comme un logiciel ; principe + exemple. LLASIC : APA ou ISO 690 selon l'enseignant.

**H2 5 : Quel format choisir pour ton mémoire ? (~150 mots), FS target.** Tableau récapitulatif (norme, guide, auteur, date, titre, lien). Règle : la norme de ta formation. Lien `/blog/bibliographie-memoire-normes/`.

**H2 6 : Faut-il partager le lien de ta conversation ChatGPT ? (~170 mots).** APA vs UPEC vs UCD vs APA « outil en général ». Alternants : Angers interdit de transmettre des données internes de l'entreprise d'accueil.

**H2 7 : Citer un texte généré ou déclarer son usage : quelle différence ? (~180 mots).** 2 phrases + lien `/blog/declarer-ia-memoire/`. Ce que les chartes disent sur le fait de citer : LLASIC (référencer les passages), Angers (citer les sources pour ne pas plagier), UCA (vérifier et citer les sources utilisées par l'IAG). Une info trouvée via ChatGPT se cite à sa source d'origine, après vérification (APA 2023 : une des 5 références n'existait pas ; UCD). Citer un paragraphe ne le rend pas permis (LLASIC). Ligne d'action finale.

### Recommended Meta Tags
**Title** : `Citer ChatGPT dans un mémoire de fin d'études : APA, Harvard` (60 car.). « mémoire » qualifié : ChatGPT a une fonction « mémoire » qui pollue la SERP.
**Meta Description** : `Le format APA de 2025 pour citer une conversation ChatGPT, les modèles Harvard et ISO 690 des BU, où mettre ton prompt, et la différence avec déclarer l'IA.` (≤ 160)

### Unique Angle and Information Gain
La seule page française à jour du format APA de septembre 2025 (conversation citée par son lien, plus de version), à côté de deux variantes Harvard contradictoires (UCL, UCD) et d'un modèle ISO 690 rempli (HEIA-FR), chacun attribué à son guide. Elle tranche aussi la question du lien de partage, que l'APA demande et que la charte de l'UPEC déconseille d'activer par défaut.

### E-E-A-T Requirements
- Chaque format attribué nommément à son guide (APA Style, UCL, UCD, HEIA-FR), avec pays et date quand elle est affichée.
- Exemples des guides recopiés à l'identique ; exemples en français annoncés comme fictifs.
- HEIA-FR présentée comme école d'ingénieurs suisse ; UCL et UCD comme bibliothèques britannique et irlandaise.
- Ne pas affirmer que la norme ISO 690 « ne prévoit rien » : aucune source institutionnelle ouverte ne le dit.
- Aucune règle tirée de Compilatio, ClickUp ou Editor World (non ouverts ou non institutionnels).

### Internal Linking Opportunities
- `/blog/ia-memoire/` (hub, obligatoire) : « utiliser l'IA pour son mémoire », chapô.
- `/blog/declarer-ia-memoire/` (obligatoire) : « déclarer l'usage de l'IA dans son mémoire », H2 7.
- `/blog/norme-harvard-bibliographie/` : « norme Harvard », H2 3.
- `/blog/bibliographie-memoire-normes/` : « choisir la norme de sa bibliographie », H2 5.

### CTA
`generique`. MemoFlow : zéro mention dans le corps. Ne pas citer l'option Harvard du produit (elle n'a aucun rapport vérifié avec la citation d'une IA).

### Sources retenues (ouvertes et lues)
1. APA Style, McAdoo, Denneny et Lee, « Citing generative AI in APA Style: Part 1—Reference formats », 9 septembre 2025 : https://apastyle.apa.org/blog/cite-generative-ai-references
2. APA Style, McAdoo, « How to cite ChatGPT », 7 avril 2023, conservé pour archive : https://apastyle.apa.org/blog/how-to-cite-chatgpt
3. UCL Library, Harvard, Generative AI (maj 29/07/2026) : https://library-guides.ucl.ac.uk/harvard/generative-ai
4. UCD Library, Harvard, Generative AI (maj 24/03/2025) : https://libguides.ucd.ie/harvardstyle/harvardgenAI
5. HEIA-FR, Guide de référencement norme ISO-690 : https://www.heia-fr.ch/media/liuhmmpg/doc_guide_iso-690.pdf
6. BU Aix-Marseille Université, Comment citer les IA ? (maj 01/07/2026) : https://bu.univ-amu.libguides.com/c.php?g=707694&p=5177673
7. UGA UFR LLASIC, charte IA (mars 2026)
8. Lorraine, master Urbanisme et Aménagement (Metz), charte (12/03/2026)
9. Angers (Polytech), charte IA
10. UPEC, charte (13/03/2026), annexe 1 tableau 2 « Partage »
11. UCA, charte (27/06/2025)

Écartées : Compilatio (403), Moncton (format 2023, Canada), ClickUp et Editor World (blogs commerciaux), USMB Moodle (exemple APA 2024 à numéro de version, redondant avec AMU), Uppsala.
