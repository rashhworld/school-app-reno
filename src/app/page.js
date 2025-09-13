import SchoolsGrid from "@/components/showSchools";
import { getAuthUser } from "@/lib/auth";
import "../styles/auth.css";
import Link from "next/link";

// Force dynamic rendering to prevent build-time fetch errors
export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getSchools() {
  const res = await fetch(`${baseUrl}/api/fetch`);
  return res.json();
}

export default async function ShowSchools() {
  const schools = await getSchools();
  const user = await getAuthUser();

  return (
    <div>
      {!user && (
        <div className="login-prompt">
          <div className="login-prompt-content">
            <h3>Want to add or manage schools?</h3>
            <p>Login with your email to get started</p>
            <Link href="/login" className="login-prompt-button">
              Login Now
            </Link>
          </div>
        </div>
      )}
      {user && (
        <div className="auth-header">
          <div className="header-content">
            <h1 className="header-title">School Management App</h1>
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="logout-button">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <SchoolsGrid schools={schools} user={user} />
    </div>
  );
}
