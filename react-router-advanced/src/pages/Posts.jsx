import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "Hello Router" },
  { id: 2, title: "Nested Routes are cool" },
  { id: 3, title: "Protected Routes 101" },
];

export default function Posts() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Posts</h2>
      <p>Click a post to view dynamic route: /posts/:postId</p>

      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
