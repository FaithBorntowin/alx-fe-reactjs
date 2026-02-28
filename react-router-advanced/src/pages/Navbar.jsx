import { Link } from "react-router-dom";

export default function Navbar({ isAuthenticated, onLogout }) {
  return (
    <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>

        <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.8 }}>
          {isAuthenticated ? "Authenticated ✅" : "Not logged in ❌"}
        </span>

        {isAuthenticated && (
          <button onClick={onLogout} style={{ marginLeft: 12 }}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
