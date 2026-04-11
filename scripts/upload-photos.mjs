/**
 * Upload project photos to Supabase `media` bucket under `projects/`.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/upload-photos.mjs
 *
 * Requires: @supabase/supabase-js (already in package.json)
 * Run from the project root after `npm install`.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMG_DIR = join(ROOT, 'public', 'images');

const SUPABASE_URL = 'https://dimwhyteticwobwtqrke.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('ERROR: Set SUPABASE_SERVICE_ROLE_KEY env var before running.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const files = [
  { name: 'saadi-kitchen-gray-cabinet-island-houston-1.jpg',           type: 'image/jpeg' },
  { name: 'saadi-kitchen-white-cabinet-island-houston-1.jpg',          type: 'image/jpeg' },
  { name: 'saadi-kitchen-gray-open-bar-stools-houston-1.jpg',          type: 'image/jpeg' },
  { name: 'saadi-kitchen-white-shaker-ss-appliances-houston-1.webp',   type: 'image/webp' },
  { name: 'saadi-kitchen-white-island-dark-floor-houston-1.jpg',       type: 'image/jpeg' },
  { name: 'saadi-kitchen-white-island-dark-floor-houston-2.jpg',       type: 'image/jpeg' },
  { name: 'saadi-kitchen-appliance-wall-granite-houston-1.webp',       type: 'image/webp' },
  { name: 'saadi-kitchen-white-island-open-living-houston-1.webp',     type: 'image/webp' },
  { name: 'saadi-kitchen-sage-island-patterned-tile-houston-1.webp',   type: 'image/webp' },
  { name: 'saadi-kitchen-render-white-black-pendants-houston-1.webp',  type: 'image/webp' },
  { name: 'saadi-bedroom-render-ceiling-fan-houston-1.webp',           type: 'image/webp' },
  { name: 'saadi-bathroom-render-double-vanity-houston-1.webp',        type: 'image/webp' },
];

async function uploadAll() {
  let ok = 0;
  let fail = 0;

  for (const { name, type } of files) {
    const localPath = join(IMG_DIR, name);
    if (!existsSync(localPath)) {
      console.warn(`  SKIP  ${name} — file not found at ${localPath}`);
      fail++;
      continue;
    }

    const buffer = readFileSync(localPath);
    const storagePath = `projects/${name}`;

    const { error } = await supabase.storage
      .from('media')
      .upload(storagePath, buffer, {
        contentType: type,
        upsert: true,
      });

    if (error) {
      console.error(`  FAIL  ${name}: ${error.message}`);
      fail++;
    } else {
      console.log(`  OK    ${name}`);
      ok++;
    }
  }

  console.log(`\nDone: ${ok} uploaded, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

uploadAll();
