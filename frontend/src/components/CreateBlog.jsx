import React, { useState } from 'react';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform create blog logic with title and content
    // ...

    // Reset form fields
    setTitle('');
    setContent('');
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-2">Title</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-semibold mb-2">Content</label>
          <textarea id="content" value={content} onChange={handleContentChange} className="w-full px-4 py-2 border rounded" rows="12"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
