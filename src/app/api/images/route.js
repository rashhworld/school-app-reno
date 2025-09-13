import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Build absolute path to the image
    const filePath = path.join(
      process.cwd(),
      "public",
      "schoolImages",
      filename
    );

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Read file content
    const fileBuffer = fs.readFileSync(filePath);

    // Set correct content type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    if (ext === ".webp") contentType = "image/webp";
    if (ext === ".gif") contentType = "image/gif";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store", // Disable caching
      },
    });
  } catch (err) {
    console.error("Error fetching image:", err);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
