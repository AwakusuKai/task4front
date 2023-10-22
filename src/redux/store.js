import {configureStore} from '@reduxjs/toolkit';
import { usersReducer } from './slices/users';
import { authReduser } from './slices/auth';

const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReduser,
    },
});

export default store;