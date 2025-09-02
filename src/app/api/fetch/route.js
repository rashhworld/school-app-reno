import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const pool = await getDb();
    const [rows] = await pool.query(`SELECT * FROM schools`);

    // Add image URL dynamically
    const updatedRows = rows.map((school) => ({
      ...school,
      imageUrl: `/api/images?filename=${encodeURIComponent(school.image)}`,
    }));

    return new Response(JSON.stringify(updatedRows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching schools:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch schools" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
