import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Recipe Platform 🍲</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/add">Add Recipe</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRecipeForm />} />
      </Routes>
    </Router>
  );
}

