import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bannerUrl from '/src/assets/SVG/banner.svg';

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    const response = await fetch("http://127.0.0.1:5055/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/"); // redirect to home
    } else {
      setError(data.message || "Failed to create post.");
    }
  };

  return (
    <div className="newPostPage">
    <div className="new-post-container">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="post-form">
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content:</label><br />
          <textarea
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button type="submit">Post</button>
      </form>
    </div>
    <motion.img
  src={bannerUrl}
  alt="Banner"
  className="svg-banner"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
/>

    </div>
  );
}
