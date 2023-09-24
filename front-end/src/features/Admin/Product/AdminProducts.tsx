import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../apps/Redux/configureStore";
import { fetchProductAsync, productSelectors } from "../../../apps/Redux/productSlice";
import LoadingComponent from "../../../apps/components/LoadingComponent";
import { categorySelectors, fetchCategoryAsync } from "../../../apps/Redux/categorySlice";
import { brandSelectors, fetchBrandAsync } from "../../../apps/Redux/brandSlice";
import DataTable from "../DataTable";

export default function AdminProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const categories = useAppSelector(categorySelectors.selectAll);
    const brands = useAppSelector(brandSelectors.selectAll);

    const { productLoaded } = useAppSelector(state => state.products)
    const { categoryLoaded } = useAppSelector(state => state.category)
    const { brandLoaded } = useAppSelector(state => state.brand)

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        if (!productLoaded) dispatch(fetchProductAsync());
        if (!categoryLoaded) dispatch(fetchCategoryAsync());
        if (!brandLoaded) dispatch(fetchBrandAsync());

        if (productLoaded && categoryLoaded && brandLoaded) setLoading(false);

    }, [productLoaded, categoryLoaded, brandLoaded, dispatch]);

    if (loading) return <LoadingComponent message="Loading Fetching Products...." />

    return (
        <>
            <DataTable data={products} categories={categories} brands={brands} title="Product" />
        </>
    )
}