const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Get FFmpeg path
let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (err) {
  console.error('Error: ffmpeg-static could not be loaded. Please run npm install first.');
  process.exit(1);
}

const workspaceDir = path.join(__dirname, '..');
const videoDir = path.join(workspaceDir, 'public/videos');
const targetVideoPath = path.join(videoDir, 'zeus-tattoo.mp4');
const fallbackVideoPath = path.join(videoDir, 'please_edit_this_video_p_q.mp4');

console.log('--- Step 1: Checking Video Sources ---');

// Check target video existence, copy fallback if needed
if (!fs.existsSync(targetVideoPath)) {
  if (fs.existsSync(fallbackVideoPath)) {
    console.log(`zeus-tattoo.mp4 not found. Copying fallback ${path.basename(fallbackVideoPath)} to zeus-tattoo.mp4...`);
    fs.copyFileSync(fallbackVideoPath, targetVideoPath);
    console.log('Copy complete!');
  } else {
    console.error('Error: Neither zeus-tattoo.mp4 nor please_edit_this_video_p_q.mp4 could be found in public/videos/.');
    process.exit(1);
  }
} else {
  console.log('zeus-tattoo.mp4 found successfully.');
}

console.log('\n--- Step 2: Reading Video Metadata ---');
let ffmpegInfo = '';
try {
  execSync(`"${ffmpegPath}" -i "${targetVideoPath}"`, { stdio: 'pipe' });
} catch (err) {
  // FFmpeg always exits with code 1 if no output is provided, which is expected
  ffmpegInfo = err.stderr.toString();
}

// Parse resolution (e.g. 1920x1080)
const resMatch = ffmpegInfo.match(/Stream #.*Video:.*?, (\d+)x(\d+)/);
let width = 1920;
let height = 1080;
if (resMatch) {
  width = parseInt(resMatch[1], 10);
  height = parseInt(resMatch[2], 10);
  console.log(`Detected native resolution: ${width}x${height}`);
} else {
  console.log(`Could not detect native resolution. Defaulting to 1920x1080.`);
}

// Parse duration
const durMatch = ffmpegInfo.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2})\.(\d{2})/);
let durationSec = 10;
if (durMatch) {
  const h = parseInt(durMatch[1], 10);
  const m = parseInt(durMatch[2], 10);
  const s = parseInt(durMatch[3], 10);
  const ms = parseInt(durMatch[4], 10);
  durationSec = h * 3600 + m * 60 + s + ms / 100;
  console.log(`Detected duration: ${durationSec} seconds`);
} else {
  console.log(`Could not detect duration. Defaulting to 10 seconds.`);
}

// Calculate target framerate
// We want exactly 300 frames. Duration is durationSec.
// FPS = 300 / durationSec.
const targetFps = 300 / durationSec;
console.log(`Calculated target extraction frame rate: ${targetFps.toFixed(4)} FPS`);

// Setup output directories
const framesDir = path.join(workspaceDir, 'public/frames');
const desktopDir = path.join(framesDir, 'desktop');
const mobileDir = path.join(framesDir, 'mobile');

