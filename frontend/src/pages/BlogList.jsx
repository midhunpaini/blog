import React, { useEffect, useState } from 'react';
import BlogItem from '../components/BlogItem';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';


const BlogsList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const blogs = useSelector((state) => state.blogs.blogs);
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);



  if (loading) {
    return <><Loader/></>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate pagination boundaries
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, Math.min(indexOfLastBlog, blogs.length));

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <><Loader/></>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="m-10">
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      {currentBlogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogsList;
