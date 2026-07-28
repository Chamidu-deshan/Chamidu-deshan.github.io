# Chamidu Deshan — Digital Marketer

A responsive personal portfolio built for Chamidu Deshan. The site combines a
cinematic editorial flow with clear hiring and contact paths, while keeping the
visual language modern, minimal, and personal.

## Included

- Home, About, Portfolio, Inside the Work, and Contact sections
- light and dark themes with saved visitor preference
- responsive desktop and mobile layouts
- fixed mobile bottom navigation and full-screen menu
- animated brand marquee, scroll reveals, micro-interactions, and portrait depth
- reduced-motion support for visitors who request it
- supplied Chamidu portrait, Fadna, Fadna Life Science, and QofL assets
- temporary project and BTS imagery until original campaign media is provided
- email, LinkedIn, and Instagram contact paths
- static export and automated GitHub Pages deployment

## Run locally

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm test
```

`npm test` creates the GitHub-ready static site in `out/` and checks the core
content, links, assets, responsive navigation, and accessibility safeguards.

## Publish to GitHub Pages

The current root-relative asset paths are prepared for Chamidu's GitHub user
site:

1. Create a public repository named `Chamidu-deshan.github.io`.
2. Push this project to the repository's `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. The included `deploy-pages.yml` workflow builds and publishes the site.

The production address will be:
`https://chamidu-deshan.github.io/`

## Content still to replace

- SATINY, Crepe Runner, Hype Bam, Seixed, and KBC Original logo files
- final campaign results, captions, and case-study descriptions
- original project screenshots, videos, and behind-the-scenes photos

Temporary gallery images are credited in the website footer and should be
replaced before the final public launch:

- [Unsplash — analytics workspace](https://unsplash.com/photos/a-laptop-screen-displays-data-analytics-charts-and-statistics-fDisDvdiqrQ)
- [Unsplash — social media workspace](https://unsplash.com/photos/woman-using-a-laptop-with-social-media-open-9Zx0ZeiJ6x4)
- [Pexels — production crew](https://www.pexels.com/photo/camera-crew-hilding-camera-equipment-9866568/)
- [Pexels — camera setup](https://www.pexels.com/photo/professional-film-camera-setup-on-movie-set-32610376/)
