# AFINN

[![npm](https://img.shields.io/npm/v/afinn.ts)](https://www.npmjs.com/package/afinn.ts)
[![Test](https://github.com/cmpadden/afinn.ts/workflows/Test/badge.svg)](https://github.com/cmpadden/afinn.ts/actions)

AFINN sentiment analysis: a wordlist-based approach to sentiment analysis
ported from the original [Python implementation](https://github.com/fnielsen/afinn) to Typescript.

## Installation

```
yarn add afinn.ts
```

## Examples

```ts
import { Afinn } from "afinn";
const afinn = Afinn({ language: "en" });
afinn.score("This is utterly excellent!");
```

In Danish:

```ts
const afinn = Afinn({ language: "da" });
afinn.score("Hvis ikke det er det mest afskyelige flueknepperi...");
```

In Finnish:

```ts
const afinn = Afinn({ language: "fi" });
afinn.score("Siellä on uusi hyvä juttu, katsokaa ja kuunnelkaa ihmeessä.");
```

In Swedish:

```ts
const afinn = Afinn({ language: "sv" });
afinn.score("det är inte bra");
```

In Turkish:

```ts
const afinn = Afinn({ language: "tr" });
afinn.score("iyi de\u011Fil");
```

```ts
const afinn = Afinn({ language: "tr" });
afinn.score("iyi değil");
```

With emoticons:

```ts
const afinn = Afinn({ language: "emoticons" });
afinn.score("I saw that yesterday :)");
```

_NOTE:_ there are plans to add _emoticon_ support to all languages, as is done in the Python implementation.

## Citation

Nielsen's original citation can be found here:

> Finn Årup Nielsen, "A new ANEW: evaluation of a word list for sentiment analysis in microblogs", Proceedings of the ESWC2011 Workshop on 'Making Sense of Microposts': Big things come in small packages. Volume 718 in CEUR Workshop Proceedings: 93-98. 2011 May. Matthew Rowe, Milan Stankovic, Aba-Sah Dadzie, Mariann Hardey (editors)
