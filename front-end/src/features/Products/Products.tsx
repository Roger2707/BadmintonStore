import { Box, Grid } from "@mui/material";
import { Product } from "../../apps/models/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function Products({ products }: Props) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center' }} >
            <Grid container columnSpacing={2} rowSpacing={4} sx={{ backgroundColor: 'whitesmoke', margin: 0, padding: '20px 50px 50px 30px'}} >
                {
                    products.map((p, i) => (
                        <ProductCard key={p.name + i} product={p}  />
                    ))
                }
            </Grid>
        </Box>

    )
}