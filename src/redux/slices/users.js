import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export  const fechUsers = createAsyncThunk('users/fechUsers', async () =>{
    const {data} = await axios.get('/users');
    return data;
})

export  const deleteUsers = createAsyncThunk('users/deleteUsers', async (params) =>{
    const {data} = await axios.post('/users/delete', params);
    return data;
})

export  const blockUsers = createAsyncThunk('users/blockUsers', async (params) =>{
    const {data} = await axios.post('/users/block', params);
    return data;
})

export  const unblockUsers = createAsyncThunk('users/unblockUsers', async (params) =>{
    const {data} = await axios.post('/users/unblock', params);
    return data;
})

const initialState = {
    users: {
        items: [],
        status: 'loading',
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fechUsers.pending]: (state) => {
            state.users.items = [];
            state.users.status = 'loading';
        },
        [fechUsers.fulfilled]: (state, action) => {
            state.users.items = action.payload;
            state.users.status = 'loaded';
        },
        [fechUsers.rejected]: (state) => {
            state.users.items = [];
            state.users.status = 'error';
        },   
        [deleteUsers.pending]: (state) => {
            state.users.items = [];
            state.users.status = 'loading';
        },
        [deleteUsers.fulfilled]: (state, action) => {
            state.users.items = action.payload;
            state.users.status = 'loaded';
        },
        [deleteUsers.rejected]: (state) => {
            state.users.items = [];
            state.users.status = 'error';
        }, 
        [blockUsers.pending]: (state) => {
            state.users.items = [];
            state.users.status = 'loading';
        },
        [blockUsers.fulfilled]: (state, action) => {
            state.users.items = action.payload;
            state.users.status = 'loaded';
        },
        [blockUsers.rejected]: (state) => {
            state.users.items = [];
            state.users.status = 'error';
        }, 
        [unblockUsers.pending]: (state) => {
            state.users.items = [];
            state.users.status = 'loading';
        },
        [unblockUsers.fulfilled]: (state, action) => {
            state.users.items = action.payload;
            state.users.status = 'loaded';
        },
        [unblockUsers.rejected]: (state) => {
            state.users.items = [];
            state.users.status = 'error';
        },
    }
})

export const usersReducer = usersSlice.reducer;