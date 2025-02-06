import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

/**
 * Image processing handler for GET requests.
 * 
 * This handler accepts an image URL and a height parameter, fetches the image from the URL,
 * resizes it to the specified height (while maintaining the aspect ratio), and returns it as a PNG image.
 *
 * @param {NextRequest} request - The incoming Next.js request object.
 * @returns {NextResponse | Response} - A response containing the resized image or an error message.
 */
export async function GET(request: NextRequest) {
  // Extract search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  const src = searchParams.get("src"); // The image source URL
  const height = searchParams.get("height"); // The desired image height

  // Check if the 'src' query parameter is missing
  if (!src) {
    return NextResponse.json({ error: "Missing 'src' query parameter" }, { status: 400 });
  }

  try {
    // Fetch the image from the provided 'src' URL
    const response = await fetch(src);

    // If the fetch fails, return an error response
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch the image" }, { status: 500 });
    }

    // Convert the fetched image into a buffer (binary data)
    const buffer = await response.arrayBuffer();

    // Parse the 'height' query parameter, defaulting to 210 if not provided
    const resizeHeight = height ? parseInt(height, 10) : 210;

    // Use sharp to resize the image, fixing the height and maintaining the aspect ratio
    const resizedBuffer = await sharp(Buffer.from(buffer))
      .resize({ height: resizeHeight }) // Set the height, width is auto-calculated
      .png() // Output the image as PNG format
      .toBuffer(); // Get the processed image as a buffer

    // Return the resized image as the response with proper content-type (PNG)
    return new Response(resizedBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    // Log the error to the console and return a 500 error if image processing fails
    console.error("Image processing error:", error);
    return NextResponse.json({ error: "Failed to process the image" }, { status: 500 });
  }
}
