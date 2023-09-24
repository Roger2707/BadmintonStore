import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../models/Basket";
import agent from "../API/agent";
import { getCookie } from "../utils/utils";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState:BasketState = {
    basket: null,
    status: 'idle',
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            console.log(thunkAPI.rejectWithValue(error.data));
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId')) return false;
        }
    }
)

export const addItemToBasket = createAsyncThunk<Basket, {productId: number, quantity: number}>(
    'basket/addItem',
    async ({productId, quantity}, thunkAPI) => {
        try {
            return agent.Basket.add(productId, quantity);
        } catch (error: any) {
            console.log(thunkAPI.rejectWithValue(error.data));   
        }
    }
)

export const removeFromBasket = createAsyncThunk<void, {productId: number, quantity: number, remove?: string}>(
    'basket/removeItem',
    async ({productId, quantity}, thunkAPI) => {
        try {
            return agent.Basket.remove(productId, quantity);
        } catch (error: any) {
            console.log(thunkAPI.rejectWithValue(error.data));
        }
    }
)

export const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        clearBasket: (state) => {
            state.basket = null;
        }
    },
    extraReducers: builder => {
        // Fetch Basket
        builder.addCase(fetchBasketAsync.pending, (state, action) => {
            state.status = 'pendingFetchBasket';
        })

        builder.addCase(fetchBasketAsync.rejected, (state, action) => {
            state.status = 'idle';
        })

        builder.addCase(fetchBasketAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.basket = action.payload;
        })

        // Add
        builder.addCase(addItemToBasket.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        })

        builder.addCase(addItemToBasket.rejected, (state, action) => {
            state.status = 'idle';
        })

        builder.addCase(addItemToBasket.fulfilled, (state, action) => {
            state.status = 'idle';
            state.basket = action.payload;
        })

        // Remove
        builder.addCase(removeFromBasket.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId +action.meta.arg.remove;
        })

        builder.addCase(removeFromBasket.rejected, (state, action) => {
            state.status = 'idle';
        })

        builder.addCase(removeFromBasket.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const index = state.basket?.items.findIndex(i => i.productId === productId);
            if(index === -1 || index === undefined) return;
            state.basket!.items[index].quantity -= quantity;

            if(state.basket!.items[index].quantity < 1) state.basket!.items.splice(index, 1);

            state.status = 'idle';
        })
    }
})

export const {setBasket, clearBasket} = basketSlice.actions; 