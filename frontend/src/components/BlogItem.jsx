import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import like from "../assets/likebutton.png";
import liked from "../assets/liked.png";
import UserContext from "../context/userContext";
import { postLike } from "../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogItem = ({ blog }) => {
  const { id, title, author_name, content, comments, created_at, likes_count } = blog;
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { likedBlogs } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);
  // Check if the blog ID is present in the likedBlogs array
  const isBlogLiked = likedBlogs?.some((likedBlog) => likedBlog?.blog === id);

  useState(() => {
    setIsLiked(isBlogLiked);
  }, [isBlogLiked]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (user) {
      setIsLiked(!isLiked);
      postLike(id, token);
    } else {
      toast.error('Login required. Please login to like a blog.');
    }
  };

  const formatDate = (dateString) => {
    const addedDate = new Date(dateString);
    return addedDate.toLocaleString();
  };

  const formattedDate = formatDate(created_at);

  const handleClick = () => {
    navigate(`/blog/${id}`);
  };

  const shortContent = content.split(" ").slice(0, 50).join(" ");

  return (
    <div className="border border-gray-300 rounded p-4 mb-4 cursor-pointer" onClick={handleClick} style={{ cursor: "pointer" }}>
      <ToastContainer />
      <h3 className="text-xl font-bold mb-2 cursor-pointer">{title}</h3>
      <p className="text-gray-600 mb-2">Author: {author_name}</p>
      <p className="mb-4">{shortContent}.................</p>
      <p className="text-gray-600 mb-2">Published On: {formattedDate}</p>
      <div className="flex items-center mb-2">
        <div className="flex items-center mb-2" onClick={handleLike}>
          {isLiked ? (
            <img src={liked} alt="Like" className="w-8 h-8 mr-1 cursor-pointer" />
          ) : (
            <img src={like} alt="Like" className="w-8 h-8 mr-1 cursor-pointer" />
          )}
        </div>
        <span className="text-gray-600 mx-3">Comments ({comments.length})</span>
      </div>
    </div>
  );
};

export default BlogItem;
