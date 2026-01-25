import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',
  filteredRecipes: [],

  /* ---------------- Recipes CRUD ---------------- */
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes,
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes,
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter(
        (recipe) => recipe.id !== id
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes,
        favorites: state.favorites.filter((favId) => favId !== id),
      };
    }),

  /* ---------------- Search ---------------- */
  setSearchTerm: (term) => set({ searchTerm: term }),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  /* ---------------- Favorites ---------------- */
  addFavorite: (recipeId) =>
    set((state) =>
      state.favorites.includes(recipeId)
        ? state
        : { favorites: [...state.favorites, recipeId] }
    ),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  /* ---------------- Recommendations ---------------- */
  generateRecommendations: () => {
    const { recipes, favorites } = get();

    // Simple mock logic: recommend non-favorite recipes
    const recommended = recipes.filter(
      (recipe) => !favorites.includes(recipe.id)
    );

    set({ recommendations: recommended.slice(0, 3) });
  },
}));
