import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fechAuth = createAsyncThunk('auth/fechAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
})

export const fechAuthMe = createAsyncThunk('auth/fechAuthMe', async () => {
    const {data} = await axios.get('/auth/me');
    return data;
})

export const fechRegister = createAsyncThunk('auth/fechRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params);
    return data;
})

const initialState = {
    auth: {
        data: null,
        status: 'loading',
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fechAuth.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fechAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fechAuth.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
        [fechAuthMe.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fechAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fechAuthMe.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
        [fechRegister.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fechRegister.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fechRegister.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        }
    }
})

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReduser = authSlice.reducer;

export const {logout} = authSlice.actions;