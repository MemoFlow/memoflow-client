# MemoFlow : faits produit vérifiés dans le code

Relevé du 06/11/2026 sur `developement` (commit c1e53b1). Source de vérité pour tout contenu SEO.
**Règle : un article ne peut rien affirmer sur MemoFlow qui ne figure pas ici.** Si un fait manque, écrire `[À VÉRIFIER : ...]` et ne pas l'inventer.

## Pour qui (onboarding, `src/services/onboarding.ts`)
- Profils proposés : alternant, stagiaire, étudiant sans alternance, autre.
- Niveaux proposés : L3, M1, M2, « autre (bac+3 à bac+5) ». Aucune mention de doctorat dans l'onboarding.
- Documents proposés : mémoire, rapport d'alternance, rapport de stage, autre.
- Blocages proposés : démarrer, retrouver ce que j'ai fait, structurer, rédiger, le temps.
- Outils où l'étudiant laisse des traces de son travail : Trello, Notion, Teams, Slack, mails, Drive.
- Canaux d'acquisition suivis : ami, école, TikTok, Instagram, LinkedIn, Google.
- Ton de l'onboarding : tutoiement (« Comment nous as-tu connus ? »).

## Ce que fait l'app (composants)
- Espace d'écriture organisé en sections, avec sauvegarde automatique (`WritingSpace.tsx`).
- Un « planificateur » génère un plan à partir du contexte et l'ajoute comme section (« Le planificateur rassemble le contexte et rédige le plan... »).
- Modèles de documents, dont certains réservés aux comptes, et modèles personnels (`TemplatesPage.tsx`). Visuels de niveau : master_grade, professional_grade, doctoral_grade (sens exact non vérifié).
- Connecteurs pour importer du contexte : pages de notes et wikis, cartes de tâches et Kanban, fichiers Markdown et dépôts de code (`ConnectorsManager.tsx`, liaison via Composio).
- **Connecteurs réellement codés : Notion, Trello, GitHub** (`ConnectorsManager.tsx:11`). Teams, Slack, mails et Drive n'apparaissent que comme réponses de l'onboarding, pas comme connecteurs. Un CTA ou un article ne cite que Notion, Trello, GitHub.
- Centre de contexte : ajout de fichiers de recherche, personas de lecteurs (`ContextCenter.tsx`). **L'option « Imposer le style de citation Harvard » est une case à cocher sans effet** : état React local, ni enregistré ni envoyé (`ContextCenter.tsx:57`, vérifié le 07/11/2026). Ne pas la présenter comme une fonction.
- Baseline actuelle : « Structurez votre pensée, libérez votre potentiel ».

## Non vérifié, ne pas affirmer
Prix et limites du plan gratuit, essai, nombre d'utilisateurs, écoles partenaires, détection anti-plagiat, toute norme de citation (Harvard compris, voir plus haut), export Word/PDF, conformité RGPD, modèle d'IA utilisé.

## Site
- Pas de landing : `/` affiche la connexion. L'inscription est un état React (`view = 'signup'`), pas une URL.
- Domaine et hébergeur de prod inconnus. Placeholder unique : `https://memoflow.example`.

## Décisions de François (06/11/2026)
- Cible du blog : L3-M2, alternants, stagiaires. Pas de doctorants.
- Modèle : freemium (plan gratuit avec limites). Les CTA peuvent dire « commence gratuitement ». Les limites du plan gratuit ne sont pas connues : ne rien affirmer à leur sujet.
- Auteur des articles : François Hatem, nommé, avec une bio. Le contenu de la bio est à fournir par François (`[BIO À FOURNIR]`) : ne rien inventer de son parcours.
- Architecture : blog Astro dans `blog/`, sortie dans `dist/blog/`.
