# Cluster « IA et écriture académique »

Seed : *IA écriture académique*. Marché France, français. Relevé du 06/11/2026.

## Méthode et limites (à lire avant de prioriser)

- **Zéro outil payant.** 16 recherches WebSearch, pas de DataForSEO, Ahrefs, SE Ranking ni Firecrawl.
- **Aucun volume de recherche.** La priorité vient de l'intention et de la preuve SERP (qui ranke, quel type de page, trou visible ou pas). Ne pas lire l'ordre des spokes comme un classement par trafic.
- **Recouvrement de SERP approximatif.** WebSearch est géolocalisé aux US et rend 15 à 18 liens, pas le top 10 strict de google.fr. Les pages belges (ICHEC, UCLouvain, RTBF), suisses et québécoises sont donc sur-représentées. Les seuils (7+ fusion, 4-6 même grappe, 2-3 maillage) ont été appliqués sur ces listes. À recontrôler sur google.fr avant d'écrire si un doute de cannibalisation subsiste.
- **People Also Ask et autocomplétion** non accessibles proprement via WebSearch. Les questions listées viennent des titres et extraits de SERP.
- **Faits produit** : uniquement `docs/seo/product-facts.md`. Aucune promesse de détection anti-plagiat, d'outil « indétectable » ou de passage de Compilatio.

## Lecture de la SERP en trois phrases

1. La SERP est tenue par des **documents institutionnels** (chartes IA d'universités, PDF de cadrage mémoire, formulaires de déclaration) et par quelques blogs (lebigdata, The Intelligence Academy, L'Étudiant, Hackceleration). Peu de guides français complets et à jour : c'est l'ouverture.
2. Le message dominant est le même partout : **l'IA aide à structurer, explorer et relire, elle ne rédige pas à ta place, et tu déclares ce que tu as fait**. MemoFlow doit s'aligner sur ce cadre, pas le contourner.
3. Deux requêtes ont une SERP polluée (« IA pour faire son plan de mémoire » renvoie surtout des *mémoires* autobiographiques, « IA rapport d'alternance » renvoie des offres d'emploi) : intention mal servie, donc opportunité, mais sans preuve de demande.

## Hub (pillar)

