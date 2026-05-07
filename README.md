# LoRO — Local Regulations Ontology

Landing page for the LoRO ontology and the Cibelex Knowledge Graph, developed by the Municipality of Madrid as part of the MAIA initiative.

This repository hosts a static HTML/CSS/JS site that serves as the human-friendly entry point for the LoRO ontology and its associated artifacts. The actual ontology, graph, datasets and code are hosted on Zenodo, Hugging Face, and GitHub — this page links to the latest version of each.

## Live site

When deployed on GitHub Pages: `https://ayuntamientomadrid.github.io/loro-local-regulations-ontology/`

## Stack

Plain HTML/CSS/JS. No static site generator required. Bilingual (English / Spanish) with content centralized in `data/contenido.json`. Default language is English; users can switch to Spanish via the toggle in the header. Choice is persisted in `localStorage`.

## Structure

```
.
├── index.html                  # main landing page (i18n via data attributes)
├── data/
│   └── contenido.json          # all translatable content (en / es)
├── assets/
│   ├── loro_logo_dark.png      # LoRO square logo, dark background
│   ├── favicon.ico
│   └── img/                    # Madrid corporate identity SVGs
├── css/
│   └── estilos.css             # styles (Madrid palette + LoRO additions)
└── js/
    └── app.js                  # i18n loader and section renderer
```

## Local preview

```bash
cd loro-local-regulations-ontology
python3 -m http.server 8000
# then open http://localhost:8000
```

Switching language: click the `EN`/`ES` toggle in the navbar, or append `?lang=es` to the URL.

## Editing content

All translatable text lives in `data/contenido.json`. Each section has parallel `en` and `es` keys. To add or edit content:

1. Edit the value in the appropriate language block.
2. Reload the page — no build step required.

## Deployment

Push to the `main` branch of `https://github.com/AyuntamientoMadrid/loro-local-regulations-ontology` and enable GitHub Pages on `main` (root). The site will be served at the URL above within a minute.

## License

- **Code** in this repository (HTML/CSS/JS, configuration, scripts): released under the **MIT License** — see [`LICENSE`](LICENSE).
- **Content** displayed on this site (text and translations in `data/contenido.json`, branding assets): released under the **MIT License**.

The artifacts linked from this site each declare their own license in their respective repository and Zenodo deposit:

- **LoRO ontology, Cibelex Knowledge Graph, Q&A evaluation dataset**: released under the **Creative Commons Attribution 4.0 International License (CC-BY 4.0)**.
- **Source code** (cibelex-mcp server, LoRO-Fuseki container): released under the **MIT License**.

## Maintenance

Maintained by the MAIA team (Madrid Artificial Intelligence) at the Municipality of Madrid IT Department (IAM). Issues and contributions are welcome.
