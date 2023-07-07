import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const blogsApi = import.meta.env.VITE_GET_BLOGS_API
// Define the initial state
const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

// Define the asynchronous thunk for fetching blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  try {
    // Perform the API call to fetch blogs
    const response = await fetch(blogsApi);
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error('Failed to fetch blogs');
  }
});

// Create the blog slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export default blogSlice.reducer;

