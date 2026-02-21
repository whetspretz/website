// Usage: node scripts/optimize-images.mjs [--dry-run]
// Converts all PNG/JPG images in public/ to WebP, resizes if > 1920px wide

import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.resolve(__dirname, '../public')
const MAX_WIDTH = 1920
const WEBP_QUALITY = 82
const DRY_RUN = process.argv.includes('--dry-run')

const SKIP_EXT = new Set(['.gif', '.svg', '.mp4', '.mov', '.webm', '.webp', '.mp3', '.wav', '.ico'])

async function findImages(dir) {
  const results = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...await findImages(fullPath))
    } else {
      const ext = path.extname(entry.name).toLowerCase()
      if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') && !SKIP_EXT.has(ext)) {
        results.push(fullPath)
      }
    }
  }
  return results
}

async function convertImage(filePath) {
  const stat = await fs.stat(filePath)
  const outputPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')
  const metadata = await sharp(filePath).metadata()
  const needsResize = (metadata.width ?? 0) > MAX_WIDTH

  if (DRY_RUN) {
    return {
      original: path.relative(PUBLIC_DIR, filePath),
      originalSize: stat.size,
      newSize: null,
      resized: needsResize,
      width: metadata.width,
    }
  }

  let pipeline = sharp(filePath)
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
  }

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath)
  const newStat = await fs.stat(outputPath)
  await fs.unlink(filePath)

  return {
    original: path.relative(PUBLIC_DIR, filePath),
    output: path.relative(PUBLIC_DIR, outputPath),
    originalSize: stat.size,
    newSize: newStat.size,
    resized: needsResize,
    width: metadata.width,
  }
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024).toFixed(0)} KB`
}

async function main() {
  console.log(DRY_RUN ? '=== DRY RUN ===' : '=== Converting images ===')
  console.log(`Source: ${PUBLIC_DIR}\n`)

  const images = await findImages(PUBLIC_DIR)
  console.log(`Found ${images.length} PNG/JPG files\n`)

  let totalOriginal = 0
  let totalNew = 0
  let converted = 0
  let resized = 0

  for (const img of images) {
    try {
      const result = await convertImage(img)
      totalOriginal += result.originalSize

      if (DRY_RUN) {
        console.log(`  ${result.original} (${formatSize(result.originalSize)})${result.resized ? ' [will resize]' : ''}`)
      } else {
        totalNew += result.newSize
        const savings = ((1 - result.newSize / result.originalSize) * 100).toFixed(0)
        console.log(`  ${result.original} → ${formatSize(result.originalSize)} → ${formatSize(result.newSize)} (${savings}% smaller)${result.resized ? ' [resized]' : ''}`)
        converted++
        if (result.resized) resized++
      }
    } catch (err) {
      console.error(`  ERROR: ${path.relative(PUBLIC_DIR, img)}: ${err.message}`)
    }
  }

  console.log('\n=== Summary ===')
  console.log(`Files processed: ${images.length}`)
  if (DRY_RUN) {
    console.log(`Total original size: ${formatSize(totalOriginal)}`)
    console.log('Run without --dry-run to convert.')
  } else {
    console.log(`Converted: ${converted}`)
    console.log(`Resized (>1920px): ${resized}`)
    console.log(`Before: ${formatSize(totalOriginal)}`)
    console.log(`After:  ${formatSize(totalNew)}`)
    console.log(`Saved:  ${formatSize(totalOriginal - totalNew)} (${((1 - totalNew / totalOriginal) * 100).toFixed(0)}%)`)
  }
}

main().catch(console.error)
