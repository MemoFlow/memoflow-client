## Content Brief : plan rapport de stage (C1, vague 2)

Brief du 07/11/2026. Pilier `rapport-de-stage`, spoke du hub `/blog/rapport-de-stage/` (écrit en parallèle). CTA `planificateur`.

### Search Intent
Informationnelle, structure : l'étudiant veut un plan qu'il peut recopier, avec ce qu'on met dans chaque partie et combien de pages. La SERP (WebSearch du 07/11, moteur US en français, pas google.fr) mélange des PDF d'établissements (ESADHAR, IEDES Paris 1, ESA, Sciences Po Lille, universités algériennes), Scribbr (PDF), Digischool, L'Étudiant (version collège) et des consignes de collège. Cible : stagiaire de L3, M1 ou M2. Le public collège et BTS est écarté dès le title et le premier paragraphe.

### Competitor Analysis
| # | URL | Sections | Mots (est.) | Score | Manque principal |
|---|-----|----------|-------------|-------|------------------|
| 1 | digischool.fr/articles/orientation/stage/sommaire-rapport-de-stage/ | à quoi sert le sommaire, définir son plan, réaliser le sommaire | ~700 | 18/40 | Plan en 7 parties sans longueur ni source, niveau non précisé (maj 07/2023) |
| 2 | cdn.scribbr.com/.../La-structure-dun-rapport-de-stage.pdf | Diaporama en images | n.d. | 20/40 | Texte en image, pas de consigne d'école citée |
| 3 | letudiant.fr/college/rapport-de-stage-comment-faire-un-plan-detaille.html | Plan détaillé | n.d. | hors cible | Stage de 3e |
| 4 | iedes.pantheonsorbonne.fr/.../consignes_rapport_de_stage.pdf | Plan type M2 IEDES | ~4 200 | 26/40 | Propre à un master, pas de longueur par partie |
| 5 | esadhar.fr plan pour un rapport de stage | Plan d'école d'art | court | 15/40 | Propre à une école |

### Content Gaps
- **Aucun guide éditorial ne donne de longueur par partie** venant d'une consigne réelle. Seul le master PSTO de Reims en donne une, partie par partie : c'est le cœur de la page.
- Aucun ne compare licence et master ni ne dit ce qui compte dans le nombre de pages (question relevée sur info.fr, cf. flow-find.md).
- Les erreurs que les établissements signalent (description trop longue, copier-coller de la plaquette, annexes qui remplacent le texte) ne sont pas citées.

### Sources retenues (ouvertes le 07/11/2026)
Licence :
- Université Lyon 1, licence STS informatique, note sur le rapport de stage de L3 (non datée, en ligne sur la page d'un enseignant) : résumé 0,5 à 1 page, présentation de l'entreprise 3 pages max, 25 pages max, « la borne inférieure peut raisonnablement être fixée à 15 pages ». Problématique demandée dans le résumé. Pas de soutenance.
- Université Paris Descartes, UFR maths-info, L3 informatique (MIAGE), cadrage 2020-2021 : 30 pages max hors annexes, fiche de bilan et de synthèse d'1 page max, annexes « dans une dizaine de pages au maximum », le tuteur « n'est pas censé lire ces annexes ».
- Sciences Po Lille, 3e année, parcours stage(s), 2020-2021 : 25 pages min hors annexes si stage < 3 mois, 40 pages min à partir de 3 mois ; intro, 1re partie bilan de l'expérience, 2e partie problématisée au choix, conclusion, sources, annexes dont entretien métier (~2 pages). Le responsable enseignant « doit notamment valider le plan ». 3A d'IEP = niveau bac+3, à dire.
Master :
- Université de Reims Champagne-Ardenne, master PSTO, consignes 2023 (ouvert avec curl : WebFetch échoue sur le certificat du site, le PDF s'ouvre et se lit) : M1 15-20 pages, M2 20-25, de l'intro à la conclusion ; intro ~1 p., institution 2-3 p., tâches quotidiennes 4-6 p., mission principale 5-9 p., bilan personnel 2-5 p., conclusion ~1 p. ; résumé 150 mots max ; annexe problématique obligatoire 1-2 p. (M1) / 3-4 p. (M2).
- Inalco, master Relations internationales, vademecum stage 2025-2026 : 25-30 pages hors annexe, plan en 3 points (présentation, analyse des apports, impact sur le projet pro), erreur « 20 pages sur 30 de description », intro qui « se termine toujours par une annonce de plan ».
- IEDES, Université Paris 1, consignes rapport de stage du master (M2) : environ 40 pages hors annexes, police 12 ; plan type (résumé + mots-clés, table, remerciements facultatifs, contextualisation, intro, chapitres, conclusion, bibliographie, annexes).

Écartés : ULCO L3 Droit (2016-2017, stage de 5 jours), Lorraine M2 ME et Montpellier M1 (pas lus en entier), univ. algériennes (hors public FR).

### Winning Outline
**H1 :** (title) · **Slug :** /plan-rapport-de-stage · **Cible :** ~1 600 mots (Digischool ~700)

- Chapô (60 mots) : la trame en une phrase, la fourchette de pages des 6 consignes, renvoi au hub. Mot-clé dans la 1re phrase.
- H2 « Quel est le plan type d'un rapport de stage en licence ou en master ? » (FS target, 350 mots) : tableau partie / contenu / longueur indiquée et par qui. Annoncé comme synthèse des 6 consignes. Finit sur une phrase qui amène le CTA planificateur (les titres viennent de tes missions).
- H2 « Combien de pages compte un rapport de stage ? » (200 mots) : liste par établissement, ce qui est exclu du décompte.
- H2 « Que mettre dans chaque partie ? » (450 mots) : H3 intro, présentation, missions (lien presenter-ses-missions-rapport), bilan, conclusion. Chaque point attribué.
- H2 « Deux variantes de plan, en exemples » (300 mots) : plan par missions, plan par compétences, tous deux fictifs et annoncés comme tels ; mention de la 2e partie problématisée de Sciences Po Lille ; lien rapport-de-stage-2-mois pour choisir.
- H2 « Quelles erreurs les établissements signalent-ils ? » (200 mots) : Inalco 20/30, Lyon 1 copier-coller, Reims et Descartes annexes, Inalco « très formateur ».
- H2 « Questions fréquentes » (200 mots) : annexes dans le décompte, problématique (3 sur 6), qui valide le plan, différence avec le plan de mémoire (lien).

### Meta
- Title : « Plan de rapport de stage : le plan type en licence et master » (≤ 60)
- Description : ≤ 160, avec plan type, pages par partie, 6 établissements.

### Information Gain
Les longueurs par partie et les fourchettes de pages viennent de six consignes nommées (3 licence ou bac+3, 3 master), avec ce qui compte dans le décompte. Aucun concurrent de la SERP ne le fait.

### E-E-A-T
Auteur nommé (gabarit), date, 6 sources primaires datées, attribution nominative de chaque chiffre, consigne de l'école présentée comme prioritaire.

### Liens internes
- Hub : /blog/rapport-de-stage/ (ancre « rapport de stage », chapô).
- /blog/presenter-ses-missions-rapport/ (section missions).
- /blog/rapport-de-stage-2-mois/ (variantes : choisir missions ou compétences).
- /blog/plan-de-memoire/ (FAQ différence).

### Règles du brief à ne pas inventer
- Pas de modèle téléchargeable, pas de modèle dans l'app.
- Aucune longueur pour la page de garde, les remerciements ou la bibliographie : aucune source ne la donne.
- « Le plan chronologique est à éviter » : pas dans mes sources, ne pas l'écrire comme règle.
