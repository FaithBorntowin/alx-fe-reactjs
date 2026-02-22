import { useState } from "react";
import PostsComponent from "./components/PostsComponent";

function DummyPage() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Another Page</h2>
      <p>
        Switch back to Posts to see React Query serve cached data instantly (if
        still fresh).
      </p>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("posts");

  return (
    <div>
      <header
        style={{
          padding: 16,
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: 10,
        }}
      >
        <button onClick={() => setPage("posts")}>Posts</button>
        <button onClick={() => setPage("dummy")}>Other Page</button>
      </header>

      <main>{page === "posts" ? <PostsComponent /> : <DummyPage />}</main>
    </div>
  );
}
