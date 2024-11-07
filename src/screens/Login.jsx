import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../app";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/api/admin/login`, {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/create-post");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen"> 
<div className="w-full container m-auto px-10">

    <form onSubmit={handleLogin} className="flex flex-col max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border"
        />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border"
        />
      <button type="submit" className="bg-blue-500 text-white p-2">
        {loading ? "Loaging..." : "Login"}
      </button>
    </form>
        </div>
        </div>
  );
}
