# Brief D0 : utiliser l'IA pour son mémoire (hub du pilier IA)

Relevé du 06/11/2026. Mode : nouvelle page. Pilier `ia-memoire`, `hub: true`, cluster `docs/seo/clusters/ia-ecriture-academique.md` (hub).

**SERP.** Revérifiée avec WebSearch le 06/11/2026 (géolocalisé US, pas google.fr, sans People Also Ask). Le résultat confirme le relevé du cluster : la page est tenue par des documents institutionnels (page de l'ICHEC en Belgique, fiche de cours « Cadrage mémoire et usages de l'IA » de l'IAE Savoie Mont Blanc, charte de l'UFR LLASIC, formulaire de déclaration de l'ED 441 de Paris 1), un briefing PDF (Choiseul) et des blogs commerciaux (The Intelligence Academy, bookfoundry.ai, qui confond avec les mémoires autobiographiques). Aucun guide français à jour qui suive les étapes du mémoire avec ses sources.

Les chartes ont été ouvertes avec WebFetch et lues en texte extrait (pdftotext), sauf la fiche Savoie Mont Blanc, ouverte mais vide de contenu (simple fiche de cours), donc écartée.

## Content Brief : utiliser l'IA pour son mémoire

### Search Intent
Informationnelle large, « comment faire » plus « jusqu'où ». Le lecteur (L3-M2, souvent alternant) a déjà ChatGPT ouvert et veut savoir à quelles étapes du mémoire il peut s'en servir sans risque. Il ne connaît pas sa charte. Google récompense ici des documents de cadrage : un guide par étape, daté et sourcé, a la place.

### Competitor Analysis
| # | URL | Sections clés | Mots est. | Score | Manque principal |
|---|-----|---------------|-----------|-------|------------------|
| 1 | webresearch.ichec.be/donatien_grolaux/redaction_tips/ia_thesis | Usages utiles, usages interdits | ~900 | 24/40 | Belge, une seule école, aucune source citée sur les limites |
| 2 | llasic.univ-grenoble-alpes.fr/ufr-llasic/charte-ia--1567289.kjsp | Règles, déclaration en tableau | ~800 | 22/40 | Une UFR, pas de vue par étape |
| 3 | the-intelligence-academy.com/blog/intelligence-artificielle-rediger-memoire | Outils, prompts | n.c. | 15/40 | Commercial, pousse des outils, aucune charte |
| 4 | ed-histoire-de-l-art.pantheonsorbonne.fr (formulaire DOCX) | Déclaration | ~300 | 12/40 | Formulaire seul, aucun conseil |

### Content Gaps and Opportunities
- **Topic gap** : personne n'organise les règles par étape du mémoire (recherche documentaire, problématique et plan, reformulation, relecture, rédaction) en nommant la charte derrière chaque règle.
- **Topic gap** : les références inventées par l'IA sont évoquées partout, chiffrées nulle part. Deux études ouvertes le font (Walters et Wilder 2023, Cabezas-Clavijo et Sidorenko-Bautista 2025).
- **Depth gap** : le plan. L'UPEC et le master lorrain admettent l'aide à la structuration, la charte lorraine range « Propose-moi une problématique et des hypothèses » parmi les mauvais usages, et l'UFR LLASIC demande que la structure du texte soit entièrement l'œuvre de l'étudiant tout en prévoyant « Aider à structurer ses idées » dans son tableau de déclaration. Personne ne montre cette tension.
- **Quality gap** : aucune page ne rattache la déclaration au code européen de conduite pour l'intégrité scientifique (ALLEA 2023), que cite la charte d'Angers.

### Winning Outline

**H1 :** = title (le gabarit l'affiche)
**URL Slug :** /blog/ia-memoire/
**Target Word Count :** ~2 000 mots. Le cluster proposait 2 500 à 3 500, mais la synthèse par charte (D1) et le modèle de déclaration (D2) vivent ailleurs : le hub les résume et les lie, sans les recopier.

**Chapô sans titre (~80 mots).** Réponse : oui pour chercher, structurer, corriger, si la formation l'autorise et si tu le déclares ; non pour rédiger à ta place, dans toutes les chartes lues. Lien tôt vers `/blog/ia-autorisee-memoire/`. Primaire « utiliser l'IA pour son mémoire » dans la 1re phrase.

**H2 1 : Quels usages de l'IA les chartes acceptent-elles pour un mémoire ? (~350 mots). FS target.** Tableau usage × ce qu'écrivent les chartes × source : recherche documentaire, problématique et plan, reformulation, correction de langue, traduction, rédaction, données d'enquête, données de l'entreprise. Une phrase sur le choix des 5 chartes. Finit sur l'aide au plan, à déclarer comme aide à la structuration si la charte et le directeur l'acceptent (le CTA planificateur tombe juste après, cadré par cette phrase, cf. relecture pilote D1 point 1).

**H2 2 : L'IA peut-elle t'aider dans ta recherche documentaire ? (~350 mots).** Ce que disent UCA (état de l'art, vérifier et citer les sources) et Lorraine (synthèse bibliographique admise, mais « Donne-moi une bibliographie… » renvoie des références erronées). Les chiffres des deux études, datés, avec les modèles testés. Méthode de vérification courte (ouvrir chaque référence dans un catalogue, confronter aux sources primaires, UPEC).

**H2 3 : Peut-on faire sa problématique et son plan avec l'IA ? (~300 mots).** La tension UPEC / Lorraine / LLASIC. Lien `/blog/problematique-de-memoire/` et `/blog/plan-de-memoire/`.

**H2 4 : Reformuler et corriger son texte avec l'IA, qu'est-ce qui est toléré ? (~250 mots).** Correction admise (UPEC, Lorraine « en conservant le style de l'auteur »), reformulation à déclarer (exemple de mention lorraine, ligne « Reformuler » LLASIC). Toute source reprise reste à citer (LLASIC, Angers). Aucun mot sur la détection.

**H2 5 : Pourquoi aucune charte n'accepte que l'IA rédige ton mémoire ? (~300 mots).** LLASIC, UPEC, Angers, UCA. Données fabriquées. Données de l'entreprise pour les alternants (Angers, UPEC), lien `/blog/rapport-d-alternance/`.

**H2 6 : Que faut-il déclarer quand on utilise l'IA ? (~250 mots).** Résumé : outil, finalité, passages (UPEC), prompts en annexe (Lorraine), journal d'IA (UPEC). ALLEA : cacher l'usage = pratique inacceptable. Lien `/blog/declarer-ia-memoire/` pour le modèle. Fin sur 3 actions.

Pas de section « meilleures IA », aucun outil recommandé (la charte lorraine en cite, on ne relaie pas). La liste des articles du pilier est générée par le gabarit.

### Recommended Meta Tags
**Title** (59 car.) : `Utiliser l'IA pour son mémoire de fin d'études : les règles` (« mémoire » qualifié, sinon « IA + mémoire » ramène la RAM)
**Meta Description** (~150 car.) : `Recherche, plan, reformulation, relecture, rédaction : ce que 5 chartes d'universités acceptent, ce qu'il faut déclarer et où l'IA invente des sources.`

### Unique Angle and Information Gain
Le seul guide français qui suit les étapes du mémoire et rattache chaque règle à une charte nommée et datée (UCA, UPEC, Angers, UFR LLASIC, master de Lorraine), avec les taux mesurés de références inventées par les chatbots (55 % pour GPT-3.5 et 18 % pour GPT-4 en 2023 ; 39,8 % de références erronées ou inventées sur 8 chatbots en 2025) et la divergence des chartes sur l'aide au plan.

### E-E-A-T Requirements
- Chaque règle attribuée à son établissement dans le texte, citations littérales courtes.
- Études datées, modèles testés nommés, prépublication signalée comme telle.
- « les chartes lues ici », jamais « toutes les universités ».
- MemoFlow : zéro mention dans le corps, le CTA suffit. Rien qui le présente comme autorisé par les écoles.

### Internal Linking Opportunities
- `/blog/ia-autorisee-memoire/` (obligatoire, chapô) : « ce que permettent les chartes IA, université par université ».
- `/blog/declarer-ia-memoire/` (obligatoire, H2 6) : « modèle de déclaration ».
- Latéraux (3 max) : `/blog/plan-de-memoire/`, `/blog/problematique-de-memoire/`, `/blog/rapport-d-alternance/`.

### CTA
`planificateur`, inséré avant le 2e H2.

### Sources retenues (ouvertes le 06/11/2026)
1. UCA, charte du bon usage de l'IAG, CA du 27/06/2025.
2. UPEC, charte relative à l'usage de l'IA, CA du 13/03/2026 (scan avec couche texte, art. 4 et 5.2).
3. Université d'Angers, charte d'utilisation de l'IA générative (Polytech).
4. UGA, UFR LLASIC, charte IA, mise à jour mars 2026.
5. Université de Lorraine, master Urbanisme et Aménagement (Metz), charte du 12/03/2026, annexes 1 et 2.
6. Walters et Wilder, *Scientific Reports*, 7/09/2023 (PMC10484980).
7. Cabezas-Clavijo et Sidorenko-Bautista, arXiv 2505.18059, 23/05/2025 (prépublication).
8. ALLEA, European Code of Conduct for Research Integrity, édition révisée 2023 (PDF).

Écartées : fiche IAE Savoie Mont Blanc (aucun contenu sur les usages), page d'aide OpenAI (403), Las-Vergnas *Alliage* 2024 (résumé sans chiffres), ICHEC (belge).
