import { useState } from "react";
import fetchUserData from "../services/githubService";

function Search() {
  const [username, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const data = await fetchUserData(username, location, minRepos);
      setUsers(data.items);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          GitHub User Search
        </h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="user-name" className="text-sm font-medium">
            Username
          </label>
          <input
            id="user-name"
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Nigeria"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="repo-count" className="text-sm font-medium">
            Minimum Repositories
          </label>
          <input
            id="repo-count"
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Search
        </button>

        {isLoading && (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        )}

        {error && (
          <p className="text-center text-sm text-red-600">
            Looks like we cant find the user
          </p>
        )}
      </form>

      {/* Results */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center text-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mb-3"
            />
            <h2 className="text-lg font-semibold">{user.login}</h2>
            <p className="text-sm text-gray-600">
              Repos: {user.public_repos ?? "N/A"}
            </p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;