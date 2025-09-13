import RegistrationForm from "@/components/addSchool";
import { getDb } from "@/lib/db";

export default async function RegisterSchool({ searchParams }) {
  let schoolData = null;

  // If editing a school, fetch the school data
  const params = await searchParams;
  if (params?.id) {
    try {
      const pool = await getDb();
      const [schools] = await pool.query("SELECT * FROM schools WHERE id = ?", [
        params.id,
      ]);

      if (schools.length > 0) {
        schoolData = schools[0];
      }
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  }

  return <RegistrationForm schoolData={schoolData} />;
}
