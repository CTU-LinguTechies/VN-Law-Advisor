import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

export interface UserState {
    id: string;
    email: string;
    name: string;
    phonenum: string;
    role: string;
    iat: number;
    exp: number;
}

export const userSlice = createSlice({
    name: 'user',
    initialState: null as UserState | null,
    reducers: {
        setUser: (state, action: PayloadAction<UserState | null>) => {
            state = action.payload;
            return state;
        },
        deleteUser: (state) => {
            return null;
        },
    },
});

export const { setUser, deleteUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
