import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setBlogs(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    appendBlog(state, action) {
      state.data.push(action.payload);
    },
    updateBlog(state, action) {
      const updated = action.payload;
      state.data = state.data.map((blog) =>
        blog.id !== updated.id ? blog : updated
      );
    },
    removeBlog(state, action) {
      state.data = state.data.filter((blog) => blog.id !== action.payload);
    },
    addComment(state, action) {
      const { blogId, comment } = action.payload;

      const blog = state.data.find((b) => b.id === blogId);
      if (!blog) return;

      // Si comments es un array de strings (como ['hola', 'buen post'])
      blog.comments = [...(blog.comments || []), comment];
    },
  },
});

export const {
  setError,
  setLoading,
  appendBlog,
  setBlogs,
  updateBlog,
  removeBlog,
  addComment,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
  };
};

export const update = (blog) => {
  return async (dispatch) => {
    const updated = await blogService.update(blog.id, blog);
    dispatch(updateBlog(updated));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(removeBlog(id));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    // Buscar el blog actualizado directamente desde el estado
    const currentBlog = getState().blogs.data.find((b) => b.id === blog.id);

    const updated = await blogService.update(blog.id, {
      ...currentBlog,
      likes: currentBlog.likes + 1,
    });

    dispatch(updateBlog(updated));
  };
};

export const commentOnBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.createComment(id, comment);
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      console.error('Failed to comment:', error);
      dispatch(setError(error.message));
    }
  };
};

export default blogSlice.reducer;
