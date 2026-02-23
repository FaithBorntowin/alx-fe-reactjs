import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Profile</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Link to="details">Profile Details</Link>
        <Link to="settings">Profile Settings</Link>
      </div>

      {/* Nested route content shows here */}
      <div style={{ border: "1px solid #ddd", padding: 12 }}>
        <Outlet />
      </div>
    </div>
  );
}
