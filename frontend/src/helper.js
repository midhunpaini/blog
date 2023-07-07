const registerApi = import.meta.env.VITE_GET_REGISTER_API;
const loginApi = import.meta.env.VITE_GET_LOGIN_API;
const logoutApi = import.meta.env.VITE_GET_LOGOUT_API;
const commentsApi = import.meta.env.VITE_GET_ADD_COMMENTS_API;
const likeApi = import.meta.env.VITE_GET_ADD_LIKE_API;
const shareApi = import.meta.env.VITE_GET_ADD_SHARE_API;

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(registerApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const submitLogin = async (email, password) => {
  const response = await fetch(loginApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();

  if (response.ok) {
    return { data: data, message: "ok" };
  } else {
    return { data: data, message: "failed" };
  }
};

export const logoutUser = async (setUser) => {
  try {
    const response = await fetch(logoutApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    } else {
      localStorage.clear();
      setUser(null);
    }
  } catch (error) {
    throw new Error("Logout failed");
  }
};

export const postComments = async (blogId, content, token) => {
  try {
    const response = await fetch(commentsApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        blogId,
        content,
        token,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {}
};

export const postLike = async (blogId, token) => {
  try {
    const response = await fetch(likeApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        blogId,
        token,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const shareBlog = async (email,subject,message, url, blogId, token, userId) => {
  console.log('inside share', shareApi)
  try {
    const response = await fetch(shareApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        subject,
        message,
        url,
        blogId,
        token,
        userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {}
};
