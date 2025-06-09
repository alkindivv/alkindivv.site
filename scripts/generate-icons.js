const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const inputImage = path.join(__dirname, '../public/logo.png');
  const publicDir = path.join(__dirname, '../public');

  // Check if input image exists
  if (!fs.existsSync(inputImage)) {
    console.error('❌ Input image not found:', inputImage);
    return;
  }

  console.log('🎨 Generating icons from logo.png...');

  try {
    // Generate favicon.ico (32x32)
    await sharp(inputImage)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    // Generate favicon 16x16
    await sharp(inputImage)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));

    // Generate Apple Touch Icon (180x180)
    await sharp(inputImage)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    // Generate Open Graph image (1200x630)
    await sharp(inputImage)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      })
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));

    // Generate PWA icons
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, 'icons', `icon-${size}x${size}.png`));
    }

    // Create favicon.ico (using 32x32 as base)
    await sharp(inputImage)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));

    console.log('✅ All icons generated successfully!');
    console.log('📁 Generated files:');
    console.log('   - favicon.ico');
    console.log('   - favicon-16x16.png');
    console.log('   - favicon-32x32.png');
    console.log('   - apple-touch-icon.png');
    console.log('   - og-image.png');
    console.log('   - PWA icons (72x72 to 512x512)');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons();
