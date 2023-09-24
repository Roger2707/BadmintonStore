import { Box, Grid, IconButton } from "@mui/material";
import { AiOutlineUnorderedList } from "react-icons/ai";
import {BsGridFill} from 'react-icons/bs'
import SelectListButton from "../../apps/components/FilterSort/SelectListButton";
import { useAppDispatch } from "../../apps/Redux/configureStore";
import { setProductParams } from "../../apps/Redux/productSlice";
import TextFieldSearch from "../../apps/components/FilterSort/TextFieldSearch";

interface Props {
    sortOptions: any[];
}

export default function ProductAppBar({sortOptions}: Props) {

    const dispatch = useAppDispatch();

    return (
        <Box sx={{ height: '12vh', background: 'linear-gradient(to right, #ff416c, #ff4b2b)', display: 'flex', alignItems: 'center' }} >
            <Box style={{ width: '100%', padding: '0px 50px' }} >
                <Grid container columnSpacing={4} marginTop={0} >
                    <Grid item xs={6} >
                        <TextFieldSearch label="Search Products" onChange={(e: any) => dispatch(setProductParams({searchTerm: e.target.value}))} />
                    </Grid>

                    <Grid item xs={3} >
                        <SelectListButton label='Sort Products' items={sortOptions} onChange={(e: any) => dispatch(setProductParams({orderBy: e.target.value}))} />
                    </Grid>

                    <Grid item xs={3} sx={{display: "flex", justifyContent: 'flex-end', alignItems: 'center'}} >
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 3, border: '1px solid #333', borderRadius: 0 }}
                            children={<AiOutlineUnorderedList />}
                        />

                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ border: '1px solid #333', borderRadius: 0 }}
                            children={<BsGridFill />}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}