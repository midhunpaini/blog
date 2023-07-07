import { useContext, useState } from 'react';
import { postComments } from '../helper';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/blogSlice';
import UserContext from '../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comment = () => {
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);
  const blog = blogs.find((blog) => blog.id === parseInt(id));
  const [comments, setComments] = useState(blog?.comments);
  const token = localStorage.getItem('token');
  const {user} = useContext(UserContext)
  const dispatch = useDispatch(fetchBlogs);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      toast.error('Login required. Please login to submit a comment.')
    }else{
      try {
        await postComments(id, newComment, token);
        const commentData = {
          id: comments.length + 1,
          author: 'Your Name',
          content: newComment,
        };
        addNewComment(commentData);
        dispatch(fetchBlogs());
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  return (
    <div className="mt-8 mx-8">
      <ToastContainer/>
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <textarea
          required
          value={newComment}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          rows={2}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></textarea>
      </form>
      {comments?.map((comment) => (
        <div key={comment.id} className="border-b border-gray-300 py-2">
          <p className="text-gray-700 font-semibold">{comment.author}</p>
          <p className="text-gray-600">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
