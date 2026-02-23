import { useParams, Link } from "react-router-dom";

export default function PostDetails() {
  const { postId } = useParams();

  return (
    <div style={{ padding: 16 }}>
      <h2>Post Details</h2>
      <p>
        Dynamic route param: <strong>{postId}</strong>
      </p>

      <Link to="/posts">← Back to Posts</Link>
    </div>
  );
}
