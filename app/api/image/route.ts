import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const src = searchParams.get("src");
  const width = searchParams.get("width");

  if (!src) {
    return NextResponse.json({ error: "Missing 'src' query parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(src);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch the image" }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();

    // Parse width and height, with defaults if not provided
    const resizeWidth = width ? parseInt(width, 10) : 220;

    const resizedBuffer = await sharp(Buffer.from(buffer))
      .resize(resizeWidth, null) // Fix height, auto width
      .toBuffer();

    return new Response(resizedBuffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json({ error: "Failed to process the image" }, { status: 500 });
  }
}