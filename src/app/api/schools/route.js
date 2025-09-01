export async function GET() {
  const schools = [
    {
      id: 1,
      name: "Green Valley School",
      email_id: "contact@greenvalley.edu",
      address: "123 Green Street, Hill View",
      city: "Bangalore",
      state: "Karnataka",
      contact: 9876543210,
      image:
        "https://uniformapp.in/admin_area/school_images/La_Martiniere_College_Lucknow_image1_7.jpeg",
    },
    {
      id: 2,
      name: "Sunrise Public School",
      email_id: "info@sunrise.edu",
      address: "45 Sunrise Ave, Lake Side",
      city: "Mumbai",
      state: "Maharashtra",
      contact: 9123456780,
      image:
        "https://uniformapp.in/admin_area/school_images/Vidsan_Charterhouse_Faridabad_image1_1311.jpeg",
    },
    {
      id: 3,
      name: "Silver Oak High School",
      email_id: "admissions@silveroak.edu",
      address: "88 Oak Road, Green Park",
      city: "Pune",
      state: "Maharashtra",
      contact: 9988776655,
      image:
        "https://uniformapp.in/admin_area/school_images/Lucknow_Public_School_Vinamra_Khand_Lucknow_image1_43.jpeg",
    },
    {
      id: 4,
      name: "Bluebird Academy",
      email_id: "hello@bluebird.edu",
      address: "12 Bird Lane, Downtown",
      city: "Chennai",
      state: "Tamil Nadu",
      contact: 9876501234,
      image:
        "https://uniformapp.in/admin_area/school_images/Fortune_World_School_Noida_image1_159.jpeg",
    },
    {
      id: 5,
      name: "Riverdale Convent School",
      email_id: "support@riverdale.edu",
      address: "77 River Street, Palm Gardens",
      city: "Delhi",
      state: "Delhi",
      contact: 9988001122,
      image:
        "https://uniformapp.in/admin_area/school_images/Pathways_World_School_Aravali_Gurgaon_image1_1206.jpeg",
    },
  ];

  return new Response(JSON.stringify(schools), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
