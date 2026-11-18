# Consignes communes aux correcteurs d'une vague

Tu appliques un rapport de relecture à froid sur des articles du blog. **Ne lance aucun sous-agent : fais tout toi-même.**

- Applique TOUS les points bloquants et « à corriger » du rapport, plus les mineurs simples. Si tu écartes un point, dis pourquoi dans ton retour.
- Les règles de `docs/seo/briefs/_consignes-vague.md` restent valables, en particulier la section « Erreurs trouvées par la relecture de la vague 1 ». Rien sur MemoFlow hors `docs/seo/product-facts.md`.
- **Harvard n'est plus un argument produit.** La case « Imposer le style de citation Harvard » ne fait rien dans l'app (product-facts.md). Le CTA `harvard` n'existe plus et aucun article ne doit lier MemoFlow à une norme de citation.
- Les textes des CTA (`blog/src/components/Cta.astro`) sont déjà corrigés : n'y touche pas.
- Revérifie sur la source toute phrase factuelle que tu réécris : WebFetch, ou curl puis pdftotext pour un PDF. Télécharge dans un dossier à toi, `/private/tmp/claude-501/fix-<ton nom>/`, jamais dans un dossier partagé.
- Une citation se recopie mot pour mot.
- Mets `dateModified: 2026-11-07` sur chaque article touché. Puis invoque la skill `no-ai-slop` (tool Skill) sur les passages modifiés et applique-la.
- Vérification : `npx astro build --root blog --outDir /private/tmp/claude-501/fix-<ton nom>/build`, qui doit passer. Ne lance pas `npm run build`. Si le build échoue sur un fichier qui n'est pas à toi, relance une fois.
- Ne touche qu'aux articles de ton prompt. Ne commite rien.

Rends (80 mots max) : ce que tu as changé, ce que tu n'as pas corrigé et pourquoi, la sortie du build.
