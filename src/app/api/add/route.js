import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const imageFile = formData.get("image");
    const email_id = formData.get("email_id");
    const contact = formData.get("contact");
    const city = formData.get("city");
    const state = formData.get("state");
    const address = formData.get("address");

    // Check required fields
    if (!name || !email_id || !contact || !city || !state || !address) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email_id)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
      });
    }

    // Validate contact format
    const phoneRegex = /^[1-9][0-9]{9}$/;
    if (!phoneRegex.test(contact)) {
      return new Response(JSON.stringify({ error: "Invalid contact number" }), {
        status: 400,
      });
    }

    // Check if image exists
    if (!imageFile || !(imageFile instanceof File)) {
      return new Response(
        JSON.stringify({ error: "School image is required" }),
        { status: 400 }
      );
    }

    // Allow only specific image types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(imageFile.type)) {
      return new Response(
        JSON.stringify({
          error:
            "Invalid image type. Only JPG, PNG, WEBP, and GIF are allowed.",
        }),
        { status: 400 }
      );
    }

    // Limit image size to 3MB
    const MAX_SIZE = 3 * 1024 * 1024; // 3MB
    if (imageFile.size > MAX_SIZE) {
      return new Response(
        JSON.stringify({ error: "Image size must be less than 3MB" }),
        { status: 400 }
      );
    }

    const pool = await getDb();

    // Check for existing email/contact
    const [existing] = await pool.query(
      "SELECT * FROM schools WHERE email_id = ? OR contact = ?",
      [email_id, contact]
    );

    if (existing.length > 0) {
      return new Response(
        JSON.stringify({ error: "Email or contact already registered" }),
        { status: 409 }
      );
    }

    // Prepare image buffer and upload path
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Generate unique image name
    const originalName = path.parse(imageFile.name).name;
    const fileExt = path.extname(imageFile.name);
    const randomStr = Math.random().toString(36).slice(2, 8);
    const uniqueName = `${originalName}-${randomStr}${fileExt}`;
    const filePath = path.join(uploadDir, uniqueName);

    fs.writeFileSync(filePath, buffer); // Save image

    // Insert school record into DB
    await pool.query(
      `INSERT INTO schools (name, email_id, contact, city, state, address, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email_id, contact, city, state, address, uniqueName]
    );

    return new Response(
      JSON.stringify({ message: "School added successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to add school" }), {
      status: 500,
    });
  }
};
