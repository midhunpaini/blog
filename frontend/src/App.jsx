import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import BlogsList from "./pages/BlogList";
import BlogPage from "./pages/BlogPage";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "./redux/blogSlice";
import useUser from "./hooks/useUser";
import UserContext from "./context/userContext";

function App() {
  const dispatch = useDispatch();
  const user = useUser()
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  return (
    <>
    <UserContext.Provider
    value={{
      user: user.user,
      setUser: user.setUser,
      loading: user.loading,
      userId: user.id,
      likedBlogs : user.likedBlogs
    }}>
      <Header />
      <Routes>
        <Route path="/" element={<BlogsList />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
