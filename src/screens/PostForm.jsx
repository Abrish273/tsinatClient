import { useState } from "react";
import axios from "axios";
import { URL } from "../app";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags.split(","));
    formData.append("image", image);
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response", response);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log("catch error", error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full container m-auto px-10">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 p-2 border"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-2 p-2 border"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mb-2 p-2 border"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            {loading ? "Posting...." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
