# CLAUDE.md — solarfi-etopia.com

## Le projet
Site **one-page** pour **SOLARFI e·Topia** (SOLARFI S.A.S., Biarritz — dirigeant : Pierre Delalonde).
Deux volets d'activité présentés en **deux parties distinctes** sur la page :
1. **Centrales photovoltaïques** en intégration toiture — exemple phare : la centrale **DARLA** (zone d'Iraty, Biarritz), bâtiment à énergie positive.
2. **Villas & écolodges autonomes** (projet **e-Topia**, péninsule de Samaná, Rép. Dominicaine).

### Ton éditorial (IMPORTANT)
Le site **n'est pas commercial** : aucune prospection de prospects/clients. Bannir tout discours de vente (« votre projet », « demander une étude », « devis »…). **Mais** ne pas non plus afficher le positionnement noir sur blanc (« réalise uniquement ses propres projets », « dédié aux partenaires/fournisseurs/administrations ») : c'est un contexte interne. Ton descriptif + contact neutre.

## Structure de la page (`index.html`)
Hero → section globale « Deux expertises » → **Partie 01** (charte sombre & technique, bleu solaire + orange) avec stats DARLA, galerie, impact, **section Média** (reportage France 3 + article Sud Ouest) → **Partie 02** (charte claire & chaleureuse ivoire/or/vert) avec galerie masonry de rendus → Contact → Footer. Lightbox JS pour les galeries, nav responsive (hamburger ≤880px).

## Hébergement & déploiement
- **VPS** Hetzner · **cPanel** · user `solarfi` · deploy path `/home/solarfi/public_html/`
- Déploiement : cPanel > Git Version Control (pull `main` + `.cpanel.yml` qui fait `cp -R` de css/js/assets + fichiers racine).

## Stack
HTML5 / CSS3 / JS vanilla (aucun framework, aucun build). Polices via Google Fonts (Cormorant Garamond, Inter, JetBrains Mono).

## Assets — règle critique
- **Sources brutes lourdes gitignorées** (~937 Mo : `*.VOB`, `*.zip`, `*.pdf`, `*.jpeg`, `IMG_*.jpg`) — elles restent en local, hors git/déploiement.
- **Seuls les dérivés web** sont versionnés : images optimisées dans `assets/img/`, vidéo dans `assets/video/`.
- Outils utilisés pour régénérer (installés via brew) : `poppler` (pdftoppm/pdftotext), `imagemagick` (magick), `ffmpeg`.
- La vidéo France 3 = `VTS_01_1.VOB` (646 Mo) → réencodée en `assets/video/france3-solarfi.mp4` (480p, ~43 Mo).
- Logo de marque propre : `assets/logo-solarfi.png` → dérivés `assets/img/sun.png`, `favicon.ico`, `favicon-180.png`.

## Conventions
- Mobile-first, **chemins relatifs uniquement** (`css/style.css`, jamais `/css/...`).
- `alt` obligatoire sur les images ; jamais de hotlink.

## SEO
`<title>` + meta description par page, Open Graph complet, Schema.org (JSON-LD Organization), `sitemap.xml`, `robots.txt`.

## Cache-busting
`.htaccess` met CSS/JS/images en cache **1 mois**. À chaque modif :
- `css/style.css` / `js/main.js` : bumper `?v=AAAAMMJJx` dans `index.html`. **Version actuelle CSS : `v=20260622f`**.
- Si on remplace une **image** en gardant son nom (ex. `sun.png`, `favicon.ico`), ajouter/incrémenter `?v=N` sur ses références (sinon ancienne version servie 1 mois). Actuel : `?v=2`.

## Ponctuation
**Pas de tirets cadratins (—)** dans le contenu (règle universelle). Utiliser point médian `·`, virgule, deux-points ou point.

## Git
- `main` = production (déployée par cPanel).
- Le client/proprio **autorise le push direct sur `main`** pour ce projet solo (confirmé à plusieurs reprises). Committer puis pousser quand il le demande.
