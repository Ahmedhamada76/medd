const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');

const localTransforms = [
  { input: 'assets/img-1_759a48d4.png', output: 'assets/optimized/img-1_759a48d4.webp', width: 1280, quality: 68 },
  { input: 'assets/img-2_b501c895.png', output: 'assets/optimized/img-2_b501c895.webp', width: 1280, quality: 68 },
  { input: 'assets/img-3_04f56fbc.png', output: 'assets/optimized/img-3_04f56fbc.webp', width: 1280, quality: 68 },
  { input: 'assets/img-4_9ed4f43b.png', output: 'assets/optimized/img-4_9ed4f43b.webp', width: 1280, quality: 68 },
  { input: 'assets/img-5_0ff2a3c3.png', output: 'assets/optimized/img-5_0ff2a3c3.webp', width: 1400, quality: 68 },
  { input: 'assets/slogan20260112_c36401b9.png', output: 'assets/optimized/slogan20260112_c36401b9.webp', width: 900, quality: 76 },
  { input: 'assets/483890259_660459716493412_8159011387796922199_n.jpg', output: 'assets/optimized/483890259_660459716493412_8159011387796922199_n.webp', width: 800, quality: 72 },
  { input: 'assets/ebe74338-8ebf-42d8-8f21-446d7322ba1a.jpg', output: 'assets/optimized/ebe74338-8ebf-42d8-8f21-446d7322ba1a.webp', width: 800, quality: 72 },
  { input: 'assets/img-jbbq_ff311c2b.jpg', output: 'assets/optimized/img-jbbq_ff311c2b.webp', width: 320, quality: 74 },
  { input: 'assets/img-yzkh_1cb0640d.jpg', output: 'assets/optimized/img-yzkh_1cb0640d.webp', width: 320, quality: 74 },
  { input: 'assets/img-ngxl_13adb5bb.jpg', output: 'assets/optimized/img-ngxl_13adb5bb.webp', width: 320, quality: 74 },
  { input: 'assets/img-yzyz_9eed6351.jpg', output: 'assets/optimized/img-yzyz_9eed6351.webp', width: 320, quality: 74 },
  { input: 'assets/zhiye_lh1_968083c7.png', output: 'assets/optimized/zhiye_lh1_968083c7.webp', width: 900, quality: 74 },
  { input: 'assets/zhiye_lh2_24acaa85.png', output: 'assets/optimized/zhiye_lh2_24acaa85.webp', width: 900, quality: 74 },
  { input: 'assets/zhiye_lh3_266702db.png', output: 'assets/optimized/zhiye_lh3_266702db.webp', width: 900, quality: 74 },
  { input: 'assets/text-js1_68920b2c.png', output: 'assets/optimized/text-js1_68920b2c.webp', width: 700, quality: 86 },
  { input: 'assets/text-js2_ade7a1d0.png', output: 'assets/optimized/text-js2_ade7a1d0.webp', width: 700, quality: 86 },
  { input: 'assets/text-js3_1beffabe.png', output: 'assets/optimized/text-js3_1beffabe.webp', width: 700, quality: 86 },
  { input: 'assets/kl-1_15496aa6.png', output: 'assets/optimized/kl-1_15496aa6.webp', width: 120, quality: 82 },
  { input: 'assets/kl-2_807b015a.png', output: 'assets/optimized/kl-2_807b015a.webp', width: 120, quality: 82 },
  { input: 'assets/kl-3_739227a1.png', output: 'assets/optimized/kl-3_739227a1.webp', width: 120, quality: 82 },
  { input: 'assets/hx-1_6559f412.png', output: 'assets/optimized/hx-1_6559f412.webp', width: 120, quality: 82 },
  { input: 'assets/hx-2_b47e444b.png', output: 'assets/optimized/hx-2_b47e444b.webp', width: 120, quality: 82 },
  { input: 'assets/hx-3_c75e21f7.png', output: 'assets/optimized/hx-3_c75e21f7.webp', width: 120, quality: 82 },
  { input: 'assets/hx-4_46c7abfd.png', output: 'assets/optimized/hx-4_46c7abfd.webp', width: 120, quality: 82 },
  { input: 'assets/hx-5_0f7496f9.png', output: 'assets/optimized/hx-5_0f7496f9.webp', width: 120, quality: 82 },
  { input: 'assets/483X272-1_b05a5593.jpg', output: 'assets/optimized/483X272-1_b05a5593.webp', width: 483, quality: 76 },
  { input: 'assets/483X272-2_bdfee024.jpg', output: 'assets/optimized/483X272-2_bdfee024.webp', width: 483, quality: 76 },
  { input: 'assets/483X272-3_3d31d5c1.jpg', output: 'assets/optimized/483X272-3_3d31d5c1.webp', width: 483, quality: 76 },
  { input: 'assets/483X272-4_2611cd9c.jpg', output: 'assets/optimized/483X272-4_2611cd9c.webp', width: 483, quality: 76 },
  { input: 'assets/483X272-5_3fde6084.jpg', output: 'assets/optimized/483X272-5_3fde6084.webp', width: 483, quality: 76 },
  { input: 'assets/483X272-6_3b476f0e.jpg', output: 'assets/optimized/483X272-6_3b476f0e.webp', width: 483, quality: 76 },
  { input: 'assets/1-326x204_5ac6deae.jpg', output: 'assets/optimized/1-326x204_5ac6deae.webp', width: 326, quality: 76 },
  { input: 'assets/2-326x204_7fcd7a9a.jpg', output: 'assets/optimized/2-326x204_7fcd7a9a.webp', width: 326, quality: 76 },
  { input: 'assets/3-326x204_72933fa4.jpg', output: 'assets/optimized/3-326x204_72933fa4.webp', width: 326, quality: 76 },
  { input: 'assets/4-326x204_042a8124.jpg', output: 'assets/optimized/4-326x204_042a8124.webp', width: 326, quality: 76 },
  { input: 'assets/5-326x204_f989f991.jpg', output: 'assets/optimized/5-326x204_f989f991.webp', width: 326, quality: 76 },
  { input: 'assets/6-326x204_45a27c41.jpg', output: 'assets/optimized/6-326x204_45a27c41.webp', width: 326, quality: 76 },
  { input: 'assets/08-362_589dc2f2.png', output: 'assets/optimized/08-362_589dc2f2.webp', width: 362, quality: 78 },
  { input: 'assets/07-362_0dd22771.png', output: 'assets/optimized/07-362_0dd22771.webp', width: 362, quality: 78 },
  { input: 'assets/06-362_b8875a4a.png', output: 'assets/optimized/06-362_b8875a4a.webp', width: 362, quality: 78 },
  { input: 'assets/05-362_934090d6.png', output: 'assets/optimized/05-362_934090d6.webp', width: 362, quality: 78 },
  { input: 'assets/04-362_69d19078.png', output: 'assets/optimized/04-362_69d19078.webp', width: 362, quality: 78 },
  { input: 'assets/03-362_dec3b3a0.png', output: 'assets/optimized/03-362_dec3b3a0.webp', width: 362, quality: 78 },
  { input: 'assets/02-362_2d00e498.png', output: 'assets/optimized/02-362_2d00e498.webp', width: 362, quality: 78 },
  { input: 'assets/01-362_cd8b41df.png', output: 'assets/optimized/01-362_cd8b41df.webp', width: 362, quality: 78 },
  { input: 'assets/7_1cd88d69.png', output: 'assets/optimized/7_1cd88d69.webp', width: 1280, quality: 72 }
];

