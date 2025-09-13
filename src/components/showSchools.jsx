"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../styles/schools.css";

export default function SchoolsGrid({ schools, user }) {
  const router = useRouter();

  const handleViewDetails = (school) => {
    const details = `
    Name: ${school.name}
    Email: ${school.email_id}
    Contact: ${school.contact}
    Address: ${school.address}
    City: ${school.city}
    State: ${school.state}
    `;
    alert(details);
  };

  const handleEditSchool = (school) => {
    // Navigate to add page with school ID for editing
    router.push(`/add?id=${school.id}`);
  };

  return (
    <div className="schools-container">
      <div className="header-section">
        <h1 className="page-title">Registered Schools</h1>
        {user && (
          <Link className="add-btn" href="/add">
            Add School →
          </Link>
        )}
      </div>

      {schools.length === 0 ? (
        <div className="no-schools">
          <p>
            No schools have been registered yet. <br /> Be the first to add one!
          </p>
        </div>
      ) : (
        <div className="schools-grid">
          {schools.map((school) => (
            <div className="school-card" key={school.id}>
              <Image
                src={school.imageUrl}
                height={300}
                width={500}
                alt={school.name}
                className="school-image"
              />
              <div className="school-content">
                <div>
                  <h2>{school.name}</h2>
                  <p>
                    <strong>Address:</strong> {school.address}
                  </p>
                  <p>
                    <strong>City:</strong> {school.city}
                  </p>
                </div>
                <div>
                  <button
                    className="view-btn"
                    onClick={() => handleViewDetails(school)}
                  >
                    View Details
                  </button>
                  {user && (
                    <button
                      className="edit-btn"
                      onClick={() => handleEditSchool(school)}
                    >
                      Edit School
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
