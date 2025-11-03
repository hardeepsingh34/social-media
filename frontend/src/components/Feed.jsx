// src/components/Feed.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const initialPosts = [];

const Feed = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [heartAnimation, setHeartAnimation] = useState({});
  const [loaded, setLoaded] = useState(false);

  // ✅ Fetch user posts when component mounts
 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/alluserposts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(response.data);
      } catch (error) {
      console.error("❌ Error fetching posts:", error);
    }
  };
console.log(posts);
  fetchPosts();
}, []);


  useEffect(() => setLoaded(true), []);

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleDoubleTap = (id) => {
    handleLike(id);
    setHeartAnimation((prev) => ({ ...prev, [id]: true }));
    setTimeout(
      () => setHeartAnimation((prev) => ({ ...prev, [id]: false })),
      800
    );
  };

  return (
    <div
      className="min-h-screen w-full p-4 flex flex-col items-center"
      style={{
        backgroundImage:
          "radial-gradient(circle farthest-corner at 10% 20%, #ffe6f0 0%, #ffd1e6 100%)",
      }}
    >
      <div className="w-full max-w-md space-y-12">
        {posts?.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No posts yet 😔</p>
        ) : (
          posts?.map((post, index) => (
            <div
              key={post._id || post.id}
              className="bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-30 overflow-hidden transform transition-transform duration-500 hover:scale-105"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${index * 150}ms`,
                transitionProperty: "opacity, transform",
              }}
            >
              {/* Header */}
              <div className="flex items-center p-6">
                <img
                  src={
                    post.user?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={post.user?.username || "User"}
                  className="w-14 h-14 rounded-full border-2 border-white border-opacity-50"
                />
                <h2 className="ml-4 text-xl font-semibold text-gray-800">
                  {post.user?.username || "Anonymous"}
                </h2>
              </div>

              {/* Post image */}
              <div
                className="relative"
                onDoubleClick={() => handleDoubleTap(post._id)}
              >
                <img
                  src={post.image ||
                   `http://localhost:4000/user/image/${post.imageId}`||
                   `/image/${post.imageId}`
                  }
                  alt="Post"
                  className="w-full h-auto max-h-[600px] object-cover cursor-pointer transition-transform duration-500 hover:scale-105 rounded-b-2xl"
                />

                {heartAnimation[post._id] && (
                  <div
                    className="absolute top-1/2 left-1/2 text-pink-500 text-6xl animate-heart"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    ❤️
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 text-gray-800 text-lg">
                <p className="mb-4">{post.imageText || "No caption"}</p>
                <div className="flex items-center space-x-10 text-xl">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="hover:text-pink-500"
                  >
                    ❤️ {post.likes || 0}
                  </button>
                  <button className="hover:text-blue-500">
                    💬 {post.comments?.length || 0}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style>
        {`
          @keyframes heart-pop {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
          }
          .animate-heart {
            animation: heart-pop 0.8s ease forwards;
          }
        `}
      </style>
    </div>
  );
};
//6904ac67046856ff3cd56844
//http://localhost:4000/post/image/6904ac67046856ff3cd56844
export default Feed;
