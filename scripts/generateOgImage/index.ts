/* eslint-disable no-console */
import fs from 'fs'
import sharp from 'sharp'

const svgTemplate = fs.readFileSync('./scripts/generateOgImage/template.svg', 'utf-8')

const SYMBOLS_PER_LINE = 45
const descriptionRegExp = new RegExp(`(?![^\n]{1,${SYMBOLS_PER_LINE}}$)([^\n]{1,${SYMBOLS_PER_LINE}})\s`, 'g')

export const generateOgImage = async (
  config: {
    title: string
    description: string
  },
  output: string,
) => {
  const { title, description } = config

  const lines = description.replace(descriptionRegExp, '$1\n').split('\n')

  const data = {
    title,
    line1: lines[0] ?? '',
    line2: lines[1] ?? '',
    line3: lines[2] ?? '',
  }
  const svg = svgTemplate.replace(
    /\{\{([^}]+)}}/g,
    (_, template) => data[template as keyof typeof data],
  )

  console.log(`Generating ${output}`)

  await sharp(Buffer.from(svg))
    .resize(1200 * 2, 630 * 2)
    .png()
    .toFile(output)
}
