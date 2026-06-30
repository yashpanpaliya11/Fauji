import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://www.image2url.com/r2/default/videos/1782746669499-a5c843b2-2f7e-4ebc-909c-620ab3d88b27.mp4';
const dir = path.join(process.cwd(), 'public', 'videos');
const dest = path.join(dir, 'hero-background.mp4');

const IMAGES = [
  "https://i.ibb.co/VYY9xYj3/Screenshot-2026-06-29-at-11-40-23-PM.png",
  "https://i.ibb.co/TxBn1Rgd/Screenshot-2026-06-29-at-11-40-32-PM.png",
  "https://i.ibb.co/67ZTNPdq/Screenshot-2026-06-29-at-11-40-40-PM.png",
  "https://i.ibb.co/hxphDgz9/Screenshot-2026-06-29-at-11-40-47-PM.png",
  "https://i.ibb.co/tw3SSnm7/Screenshot-2026-06-29-at-11-38-15-PM.png",
  "https://i.ibb.co/LzwGbDt5/Screenshot-2026-06-29-at-11-38-12-PM.png",
  "https://i.ibb.co/pr4pzmfk/Screenshot-2026-06-29-at-11-38-09-PM.png",
  "https://i.ibb.co/s9NcSDkP/Screenshot-2026-06-29-at-11-37-21-PM.png"
];

const imgDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function downloadFile(url: string, dest: string): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`Warning: Failed to download ${url}: HTTP ${response.status}`);
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
  } catch (error) {
    clearTimeout(timeout);
    console.warn(`Warning: Error downloading ${url}:`, error instanceof Error ? error.message : error);
  }
}

async function run() {
  try {
    console.log('Downloading video...');
    const videoPromise = downloadFile(url, dest).then(() => console.log('Video downloaded successfully'));

    console.log('Downloading images...');
    const imagePromises = IMAGES.map((imgUrl, i) => {
      const ext = path.extname(new URL(imgUrl).pathname) || '.png';
      const imgDest = path.join(imgDir, `loading-img-${i + 1}${ext}`);
      return downloadFile(imgUrl, imgDest).then(() => console.log(`Downloaded image ${i + 1}/${IMAGES.length}`));
    });

    await Promise.all([videoPromise, ...imagePromises]);
    console.log('All downloads finished successfully.');
  } catch (err) {
    console.error('Download error:', err);
    process.exit(1);
  }
}

run();
