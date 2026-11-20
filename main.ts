// news-image-20261120 entry: write the pre-rendered front page to the output directory.
// Node 22, standard library only, no network, deterministic (same bytes every run).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const image = readFileSync(join(here, 'entry.png'));
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!image.subarray(0, 8).equals(PNG_SIG)) throw new Error('entry.png is not a PNG');
if (image.toString('ascii', image.length - 8, image.length - 4) !== 'IEND') throw new Error('entry.png is truncated (no IEND)');
const target = join(outDir, 'entry.png');
writeFileSync(target, image);
if (readFileSync(target).length !== image.length) throw new Error('output write was truncated');