import { Box, Grid, Typography } from "@mui/material";
import { currencyFormat, uploadURL } from "../../apps/utils/utils";
import { useAppSelector } from "../../apps/Redux/configureStore";

export default function Review() {
    const { basket, } = useAppSelector(state => state.basket);

    const subTotal = basket?.items.reduce((acc, cur) => {
        const { price, quantity } = cur;
        return acc + price * quantity;
    }, 0)

    const deliveryFee = subTotal! > 1000000 ? subTotal : 50000;

    const grandTotal = subTotal! + deliveryFee!;
    return (
        <Box sx={{}} >
            <Typography variant="h4" sx={{ background: '#333', color: '#fff', padding: '10px' }} >2. Summary:</Typography>
            <Box sx={{ padding: '10px 15px', border: '1px solid #333' }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }} >
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 500 }} >SubTotal:</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#ccc' }} >{currencyFormat(subTotal || 0)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }} >
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 500 }} >Delivery Fee:</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#ccc' }} >{currencyFormat(deliveryFee || 0)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }} >
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 500 }} >Discount:</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#ccc' }} >0 %</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }} >
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 500 }} >Grand Total:</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'red', fontWeight: 500 }} >{currencyFormat(grandTotal || 0)}</Typography>
                </Box>
            </Box>

            <Box sx={{ marginTop: '20px', border: '1px solid #333' }} >
                <Typography variant="h4" sx={{ background: '#333', color: '#fff', padding: '10px' }} >3. In Your Cart:</Typography>
                <Grid container>
                    {
                        basket?.items.map(item => (
                            <Grid item xs={12} sx={{display: 'flex', marginTop: '10px'}} key={item.name + item.productId} >
                                <Grid item xs={3} >
                                    <img src={uploadURL + item.pictureUrl} alt="basketPhoto" width={100} height={80} />
                                </Grid>
                                <Grid item xs={9} >
                                    <span style={{ fontWeight: 600, fontSize: '1rem' }} >{item.name.split('(')[0]}</span>
                                    <br />
                                    <span style={{ display: 'inline-block', color: 'red', fontStyle: 'italic', fontSize: '0.8rem', marginTop: '5px' }} >{currencyFormat(item.price)} x {item.quantity}</span>
                                    <br />
                                    <span style={{ display: 'inline-block', color: 'red', fontWeight: '700', fontSize: '1.2rem', marginTop: '5px' }}>=&gt;  {currencyFormat(item.price * item.quantity)}</span>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}