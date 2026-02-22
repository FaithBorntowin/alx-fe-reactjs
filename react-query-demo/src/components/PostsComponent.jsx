import { useQuery } from "@tanstack/react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <p style={{ padding: 16 }}>Loading posts…</p>;
  }

  if (isError) {
    return (
      <div style={{ padding: 16 }}>
        <p style={{ marginBottom: 8 }}>Something went wrong.</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
        <button onClick={() => refetch()} style={{ marginTop: 12 }}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Posts</h2>

        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refreshing…" : "Refetch"}
        </button>

        <span style={{ fontSize: 12, opacity: 0.7 }}>
          Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
        </span>
      </div>

      {isFetching && (
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
          Updating in background…
        </p>
      )}

      <ul style={{ marginTop: 16 }}>
        {posts.slice(0, 15).map((post) => (
          <li key={post.id} style={{ marginBottom: 12 }}>
            <strong>
              {post.id}. {post.title}
            </strong>
            <p style={{ margin: "6px 0 0" }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
