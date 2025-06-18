import { useEffect, useState } from "react";
import api from "../api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleCancel = () => {
    setEditPostId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const response = await api.put(
        `/edit-post/${editPostId}`,
        { title: editTitle, content: editContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = response.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      alert("Post updated");
      setEditPostId(null);
    } catch (err) {
      console.log("Error while handlesave: ", err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = Cookies.get("token");
        await api.delete(`/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the posts state to remove the deleted one
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );

        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      } catch (err) {
        Swal.fire(
          "Error!",
          err.response?.data?.message || "Delete failed",
          "error"
        );
      }
    }
  };

  const fetchPosts = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) return alert("Please login first");
      const response = await api.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("posts: ", response.data);

      setPosts(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch posts. Please make sure you're logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-indigo-900 dark:text-indigo-100 mb-2">
          <span className="inline-block transform rotate-12">📜</span> Your
          Chronicle
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-light">
          A collection of your thoughts and moments
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🌌</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-light">
            Your story begins with a single post...
          </p>
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            Create First Post
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-purple-500"></div>

              {editPostId === post._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="block w-full border rounded p-2 mb-2"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows="4"
                    className="block w-full border rounded p-2 mb-2"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Title */}
                  {post.title && (
                    <h3 className="text-xl font-serif font-semibold text-indigo-900 dark:text-indigo-100 mb-3 pl-4">
                      {post.title}
                    </h3>
                  )}

                  {/* Content */}
                  <p className="text-gray-700 dark:text-gray-300 text-lg font-light leading-relaxed mb-4 pl-4">
                    {post.content}
                  </p>
                </>
              )}

              {/* Title Section */}
              {/* {post.title && (
                <h3 className="text-xl font-serif font-semibold text-indigo-900 dark:text-indigo-100 mb-3 pl-4">
                  {post.title}
                </h3>
              )} */}

              {/* Content Section */}
              {/* <p className="text-gray-700 dark:text-gray-300 text-lg font-light leading-relaxed mb-4 pl-4">
                {post.content}
              </p> */}

              {/* Footer with Metadata and Actions */}
              <div className="flex items-center justify-between text-sm pl-4">
                <span className="text-indigo-500 dark:text-indigo-400 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {new Date(post.createdAt).toLocaleString()}
                </span>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                    aria-label="Edit post"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete post"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
