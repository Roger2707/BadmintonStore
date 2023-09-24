import { LoadingButton } from "@mui/lab";
import { Grid, Card, CardMedia, CardContent, Typography, Box, CardActions, Button } from "@mui/material";
import { BsCartPlusFill } from "react-icons/bs";
import { uploadURL, currencyFormat } from "../../apps/utils/utils";
import { Product } from "../../apps/models/Product";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../apps/Redux/configureStore";
import { addItemToBasket } from "../../apps/Redux/basketSlice";

interface Props {
    product: Product
}

export default function ProductCard({product}: Props) {

    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.basket);

    return (
        <Grid item xs={3} margin={0} >
            <Card>
                <CardMedia
                    sx={{ height: 300 }}
                    image={uploadURL + product.pictureUrl}
                    title="green iguana"
                    component="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Typography variant="subtitle1" sx={{ color: 'red', fontWeight: 700 }}>
                            {currencyFormat(product.price)}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'black' }}>
                            {product.quantityInStock > 0 ? 'In Stock' : 'Out Stock'}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, paddingTop: 0 }}>
                    <Button size="medium" sx={{ border: '1px solid blue' }} 
                            component={Link} to={`/products/${product.id}`}
                    >
                        Details
                    </Button>

                    <LoadingButton size="medium" sx={{ color: 'black', fontSize: '1.5rem' }} 
                        loading={status.includes('pendingAddItem' + product.id)}
                        onClick={() => dispatch(addItemToBasket({productId: product.id, quantity: 1}))}
                    >
                        <BsCartPlusFill />
                    </LoadingButton>

                </CardActions>
            </Card>
        </Grid>
    )
}