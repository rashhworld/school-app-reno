import Link from "next/link";
import "../styles/form.css";

export default function SchoolRegistrationForm() {
  return (
    <div className="container">
      <Link href="/">← View listed schools</Link>
      <h1 className="form-title">School Registration</h1>
      <form>
        <div className="form-group">
          <label>Enter Your School Name</label>
          <input type="text" placeholder="Enter school name" />
        </div>
        <div className="form-group">
          <label>Upload School Image</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label>Enter Official Email ID</label>
          <input type="email" placeholder="Enter email address" />
        </div>
        <div className="form-group">
          <label>Enter City Name</label>
          <input type="text" placeholder="Enter city" />
        </div>
        <div className="form-group">
          <label>Enter State Name</label>
          <input type="text" placeholder="Enter state" />
        </div>
        <div className="form-group">
          <label>Enter Contact Number</label>
          <input type="number" placeholder="Enter contact number" />
        </div>
        <div className="form-group address-group">
          <label>Enter School Address</label>
          <textarea placeholder="Enter school address"></textarea>
        </div>
        <button type="submit">Register Your School</button>
      </form>
    </div>
  );
}
