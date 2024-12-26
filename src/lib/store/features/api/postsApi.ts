import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (userId) => `posts?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [{ type: 'Posts', id: userId }] // Tag specific to this user
          : ['Posts'],
    }),
    getUserPosts: builder.query({
      query: (userId) => `posts?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [{ type: 'Posts', id: userId }] // Tag specific to this user
          : ['Posts'],
    }),
    addPost: builder.mutation({
      query: ({ userId, newPost }) => ({
        url: `posts?userId=${userId}`,
        method: 'POST',
        body: newPost,
      }),
      // invalidatesTags: (result, error, { userId }) => [
      //     { type: 'Posts', id: userId }, // Invalidate cache for this user
      // ],

      onQueryStarted: async ({ userId, newPost }, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdPost } = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData<'getPosts'>('getPosts', userId, (draftPosts) => {
              draftPosts.push(createdPost);
            }),
          );
        } catch {
          // Handle errors
        }
      },
    }),
    updatePost: builder.mutation({
      query: ({ userId, postId, content, image }) => ({
        url: `posts?userId=${userId}postId=${postId}`,
        method: 'PATCH',
        body: { content, image },
      }),
      invalidatesTags: (result, error, { postId }) => [
        // Invalidate cache for this specific post
        { type: 'Posts', id: postId },
      ],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `posts?postId=${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Posts', id: postId }],
    }),
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `posts?postId=${postId}userId=${userId}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Posts', id: postId }],
    }),
    addComment: builder.mutation({
      query: ({ postId, userId, comment }) => ({
        url: `posts?postId=${postId}userId=${userId}`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Posts', id: postId }],
    }),
  }),
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useAddCommentMutation,
  useGetPostsQuery,
  useGetUserPostsQuery,
} = postsApi;
