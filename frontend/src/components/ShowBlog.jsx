import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import like from "../assets/likebutton.png";
import liked from "../assets/liked.png";
import share from "../assets/share.png";
import commentIcon from "../assets/comment.png";
import { postLike, shareBlog } from "../helper";
import { fetchBlogs } from "../redux/blogSlice";
import UserContext from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowBlog = ({ setShowCommentInput, showCommentInput }) => {
  const { id } = useParams();
  const { user, likedBlogs } = useContext(UserContext);
  const blogs = useSelector((state) => state.blogs.blogs);
  const loading = useSelector((state) => state.blogs.loading);
  const blog = blogs.find((blog) => blog.id === parseInt(id));
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes_count);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const token = localStorage.getItem("token");
  const currentUrl = window.location.href;
  const dispatch = useDispatch();

  useEffect(() => {
    if (blog) {
      setIsLiked(likedBlogs?.includes(blog?.id));
      setLikeCount(blog?.likes_count);
    }
  }, [blog, likedBlogs]);

  const handleLike = () => {
    if (user) {
      setIsLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      postLike(id, token);
      dispatch(fetchBlogs());
    } else {
      toast.error("Login required. Please login to like a blog.");
    }
  };

  const handleComment = () => {
    setShowEmailInput(false);
    setShowCommentInput(!showCommentInput);
  };

  const handleShare = () => {
    if (user) {
      setShowEmailInput(true);
      setShowCommentInput(false);
    } else {
      toast.error("Login required. Please login to share a blog.");
    }
  };

  const handleShareInput = () => {
    if (recipientEmail === "") {
      toast.error("Please enter recipient's email.");
    } else {
      shareBlog(
        recipientEmail,
        blog.title,
        blog.content,
        currentUrl,
        id,
        token
      );
      toast.success(`Shared with ${recipientEmail}`);
      setRecipientEmail("");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="m-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">{blog?.title}</h2>
      <p className="mb-4">{blog?.content}</p>
      <p className="text-gray-600">Author: {blog?.author_name}</p>

      {/* Like button */}
      <div className="flex items-center mb-2">
        <div className="flex items-center" onClick={handleLike}>
          {isLiked ? (
            <img
              src={liked}
              alt="Liked"
              className="w-8 h-8 mr-1 cursor-pointer"
            />
          ) : (
            <img
              src={like}
              alt="Like"
              className="w-8 h-8 mr-1 cursor-pointer"
            />
          )}
          <span>{likeCount}</span>
        </div>

        {/* Comment button */}
        <div className="flex items-center ml-4" onClick={handleComment}>
          <img
            src={commentIcon}
            alt="Comment"
            className="w-8 h-8 mr-1 cursor-pointer"
          />
          <span>{blog?.comments.length}</span>
        </div>

        {/* Share button */}
        <div className="flex items-center ml-4" onClick={handleShare}>
          <img
            src={share}
            alt="Share"
            className="w-8 h-8 mr-1 cursor-pointer"
          />
        </div>
      </div>
      {/* Recipient's Email Input */}
      {showEmailInput && (
        <div>
          <input
            type="email"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleShareInput}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowBlog;
