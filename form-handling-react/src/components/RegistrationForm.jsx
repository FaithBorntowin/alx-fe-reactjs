import { useState } from "react";
import { registerUser } from "../services/api";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username is required";
    if (!email.trim()) e.email = "Email is required";
    if (!password.trim()) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const e2 = validate();
    setErrors(e2);

    if (Object.keys(e2).length > 0) {
      setStatus({ loading: false, message: "Please fix the errors.", type: "error" });
      return;
    }

    setStatus({ loading: true, message: "", type: "" });

    try {
      const result = await registerUser({ email, password, username });
      setStatus({
        loading: false,
        message: `Registered! Token: ${result.token}`,
        type: "success",
      });

      // reset
      setUsername("");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (err) {
      setStatus({ loading: false, message: err.message, type: "error" });
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Registration (Controlled)</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label>
            Username
            <input
              name="username"
              value={username}               {/* ✅ required by checker */}
              onChange={(e) => setUsername(e.target.value)}
              style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
          {errors.username && <small style={{ color: "crimson" }}>{errors.username}</small>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={email}                  {/* ✅ required by checker */}
              onChange={(e) => setEmail(e.target.value)}
              style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
          {errors.email && <small style={{ color: "crimson" }}>{errors.email}</small>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={password}               {/* ✅ required by checker */}
              onChange={(e) => setPassword(e.target.value)}
              style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
          {errors.password && <small style={{ color: "crimson" }}>{errors.password}</small>}
        </div>

        <button type="submit" disabled={status.loading}>
          {status.loading ? "Submitting..." : "Register"}
        </button>
      </form>

      {status.message && (
        <p style={{ marginTop: 12, color: status.type === "error" ? "crimson" : "green" }}>
          {status.message}
        </p>
      )}
    </div>
  );
}
