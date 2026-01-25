import { Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';


function App() {
  return (
    <div>
      <h1>Recipe Sharing App</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          }
        />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
      <>
  <SearchBar />
  <AddRecipeForm />
  <RecipeList />
</>
<>
  <SearchBar />
  <AddRecipeForm />
  <RecipeList />
  <FavoritesList />
  <RecommendationsList />
</>


    </div>
  );
}

export default App;
