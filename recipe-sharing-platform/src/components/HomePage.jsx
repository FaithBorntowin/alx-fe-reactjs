import {useState, useEffect } from "react";
import data from "../data.json"
import { Link } from "react-router-dom";
function HomePage() {
  const [ recipes, setRecipes] = useState([]);
  useEffect(() => {
    setRecipes(data)
  },[]) 
    return (
    <>
      <h1 className="text-xl md:text-2xl font-bold text-center">
        Recipe Sharing Platform
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4">
        {recipes.map((recipe) => {
          return (
            <li
              key={recipe.id}
              className="shadow-lg rounded-lg overflow-hidden text-center p-3 bg-white"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-md"
              />

              <h2 className="font-bold mt-2 text-sm md:text-base">
                {recipe.title}
              </h2>

              <Link
                to={`/recipe/${recipe.id}`}
                className="inline-block mt-2 text-blue-400 hover:text-blue-600 text-sm"
              >
                View Details
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  )
  
}
export default HomePage