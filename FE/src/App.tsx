import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./conpoments/layout/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import List from "./pages/admin/blog/List";
import Add from "./pages/admin/blog/Add";
import Edit from "./pages/admin/blog/Edit";
import Register from "./pages/client/auth/Register";
import Signin from "./pages/client/auth/Signin";
import ListCmt from "./pages/admin/comment/List";
import ListAuth from "./pages/admin/auth/List";
import LayoutClient from "./conpoments/layout/LayoutClient";
import Blog from "./pages/client/blog/Blog";
import BlogDetail from "./pages/client/blog/BlogDetail";
import Comment from "./pages/admin/trash/Comment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<Signin />} />
        </Route>
        {/* Router client blog */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Blog />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Router blog */}
          <Route path="blog">
            <Route path="" element={<List />} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
          {/* Router comment */}
          <Route path="comment">
            <Route path="" element={<ListCmt />} />
            <Route path="trash" element={<Comment />} />
          </Route>
          {/* Router auth */}
          <Route path="auth">
            <Route path="" element={<ListAuth />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
