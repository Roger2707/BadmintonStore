import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../models/User";
import agent from "../API/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../router/Routes";
import { setBasket } from "./basketSlice";

interface AccountState {
    user: User | null;
}

const initialState : AccountState = {
    user: null,
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (values, thunkAPI) => {
        try {
            const userDTO = await agent.Account.login(values);

            const {basket, ...user} = userDTO;
            if (basket) thunkAPI.dispatch(setBasket(basket));

            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/currentUser',
    async(_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDTO = await agent.Account.currentUser();
            const {basket, ...user} = userDTO;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'accountSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        }
    },
    extraReducers: builder => {
        builder.addCase(signInUser.rejected, (state, action) => {
            throw action.payload;
        })

        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        })

        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        })
    }
})

export const {setUser, signOut} = accountSlice.actions;