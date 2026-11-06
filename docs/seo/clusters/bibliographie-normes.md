# Grappe SEO : bibliographie et normes de citation

Relevé du 06/11/2026. Seed : « bibliographie normes ». Variantes travaillées : norme APA, Harvard, ISO 690, citer ses sources, bibliographie mémoire. Marché visé : France, google.fr, français.

## Méthode et limites (à lire avant d'utiliser la grappe)

- **Pas de volumes.** Aucun outil payant (ni DataForSEO, ni Ahrefs, ni SE Ranking). La priorité vient de l'intention de recherche et de ce que montre la SERP, pas d'un nombre de recherches mensuelles.
- **23 SERP relevées avec WebSearch.** Ce moteur est réglé sur les États-Unis : ce n'est pas google.fr. On y voit des pages tchèques, espagnoles et beaucoup de Moodle algériens (univ-bejaia, univ-msila, centre-univ-mila) que google.fr classerait sans doute plus bas. Les URLs « vues » sont celles de ces relevés, pas un top 10 google.fr vérifié.
- **Recouvrement compté sur les URLs exactes** des listes renvoyées (15 à 25 résultats par requête, donc plus large qu'un top 10). Seuils de la skill : 7+ URLs communes = même article, 4-6 = même grappe, 2-3 = lien croisé, 0-1 = séparé.
- **Scribbr.fr**, que l'on sait leader en France sur ces requêtes, n'apparaît ici qu'à travers ses PDF (`scribbr.com/wp-content/...`, `cdn.scribbr.com`) et `scribbr.co.uk`. Sa place sur google.fr reste à vérifier à la main.
- **Produit :** seule l'option « Imposer le style de citation Harvard » du Centre de contexte peut être citée (`docs/seo/product-facts.md`). Aucun article ne doit dire que MemoFlow gère APA, ISO 690 ou un autre style, ni qu'il génère des références.

## Signal principal : la SERP est tenue par les générateurs de citations

Ce n'est pas vrai partout. Le partage se fait selon la forme de la requête.

| Forme de requête | Qui occupe la SERP | Jouable pour un blog ? |
|---|---|---|
| « générateur bibliographie APA gratuit », « générateur citation Harvard », « générateur ISO 690 » | 100 % outils. Sur « générateur citation Harvard », 15 des 17 résultats sont des pages programmatiques `evernote.com/fr-fr/citation-generator/*`, le reste est codeitbro. Côté APA : evernote (×13), simplified.com, aithor.com, undetectable.ai, iotools.cloud. Côté ISO 690 : grafiati.com (2 générateurs) | **Non.** Intention transactionnelle d'outil. MemoFlow n'est pas un générateur et ne peut pas prétendre en être un |
| « citer un site internet APA », « citer un livre APA 7 », « Harvard citation site web » | Hybride. Les pages d'exemples de grafiati.com (`/fr/info/apa-7/website/`, `/fr/info/harvard/website/`, `/fr/info/harvard/examples/`), les blogs d'aithor.com, papersflow.ai et wildandfreetools, qui poussent tous vers leur générateur, plus quelques guides de BU | Difficile en tête, mais les pages d'exemples sont faibles (contenu modèle, peu de cas français). À traiter en sections H2 d'un article de norme, pas en article seul |
| « norme APA bibliographie », « norme Harvard », « norme ISO 690 » | Surtout des PDF de BU (UQO, Lyon 1, Nantes, Paris-Saclay, Reims, UCO, INSA Toulouse), plus grafiati et AFNOR pour ISO 690 | Oui, si l'article est plus clair qu'un PDF et donne des exemples français |
| Requêtes qualifiées « mémoire » / « rapport de stage » (« bibliographie normes mémoire », « citer ses sources mémoire », « quelle norme choisir pour son mémoire ») | Contenu éditorial : letudiant.fr (2 pages qui reviennent partout), aufutur.fr, thotismedia.com, planetegrandesecoles.com, copeps.fr, plus des consignes de mémoire d'universités | **Oui, c'est là qu'il faut aller.** Pages éditoriales battables, et l'audience correspond exactement à celle de MemoFlow |

**Conséquence :** toute la grappe vise les requêtes de méthode, de préférence qualifiées « mémoire », « rapport de stage » ou « alternance ». Les requêtes « générateur » sont exclues. Seule manière d'entrer sur ces requêtes : construire un vrai générateur gratuit (skill `free-tool-strategy`). C'est une décision produit, hors périmètre de cette grappe.

## Pilier (hub)

**Bibliographie de mémoire : quelle norme choisir et comment la présenter**

- **Requête cible :** bibliographie mémoire normes
- **Secondaires, fusionnées dans le hub :** quelle norme bibliographique choisir pour son mémoire ; bibliographie mémoire ; comment faire une bibliographie (SERP généraliste, collège et Vikidia, gardée en secondaire)
- **Pourquoi fusionner :** « bibliographie normes mémoire » et « quelle norme choisir » partagent au moins 8 URLs (les 2 pages letudiant, aufutur, thotismedia, planetegrandesecoles, copeps, parisnanterre, umontpellier). Au-dessus de 7, la skill impose un article unique.
- **Intention :** informationnelle large
- **Type de page dominant :** guide éditorial de méthode (letudiant, aufutur, thotismedia), entouré de PDF de consignes d'université
- **Concurrents vus :**
  - https://www.letudiant.fr/jobsstages/nos-conseils/memoire-rapport-de-stage-les-regles-de-presentation/memoire-rapport-de-stage-bibliographie-index-et-lexique.html
  - https://aufutur.fr/methodologie/bibliographie-dans-memoire/
  - https://thotismedia.com/comment-reussir-la-bibliographie-dun-memoire-de-recherche-exemples-et-conseils-pratiques/
- **Slug :** `/blog/bibliographie-memoire-normes`
- **Gabarit :** guide complet, 2 500 à 3 000 mots
- **Angle :** répondre à « laquelle choisir » dès le premier écran (d'abord la consigne de l'école, sinon APA ou Harvard ; Vancouver en santé), puis un tableau APA / Harvard / ISO 690 avec le même livre cité dans chaque style, la place de la bibliographie (après la conclusion, avant les annexes) et la règle « seulement les sources réellement utilisées ».
- **Mention produit autorisée :** l'option « Imposer le style de citation Harvard ». Rien d'autre.

## Grappe 1 : choisir et appliquer une norme

### 1.1 Norme Harvard
- **Requête cible :** norme Harvard bibliographie
- **Secondaires :** norme Harvard exemple, citer un site web Harvard, citer un mémoire Harvard
- **Intention :** informationnelle (explication de concept + exemples)
- **Type de page dominant :** pages d'exemples de générateur (grafiati) et PDF étrangers (Italie, Portugal, Allemagne). Très peu de guides éditoriaux en français
- **Concurrents vus :**
  - https://www.grafiati.com/fr/info/harvard/examples/
  - https://papersflow.ai/fr/blog/guide-complet-des-references-harvard
  - https://learning-center.hec.edu/wp-content/uploads/2022/10/Rediger-des-bibliographies-HEC-Paris.pdf
- **Slug :** `/blog/norme-harvard-bibliographie`
- **Gabarit :** explication avec exemples, 1 500 à 1 800 mots
- **Pourquoi en tête :** c'est la seule norme que le produit gère (« Imposer le style de citation Harvard »), donc le seul article où le lien vers MemoFlow est légitime. Il n'existe pas de norme Harvard officielle unique, et presque aucune page française ne l'explique : c'est l'angle à prendre.

### 1.2 Norme APA (7e édition)
- **Requête cible :** norme APA bibliographie
- **Secondaires, en H2 :** citation dans le texte APA, citer un site internet APA, citer un livre APA 7
- **Intention :** informationnelle (mode d'emploi)
- **Type de page dominant :** PDF de BU (UQO, Lyon 1, Nantes, Lorraine, UCO), plus grafiati et digitiz en générateur
- **Concurrents vus :**
  - https://uqo.ca/sites/default/files/23388a9867f98606f5743209f6ebe6b234d06c55normes-apa-7e-edition.pdf
  - https://portaildoc.univ-lyon1.fr/medias/fichier/guide-bibliographique-normes-apa-7th-zotero-07-2024_1721818393894-pdf
  - https://www.grafiati.com/fr/info/apa-7/website/
- **Slug :** `/blog/norme-apa-bibliographie`
- **Gabarit :** guide pratique, 1 800 mots (plafond de la skill pour une page satellite ; découper si la page dépasse)
- **Note :** les SERP « citation dans le texte APA » et « citer un site APA » ne partagent qu'une URL ou aucune avec la tête, mais ce sont des variantes de longue traîne de la même requête principale. La skill autorise alors à les regrouper. À séparer plus tard seulement si la Search Console montre des impressions propres. **Interdit :** dire que MemoFlow applique l'APA.

### 1.3 Norme ISO 690
- **Requête cible :** norme ISO 690 bibliographie
- **Secondaires :** ISO 690 2021, ISO 690 exemple
- **Intention :** informationnelle
- **Type de page dominant :** PDF de BU (Reims, INSA Toulouse, HEIA-FR), boutique AFNOR, Wikipédia. Le texte de la norme est payant
- **Concurrents vus :**
  - https://www.univ-reims.fr/science-ouverte/media-files/7331/bibliographie__norme_iso690_bu_urca.pdf
  - https://www.boutique.afnor.org/fr-fr/norme/iso-6902021/information-et-documentation-principes-directeurs-pour-la-redaction-des-references-bibli/xs136402/241030
  - https://bib.insa-toulouse.fr/wp-content/uploads/sites/5/2025/03/Guide_bibliographique_ISO690_2021.pdf
- **Slug :** `/blog/norme-iso-690`
- **Gabarit :** explication, 1 200 à 1 500 mots
- **Angle :** l'ISO 690 fixe le contenu d'une référence, pas sa typographie, d'où des écarts d'un guide à l'autre. L'édition 2021 remplace celle de 2010. **Interdit :** dire que MemoFlow gère ce style.

### 1.4 APA ou Harvard : les différences
- **Requête cible :** différence norme APA et Harvard
- **Intention :** commerciale ou comparative (l'étudiant choisit)
- **Type de page dominant :** comparatifs en anglais (casrai, enago), listes de diffusion TeX hors sujet. Presque aucune page en français : c'est un trou à combler
- **Concurrents vus :**
  - https://casrai.org/compare/apa-vs-harvard
  - https://www.enago.com/articles/why-converting-manuscripts-between-apa-and-harvard-is-harder-than-it-looks/
  - https://papersflow.ai/fr/blog/guide-complet-des-references-harvard
- **Slug :** `/blog/apa-ou-harvard-differences`
- **Gabarit :** comparatif, 1 200 à 1 500 mots, avec un tableau qui cite la même source dans les deux styles

## Grappe 2 : citer dans le texte

### 2.1 Citer ses sources dans un mémoire
- **Requête cible :** comment citer ses sources mémoire
- **Secondaires :** citer ses sources rapport de stage, citation directe mémoire
- **Intention :** informationnelle (mode d'emploi)
- **Type de page dominant :** éditorial (letudiant ×2, thotismedia, aufutur), PDF de formation (Cnam, Nantes, Centrale Méditerranée), et une ferme de contenu (synonyme-du-mot.com, 6 pages dans la même SERP)
- **Concurrents vus :**
  - https://www.letudiant.fr/jobsstages/lettres-de-motivation_1/memoire-et-rapport-de-stage-comment-rediger-une-bibliographie-et-des-notes-de-bas-de-page.html
  - https://backoffice-sebina.cnam.fr/sebina/repository/opac/pages_formation/Supports/citer-ses-sources.pdf
  - https://thotismedia.com/comment-reussir-la-bibliographie-dun-memoire-de-recherche-exemples-et-conseils-pratiques/
- **Slug :** `/blog/citer-ses-sources-memoire`
- **Gabarit :** mode d'emploi, 1 500 mots
- **Recouvrement avec le hub :** 5 URLs communes, donc même grappe mais deux articles distincts. Le hub traite la liste finale, cet article l'appel de citation dans le corps du texte (citation directe, paraphrase, auteur-date ou note).

### 2.2 Notes de bas de page dans un mémoire
- **Requête cible :** note de bas de page citation mémoire
- **Secondaires :** ibid mémoire, appel de note
- **Intention :** informationnelle (mode d'emploi)
- **Type de page dominant :** guides universitaires (ENS, Sorbonne, Nantes, Strasbourg), OQLF, letudiant
- **Concurrents vus :**
  - https://vitrinelinguistique.oqlf.gouv.qc.ca/25110/la-redaction-et-la-communication/bibliographie-et-citations/citations/emploi-presentation-et-ponctuation-de-lappel-de-note
  - https://histoire.ens.fr/IMG/pdf/vademecum_2025.pdf
  - https://www.letudiant.fr/jobsstages/lettres-de-motivation_1/memoire-et-rapport-de-stage-comment-rediger-une-bibliographie-et-des-notes-de-bas-de-page.html
- **Slug :** `/blog/notes-de-bas-de-page-memoire`
- **Gabarit :** mode d'emploi, 1 200 mots

### 2.3 Paraphraser sans plagier
- **Requête cible :** plagiat mémoire citer ses sources paraphrase
- **Secondaires :** paraphrase plagiat, éviter le plagiat mémoire
- **Intention :** informationnelle
- **Type de page dominant :** chartes et guides anti-plagiat d'universités (Genève, Limoges, Strasbourg, cégeps québécois)
- **Concurrents vus :**
  - https://www.cmaisonneuve.qc.ca/wp-content/uploads/2015/09/Guide-pour-rediger-une-bibliographie-et-citer-ses-sources-afin-d’eviter-le-plagiat.pdf
  - https://www.unige.ch/biblio/files/6317/6296/4040/4._Plagiat_et_references_bibliographiques.pdf
  - https://unilim.fr/scd/wp-content/uploads/sites/6/2024/11/Charte-anti-plagiat-2024-2025.pdf
- **Slug :** `/blog/paraphraser-sans-plagier`
- **Gabarit :** explication avec exemples avant/après, 1 200 mots
- **Interdit :** parler de détection de plagiat dans MemoFlow. C'est explicitement non vérifié.

## Grappe 3 : présenter la bibliographie

### 3.1 Classer sa bibliographie
- **Requête cible :** classement bibliographie mémoire
- **Secondaires :** ordre bibliographie, bibliographie par catégories
- **Intention :** informationnelle
- **Type de page dominant :** PDF de méthode (ENPC, Sherbrooke, Lyon 2, Paris 1, HEC), thotismedia
- **Concurrents vus :**
  - https://educnet.enpc.fr/pluginfile.php/167738/mod_resource/content/4/3.5.%20Organiser%20une%20bibliographie.pdf
  - https://www.usherbrooke.ca/histoire/fileadmin/sites/histoire/espace-etudiant/regles_presentation_bibliographies.pdf
  - https://thotismedia.com/comment-reussir-la-bibliographie-dun-memoire-de-recherche-exemples-et-conseils-pratiques/
- **Slug :** `/blog/classer-bibliographie-memoire`
- **Gabarit :** mode d'emploi, 1 200 mots (ordre alphabétique ou par type, même auteur la même année avec 2024a et 2024b, sources citées et sources consultées)

### 3.2 Sitographie dans un mémoire
- **Requête cible :** sitographie mémoire
- **Secondaires :** webographie, séparer sitographie et bibliographie
- **Intention :** informationnelle
- **Type de page dominant :** forum Zotero, fiches Nomad Education (5 pages quasi identiques), cours de Paris 1 et de la Sorbonne, synonyme-du-mot
- **Concurrents vus :**
  - https://forums.zotero.org/discussion/comment/374647
  - https://cours.univ-paris1.fr/pluginfile.php/2157833/mod_resource/content/1/4%20PrA%CC%83%C2%A9senter%20une%20bibliographie.pdf
  - https://www.synonyme-du-mot.com/les-articles/comment-faire-la-sitographie
- **Slug :** `/blog/sitographie-memoire`
- **Gabarit :** explication, 1 200 mots
- **Note :** la SERP « citer un site internet APA » est tenue par les générateurs et ne partage aucune URL avec celle-ci. Les deux restent séparées : le format d'une référence de site va dans 1.2, la présentation de la sitographie ici.

### 3.3 Faire sa bibliographie avec Zotero
- **Requête cible :** Zotero bibliographie mémoire
- **Secondaires :** tutoriel Zotero, ZoteroBib
- **Intention :** informationnelle, tutoriel d'outil
- **Type de page dominant :** tutoriels de BU (INSA Rennes, Reims, Montpellier 3, Paris Cité, CY), très crédibles
- **Concurrents vus :**
  - https://biblio.insa-rennes.fr/wp-content/uploads/2020/10/Tuto-Zotero.pdf
  - https://www.univ-reims.fr/media-files/25513/tutoriel-zotero-fev2020.pdf
  - https://bibliotheques.univ-montp3.fr/sites/default/files/2023-10/G%C3%A9rer%20sa%20bibliographie%20avec%20Zotero%20-%20Initiation_2023-2024.pdf
- **Slug :** `/blog/zotero-bibliographie-memoire`
- **Gabarit :** tutoriel, 1 500 mots
- **Priorité basse :** les BU sont très bien placées et MemoFlow n'est pas un gestionnaire de références. À faire seulement si l'article apporte mieux qu'un PDF de BU, par exemple de vraies captures avec Zotero 7.

## Grappe 4 : les sources du terrain (alternance et stage)

### 4.1 Citer un document interne d'entreprise
- **Requête cible :** citer un document interne entreprise rapport alternance
- **Secondaires :** citer une source interne rapport de stage, document confidentiel rapport d'alternance
- **Intention :** informationnelle
- **Type de page dominant :** **aucune page ne répond à la question.** La SERP ne renvoie que des guides de rapport d'alternance (ICN, Cnam, aufutur, Centrale Méditerranée) qui ne traitent pas la citation d'une source interne
- **Concurrents vus :**
  - https://docushare.icn-artem.com/dsweb/Get/Document-167109/Guide Rapport Alternance PGE2 PGE3 2020-2021 V4_10 220607.pdf
  - https://aufutur.fr/etudes-superieures/comment-rediger-rapport-alternance/
  - https://bedeo.cnam.fr/uploads/c114bfaa11256fb5b7a92b91f3b7abfc_Notice%20rapport%20d'activite%CC%81%20L3%202024%20(alternance).pdf
- **Slug :** `/blog/citer-document-interne-entreprise`
- **Gabarit :** mode d'emploi, 1 200 mots (service auteur, intitulé, date, mention « document interne, non publié », accord du tuteur, anonymisation des chiffres)
- **Pourquoi en tête :** personne ne répond à la question, et l'audience est le cœur de cible (alternants, stagiaires). Lien thématique avec les connecteurs (Notion, Trello, Teams…), à condition de **ne pas dire** que MemoFlow cite ou référence ces sources : seul l'import de contexte est vérifié.

### 4.2 Bibliographie d'un rapport de stage ou d'alternance
- **Requête cible :** bibliographie rapport de stage exemple
- **Secondaires :** bibliographie rapport d'alternance
- **Intention :** informationnelle (cherche un exemple)
- **Type de page dominant :** consignes de rapport d'universités (Lyon 1, Montpellier, Paris-Saclay), PDF Scribbr, modèle .docx de l'UCO
- **Concurrents vus :**
  - https://cdn.scribbr.com/wp-content/uploads/2020/05/La-structure-dun-rapport-de-stage.pdf
  - https://moodle.univ-lyon1.fr/mod/resource/view.php?id=141645
  - https://nantes-bu.uco.fr/sites/default/files/documents/nantes-feuillestylestage-maj-2025.docx
- **Slug :** `/blog/bibliographie-rapport-de-stage`
- **Gabarit :** article avec exemples, 1 200 mots, avec une bibliographie type complète prête à copier (la SERP n'en propose aucune)
- **Recouvrement fort** avec la grappe « rapport d'alternance / stage », voir plus bas.

### 4.3 Citer ChatGPT dans un mémoire
- **Requête cible :** citer ChatGPT norme APA mémoire
- **Intention :** informationnelle
- **Type de page dominant :** support Compilatio, page intégrité de l'Université de Moncton, blog ClickUp, guides en anglais. Les formats se contredisent (version APA 2023 contre mise à jour 2025 signalée par une source secondaire seulement)
- **Concurrents vus :**
  - https://support.compilatio.net/hc/fr/articles/35845913313297-Comment-citer-ChatGPT
  - https://www.umoncton.ca/integrite/print/70
  - https://clickup.com/fr-FR/blog/244501/comment-citer-les-outils-dia
- **Slug :** `/blog/citer-chatgpt-memoire`
- **Gabarit :** mode d'emploi, 1 200 mots
- **Recouvrement direct** avec la grappe « IA et écriture académique ». Recommandation : l'article appartient à cette grappe-là, et celle-ci se contente d'un lien.

## Priorisation (intention + preuve SERP, sans volumes)

1. **Hub `/blog/bibliographie-memoire-normes`** : la base de tous les liens, et une SERP éditoriale battable.
2. **1.1 Norme Harvard** : le seul article avec un lien produit légitime ; SERP française faible.
3. **4.1 Citer un document interne** : personne ne répond, cœur de cible.
4. **1.4 APA ou Harvard** : presque rien en français.
5. **2.1 Citer ses sources dans un mémoire** : SERP éditoriale (letudiant, thotismedia, aufutur), audience exacte.
6. 1.2 Norme APA : grosse demande probable, mais BU et Scribbr sont bien installés.
7. 4.2 Bibliographie rapport de stage, puis 2.2, 3.1, 3.2, 1.3, 2.3.
8. En dernier : 3.3 Zotero. 4.3 ChatGPT est confié à la grappe IA.

## Maillage interne

Règles : chaque page satellite renvoie au hub et le hub renvoie à chacune ; 2 ou 3 liens entre pages d'une même grappe ; au plus un lien vers une autre grappe ; ancres sur la requête cible ou une variante proche.

| Depuis | Vers (ancre) |
|---|---|
| Hub | toutes les pages satellites, avec leur requête cible en ancre |
| Toutes les pages satellites | Hub (« bibliographie de mémoire », « normes bibliographiques ») |
| 1.1 Harvard | 1.4 (« APA ou Harvard »), 1.2 (« norme APA »), 3.2 (« citer un site web ») [autre grappe] |
| 1.2 APA | 1.4, 1.1, 2.1 (« citer ses sources dans le texte ») [autre grappe] |
| 1.3 ISO 690 | 1.1, 1.2 |
| 1.4 APA ou Harvard | 1.1, 1.2, 1.3 |
| 2.1 Citer ses sources | 2.2 (« notes de bas de page »), 2.3 (« paraphraser sans plagier »), 1.2 [autre grappe] |
| 2.2 Notes de bas de page | 2.1, 2.3 |
| 2.3 Paraphrase | 2.1, 2.2, 4.3 [autre grappe] |
| 3.1 Classer | 3.2, 3.3 |
| 3.2 Sitographie | 3.1, 1.2 (« citer un site internet en APA ») [autre grappe] |
| 3.3 Zotero | 3.1, 3.2 |
| 4.1 Document interne | 4.2, 2.1 (« citer ses sources ») [autre grappe] |
| 4.2 Biblio rapport de stage | 4.1, 3.1 [autre grappe] |
| 4.3 ChatGPT | 2.3, 4.1 |

Contrôle : chaque page satellite reçoit au moins 3 liens entrants (hub + au moins 2 voisins), aucune page orpheline, tout est à 2 clics du hub au plus.

## Recouvrements avec les autres grappes (agents parallèles)

- **Rédiger un mémoire :** leur pilier aura une section « bibliographie ». Elle doit rester courte et renvoyer à `/blog/bibliographie-memoire-normes`, sans traiter les normes. Risque de cannibalisation si leur pilier vise « bibliographie mémoire ».
- **Revue de littérature :** recouvrement probable sur Zotero (3.3), citer ses sources (2.1) et paraphrase (2.3). À trancher : qui porte Zotero. Proposition : cette grappe, et la leur fait un lien.
- **IA et écriture académique :** 4.3 Citer ChatGPT, et l'angle « plagiat par IA » de 2.3. Proposition : 4.3 va chez eux.
- **Rapport d'alternance / stage :** 4.1 Document interne et 4.2 Bibliographie rapport de stage. Leur pilier « rapport de stage » partage des URLs (Scribbr structure rapport, consignes Lyon 1, guides ICN et aufutur). Proposition : 4.1 et 4.2 restent ici, leur pilier fait les liens.
- **Plan de mémoire / problématique :** faible. Seul point commun : la place de la bibliographie (avant les annexes).

## Requêtes écartées

- Toutes les requêtes « générateur … » (APA, Harvard, ISO 690, bibliographie) : intention d'outil, SERP 100 % outils. Voir le signal principal plus haut.
- « norme Vancouver » : propre aux mémoires de santé, hors cible L3-M2 généraliste. À réévaluer si l'audience santé apparaît dans l'onboarding.
- « comment faire une bibliographie » en requête principale : SERP pour collégiens (Vikidia, CDI de Strasbourg, Dunod). Gardée en secondaire du hub.

## Sources (SERP relevées le 06/11/2026 via WebSearch)

Requêtes passées : bibliographie normes mémoire ; norme APA bibliographie ; norme Harvard bibliographie ; norme ISO 690 bibliographie ; comment citer ses sources mémoire ; générateur bibliographie APA gratuit ; générateur de citation Harvard français ; comment faire une bibliographie ; citer un site internet norme APA exemple ; différence norme APA et Harvard ; sitographie webographie mémoire ; citer ChatGPT norme APA mémoire ; bibliographie rapport de stage exemple ; Zotero bibliographie mémoire tutoriel ; quelle norme bibliographique choisir pour son mémoire ; citer un document interne entreprise rapport alternance ; citation dans le texte norme APA ; note de bas de page citation mémoire ; citer un livre norme APA 7 ; générateur bibliographie ISO 690 ; classement bibliographie mémoire ; plagiat mémoire paraphrase ; norme Harvard citation site web mémoire.
