import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

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
    const id = formData.get("id"); // For editing

    // Check required fields
    if (!name || !email_id || !contact || !city || !state || !address) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate contact format
    const phoneRegex = /^[1-9][0-9]{9}$/;
    if (!phoneRegex.test(contact)) {
      return NextResponse.json(
        { error: "Invalid contact number" },
        { status: 400 }
      );
    }

    // Check if image exists (only required for new schools)
    if (!id && (!imageFile || !(imageFile instanceof File))) {
      return NextResponse.json(
        { error: "School image is required" },
        { status: 400 }
      );
    }

    // Allow only specific image types (only if image is provided)
    if (imageFile && imageFile instanceof File) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];

      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          {
            error:
              "Invalid image type. Only JPG, PNG, WEBP, and GIF are allowed.",
          },
          { status: 400 }
        );
      }

      // Limit image size to 3MB
      const MAX_SIZE = 3 * 1024 * 1024; // 3MB
      if (imageFile.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "Image size must be less than 3MB" },
          { status: 400 }
        );
      }
    }

    const pool = await getDb();

    // Check for existing email/contact (exclude current school if editing)
    let existingQuery =
      "SELECT * FROM schools WHERE (email_id = ? OR contact = ?)";
    let existingParams = [email_id, contact];

    if (id) {
      existingQuery += " AND id != ?";
      existingParams.push(id);
    }

    const [existing] = await pool.query(existingQuery, existingParams);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email or contact already registered" },
        { status: 409 }
      );
    }

    let imageName = null;

    // Handle image upload (only if new image is provided)
    if (imageFile && imageFile instanceof File) {
      // Prepare image buffer and upload path
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "schoolImages");
      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });

      // Generate unique image name
      const originalName = path.parse(imageFile.name).name;
      const fileExt = path.extname(imageFile.name);
      const randomStr = Math.random().toString(36).slice(2, 8);
      imageName = `${originalName}-${randomStr}${fileExt}`;
      const filePath = path.join(uploadDir, imageName);

      fs.writeFileSync(filePath, buffer); // Save image
    }

    if (id) {
      // Get current school data to check for old image
      const [currentSchool] = await pool.query(
        "SELECT image FROM schools WHERE id = ?",
        [id]
      );

      // Update existing school
      let updateQuery = `UPDATE schools SET name = ?, email_id = ?, contact = ?, city = ?, state = ?, address = ?`;
      let updateParams = [name, email_id, contact, city, state, address];

      if (imageName) {
        updateQuery += `, image = ?`;
        updateParams.push(imageName);

        // Remove old image if it exists and is different from new one
        if (
          currentSchool.length > 0 &&
          currentSchool[0].image &&
          currentSchool[0].image !== imageName
        ) {
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            "schoolImages",
            currentSchool[0].image
          );
          try {
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
              console.log(`Removed old image: ${currentSchool[0].image}`);
            }
          } catch (error) {
            console.error(`Error removing old image: ${error.message}`);
          }
        }
      }

      updateQuery += ` WHERE id = ?`;
      updateParams.push(id);

      await pool.query(updateQuery, updateParams);

      return NextResponse.json(
        { message: "School updated successfully" },
        { status: 200 }
      );
    } else {
      // Insert new school
      await pool.query(
        `INSERT INTO schools (name, email_id, contact, city, state, address, image)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, email_id, contact, city, state, address, imageName]
      );

      return NextResponse.json(
        { message: "School added successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add school" },
      { status: 500 }
    );
  }
};
