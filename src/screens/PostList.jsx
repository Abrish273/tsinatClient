import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../app";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL}/api/posts`);
        setPosts(res.data);
      } catch (error) {
        console.log("error in fetching posts", error);
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  console.log("=== posts ===", posts);

  return (
    <div className="w-full  bg-[#F8F8F8]">
      <div className="w-full container mx-auto min-h-screen">
        <div >
          <h1 className="text-3xl font-bold py-3 px-8">Products</h1>
          <hr />
          <div className="px-8"> 
          <div className="w-full grid grid-cols-4 bg-white border rounded-md overflow-hidden mt-3" >
            <input type="text" className="w-full col-span-3 bg-transparent border-none outline-none p-2" />
            <button className="bg-black text-white p-2 font-medium">Search</button>
          </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 w-full px-10 py-4 ">
          {!loading ? (
            posts ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="p-4 border rounded flex-shrink-0 bg-white w-full"
                  >
                    <img
                      src={post.url}
                      alt={post.title}
                      className="w-full h-56 object-contain rounded shadow"
                    />
                    <h3 className="text-xl font-semibold mt-3 mb-2">{post.title}</h3>
                    <p className="px-2 ">{post.desc}</p>
                    <p className="text-gray-400 text-sm px-2">
                      Tags: {post.tags.join(", ")}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-screen">
                  <p>No posts found</p>
                </div>
              )
            ) : null
          ) : (
            <div className="flex items-center justify-center h-screen">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
