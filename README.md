# School Registration App

A modern Next.js application for managing school registrations with image upload functionality and MySQL database integration.

## Features

- **School Registration Form**: Add new schools with comprehensive details
- **Image Upload**: Support for school images (JPG, PNG, WEBP, GIF) up to 3MB
- **Data Validation**: Form validation with error handling
- **School Directory**: View all registered schools in a responsive grid layout
- **Database Integration**: MySQL database with automatic table creation
- **Modern UI**: Clean and responsive design with CSS styling

## Tech Stack

- **Frontend**: Next.js 15.5.2, React 19.1.0
- **Database**: MySQL with mysql2 driver
- **Form Handling**: React Hook Form
- **Styling**: Custom CSS
- **Image Processing**: File system storage

## Prerequisites

- Node.js (v18 or higher)
- MySQL database

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rashhworld/nextjs-school-app.git
   cd nextjs-school-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASS=your_mysql_password
   DB_NAME=your_database_name
   ```

4. **Set up MySQL database**
   - Create a MySQL database
   - The application will automatically create the `schools` table on first run

## Running the Application

1. **Development mode**

   ```bash
   npm run dev
   ```

2. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Usage

### Adding a School

1. Navigate to `/add` or click "Add School" button
2. Fill in the registration form with:
   - School name
   - School image (required, max 3MB)
   - Official email ID
   - Contact number (10 digits)
   - City and State
   - Complete address
3. Submit the form to register the school

### Viewing Schools

1. Visit the home page (`/`) to see all registered schools
2. Schools are displayed in a responsive grid with images
3. Click "View Details" to see complete school information

## Project Structure

```
src/
├── app/
│   ├── add/           # School registration page
│   ├── api/
│   │   ├── add/       # API endpoint for adding schools
│   │   └── fetch/     # API endpoint for fetching schools
│   └── page.js        # Home page (schools listing)
├── components/
│   ├── addSchool.jsx  # School registration form component
│   └── showSchools.jsx # Schools grid display component
├── lib/
│   └── db.ts         # Database connection and setup
└── styles/
    ├── form.css      # Registration form styling
    └── schools.css   # Schools grid styling
```
