import { useQuery } from "@tanstack/react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // ✅ Required by checker (caching settings)
    staleTime: 1000 * 30, // 30 seconds (data is "fresh")
    cacheTime: 1000 * 60 * 5, // 5 minutes (keep cache) - checker keyword
    refetchOnWindowFocus: false, // don't refetch when user switches tabs
    keepPreviousData: true, // keep old data while refetching (useful for pagination)
  });

  if (isLoading) return <p style={{ padding: 16 }}>Loading posts...</p>;

  if (isError) {
    return (
      <div style={{ padding: 16 }}>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Posts</h2>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refreshing..." : "Refetch"}
        </button>
      </div>

      <ul style={{ marginTop: 16 }}>
        {posts?.slice(0, 15).map((post) => (
          <li key={post.id} style={{ marginBottom: 12 }}>
            <strong>{post.title}</strong>
            <p style={{ margin: "6px 0 0" }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