const remoteDownloads = [
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/feature-bg_52154c31.jpg',
    output: 'assets/optimized/feature-bg_52154c31.webp',
    width: 1600,
    quality: 68,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/1_83e0569d.png',
    output: 'assets/remote/1_83e0569d.webp',
    width: 700,
    quality: 72,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/tit-1_58d52494.png',
    output: 'assets/remote/tit-1_58d52494.webp',
    width: 900,
    quality: 74,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/2_66b20784.png',
    output: 'assets/remote/2_66b20784.webp',
    width: 700,
    quality: 72,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/tit-2_1f3e6898.png',
    output: 'assets/remote/tit-2_1f3e6898.webp',
    width: 900,
    quality: 74,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/3_986f9463.png',
    output: 'assets/remote/3_986f9463.webp',
    width: 700,
    quality: 72,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/tit-3_290c16c8.png',
    output: 'assets/remote/tit-3_290c16c8.webp',
    width: 900,
    quality: 74,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/4_9139b3a7.png',
    output: 'assets/remote/4_9139b3a7.webp',
    width: 700,
    quality: 72,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/tit-4_05985588.png',
    output: 'assets/remote/tit-4_05985588.webp',
    width: 900,
    quality: 74,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/5_210064fc.png',
    output: 'assets/remote/5_210064fc.webp',
    width: 700,
    quality: 72,
    webp: true
  },
  {
    url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/tit-5_6b72ffa6.png',
    output: 'assets/remote/tit-5_6b72ffa6.webp',
    width: 900,
    quality: 74,
    webp: true
  },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/1-1920x1080_b335b29b.jpg', output: 'assets/remote/1-1920x1080_b335b29b.webp', width: 1920, quality: 80, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/2-1920x1080_df10f382.jpg', output: 'assets/remote/2-1920x1080_df10f382.webp', width: 1920, quality: 80, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/3-1920x1080_36818aba.jpg', output: 'assets/remote/3-1920x1080_36818aba.webp', width: 1920, quality: 80, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/4-1920x1080_8a79abf2.jpg', output: 'assets/remote/4-1920x1080_8a79abf2.webp', width: 1920, quality: 80, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/5-1920x1080_19b18325.jpg', output: 'assets/remote/5-1920x1080_19b18325.webp', width: 1920, quality: 80, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/6-1920x1080_5fb9ac66.jpg', output: 'assets/remote/6-1920x1080_5fb9ac66.webp', width: 1920, quality: 80, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/08_96c28903.png', output: 'assets/remote/08_96c28903.webp', width: 1920, quality: 82, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/07_53313803.png', output: 'assets/remote/07_53313803.webp', width: 1920, quality: 82, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/06_d590c767.png', output: 'assets/remote/06_d590c767.webp', width: 1920, quality: 82, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/05_c4d9b9ef.png', output: 'assets/remote/05_c4d9b9ef.webp', width: 1920, quality: 82, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/04_1367eaa8.png', output: 'assets/remote/04_1367eaa8.webp', width: 1920, quality: 82, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/03_b7e8c5d0.png', output: 'assets/remote/03_b7e8c5d0.webp', width: 1920, quality: 82, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/02_e267d31a.png', output: 'assets/remote/02_e267d31a.webp', width: 1920, quality: 82, webp: true },
  { url: 'https://www.oncehuman.game/pc/gw/20250418171534/img/01_66bb3266.png', output: 'assets/remote/01_66bb3266.webp', width: 1920, quality: 82, webp: true }
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(path.join(root, filePath)), { recursive: true });
}

