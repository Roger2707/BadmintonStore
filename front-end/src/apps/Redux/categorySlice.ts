import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Category } from "../models/Category";
import agent from "../API/agent";
import { RootState } from "./configureStore";

const categoryAdaper = createEntityAdapter<Category>();

interface InitialState {
    categoryLoaded: boolean,
    status: string;
}

export const fetchCategoryAsync = createAsyncThunk<Category[]>(
    'category/fetchCategoryAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Category.list();
        } catch (error: any) {
            console.log(thunkAPI.rejectWithValue(error.data));
        }
    }
)

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: categoryAdaper.getInitialState<InitialState>({
        categoryLoaded: false,
        status: 'idle',
    }),
    reducers: {
        setCategories: (state, action) => {
            categoryAdaper.upsertOne(state, action.payload);
            //state.categoryLoaded = false;
        },
        removeCategory: (state, action) => {
            categoryAdaper.removeOne(state, action.payload);
            state.categoryLoaded = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategoryAsync.pending, (state, action) => {
            state.categoryLoaded = false;
            state.status = 'pendingLoadCategory';
        })

        builder.addCase(fetchCategoryAsync.fulfilled, (state, action) => {
            categoryAdaper.setAll(state, action.payload);
            state.categoryLoaded = true;
            state.status = 'idle';
        })

        builder.addCase(fetchCategoryAsync.rejected, (state, action) => {
            state.categoryLoaded = false;
            state.status = 'idle';
        })
    }
})

export const categorySelectors = categoryAdaper.getSelectors((state: RootState) => state.category)
export const {setCategories, removeCategory} = categorySlice.actions;