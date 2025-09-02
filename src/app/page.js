import SchoolsGrid from "@/components/showSchools";

// Force dynamic rendering to prevent build-time fetch errors
export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getSchools() {
  const res = await fetch(`${baseUrl}/api/fetch`);
  return res.json();
}

export default async function ShowSchools() {
  const schools = await getSchools();

  return <SchoolsGrid schools={schools} />;
}