async function optimizeLocalAsset(task) {
  const inputPath = path.join(root, task.input);
  const outputPath = path.join(root, task.output);

  try {
    await fs.access(inputPath);
  } catch {
    console.log(`skipped missing ${task.input}`);
    return;
  }

  await ensureDir(task.output);

  const pipeline = sharp(inputPath).rotate().resize({
    width: task.width,
    withoutEnlargement: true,
    fit: 'inside'
  });

  await pipeline.webp({ quality: task.quality, effort: 6 }).toFile(outputPath);
  console.log(`optimized ${task.output}`);
}

async function downloadAndProcess(task) {
  const response = await fetch(task.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${task.url}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await ensureDir(task.output);

  if (task.webp) {
    let pipeline = sharp(buffer).rotate();
    if (task.width) {
      pipeline = pipeline.resize({ width: task.width, withoutEnlargement: true, fit: 'inside' });
    }
    await pipeline.webp({ quality: task.quality || 72, effort: 6 }).toFile(path.join(root, task.output));
  } else {
    await fs.writeFile(path.join(root, task.output), buffer);
  }

  console.log(`downloaded ${task.output}`);
}

async function main() {
  for (const task of localTransforms) {
    await optimizeLocalAsset(task);
  }

  for (const task of remoteDownloads) {
    await downloadAndProcess(task);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
