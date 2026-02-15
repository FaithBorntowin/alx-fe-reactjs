import { useMemo, useState } from "react";

export default function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [touched, setTouched] = useState({
    title: false,
    ingredients: false,
    steps: false,
  });

  const [submitStatus, setSubmitStatus] = useState({
    type: "", // "success" | "error"
    message: "",
  });

  // Split ingredients by newline OR comma, trim, and remove empties
  const parsedIngredients = useMemo(() => {
    return ingredients
      .split(/\n|,/g)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [ingredients]);

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!title.trim()) nextErrors.title = "Recipe title is required.";

    if (!ingredients.trim()) {
      nextErrors.ingredients = "Ingredients are required.";
    } else if (parsedIngredients.length < 2) {
      nextErrors.ingredients = "Please enter at least 2 ingredients (new line or comma-separated).";
    }

    if (!steps.trim()) nextErrors.steps = "Preparation steps are required.";

    return nextErrors;
  }, [title, ingredients, steps, parsedIngredients.length]);

  const isValid = Object.keys(errors).length === 0;

  function markAllTouched() {
    setTouched({ title: true, ingredients: true, steps: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitStatus({ type: "", message: "" });

    markAllTouched();

    if (!isValid) {
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors in the form and try again.",
      });
      return;
    }

    const newRecipe = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      title: title.trim(),
      summary: steps.trim().slice(0, 90) + (steps.trim().length > 90 ? "..." : ""),
      ingredients: parsedIngredients,
      steps: steps.trim(),
      // Optional: put a placeholder image if your UI expects image
      image: "https://via.placeholder.com/600x400?text=New+Recipe",
      createdAt: new Date().toISOString(),
    };

    // If parent passed a handler, send it up
    if (typeof onAddRecipe === "function") {
      onAddRecipe(newRecipe);
    }

    setSubmitStatus({ type: "success", message: "Recipe submitted successfully ✅" });

    // Clear form
    setTitle("");
    setIngredients("");
    setSteps("");
    setTouched({ title: false, ingredients: false, steps: false });
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Add a New Recipe</h2>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the details below. Ingredients can be on new lines or separated by commas.
            </p>
          </div>

          {submitStatus.message ? (
            <div
              className={[
                "mb-5 rounded-xl border p-4 text-sm",
                submitStatus.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800",
              ].join(" ")}
              role="status"
            >
              {submitStatus.message}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-800">
                Recipe Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, title: true }))}
                placeholder="e.g., Spaghetti Carbonara"
                className={[
                  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
                  "focus:ring-4",
                  touched.title && errors.title
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-gray-300 focus:ring-gray-100",
                ].join(" ")}
              />
              {touched.title && errors.title ? (
                <p className="mt-2 text-xs text-red-600">{errors.title}</p>
              ) : null}
            </div>

            {/* Two-column layout on desktop */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Ingredients */}
              <div className="md:col-span-1">
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-800">
                  Ingredients <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, ingredients: true }))}
                  placeholder={`Example:\nEggs\nCheese\nBacon\nBlack pepper`}
                  rows={8}
                  className={[
                    "mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
                    "focus:ring-4",
                    touched.ingredients && errors.ingredients
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-gray-300 focus:ring-gray-100",
                  ].join(" ")}
                />
                <div className="mt-2 flex items-center justify-between">
                  {touched.ingredients && errors.ingredients ? (
                    <p className="text-xs text-red-600">{errors.ingredients}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Detected: <span className="font-medium">{parsedIngredients.length}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Steps */}
              <div className="md:col-span-1">
                <label htmlFor="steps" className="block text-sm font-medium text-gray-800">
                  Preparation Steps <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="steps"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, steps: true }))}
                  placeholder="Write the cooking steps clearly..."
                  rows={8}
                  className={[
                    "mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
                    "focus:ring-4",
                    touched.steps && errors.steps
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-gray-300 focus:ring-gray-100",
                  ].join(" ")}
                />
                {touched.steps && errors.steps ? (
                  <p className="mt-2 text-xs text-red-600">{errors.steps}</p>
                ) : null}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Fields marked <span className="text-red-500">*</span> are required.
              </p>

              <button
                type="submit"
                className={[
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "shadow-sm transition active:scale-[0.99]",
                  isValid
                    ? "bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200"
                    : "cursor-not-allowed bg-gray-300 text-gray-600",
                ].join(" ")}
                disabled={!isValid}
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
