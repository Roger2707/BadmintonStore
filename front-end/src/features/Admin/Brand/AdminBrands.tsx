import { useState, useEffect } from "react";
import LoadingComponent from "../../../apps/components/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../../apps/Redux/configureStore";
import { brandSelectors, fetchBrandAsync } from "../../../apps/Redux/brandSlice";
import DataTable from "../DataTable";

export default function AdminBrands() {
   
    const brands = useAppSelector(brandSelectors.selectAll);
    const {brandLoaded} = useAppSelector(state => state.brand);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!brandLoaded) dispatch(fetchBrandAsync());
        if(brandLoaded) setLoading(false)
    }, [brandLoaded, dispatch])

    if(loading) return <LoadingComponent message="Loaidng for Brands" />

    return (
        <>
            <DataTable data={brands!} title="Brand" />
        </>
    )
}