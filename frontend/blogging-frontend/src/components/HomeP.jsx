import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const HomeP = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.get("/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("logut Reson", response.data.success);

      //   Cookies.remove("token"); // optional client-side cleanup
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative mb-16">
        {/* Hero Header - Centered Content */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-900 dark:text-indigo-100 mb-4">
            <span className="inline-block transform rotate-12">✨</span>{" "}
            Chronicle
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Craft your digital legacy, one story at a time
          </p>
        </div>
        {token && (
          <div className="absolute right-4 top-4 md:right-8 md:top-8">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {token ? (
            <>
              {/* My Posts Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <span className="text-xl">📜</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      My Posts
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Browse through your collection of personal stories and
                    memories.
                  </p>
                  <Link
                    to="/my-posts"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View Your Chronicle
                  </Link>
                </div>
              </div>

              {/* Create Post Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <span className="text-xl">✍️</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      Create Post
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Capture today's thoughts and moments for tomorrow's
                    reflection.
                  </p>
                  <Link
                    to="/create-post"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Begin Writing
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Register Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <span className="text-xl">🌟</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      Register
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Join our community and start building your personal
                    timeline.
                  </p>
                  <Link
                    to="/register"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 dark:text-white dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors duration-200"
                  >
                    Start Your Journey
                  </Link>
                </div>
              </div>

              {/* Login Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <span className="text-xl">🔑</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white">Login</h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Welcome back! Continue your storytelling journey.
                  </p>
                  <Link
                    to="/login"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
                  >
                    Access Your Account
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Four Main Sections */}
      {/* <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"></div> */}

      {/* Footer Note */}
      <div className="mt-16 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          "Every story matters. Begin yours today."
        </p>
      </div>
    </div>
  );
};

export default HomeP;
