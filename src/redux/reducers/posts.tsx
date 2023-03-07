import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit"
import {ICreateComment, IInitialState} from "./types"
import {fetchData} from "../../utils"

const initialState: IInitialState = {
  data: [],
  selectedPost: null,
  loading: false,
  commentLoading: false,
  createLoading: false,
  deleteLoading: false
}

export const getPostsList = createAsyncThunk('posts/list', async (params) => {
  return await fetchData({url: '/posts', params})
})

export const getPostById = createAsyncThunk('posts/load', async ({id, params}: any) => {
  return await fetchData({url: `/posts/${id}`, params})
})

export const createPost = createAsyncThunk('posts/create', async (body: object, {dispatch}) => {
  const res = await fetchData({url: '/posts', method: "POST", body})
  dispatch(getPostsList())
  return res
})

export const updatePost = createAsyncThunk('posts/update', async ({id, ...body}: any, {dispatch}) => {
  await fetchData({url: `/posts/${id}`, method: "PUT", body})
  dispatch(getPostById({id, params: {_embed: 'comments'}}))
})

export const deletePost = createAsyncThunk('posts/delete', async ({id}: {id: number}, {dispatch}) => {
  const res = await fetchData({url: `/posts/${id}`, method: "DELETE"})
  dispatch(getPostsList())
  return res
})

export const createComment = createAsyncThunk('posts/comment', async (body: ICreateComment, {dispatch}) => {
  const res = await fetchData({url: '/comments', method: "POST", body})
  dispatch(getPostById({id: body.postId, params: {_embed: 'comments'}}))
  return res
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPostsList.pending, (state) => {
        state.loading = true
        state.data = []
      })
      .addCase(getPostsList.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload || []
      })
      .addCase(getPostsList.rejected, (state) => {
        state.loading = false
        state.data = []
      })
      .addCase(getPostById.pending, (state) => {
        state.loading = true
        state.selectedPost = null
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedPost = action.payload
      })
      .addCase(getPostById.rejected, (state) => {
        state.loading = false
        state.selectedPost = null
      })
      .addCase(createPost.pending, (state) => {
        state.createLoading = true
      })
      .addCase(updatePost.pending, (state) => {
        state.createLoading = true
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true
      })
      .addCase(createComment.pending, (state) => {
        state.commentLoading = true
      })
      .addMatcher(isAnyOf(updatePost.fulfilled, updatePost.rejected), (state) => {
        state.createLoading = false
      })
      .addMatcher(isAnyOf(createComment.fulfilled, createComment.rejected), (state) => {
        state.commentLoading = false
      })
      .addMatcher(isAnyOf(deletePost.rejected, deletePost.fulfilled), (state) => {
        state.deleteLoading = false
      })
      .addMatcher(isAnyOf(createPost.rejected, createPost.fulfilled), (state) => {
        state.createLoading = false
      })
  }
})

export const postsReducer = postsSlice.reducer
