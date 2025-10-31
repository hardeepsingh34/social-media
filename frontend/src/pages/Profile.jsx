import React, { useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


export default function Profile() {
const {user} = useContext(UserDataContext);
const navigate = useNavigate();

 
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg"
            alt="Avatar"
            className="w-36 h-36 rounded-full border-4 border-indigo-500/20 shadow-lg"
          />
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
            </div>

            <div className="mt-2">
              <button onClick={navigate('/addpost')} className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:opacity-90 transition">
                Add Post
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Traveler. Developer. Lover of coffee and long code sessions. Sharing photos and stories from around the world.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">120</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">4.5k</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">380</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Example posts grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Post title {n}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">A short description or caption for this post.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
