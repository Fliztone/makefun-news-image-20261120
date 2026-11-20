# makefun-news-image-20261120

[![make.fun](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/Fliztone/makefun-news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/Fliztone/makefun-news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120)

One image summing up the world's news of **Friday 20 November 2026**, for the
[make.fun](https://make.fun) bounty [news-image-20261120](https://make.fun/bounty/news-image-20261120).

A newspaper-style front page: the Grand Theft Auto VI launch leads, with the
Trump–Xi–Putin peace declaration, Anthropic's record IPO, Israel's central-Gaza
ground operation, the Hormuz tanker mines, Bangladesh's shutdown and Cyclone Akvan.

## Run

`main.ts` (Node 22, standard library only) copies `entry.png` to `$MAKEFUN_OUTPUT_DIR/entry.png`
(default `/output/entry.png`). No network; identical bytes on every run.

```sh
node main.ts
```

`render.mjs` is the build-time renderer (SVG → PNG via `@resvg/resvg-js`); it is not used at run time.