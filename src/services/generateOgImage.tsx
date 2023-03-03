import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import satori from 'satori'

const fetchBuffer = async (filepath: string) => {
  // Find the absolute path of the file directory
  const fullPath = path.join(process.cwd(), filepath)
  // Read the file data
  return fs.readFileSync(fullPath)
}

export const generateOpengraphImage = async (config: {
  title: string
  description?: string
}): Promise<Buffer> => {
  const { title, description } = config

  const mulishFontData = await fetchBuffer('src/assets/fonts/Mulish/Mulish-Bold.ttf')
  const robotoFontData = await fetchBuffer('src/assets/fonts/Roboto/Roboto-Regular.ttf')

  const bgData = await fetchBuffer('src/assets/img/og-bg.png')

  const contentSvg = await satori(
    <div style={{
      display: 'flex',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      padding: '120px',
      color: '#FFFFFF',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '24px' }}>
        <h1 style={{
          fontSize: '90px',
          marginBottom: '2px',
          fontFamily: 'Mulish, Helvetica, "sans-serif"',
        }}>{title}</h1>
        {description
          ? <p style={{
            opacity: '0.7',
            fontSize: '32px',
            paddingLeft: '12px',
            lineHeight: '40px',
            fontFamily: 'Roboto, Helvetica, "sans-serif"',
          }}>{description}</p>
          : null}
      </div>

      <small style={{
        position: 'absolute',
        color: '#FFFFFF',
        top: '64px',
        left: '980px',
        fontFamily: 'Mulish, Helvetica, "sans-serif"',
        fontWeight: 700,
        fontSize: '36px',
        zIndex: '0',
      }}>gemcase</small>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Roboto',
          data: robotoFontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Mulish',
          data: mulishFontData,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )

  const contentBuffer = await sharp(Buffer.from(contentSvg, 'utf-8'))
    .resize(1200 * 2, 630 * 2)
    .toBuffer()

  return await sharp(bgData)
    .composite([{ input: contentBuffer }])
    .resize(1200 * 2, 630 * 2)
    .png()
    .toBuffer()
}