| Champ | Valeur |
|---|---|
| Requête cible | utiliser l'IA pour son mémoire |
| Secondaires | IA mémoire étudiant, IA écriture académique, IA et mémoire de fin d'études |
| Intention | Informationnelle large |
| Type de page dominant | PDF de cadrage universitaire + guides de blog (« comment utiliser l'IA pour… ») |
| Concurrents vus | webresearch.ichec.be/donatien_grolaux/redaction_tips/ia_thesis ; the-intelligence-academy.com/blog/intelligence-artificielle-rediger-memoire ; formations.univ-smb.fr (« Cadrage mémoire et usages de l'IA », PDF) |
| Gabarit | ultimate-guide, 2 500 à 3 500 mots |
| Slug proposé | `/blog/ia-memoire` |

Angle : le guide de référence FR sur ce qu'on peut faire avec l'IA à chaque étape du mémoire (explorer, plan, rédaction, relecture, bibliographie), ce que les chartes interdisent, comment déclarer. Recouvrement mesuré : 6 liens partagés avec « l'IA est-elle autorisée », 5 avec « meilleure IA pour rédiger un mémoire », 2 avec « rédiger son mémoire avec ChatGPT ». C'est la requête qui recoupe le plus de voisines.

Mention MemoFlow possible (faits vérifiés seulement) : espace d'écriture en sections avec sauvegarde automatique, planificateur qui génère un plan à partir du contexte, centre de contexte (fichiers de recherche, option citation Harvard). Ne pas écrire que MemoFlow rédige le mémoire : `[À VÉRIFIER : l'app génère-t-elle du texte de corps de section, ou seulement le plan ?]`.

## Grappe 1 : règles et transparence

### S1. L'IA est-elle autorisée pour un mémoire ?
- **Requête cible** : l'IA est-elle autorisée pour le mémoire. Secondaires : charte IA université, ChatGPT autorisé mémoire, IA interdite mémoire.
- **Intention** : informationnelle, question fermée (oui/non + conditions).
- **Type de page dominant** : chartes IA d'établissements (PDF) et fiches de cours.
- **Concurrents vus** : formations.parisnanterre.fr (fiches de cours mémoire, PDF) ; llasic.univ-grenoble-alpes.fr/ufr-llasic/charte-ia--1567289.kjsp ; consultation.avocat.fr (article sur le tribunal administratif de Paris et le mémoire M2 de Paris 1).
- **Gabarit** : explainer, 1 500 à 1 800 mots.
- **Slug** : `/blog/ia-autorisee-memoire`
- **Angle qui manque dans la SERP** : une synthèse française lisible. Il n'y a pas de règle nationale ; on trouve des chartes à Grenoble, Savoie Mont Blanc, Clermont (UCA), Angers, Paris 1, La Réunion, Aix-Marseille, UPEC. Tableau « ce qui est en général toléré / interdit / à déclarer » + rappel de la décision du TA de Paris (`[À VÉRIFIER : lire la décision elle-même, pas seulement le billet d'avocat]`).
- **Risque de cannibalisation** : 6 liens partagés avec le hub, juste sous le seuil de fusion. Le hub donne la réponse courte en deux lignes et renvoie ici. Pas de H2 « est-ce autorisé » développé dans le hub.

### S2. Déclarer et citer l'usage de l'IA dans son mémoire
- **Requête cible** : citer ChatGPT dans un mémoire. Secondaires : déclarer l'utilisation de l'IA mémoire, déclaration IA mémoire modèle, citer une IA norme APA.
- **Intention** : informationnelle, how-to (avec modèle à copier).
- **Type de page dominant** : guides de bibliothèques universitaires et formulaires (DOCX/PDF), plus deux blogs (ClickUp, howmanywords).
- **Concurrents vus** : ed-histoire-de-l-art.pantheonsorbonne.fr (formulaire de déclaration IA, DOCX) ; clickup.com/fr-FR/blog/218453/comment-citer-le-chatgpt ; cegeplimoilou.ca (dépliant IA, PDF).
- **Gabarit** : how-to, 1 200 à 1 500 mots, avec un modèle de déclaration et un exemple de carnet de prompts.
- **Slug** : `/blog/declarer-ia-memoire`
- **Note produit** : MemoFlow ne vérifie que l'option « Imposer le style de citation Harvard ». Ne pas affirmer la prise en charge d'APA ou ISO 690.
- **Recouvrement** : 2-3 liens avec S1 (maillage). Recouvre probablement le cluster **bibliographie/normes** d'un autre agent : la partie « format de citation » doit renvoyer vers leur page normes, ici on garde la déclaration d'usage.

## Grappe 2 : détection

### S3. Compilatio et la détection d'IA : ce que le score veut dire
- **Requête cible** : détecteur IA Compilatio. Secondaires : Compilatio détecte-t-il ChatGPT, Compilatio fiabilité IA, Compilatio Magister IA.
- **Intention** : informationnelle (comprendre l'outil que l'école utilise). Pas commerciale côté étudiant.
- **Type de page dominant** : articles de presse tech (JDN, eeNews, Presse-citron) et comparatifs (Hackceleration, Leptidigital).
- **Concurrents vus** : journaldunet.com/intelligence-artificielle/1542833-… (« 98,5 % de précision… ») ; hackceleration.com/fr/labs/meilleur/detecteur-ia ; leptidigital.fr/outils/avis-compilatio-89517/
- **Gabarit** : explainer, 1 400 à 1 800 mots.
- **Slug** : `/blog/compilatio-detecteur-ia`
- **Angle légitime** : comment marche le détecteur, ce que Compilatio dit lui-même (le score est un indice, pas une preuve), les chiffres annoncés par l'éditeur face aux tests publics, et pourquoi la seule stratégie solide est un usage déclaré et des traces de son travail. **Interdit** : toute section « comment passer Compilatio », tout test de contournement.
- **Recouvrement** : 3-4 liens entre « détecteur IA Compilatio » et « Compilatio fiabilité faux positif » : on fusionne les deux dans ce spoke.

### S4. Accusé à tort d'avoir utilisé l'IA : que faire
- **Requête cible** : accusé à tort d'avoir utilisé l'IA. Secondaires : faux positif détecteur IA, contester détection IA mémoire.
- **Intention** : informationnelle, how-to urgent.
- **Type de page dominant** : pages d'éditeurs de détecteurs ou d'« humaniseurs » (GPTZero, undetectable.ai) et bases d'incidents. Aucune page FR neutre côté étudiant.
- **Concurrents vus** : gptzero.me/news/faussement-accuse-de-triche-a-l-ia/ ; undetectable.ai/blog/fr/ (article « étudiant accusé à tort ») ; incidentdatabase.ai/fr/reports/5185/
- **Gabarit** : how-to, 1 200 à 1 500 mots (démarche : demander le rapport, réunir brouillons et historique, répondre par écrit, recours).
- **Slug** : `/blog/accuse-ia-faux-positif`
- **Pourquoi c'est une bonne cible** : SERP tenue par des éditeurs intéressés, dont un vendeur de contournement. Une page neutre et utile a de la place.
- **Note produit** : on peut citer la sauvegarde automatique, pas un historique de versions (non vérifié). `[À VÉRIFIER : l'app garde-t-elle un historique de versions consultable ?]`
- **Recouvrement** : 0-1 lien avec S3, mais même sujet de fond : maillage croisé fort.

## Grappe 3 : usages concrets

### S5. ChatGPT pour son mémoire : ce qu'il fait bien, ce qu'il fait mal
- **Requête cible** : ChatGPT mémoire. Secondaires : rédiger son mémoire avec ChatGPT, ChatGPT mémoire universitaire, ChatGPT peut-il écrire un mémoire.
- **Intention** : informationnelle mixte (curiosité, tentation de déléguer). On sert l'usage légitime.
- **Type de page dominant** : presse (lebigdata, RTBF, La Libre) et guides universitaires belges.
- **Concurrents vus** : lebigdata.fr/rediger-memoire-chatgpt ; rtbf.be/article/chat-gpt-aide-des-etudiants-a-rediger-leur-plan-de-memoire-en-droit-11213224 ; uclouvain.be (« Les IA génératives et le mémoire », PDF PSAD)
- **Gabarit** : explainer, 1 400 à 1 800 mots.
- **Slug** : `/blog/chatgpt-memoire`
- **Recouvrement** : 5 liens entre « ChatGPT mémoire universitaire » et « rédiger son mémoire avec ChatGPT », donc une seule page. 1-2 liens avec le hub.

### S6. Prompts IA pour avancer son mémoire (sans le faire écrire)
- **Requête cible** : prompt ChatGPT mémoire. Secondaires : prompt mémoire de fin d'études, meilleurs prompts mémoire.
- **Intention** : informationnelle, listicle.
- **Type de page dominant** : listes de prompts sur des blogs, packs payants, guides de prompts universitaires.
- **Concurrents vus** : lebigdata.fr/prompt-ultime-pour-son-memoire-de-fin-detude ; oer.uclouvain.be (« Des prompts de qualité », PDF) ; letudiant.fr/jobsstages/7-prompts-ia-pour-vous-aider-a-rediger-votre-rapport-de-stage.html (côté stage)
- **Gabarit** : listicle, 1 200 à 1 600 mots. Prompts pour explorer un sujet, challenger une problématique, critiquer un plan, relire. Aucun prompt « écris ma partie 2 ».
- **Slug** : `/blog/prompts-ia-memoire`

### S7. Quels outils d'IA pour un mémoire, étape par étape
- **Requête cible** : meilleure IA pour rédiger un mémoire. Secondaires : outils IA mémoire, IA pour étudiants mémoire.
- **Intention** : commerciale (comparatif), avec un fond informationnel.
- **Type de page dominant** : pages d'éditeurs (PapersFlow, UPDF, Vidnoz, TextCortex) et quelques guides.
- **Concurrents vus** : papersflow.ai/fr/blog/best-ai-tools-academic-writing ; fr.vidnoz.com/intelligence-artificielle/ia-memoire.html ; the-intelligence-academy.com/blog/intelligence-artificielle-rediger-memoire
- **Gabarit** : best-of par étape (exploration, sources, plan, relecture), 1 500 à 1 800 mots.
- **Slug** : `/blog/outils-ia-memoire`
- **Seule page de la grappe où MemoFlow peut apparaître en tant qu'outil**, avec les faits vérifiés uniquement (planificateur, sections, connecteurs, centre de contexte). Pas de prix, pas de gratuité, pas de modèle d'IA nommé.
- **Recouvrement** : 5 liens avec le hub. Intention différente (comparatif contre guide), donc deux pages, mais le hub ne liste pas d'outils.
- **Recouvrement probable avec l'agent revue de littérature / bibliographie** : la partie « outils de recherche documentaire » (Elicit, Consensus, Perplexity) est sur leur terrain. Ici, un paragraphe et un lien vers eux.

### S8. Relire et reformuler avec l'IA : où est la limite
- **Requête cible** : reformuler avec l'IA mémoire. Secondaires : relecture IA mémoire, correction orthographe IA mémoire, IA plagiat reformulation.
- **Intention** : informationnelle.
- **Type de page dominant** : pages d'outils de paraphrase et services Comeup (« reformuler pour éviter le plagiat »), très peu de contenu neutre.
- **Concurrents vus** : papersflow.ai/fr/blog/comment-reformuler-un-article-de-recherche-sans-plagier ; leptidigital.fr/content-marketing/meilleur-site-de-reformulation-49536/ ; webresearch.ichec.be/…/ia_thesis
- **Gabarit** : explainer, 1 200 à 1 500 mots. Correction de langue : en général tolérée et à déclarer si elle est significative. Reformuler une source pour en masquer l'origine : c'est du plagiat.
- **Slug** : `/blog/relecture-ia-memoire`
- **Priorité basse** : SERP commerciale et proche de requêtes à risque. À écrire après les autres.

## Grappe 4 : rapports de stage et d'alternance

### S9. Utiliser l'IA pour son rapport de stage
- **Requête cible** : IA rapport de stage. Secondaires : ChatGPT rapport de stage, prompt rapport de stage, IA rapport d'alternance.
- **Intention** : informationnelle, how-to.
- **Type de page dominant** : guides étudiants (L'Étudiant, Student.be, MaFormation, Vidnoz), mélangés à des rapports de stage *sur* l'IA.
- **Concurrents vus** : letudiant.fr/jobsstages/7-prompts-ia-pour-vous-aider-a-rediger-votre-rapport-de-stage.html ; fr.vidnoz.com/intelligence-artificielle/ia-rapport-de-stage.html ; student.be/fr/student-life/comment-rediger-un-rapport-de-stage/
- **Gabarit** : how-to, 1 400 à 1 800 mots.
- **Slug** : `/blog/ia-rapport-de-stage`
- **Fusion** : « IA rapport de stage » et « ChatGPT rapport de stage » partagent 3 liens et ont la même intention : une page.
- **Rapport d'alternance** : la SERP ne renvoie que des offres d'emploi, donc aucune preuve de demande. Section H2 dans S9, pas de page dédiée tant qu'on n'a pas de signal (Search Console après mise en ligne).
- **Fit produit** : l'onboarding cible alternants et stagiaires et propose des connecteurs vers Trello, Notion, Teams, Slack, mails, Drive pour « retrouver ce que j'ai fait ». C'est l'argument le plus concret de la grappe. Rester sur ces faits.
- **Recouvrement fort avec l'agent rapport d'alternance / stage** : leur page « comment rédiger un rapport de stage » doit lier ici pour le volet IA, et ne pas développer de section IA elle-même.

## Maillage interne

Règles : chaque spoke lie le hub, le hub lie chaque spoke, 2-3 liens dans la grappe, au plus 1 lien hors grappe. Ancre = requête cible ou variante proche.

| De | Vers | Ancre |
|---|---|---|
| Hub | S1 à S9 | requête cible de chaque spoke |
| S1 à S9 | Hub | utiliser l'IA pour son mémoire |
| S1 | S2 | déclarer l'usage de l'IA dans son mémoire |
| S2 | S1 | l'IA est-elle autorisée pour un mémoire |
| S1 | S3 | détecteur IA de Compilatio |
| S3 | S4 | accusé à tort d'avoir utilisé l'IA |
| S4 | S3 | ce que veut dire le score Compilatio |
| S4 | S2 | déclarer son usage de l'IA |
| S3 | S2 | déclarer l'IA dans son mémoire |
| S5 | S6 | prompts pour son mémoire |
| S6 | S5 | ChatGPT pour son mémoire |
| S5 | S7 | outils d'IA pour un mémoire |
| S7 | S6 | prompts IA mémoire |
| S8 | S5 | ChatGPT et mémoire |
| S8 | S2 | citer ChatGPT dans un mémoire |
| S9 | S6 | prompts IA (rapport de stage) |
| S9 | S1 | l'IA est-elle autorisée |

Chaque spoke reçoit au moins 3 liens entrants (hub + 2 frères). S8 n'en reçoit que 1 de frère : ajouter un lien depuis S1 (« correction de langue par IA »).

Liens sortants vers les grappes des autres agents (1 max par page) :
- S2 vers la page normes bibliographiques (agent bibliographie/normes).
- S7 vers la page revue de littérature (agent revue de littérature).
- Hub vers la page plan de mémoire (agent plan de mémoire).
- S9 vers la page rapport de stage / alternance (agent rapport).

```json
{
  "links": [
    {"from": "hub", "to": "s1", "type": "mandatory", "anchor": "l'IA est-elle autorisée pour un mémoire"},
    {"from": "hub", "to": "s2", "type": "mandatory", "anchor": "déclarer l'usage de l'IA"},
    {"from": "hub", "to": "s3", "type": "mandatory", "anchor": "détecteur IA Compilatio"},
    {"from": "hub", "to": "s4", "type": "mandatory", "anchor": "accusé à tort d'avoir utilisé l'IA"},
    {"from": "hub", "to": "s5", "type": "mandatory", "anchor": "ChatGPT pour son mémoire"},
    {"from": "hub", "to": "s6", "type": "mandatory", "anchor": "prompts IA mémoire"},
    {"from": "hub", "to": "s7", "type": "mandatory", "anchor": "outils d'IA pour un mémoire"},
    {"from": "hub", "to": "s8", "type": "mandatory", "anchor": "reformuler avec l'IA"},
    {"from": "hub", "to": "s9", "type": "mandatory", "anchor": "IA rapport de stage"},
    {"from": "s1", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s2", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s3", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s4", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s5", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s6", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s7", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s8", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s9", "to": "hub", "type": "mandatory", "anchor": "utiliser l'IA pour son mémoire"},
    {"from": "s1", "to": "s2", "type": "cluster", "anchor": "déclarer l'usage de l'IA dans son mémoire"},
    {"from": "s2", "to": "s1", "type": "cluster", "anchor": "l'IA est-elle autorisée pour un mémoire"},
    {"from": "s1", "to": "s3", "type": "cross", "anchor": "détecteur IA de Compilatio"},
    {"from": "s1", "to": "s8", "type": "cross", "anchor": "correction de langue par IA"},
    {"from": "s3", "to": "s4", "type": "cluster", "anchor": "accusé à tort d'avoir utilisé l'IA"},
    {"from": "s4", "to": "s3", "type": "cluster", "anchor": "ce que veut dire le score Compilatio"},
    {"from": "s4", "to": "s2", "type": "cross", "anchor": "déclarer son usage de l'IA"},
    {"from": "s3", "to": "s2", "type": "cross", "anchor": "déclarer l'IA dans son mémoire"},
    {"from": "s5", "to": "s6", "type": "cluster", "anchor": "prompts pour son mémoire"},
    {"from": "s6", "to": "s5", "type": "cluster", "anchor": "ChatGPT pour son mémoire"},
    {"from": "s5", "to": "s7", "type": "cluster", "anchor": "outils d'IA pour un mémoire"},
    {"from": "s7", "to": "s6", "type": "cluster", "anchor": "prompts IA mémoire"},
    {"from": "s8", "to": "s5", "type": "cluster", "anchor": "ChatGPT et mémoire"},
    {"from": "s8", "to": "s2", "type": "cross", "anchor": "citer ChatGPT dans un mémoire"},
    {"from": "s9", "to": "s6", "type": "cross", "anchor": "prompts IA"},
    {"from": "s9", "to": "s1", "type": "cross", "anchor": "l'IA est-elle autorisée"}
  ]
}
```

## Ordre de production recommandé

Par preuve SERP et fit produit, pas par volume (inconnu) :
1. **Hub** `/blog/ia-memoire` : requête qui recoupe le plus de voisines, et il faut qu'il existe pour recevoir les liens.
2. **S1** `/blog/ia-autorisee-memoire` : la question que tout étudiant se pose, et la SERP FR n'a que des PDF éparpillés.
3. **S4** `/blog/accuse-ia-faux-positif` : SERP tenue par des éditeurs intéressés, place pour une page neutre.
4. **S9** `/blog/ia-rapport-de-stage` : meilleur fit produit (alternants, stagiaires, connecteurs).
5. **S2** `/blog/declarer-ia-memoire` : how-to concret, modèle de déclaration réutilisable.
6. S3, S5, S6, S7, puis S8 en dernier.

## Requêtes écartées pour raison éthique (on ne les cible pas)

Repérées dans la SERP. Elles visent la triche ou le contournement d'un contrôle académique. Aucune page, aucun H2, aucune ancre dessus.

- **contourner Compilatio** / **passer Compilatio** : la SERP renvoie des « humaniseurs » qui se vendent comme anti-détection (Rewordify, Humanize AI, hackernoon « tools to bypass AI detection »).
- **IA indétectable** / **texte IA indétectable** / **humaniser un texte IA** : même intention. Les produit-facts interdisent déjà toute promesse de ce type.
- **reformuler pour éviter le plagiat** : services Comeup vendus sous ce libellé. Notre S8 traite la reformulation sous l'angle « où est la limite », sans reprendre cette formulation.
- **ChatGPT écris mon mémoire** / **faire rédiger son mémoire par l'IA** : intention de délégation complète. S5 capte la requête générique « ChatGPT mémoire » avec un angle légitime, sans cibler ces variantes.
- **Limite floue, à ne pas cibler** : « vérifier son texte avec un détecteur IA avant de rendre » et « Compilatio Studium étudiant ». L'intention peut être honnête (peur du faux positif) ou servir à retoucher jusqu'à passer sous le seuil. S4 répond au besoin honnête sans pousser l'autotest.

## Recouvrements avec les autres agents

- **Plan de mémoire** : « IA pour faire son plan de mémoire » a une SERP polluée (mémoires autobiographiques) et c'est exactement ce que fait le planificateur MemoFlow. À leur laisser, avec un lien entrant depuis le hub. À trancher par l'orchestrateur si personne ne la prend.
- **Revue de littérature** : « outils IA recherche documentaire » (Elicit, Consensus, Perplexity) est sur leur terrain. S7 en dit un paragraphe et renvoie vers eux.
- **Bibliographie / normes** : « citer ChatGPT norme APA » se joue entre S2 et leur page. Proposition : S2 garde la déclaration d'usage, eux gardent le format de référence.
- **Rapport d'alternance / stage** : S9 garde le volet IA. Leur page générale ne doit pas avoir de section IA développée, sinon cannibalisation.
- **Rédiger un mémoire** : leur pillar et notre hub vont se croiser sur « rédiger son mémoire avec ChatGPT ». Ici on la garde dans S5. Eux ne la ciblent pas.
- **Problématique** : les prompts « formuler sa problématique » de S6 renvoient vers leur page, sans la doubler.

## À vérifier avant rédaction

- `[À VÉRIFIER : l'app génère-t-elle du texte de corps de section, ou seulement le plan ?]` : ça change ce qu'on peut dire dans le hub et S7.
- `[À VÉRIFIER : historique de versions consultable ?]` : utile pour S4.
- `[À VÉRIFIER : décision du TA de Paris sur le mémoire M2 de Paris 1, lue à la source]` : citée dans S1.
- Recontrôler sur google.fr, depuis la France, les paires hub/S1 (6 liens) et hub/S7 (5 liens) avant d'écrire : ce sont les deux risques de cannibalisation.
