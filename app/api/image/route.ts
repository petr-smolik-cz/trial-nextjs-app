import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const src = searchParams.get("src");
  const height = searchParams.get("height");

  if (!src) {
    return NextResponse.json({ error: "Missing 'src' query parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(src);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch the image" }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();

    // Parse height, with a default if not provided
    const resizeHeight = height ? parseInt(height, 10) : 210;

    const resizedBuffer = await sharp(Buffer.from(buffer))
      .resize({ height: resizeHeight }) // Fix height, auto width
      .png() // Explicitly output as PNG
      .toBuffer();

    return new Response(resizedBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json({ error: "Failed to process the image" }, { status: 500 });
  }
}
