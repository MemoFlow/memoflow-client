# Consignes communes aux relecteurs d'une vague

Tu relis à froid des articles que tu n'as pas écrits. **Ne lance aucun sous-agent : fais tout toi-même.** Ne modifie aucun article et ne commite rien.

## Contexte
- Site servi en local sur http://localhost:4173 (déjà lancé, ne le coupe pas). Source : `blog/src/content/articles/<slug>.md`.
- `docs/seo/product-facts.md` : seule source de faits sur MemoFlow.
- `docs/seo/briefs/_consignes-vague.md` : les règles que les rédacteurs devaient suivre, dont la section « Erreurs trouvées par la relecture de la vague 1 ». Ce sont les erreurs à chercher en premier.
- Format de rapport à suivre : `docs/seo/relecture-vague-1/A4-B0.md`.
- Déjà connu, ne le compte pas : domaine memoflow.example, pas d'image OG, bio auteur absente, `consulte: 2026-11-07` au lieu du 06, SERP vue depuis un moteur US.

## Pour chaque article
1. Skill `seo-content` (tool Skill) : E-E-A-T, contenu mince, citabilité IA, tournures d'IA.
2. Skill `seo-page` sur l'URL locale, en passage rapide : ne signale que ce qui est faux ou manquant.
3. Anti-hallucination : les 3 affirmations factuelles les plus fortes, vérifiées une par une sur la source citée (WebFetch ; pour un PDF, télécharge-le avec curl et lis-le avec pdftotext). Verdict : confirmée / déformée / introuvable.
4. Les quantificateurs (« toutes », « aucune », « x sur y ») : recompte-les dans les sources.
5. Toute phrase sur MemoFlow, contre product-facts.md.

## Entre articles
- Contradictions avec les articles déjà publiés sur le même point (longueur, règle, chiffre) : `grep -ri "<mot-clé>" blog/src/content/articles/`.
- Cannibalisation : deux titles ou deux angles trop proches.

## Rapport
Écris-le dans `docs/seo/relecture-vague-2/<nom donné dans ton prompt>.md` : par article, un verdict (publiable / à corriger / à réécrire), puis les problèmes classés bloquant / à corriger / mineur, chacun avec la ligne, la phrase et le correctif précis.

Rends (120 mots max) : le verdict par article, les bloquants, le bilan anti-hallucination (et lesquelles sont déformées), les contradictions trouvées.
