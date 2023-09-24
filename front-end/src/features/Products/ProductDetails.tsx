import { Link, useParams } from "react-router-dom"
import { fetchSingleProductAsync, productSelectors } from "../../apps/Redux/productSlice";
import { useAppDispatch, useAppSelector } from "../../apps/Redux/configureStore";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { currencyFormat, uploadURL } from "../../apps/utils/utils";
import { useEffect, useState } from "react";
import LoadingComponent from "../../apps/components/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { BiMinus } from "react-icons/bi";
import { MdAdd } from "react-icons/md";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const { status: productStatus } = useAppSelector(state => state.products)
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!product && id) dispatch(fetchSingleProductAsync(+id));

        if (!productStatus.includes('pending')) setLoading(false);
    }, [product, dispatch, id, productStatus])

    if (loading) return <LoadingComponent message="Loading Single Product...." />

    if (!product) return <Typography variant="h2">Not Found Product</Typography>

    return (
        <Container component={Grid} container columnSpacing={5} sx={{ display: 'flex', paddingTop: '50px' }} >
            <Grid item xs={6} >
                <img src={uploadURL + product?.pictureUrl} width='100%' alt={product?.name}
                    style={{boxShadow: '0 0 3px 1px', height: '600px'}}
                />
                <Button component={Link} to='/products' >Continue Shopping</Button>
            </Grid>

            <Grid item xs={6} >
                <Typography variant="h3" >{product?.name}</Typography>
                <Box sx={{padding: 2, marginTop: '20px', border: '1px solid darkred'}} >
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'gray', marginTop: '10px' }} >{product?.description}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '1.2rem', color: 'black', marginTop: '10px' }} >Created: {product?.created.slice(0, 10)}</Typography>
                    <Typography variant="body1" sx={{fontSize: '1.2rem', marginTop: '10px'}} >Quantity In Stock: {product.quantityInStock}</Typography>
                    <Typography variant="body1" sx={{fontSize: '1.2rem', marginTop: '10px'}} >Category: {product.category.name}</Typography>
                    <Typography variant="body1" sx={{fontSize: '1.2rem', marginTop: '10px'}} >Brand: {product.brand.name}</Typography>
                    <Typography variant="body1" sx={{fontSize: '1.5rem', marginTop: '10px', color: 'red'}} >{currencyFormat(product.price)}</Typography>
                </Box>
                <Box sx={{padding: 2, marginTop: '20px', border: '1px solid darkred'}}>
                <LoadingButton size="medium" sx={{ color: 'black', fontSize: '1.5rem', border: '1px solid #333', marginRight: '10px' }}  
                            
                        >
                            <BiMinus/>
                        </LoadingButton>

                        <span style={{}} >00</span>

                        <LoadingButton size="medium" sx={{ color: 'black', fontSize: '1.5rem', border: '1px solid #333', marginLeft: '10px' }} 
                            
                        >
                            <MdAdd/>
                        </LoadingButton>
                </Box>
            </Grid>
        </Container>
    )
}