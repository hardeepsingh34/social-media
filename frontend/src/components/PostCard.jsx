import React, { useContext } from "react";
import { UserDataContext } from "../../context/UserContext";

const PostCard = () => {
  const {user} = useContext(UserDataContext);
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col space-y-3 hover:shadow-lg transition-shadow duration-200">
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-gray-800">{username}</span>
      </div>

      {/* Post Content */}
      <p className="text-gray-700">{content}</p>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          <span>❤️ {likes}</span>
          <span>💬 {comments}</span>
        </div>
        <button className="text-blue-500 hover:underline">View</button>
      </div>
    </div>
  );
};

export default PostCard;