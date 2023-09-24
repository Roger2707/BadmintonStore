import { Box, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../apps/Redux/configureStore";
import { useEffect } from "react";
import { fetchFiltersValues } from "../../apps/Redux/productSlice";
import CheckboxButton from "../../apps/components/FilterSort/CheckboxButton";

export default function ProductFilters() {
    const dispatch = useAppDispatch();
    const {categoryList, brandList, filtersLoaded} = useAppSelector(state => state.products);

    useEffect(() => {
         if(!filtersLoaded) dispatch(fetchFiltersValues());
    }, [dispatch, filtersLoaded])

    return (
        <Box sx={{height: '100%', backgroundColor: '#333', padding: '50px 0', borderRight: '3px solid red'}} >
            <Box component={Paper} elevation={2} sx={{margin: '20px', padding: '10px'}} >
                <Typography variant="h5" sx={{fontSize: '1.5rem', fontStyle:'italic', fontWeight: 500}} >_Category:</Typography>
                <Box sx={{marginLeft:'10px', marginTop: '10px'}} >
                    <CheckboxButton items={categoryList} type="category" />
                </Box>
            </Box>

            <Box component={Paper} elevation={2} sx={{margin: '20px', padding: '10px', marginTop: '35px'}} >
                <Typography variant="h5" sx={{fontSize: '1.5rem', fontStyle:'italic', fontWeight: 500}} >_Brand:</Typography>
                <Box sx={{marginLeft:'10px', marginTop: '10px'}} >
                    <CheckboxButton items={brandList} type="brand" />
                </Box>
            </Box>
        </Box>
    )
}