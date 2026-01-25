import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useRecipeStore } from '../store/recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === Number(id))
  );
  const favorites = useRecipeStore((state) => state.favorites);
const addFavorite = useRecipeStore((state) => state.addFavorite);
const removeFavorite = useRecipeStore((state) => state.removeFavorite);

const isFavorite = favorites.includes(recipe.id);


  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />

      <button onClick={() => navigate('/')}>Back</button>
      <button
  onClick={() =>
    isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id)
  }
>
  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
</button>

    </div>
  );
};

export default RecipeDetails;
