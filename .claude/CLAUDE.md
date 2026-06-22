# CLAUDE.md — solarfi-etopia.com

## Hébergement
- **VPS** : Hetzner
- **Panel** : cPanel
- **Username cPanel** : `solarfi`
- **Deploy path** : `/home/solarfi/public_html/`
- **Déploiement** : cPanel > Git Version Control (pull + déploiement via `.cpanel.yml`)

## Stack
- HTML5 / CSS3 / JavaScript vanilla (aucun framework, aucun build).
- Structure : `index.html`, `404.html`, `css/`, `js/`, `assets/`.

## Conventions
- **Mobile-first** : écrire le CSS pour mobile d'abord, puis media queries `min-width`.
- **Images WebP** : privilégier le format WebP, fallback si nécessaire.
- **SVG inline** pour les icônes et le favicon.
- **Jamais de hotlink** : toutes les images sont hébergées localement dans `assets/`.
- **Alt text obligatoire** sur toutes les images (accessibilité + SEO).
- **Chemins relatifs uniquement** : `css/style.css`, jamais `/css/style.css`.
  Garantit le fonctionnement en `file://` et en sous-dossier.

## SEO
- `<title>` unique et descriptif par page.
- `<meta name="description">` sur chaque page.
- Balises **Open Graph** complètes (title, description, image, url, type, locale).
- **Schema.org** (JSON-LD) quand pertinent.
- `sitemap.xml` à jour (lastmod, changefreq, priority).
- `robots.txt` pointant vers le sitemap.

## Cache-busting
Le `.htaccess` impose un cache navigateur de **1 mois** sur le CSS et le JS.
À **chaque modification** de `css/style.css` ou `js/main.js`, il faut **bumper le
query string** `?v=AAAAMMJJx` dans `index.html` (et toute page qui les référence) :

```html
<link rel="stylesheet" href="css/style.css?v=20260622a">
<script src="js/main.js?v=20260622a"></script>
```

Format : date du jour `AAAAMMJJ` + lettre (`a`, `b`, `c`…) pour les modifs
multiples dans la même journée. **Oublier ce bump = servir du CSS/JS périmé
pendant un mois aux visiteurs récurrents.**

## Git
- `main` = production (déployée automatiquement).
- Travailler sur des **branches feature** (`feature/...`).
- **Jamais de push direct sur `main`** : passer par une PR / merge contrôlé.
