import { createCanvas, loadImage } from 'canvas';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { imageUrls }: { imageUrls: string[] } = await request.json();
    if (!Array.isArray(imageUrls) || imageUrls.length !== 20) {
      return NextResponse.json(
        { error: 'Invalid input. Provide exactly 20 image URLs.' },
        { status: 400 }
      );
    }

    const canvasWidth = 1000;
    const musaicHeight = 800;
    const footerHeight = 60;
    const canvasHeight = musaicHeight + footerHeight;
    const imageWidth = canvasWidth / 5;
    const imageHeight = musaicHeight / 4;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const x = (i % 5) * imageWidth;
      const y = Math.floor(i / 5) * imageHeight;

      // fetch the image and draw it on the canvas
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const img = await loadImage(Buffer.from(arrayBuffer));
      ctx.drawImage(img, x, y, imageWidth, imageHeight);
    }

    // add footer.png file to bottom of canvas
    const footerPath = path.join(process.cwd(), '/src/assets/footer.png');
    const footer = await loadImage(footerPath);
    ctx.drawImage(footer, 0, musaicHeight, canvasWidth, footerHeight);

    const buffer = canvas.toBuffer('image/png');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="musaic.png"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while creating the collage.' },
      { status: 500 }
    );
  }
}
