import React, { useState } from "react";
import axios from "axios";

const Explore = () => {
  const [file, setFile] = useState(null);
  const [filecaption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🧠 Handle file upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("filecaption", filecaption);
      formData.append("description", description);
      console.log(localStorage.getItem('token'));
      // ✅ Replace this with your actual backend route
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/upload`,
        formData,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data"   
                } 
          
        }
      );

      console.log("✅ Upload Success:", response.data);
      alert("Post created successfully!");

      // Reset form
      setFile(null);
      setCaption("");
      setDescription("");
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert("Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <main className="flex-1 ml-4">
        <h2 className="text-2xl font-semibold mb-4">Explore</h2>

        {/* 🧩 Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md"
        >
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-gray-700 dark:text-gray-200"
          />

          <input
            type="text"
            name="caption"
            value={filecaption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Title / Caption"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700"
          />

          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="3"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700"
          />

          <button
            type="submit"
            disabled={uploading}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Create Post"}
          </button>
        </form>

       
      </main>
    </div>
  );
};

export default Explore;
