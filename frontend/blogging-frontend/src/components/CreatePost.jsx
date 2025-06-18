import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Cookies from "js-cookie";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token"); // read from cookie
      if (!token) return alert("Please login first");

      await api.post(
        "/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post created!");
      setTitle("");
      setContent("");
      // navigate("/"); // or wherever your post list is
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-indigo-900 dark:text-indigo-100 mb-2">
          <span className="inline-block transform rotate-12">✍️</span> Craft
          Your Story
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-light">
          Share your thoughts with the world
        </p>
      </div>

      <form
        onSubmit={handleCreatePost}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8"
      >
        {/* Title Field */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Give your post a meaningful title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
        </div>

        {/* Content Field */}
        <div className="mb-8">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Your Thoughts
          </label>
          <textarea
            id="content"
            rows="6"
            placeholder="Pour your heart out..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
          >
            Publish
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
