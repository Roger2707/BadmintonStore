import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Brand } from "../models/Brand";
import agent from "../API/agent";
import { RootState } from "./configureStore";

const brandAdapter = createEntityAdapter<Brand>();

interface InitialState {
    brandLoaded: boolean;
    status: string;
}

export const fetchBrandAsync = createAsyncThunk<Brand[]>(
    'brand/fetchBrandAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Brand.list();
        } catch (error: any) {
            console.log(thunkAPI.rejectWithValue(error.data));
        }
    }
)

export const brandSlice = createSlice({
    name: 'brandSlice',
    initialState: brandAdapter.getInitialState<InitialState>({
        brandLoaded: false,
        status: 'idle'
    }),
    reducers: {
        setBrands: (state, action) => {
            brandAdapter.updateOne(state, action.payload);
            state.brandLoaded = false;
        },
        removeBrand: (state, action) => {
            brandAdapter.removeOne(state, action.payload);
            state.brandLoaded = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBrandAsync.pending, (state, action) => {
            state.brandLoaded = false;
            state.status = 'pendingFetchBrand';
        })

        builder.addCase(fetchBrandAsync.fulfilled, (state, action) => {
            brandAdapter.setAll(state, action.payload);
            state.brandLoaded = true;
            state.status = 'idle';
        })

        builder.addCase(fetchBrandAsync.rejected, (state, action) => {
            state.brandLoaded = false;
            state.status = 'idle';
        })
    }
})

export const brandSelectors = brandAdapter.getSelectors((state: RootState) => state.brand);
export const {setBrands, removeBrand} = brandSlice.actions;