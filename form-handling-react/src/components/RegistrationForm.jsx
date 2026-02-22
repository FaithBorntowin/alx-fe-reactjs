import { useState } from "react";
import { registerUser } from "../services/api";

const initialValues = { username: "", email: "", password: "" };

export default function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  function validate(v) {
    const e = {};
    if (!v.username.trim()) e.username = "Username is required";
    if (!v.email.trim()) e.email = "Email is required";
    if (!v.password.trim()) e.password = "Password is required";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prev) => {
      const updated = { ...prev, [name]: value };
      setErrors(validate(updated)); // live validation
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const e2 = validate(values);
    setErrors(e2);

    if (Object.keys(e2).length > 0) {
      setStatus({ loading: false, message: "Please fix the errors.", type: "error" });
      return;
    }

    setStatus({ loading: true, message: "", type: "" });

    try {
      // ReqRes expects email + password; username is extra
      const result = await registerUser({
        email: values.email,
        password: values.password,
        username: values.username,
      });

      setStatus({ loading: false, message: `Registered! Token: ${result.token}`, type: "success" });
      setValues(initialValues);
      setErrors({});
    } catch (err) {
      setStatus({ loading: false, message: err.message, type: "error" });
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Registration (Controlled)</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label>
            Username
            <input
              name="username"
              value={values.username}
              onChange={handleChange}
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
              value={values.email}
              onChange={handleChange}
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
              value={values.password}
              onChange={handleChange}
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
