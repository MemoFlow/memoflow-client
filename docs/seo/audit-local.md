# Audit SEO local : http://localhost:4173

Date : 06/11/2026. Branche `seo-geo` (dernier commit `0b8c0ab`). Serveur : `vite preview`, build présent dans `dist/`.
Méthode : `/seo audit` avec 9 agents en parallèle (technical, content, schema, sitemap, performance, visual, geo, agentic, sxo), sans outil payant ni clé Google. Aucun fichier du code n'a été modifié.

Type de site : SaaS freemium avec un blog éditorial. La cible SEO/GEO est le blog Astro sous `/blog/`. `/` est l'écran de connexion de la SPA React.

Limite de la mesure : les scripts qui protègent contre le SSRF refusent `localhost` (Lighthouse Agentic Browsing, `agentic_check.py`, `agent_ux_check.py`, `render_page.py`, `sitemap_discovery.py`). Les agents ont donc relevé ces points à la main avec `curl`. Il faudra relancer ces scripts sur une URL de staging publique.

## Score global : 73/100

| Catégorie | Poids | Score |
|---|---|---|
| Technique | 22 % | 82 |
| Contenu (socle du gabarit) | 23 % | 62 |
| On-page | 20 % | 74 |
| Données structurées | 10 % | 82 |
| Performance (lab) | 10 % | 100 |
| Lisibilité par les IA (GEO) | 10 % | 53 |
| Images | 5 % | 50 (aucune image, pas d'`og:image`) |

Hors pondération : sitemap 86, visuel/mobile 84, SXO 62. Agent-readiness non mesuré (localhost refusé).

Ce score note le socle (gabarit, configuration, fichiers de découverte), pas du contenu publié. Il est plafonné tant qu'aucun article n'est en ligne, et c'est normal.

## Critique

Aucun. Rien ne bloque l'indexation du blog et rien n'expose à une pénalité. Le blog est en HTML statique sans JavaScript, avec `lang=fr`, un canonical sur chaque page, un `noindex` posé sur le gabarit et la page auteur (qui restent crawlables), un sitemap sans les pages noindex et un JSON-LD relié par `@id`.

## Importants (High / Medium), par ordre de priorité

### 1. Soft 404 : toute URL inconnue sous `/blog/` renvoie 200 avec l'écran de connexion (High)

- Concerné : `/blog/rapport-d-alternance/`, `/blog/ia-memoire/` et les deux autres hubs de `public/llms.txt:22-25`, ainsi que toute URL cassée (`/blog/n-importe-quoi/` répond 200 en `text/html`). Même chose pour `/sitemap.xml`, `/blog/sitemap-index.xml` et `/.well-known/ai-catalog.json`.
- Cause : `dist/blog/` ne contient pas de `404.html`, et `vite preview` applique le fallback SPA partout. Si l'hébergeur de prod applique aussi `/* → index.html`, les crawlers (IA comprises) qui suivent `llms.txt` tomberont sur une page de login indexable.
- Correctif : créer `blog/src/pages/404.astro`, et configurer l'hébergeur pour que `/blog/*` ne tombe jamais dans le fallback SPA. Tant que les hubs ne sont pas publiés, on peut aussi retirer les lignes 22-25 de `llms.txt`.
- Vérification : `curl -o /dev/null -w '%{http_code}' https://<prod>/blog/zzz/` renvoie 404, et `/blog/` renvoie toujours 200.
- Débloque : la vérification des fichiers de découverte, et le passage des scripts agentic en staging.

### 2. La description de `/` contredit les faits produit (Medium, impact large)

- Concerné : `index.html:7`, « plateforme d'apprentissage académique ». `docs/seo/product-facts.md` parle d'un espace d'écriture. Cette description s'affiche sur `/`, sur chaque soft 404 (point 1), et sur la page vers laquelle pointe l'entité `Organization` (`blog/src/site.ts:6`, `url` = `/`).
- Correctif : reprendre la phrase d'accroche de `llms.txt:3`. Ajouter aussi `<meta name="robots" content="noindex">` dans `index.html`, puisque `/` n'est pas destiné au référencement. Pas de `Disallow` sur `/` : il empêcherait les robots de lire le noindex.
- Vérification : `grep -n 'description\|robots' index.html`.

### 3. Pas d'image de partage : ni `og:image`, ni `twitter:card`, ni `BlogPosting.image` (Medium)

- Concerné : `blog/src/layouts/Base.astro:33-38`, `blog/src/schema.ts`, `blog/src/content.config.ts`. Chaque futur article héritera de ce manque. Google recommande `image` pour qu'un article soit éligible aux résultats enrichis Article, et aujourd'hui le blog n'envoie aucun signal visuel aux moteurs IA.
- Correctif : prévoir un champ `image` optionnel dans le frontmatter, une image par défaut en 1200×630, et propager la valeur vers `og:image`, `twitter:card=summary_large_image` et le JSON-LD.
- Vérification : les deux balises sont présentes dans le `<head>` bâti, et le Rich Results Test du premier article ne signale plus « image manquante ».

### 4. Les signaux de confiance manquent dans le footer (Medium, le plus gros trou E-E-A-T)

- Concerné : `blog/src/layouts/Base.astro:59-65`. Le footer n'a ni à-propos, ni contact, ni mentions légales, ni note de méthode éditoriale.
- Correctif : une page « Comment on écrit nos guides » (nos sources sont les consignes publiques des écoles, et on n'affirme sur le produit que ce qui figure dans `product-facts.md`), plus un contact et des mentions légales.
- Vérification : depuis chaque article, ces pages sont à un clic.

### 5. Le gabarit n'est pas encore taillé pour être cité ni pour la vague 1 (Medium/High)

- Concerné : `blog/src/pages/[slug].astro`, `blog/src/content.config.ts`, `blog/src/content/articles/gabarit-test.md:18`.
  - Pas de bloc « En bref » sous le H1. Ce sont 2 ou 3 phrases autonomes reprises telles quelles par les moteurs IA.
  - Pas de sommaire (`[slug].astro:80`), alors que les hubs concurrents font environ 3 500 mots.
  - Les sources n'ont pas de date de consultation (`content.config.ts:17`, alors que `plan.md:114` la demande).
  - Le CTA est placé entre deux sections et se retrouve dans les passages extraits.
  - Rien ne prévoit un fichier à télécharger (`fichiers[]`) ni un sous-hub (`parent`, fil d'Ariane à 3 niveaux). `sxo.md` et `carte-articles.md:40` (B1, B4) en ont besoin.
- Correctif : ajouter au schéma les champs `resume`, `consulte`, `fichiers[]` et `parent`. Générer le sommaire depuis `render().headings`. Placer le CTA après la section 2 ou en fin d'article.
- Vérification : un article fixture avec `parent` affiche le niveau intermédiaire, et le résumé apparaît dans le HTML statique.

### À suivre (Medium/Low, rapides)

- `blog/src/articles.ts:18` : `hubOf(all, …)` reçoit tous les articles, noindex compris (appels dans `index.astro:12` et `[slug].astro:23`). Un hub en noindex serait donc lié depuis l'accueil et le fil d'Ariane. Correctif : `hubOf(listed(all), …)`.
- Le build laisse passer un article listé dont la page auteur affiche encore `[BIO À FOURNIR]`. Correctif : faire échouer le build si un article indexable existe alors que la bio est vide.
- `/blog` sans slash renvoie le shell SPA en 200. Il faut une 301 vers `/blog/` côté hébergeur.
- `index.astro:33-34` : une carte de pilier sans hub n'a pas de lien. Au pilote, D1 sortira sans D0, donc sa carte restera sans lien. Correctif : la lier au premier article du pilier.
- Le header (`Base.astro:42-46`) ne contient aucun lien vers `/inscription`. Sur mobile, le CTA du gabarit est sous la ligne de flottaison (y=1061 pour un écran de 812 px).
- Les liens du fil d'Ariane, du footer et de `.brand` font moins de 44 px de haut (`blog/src/blog.css`).
- Le JSON-LD n'a pas de nœud `WebSite` sur `/blog/`. Le `logo` de l'Organization pointe vers `favicon.svg`. Les dates sont sans heure ni fuseau.
- `llms.txt` est servi en `text/plain` sans `charset=utf-8`, avec un risque d'accents cassés selon l'hébergeur. `llms.txt:9` pourrait nommer Notion, Trello et GitHub, qui sont des faits vérifiés.
- La documentation n'est plus à jour : `plan.md:135` et `carte-articles.md:100` interdisent encore « Commence gratuitement », alors que `product-facts.md` l'autorise depuis la décision du 06/11.
- Aucun test ne couvre l'exclusion des noindex dans le sitemap (`sitemap.xml.ts`). Il faudrait une fixture avec un article indexable et un article noindex.
- En-têtes de sécurité (HSTS, `X-Content-Type-Options`, `Referrer-Policy`) : à vérifier chez l'hébergeur, invérifiable en preview.

## Attendu à ce stade (non compté comme problème)

- Il n'y a pas d'article réel, l'accueil du blog fait environ 60 mots et les cartes de pilier affichent « 0 article ».
- Le sitemap ne contient qu'une URL, `/blog/`.
- Les hubs listés dans `llms.txt` n'existent pas encore. Le vrai défaut est qu'ils répondent 200 au lieu de 404 (point 1).
- `/blog/gabarit-test/` est en noindex, avec une description qui annonce sa suppression au pilote.
- `/blog/auteur/francois-hatem/` est en noindex avec `[BIO À FOURNIR]`. Du coup, le `Person` n'a ni `description` ni `sameAs`, et le signal Experience est faible.
- Le domaine `https://memoflow.example` apparaît partout (canonical, sitemap, robots, llms.txt, JSON-LD).
- Aucune mention de la marque ailleurs (Wikipedia, Reddit, LinkedIn) et pas de `sameAs` sur l'Organization.
- `Cache-Control: no-cache`, `Vary: Origin` et l'absence de compression sont des artefacts de `vite preview`.
- `lastmod` est absent du sitemap tant qu'il n'y a pas d'article. Le générateur le gère déjà.
- Il n'y a ni WebMCP, ni `ai-catalog.json`, ni négociation Markdown : ce n'est pas utile sans service d'agent.
- Les bots d'entraînement (GPTBot, ClaudeBot, Google-Extended) sont autorisés dans `robots.txt`. C'est un choix, pas un défaut.

## Ce qui est déjà bon

- Performance lab de 100 sur `/blog/` et le gabarit : LCP 0,6 s, CLS 0, TBT 0 ms. La page pèse 4 à 5 KiB en 2 requêtes, avec le CSS inline, et ne charge rien de la SPA.
- Aucun débordement horizontal à 375 px, un corps de texte à 17 px et le H1 visible sans scroll.
- Les CTA (`Cta.astro`) ne citent que Notion, Trello, GitHub, le planificateur et Harvard, ce qui respecte `product-facts.md`.
- Le schéma de collection est strict (au moins 2 sources, title ≤ 60 caractères, description ≤ 160), un deuxième hub sur un même pilier fait échouer le build, et les URL ont un slash final cohérent avec `trailingSlash: 'always'`.
- `robots.txt` est fait d'un seul groupe : il nomme les robots de recherche, d'entraînement et ceux déclenchés par un utilisateur, et déclare le sitemap du blog.

## Ordre conseillé

1. Corriger le point 1 (404 du blog), puis le point 2 (`index.html`). Ce sont deux petites corrections qui enlèvent la page de login du chemin des crawlers.
2. Corriger les points 3 et 5 avant le pilote (A0, A1, D1) : chaque article publié avant héritera des manques du gabarit.
3. Corriger le point 4 avant de passer le premier article en index.
4. Au premier déploiement en staging, relancer `/seo agentic` et `/seo technical` sur l'URL publique.
