import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import agent from "../API/agent";
import { RootState } from "./configureStore";
import { ProductParams } from "../models/ProductParams";

interface InitialState {
    productLoaded: boolean;
    status: string;
    categoryList: string[];
    brandList: string[];
    productParams: ProductParams;
    filtersLoaded: boolean;
}

const productsAdapter = createEntityAdapter<Product>();

function initParams() : ProductParams {
    return {
        orderBy: 'name',
        searchTerm: '',
        category: [],
        brand: [],
    }
}

const getAxiosParams = (productParams: ProductParams) => {
    const params = new URLSearchParams();
    params.append('orderBy', productParams.orderBy);
    productParams.searchTerm && params.append('searchTerm', productParams.searchTerm);
    productParams.category && params.append('category', productParams.category+'');
    productParams.brand && params.append('brand', productParams.brand+'');

    return params;
}

export const fetchProductAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'product/fetchProductAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Product.list(getAxiosParams(thunkAPI.getState().products.productParams));
        } catch (error: any) {
            console.log(thunkAPI.rejectWithValue(error.data));
        }
    }
)

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
    'product/fetchSingleProductAsync',
    async (id, thunkAPI) => {
        try {
            return await agent.Product.details(id);
        } catch (error: any) {
            console.log(thunkAPI.rejectWithValue(error.data));
        }
    }
)

export const fetchFiltersValues = createAsyncThunk(
    'product/fetchFilterValue',
    async (_, thunkAPI) => {
        try {
            return await agent.Product.filtersValue();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.data);
        }
    }
)

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: productsAdapter.getInitialState<InitialState>({
        productLoaded: false,
        status: 'idle',
        categoryList: [],
        brandList: [],
        productParams: initParams(),
        filtersLoaded: false,
    }),
    reducers: {
        setProduct: (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.productLoaded = false;
        },
        removeProduct: (state, action) => {
            productsAdapter.updateOne(state, action.payload);
            state.productLoaded = false;        
        },

        setProductParams: (state, action) => {
            state.productLoaded = false;
            console.log(action.payload);
            
            state.productParams = {...state.productParams, ...action.payload};
        },

        resetProductParams: (state, action) => {
            state.productLoaded = false;
            state.productParams = initParams();
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProductAsync.pending, (state, action) => {
            state.productLoaded = false;
            state.status = 'pendingLoadProducts';
        })

        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.productLoaded = false;
            state.status = 'idle';
        })

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.productLoaded = true;
            state.status = 'idle';
        })

        // Single Product
        builder.addCase(fetchSingleProductAsync.pending, (state, action) => {
            state.status = 'pendingLoadSingleProduct';
        })

        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            productsAdapter.upsertOne(state, action.payload);
            console.log(action.payload);
            
        })

        builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
            state.status = 'idle';
        })

        // Filters Value
        builder.addCase(fetchFiltersValues.pending, (state, action) => {
            state.filtersLoaded = false;
        })

        builder.addCase(fetchFiltersValues.rejected, (state, action) => {
            state.filtersLoaded = false;
            console.log(action.error);
        })

        builder.addCase(fetchFiltersValues.fulfilled, (state, action) => {
            state.filtersLoaded = true;
            state.categoryList = action.payload.category;
            state.brandList = action.payload.brand;
        })
    }
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.products);
export const {setProduct, removeProduct, setProductParams, resetProductParams} = productSlice.actions;

