import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://www.image2url.com/r2/default/videos/1782746669499-a5c843b2-2f7e-4ebc-909c-620ab3d88b27.mp4';
const dir = path.join(process.cwd(), 'public', 'videos');
const dest = path.join(dir, 'hero-background.mp4');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Video downloaded successfully');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('Error downloading video:', err.message);
});
