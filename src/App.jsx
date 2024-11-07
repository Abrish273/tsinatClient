import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./screens/PostList";
import Login from "./screens/Login";
import PostForm from "./screens/PostForm";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<PostForm />} />
        </Routes>
    </Router>
  );
}

export default App;