# Consignes communes aux rédacteurs d'une vague

À lire en entier avant de commencer. Elles reprennent ce qu'a appris le pilote (relecture : `docs/seo/relecture-pilote.md`).

## À lire d'abord
- `docs/seo/product-facts.md` : la SEULE source de faits sur MemoFlow, décisions de François comprises.
- `docs/seo/carte-articles.md` : ta ligne dans la carte (requête, format, pilier).
- Le cluster de ton sujet dans `docs/seo/clusters/`, plus `docs/seo/flow-find.md` et `docs/seo/sxo.md`.
- Un article pilote du même pilier, pour le niveau attendu : `blog/src/content/articles/rapport-d-alternance.md`, `retrouver-ses-missions-alternance.md`, `ia-autorisee-memoire.md`.
- Le schéma `blog/src/content.config.ts` : title ≤ 60 car., description ≤ 160, `sources` ≥ 2 avec `titre`, `url`, `consulte`. Le build échoue si un champ manque.

## Chaîne obligatoire, dans l'ordre (chaque skill avec le tool Skill)
1. `seo-content-brief` → `docs/seo/briefs/<slug>.md`. Revérifie la SERP avec WebSearch. Si le quota est épuisé, appuie-toi sur le cluster et sur WebFetch, et écris-le dans le brief.
2. Rédaction selon le brief.
3. `seo-geo` sur le brouillon. Applique.
4. `no-ai-slop` en mode réécriture sur le texte final. Applique.

## Règles de contenu
- Français, tutoiement. Pas de H1 dans le corps. Le corps commence par la réponse, en 2 ou 3 phrases, avant tout H2.
- Le gabarit insère le CTA juste avant le 2e H2 : la 1re section H2 doit être utile à elle seule et finir sur une phrase qui amène le CTA sans le contredire.
- **Sources** : seulement des URLs ouvertes avec WebFetch et qui disent ce que tu cites (guides d'école, chartes, textes officiels, aides officielles d'outils). Au moins 3, avec `consulte: 2026-11-06`. Nomme la source dans le texte. Aucun chiffre, aucune citation, aucune règle sans source. Un PDF qui ne s'ouvre pas ne se cite pas.
- **MemoFlow** : rien qui ne soit dans product-facts.md. Au plus une mention dans le corps, le CTA fait le reste. Les connecteurs réels sont Notion, Trello et GitHub, et toute suggestion de connexion porte la clause « si ton entreprise t'y autorise ».
- Pas d'expérience inventée à la première personne, pas de faux témoignage. Un exemple fictif (plan, extrait de rapport) est annoncé comme fictif.
- Rien sur le contournement de la détection IA.
- Pièges de ton relevés au pilote : une section qui s'ouvre en recopiant son H2 ; « X, pas Y » ; deux-points de révélation (« Résultat : ») ; objets qui agissent (« les chartes disent » → « l'UPEC écrit ») ; métadiscours (« Trois choses ressortent »). Attaque chaque section par le fait.
- « mémoire » est toujours qualifié dans le title (sinon Google sert la RAM).
- Longueur dictée par le brief, sans remplissage.

## Liens internes
Lie seulement vers des pages publiées ou en cours dans la même vague (liste dans ton prompt). Toujours un lien vers le hub de ton pilier, tôt dans le texte, s'il existe. 2 ou 3 liens latéraux au maximum.

## Vérification
Ne lance PAS `npm run build` (les autres rédacteurs travaillent en parallèle). Lance :
`npx astro build --root blog --outDir /private/tmp/claude-501/blog-<slug>`
puis `grep -c "<phrase exacte de ton 1er paragraphe>" /private/tmp/claude-501/blog-<slug>/<slug>/index.html` (≥ 1).
Si le build échoue sur un AUTRE article que le tien (un collègue en cours d'écriture), relance une fois ; s'il échoue encore, signale-le sans toucher à son fichier.
Ne commite rien. Ne touche qu'à ton article et à ton brief.

## Ce que tu rends (120 mots max)
Title, description, nombre de mots, nombre de sources et leurs domaines, points du brief non tenus, sortie du grep.
