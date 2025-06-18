import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");

      await api.post(
        "/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post created!");
      setContent("");
      // navigate("/posts"); // if you have a posts list page
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleCreatePost}>
        <textarea
          rows="5"
          cols="40"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
