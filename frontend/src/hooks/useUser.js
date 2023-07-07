import { useState, useEffect } from "react";

const userApi = import.meta.env.VITE_GET_USER_API;
const useUser = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [likedBlogs, setLikeBlogs] = useState([])

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await fetch(userApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.name);
      setUserId(json.id)
      setIsLogged(true);
      setLoading(false);
      setLikeBlogs(json.liked_blogs)
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  }

  return { user, setUser, loading, isLogged, setIsLogged, userId, likedBlogs, setLikeBlogs };
};

export default useUser;