console.log('\n--- Step 3: Preparing Directories ---');
const setupDir = (dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Clearing existing directory: ${dir}`);
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
};

setupDir(desktopDir);
setupDir(mobileDir);

console.log('\n--- Step 4: Extracting Desktop Frames ---');
// Extract desktop frames (Native Resolution, WebP quality 95)
console.log(`Running FFmpeg to extract high-quality WebP frames (desktop)...`);
const desktopOutputPattern = path.join(desktopDir, 'frame-%04d.webp');
const desktopCmd = `"${ffmpegPath}" -i "${targetVideoPath}" -vf "fps=${targetFps}" -vcodec libwebp -lossless 0 -q:v 95 -compression_level 6 -y "${desktopOutputPattern}"`;
console.log(`Executing: ${desktopCmd}`);
try {
  execSync(desktopCmd, { stdio: 'inherit' });
} catch (err) {
  console.error('Error during desktop frame extraction:', err);
  process.exit(1);
}

console.log('\n--- Step 5: Extracting Mobile Frames ---');
// Calculate mobile size: 2/3 of desktop, must be even for scale filter
let mobileWidth = Math.round(width * 2 / 3);
let mobileHeight = Math.round(height * 2 / 3);
if (mobileWidth % 2 !== 0) mobileWidth++;
if (mobileHeight % 2 !== 0) mobileHeight++;
console.log(`Calculated mobile resolution: ${mobileWidth}x${mobileHeight}`);

console.log(`Running FFmpeg to extract high-quality WebP frames (mobile)...`);
const mobileOutputPattern = path.join(mobileDir, 'frame-%04d.webp');
const mobileCmd = `"${ffmpegPath}" -i "${targetVideoPath}" -vf "fps=${targetFps},scale=${mobileWidth}:${mobileHeight}" -vcodec libwebp -lossless 0 -q:v 90 -compression_level 6 -y "${mobileOutputPattern}"`;
console.log(`Executing: ${mobileCmd}`);
try {
  execSync(mobileCmd, { stdio: 'inherit' });
} catch (err) {
  console.error('Error during mobile frame extraction:', err);
  process.exit(1);
}

console.log('\n--- Step 6: Post-Processing Frame Counts ---');
const postProcessDir = (dir) => {
  const files = fs.readdirSync(dir)
    .filter(f => f.startsWith('frame-') && f.endsWith('.webp'))
    .sort();

  console.log(`Directory ${path.basename(dir)}: initially found ${files.length} frames.`);

  if (files.length < 300) {
    const lastFile = files[files.length - 1];
    const lastFilePath = path.join(dir, lastFile);
    console.log(`Found ${files.length} frames, duplicate-padding last frame ${lastFile} up to 300...`);
    for (let i = files.length + 1; i <= 300; i++) {
      const paddedNum = i.toString().padStart(4, '0');
      const newFilePath = path.join(dir, `frame-${paddedNum}.webp`);
      fs.copyFileSync(lastFilePath, newFilePath);
    }
  } else if (files.length > 300) {
    console.log(`Found ${files.length} frames, trimming extra frames above 300...`);
    for (let i = 301; i <= files.length; i++) {
      const paddedNum = i.toString().padStart(4, '0');
      const extraFilePath = path.join(dir, `frame-${paddedNum}.webp`);
      if (fs.existsSync(extraFilePath)) {
        fs.unlinkSync(extraFilePath);
      }
    }
  }

  // Double check resulting file list
  const finalFiles = fs.readdirSync(dir)
    .filter(f => f.startsWith('frame-') && f.endsWith('.webp'))
    .sort();

  console.log(`Directory ${path.basename(dir)}: finalized at ${finalFiles.length} frames.`);
  return finalFiles;
};

const finalDesktopFiles = postProcessDir(desktopDir);
const finalMobileFiles = postProcessDir(mobileDir);

console.log('\n--- Step 7: Size Summary Report ---');
const reportStats = (dir, files) => {
  let totalSizeBytes = 0;
  for (const file of files) {
    const stats = fs.statSync(path.join(dir, file));
    totalSizeBytes += stats.size;
  }
  const totalMb = totalSizeBytes / (1024 * 1024);
  const avgKb = (totalSizeBytes / files.length) / 1024;
  console.log(`Folder: ${path.basename(dir)}`);
  console.log(`  Total Frames: ${files.length}`);
  console.log(`  Total Size:   ${totalMb.toFixed(2)} MB`);
  console.log(`  Average Size: ${avgKb.toFixed(2)} KB per frame`);
};

reportStats(desktopDir, finalDesktopFiles);
reportStats(mobileDir, finalMobileFiles);
console.log('\n--- Frame Generation Completed Successfully! ---');
