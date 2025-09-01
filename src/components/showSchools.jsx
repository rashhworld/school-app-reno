"use client";

import Link from "next/link";
import Image from "next/image";
import "../styles/schools.css";

export default function SchoolsGrid({ schools }) {
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

  return (
    <div className="schools-container">
      <div className="header-section">
        <h1 className="page-title">Registered Schools</h1>
        <Link className="add-btn" href="/add">
          Add School →
        </Link>
      </div>
      <div className="schools-grid">
        {schools.map((school) => (
          <div className="school-card" key={school.id}>
            <Image
              src={`/schoolImages/${school.image}`}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
