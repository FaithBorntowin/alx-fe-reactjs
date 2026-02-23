import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./components/profile";
import ProfileDetails from "./pages/ProfileDetails";

import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";

export default function App() {
  // simple auth simulation
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={() => setIsAuthenticated(false)}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              onLogin={() => setIsAuthenticated(true)}
            />
          }
        />

        {/* Dynamic routing */}
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostDetails />} />

        {/* Protected + Nested routing */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          {/* nested routes */}
          <Route index element={<Navigate to="details" replace />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
