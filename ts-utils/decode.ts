import { decode } from 'blurhash';
import sharp from 'sharp';

export const decodeBlurhash = async (blurhash?: string) => {
  if (!blurhash) return;

  const width = 32;
  const height = 32;

  const pixels = decode(blurhash, width, height);
  const data = Uint8Array.from(pixels);
  const dataUrl = await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer()
    .then((data) => `data:image/png;base64,${data.toString('base64')}`);

  return dataUrl;
};