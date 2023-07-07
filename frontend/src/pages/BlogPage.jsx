import ShowBlog from "../components/ShowBlog";
import { dummyBlog, dummyComments } from "../data";
import Comment from "../components/Comment";
import { useState } from "react";

const BlogPage = () => {
  const [showCommentInput, setShowCommentInput] = useState(false);

  return (
    <div className=" mx-20 my-10 p-2 shadow-lg shadow-black rounded-md">
      <ShowBlog
        setShowCommentInput={setShowCommentInput}
        showCommentInput={showCommentInput}
      />
      {showCommentInput && <Comment />}
    </div>
  );
};

export default BlogPage;
