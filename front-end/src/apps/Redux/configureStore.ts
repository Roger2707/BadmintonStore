import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productSlice } from "./productSlice";
import { categorySlice } from "./categorySlice";
import { brandSlice } from "./brandSlice";
import { basketSlice } from "./basketSlice";
import { accountSlice } from "./accountSlice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        category: categorySlice.reducer,
        brand: brandSlice.reducer,
        basket: basketSlice.reducer,
        account: accountSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;