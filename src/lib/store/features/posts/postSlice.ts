import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../store';



type postState = {
    posts: Array<{ id: number; image: string; content: string }>;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;

}

const initialState: postState = {
    posts: [],
    status: 'idle',
    error: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPostsStart(state){
            state.status = 'loading';
        },
        getPostsSuccess(state, action: { payload: Array<{ id: number; image: string; content: string }> }){
            state.status = 'idle';
            state.posts = action.payload;
        },
        getPostsFailed(state, action){
            state.status = 'failed';
            state.error = action.payload;
        },

    }
});

export const { getPostsStart, getPostsSuccess, getPostsFailed } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatus = (state: RootState) => state.posts.status;

export default postsSlice.reducer;