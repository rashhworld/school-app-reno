import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await getDb();
    const [rows] = await pool.query(`SELECT * FROM schools`);

    // Add image URL dynamically
    const updatedRows = rows.map((school) => ({
      ...school,
      imageUrl: `/api/images?filename=${encodeURIComponent(school.image)}`,
    }));

    return NextResponse.json(updatedRows, { status: 200 });
  } catch (err) {
    console.error("Error fetching schools:", err);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}
