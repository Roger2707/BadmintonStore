import { Grid } from "@mui/material";
import ProductFilters from "./ProductFilters";
import ProductAppBar from "./ProductAppBar";
import Products from "./Products";
import { useAppDispatch, useAppSelector } from "../../apps/Redux/configureStore";
import { productSelectors } from "../../apps/Redux/productSlice";
import { useEffect, useState } from "react";
import LoadingComponent from "../../apps/components/LoadingComponent";
import { fetchProductAsync } from "../../apps/Redux/productSlice";

export default function ProductsPage() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const {productLoaded} = useAppSelector(state => state.products);

    const sortOptions = [
        {
            name: 'Name (A-Z)',
            value: 'name',
        },
        {
            name: 'Price',
            value: 'price',
        },
        {
            name: 'Price Desc',
            value: 'priceDesc',
        },
    ];

    

    useEffect(() => {
        if(!productLoaded) dispatch(fetchProductAsync());
        if(productLoaded) setLoading(false)
    }, [dispatch, productLoaded])

    if(loading) return <LoadingComponent message="Loading Products..." />
    
    return(
        <Grid container >
            <Grid item xs={2} >
                <ProductFilters />
            </Grid >

            <Grid item xs={10} >
                <ProductAppBar sortOptions={sortOptions} />

                <Products products={products} />
            </Grid>
        </Grid>
    )
}