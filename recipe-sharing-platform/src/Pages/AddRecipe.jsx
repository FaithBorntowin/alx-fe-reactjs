import AddRecipeForm from "../components/AddRecipeForm";

export default function AddRecipe() {
  function handleAddRecipe(newRecipe) {
    // For now: just log it (later you can push to state/store/localStorage)
    console.log("New recipe:", newRecipe);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <AddRecipeForm onAddRecipe={handleAddRecipe} />
    </div>
  );
}
