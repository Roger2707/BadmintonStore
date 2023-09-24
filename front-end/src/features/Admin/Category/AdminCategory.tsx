import { useEffect, useState } from "react";
import LoadingComponent from "../../../apps/components/LoadingComponent";
import { categorySelectors, fetchCategoryAsync } from "../../../apps/Redux/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../apps/Redux/configureStore";
import DataTable from "../DataTable";

export default function AdminCategory() {

    const categories = useAppSelector(categorySelectors.selectAll);
    const [loading, setLoading] = useState(true);

    const {categoryLoaded} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!categoryLoaded)  dispatch(fetchCategoryAsync());
        if(categoryLoaded) setLoading(false);
    }, [categoryLoaded, dispatch])

    if(loading) return <LoadingComponent message="Loaidng for Category" />

    return (
        <>
            <DataTable data={categories!} title="Category" />
        </>
    )
}