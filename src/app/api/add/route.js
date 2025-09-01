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

    let imagePath = null;

    if (imageFile && imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadDir = path.join(process.cwd(), "public", "schoolImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const originalName = path.parse(imageFile.name).name;
      const fileExt = path.extname(imageFile.name);

      const randomStr = Math.random().toString(36).slice(2, 8);
      const uniqueName = `${originalName}-${randomStr}${fileExt}`;

      const filePath = path.join(uploadDir, uniqueName);
      fs.writeFileSync(filePath, buffer);

      imagePath = uniqueName;
    }

    const pool = await getDb();
    await pool.query(
      `INSERT INTO schools (name, email_id, contact, city, state, address, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email_id, contact, city, state, address, imagePath]
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
