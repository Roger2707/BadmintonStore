import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../apps/Redux/configureStore";
import { currencyFormat, uploadURL } from "../../apps/utils/utils";
import { LoadingButton } from "@mui/lab";
import { BiMinus } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { addItemToBasket, removeFromBasket } from "../../apps/Redux/basketSlice";
import { Link } from "react-router-dom";

export default function BasketPage() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    const subTotal = basket?.items.reduce((acc, cur) => {
        const {price, quantity} = cur;
        return acc + price*quantity;
    }, 0)

    const deliveryFee = subTotal! > 1000000 ? subTotal : 50000;

    const grandTotal = subTotal! + deliveryFee!;

    if (!basket) return <Typography variant="h2" >Your Basket is Empty !</Typography>

    return (
        <Container sx={{paddingBottom: '100px'}} >

            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '50px'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton children={<MdShoppingCart/>} sx={{fontSize: '3.2rem', color: 'black'}} />
                    <Typography variant="h2" style={{fontStyle: 'italic'}}>
                        Your Basket:
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{fontSize: '2.7rem', fontStyle: 'italic', color: '#ccc'}} >
                    You have <span style={{color: 'red'}} >{basket.items.length}</span> items
                </Typography>
            </Box>

            <TableContainer component={Paper} sx={{marginTop: '50px', border: '2px solid #333'}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead  >
                        <TableRow >
                            <TableCell align="center" sx={{fontSize: '1.3rem'}} >Basket Id</TableCell>
                            <TableCell align="center" sx={{fontSize: '1.3rem'}}>Photo</TableCell>
                            <TableCell align="center" sx={{fontSize: '1.3rem'}}>Details</TableCell>
                            <TableCell align="center" sx={{fontSize: '1.3rem'}}>Quantity</TableCell>
                            <TableCell align="center" sx={{fontSize: '1.3rem'}}>Total</TableCell>
                            <TableCell align="center" sx={{fontSize: '1.3rem'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items?.map((item) => (
                            <TableRow
                                key={item.name+ item.productId}
                            >
                                <TableCell align="center">{basket.id}</TableCell>
                                <TableCell align="center">
                                    <img src={uploadURL + item.pictureUrl} alt="basketPhoto" width={100} height={100} />
                                </TableCell>
                                <TableCell align="center">
                                    <span style={{fontWeight: 600, fontSize: '1.2rem'}} >{item.name.split('(')[0]}</span>
                                    <br/>
                                    <span style={{display:'inline-block', color: 'red', fontStyle: 'italic', fontSize: '1.1rem', marginTop: '10px'}} >{currencyFormat(item.price)}</span>
                                </TableCell>
                                <TableCell align="center" >
                                    <LoadingButton children={<BiMinus/>} size="large"
                                            sx={{fontSize: '1.2rem'}}
                                            loading={status.includes('pendingRemoveItem' + item.productId) ? true : false}
                                            onClick={() => dispatch(removeFromBasket({productId: item.productId, quantity: 1}))}
                                    />
                                    <span style={{display: 'inline-block', fontSize: '1.2rem'}} >{item.quantity}</span>
                                    <LoadingButton children={<MdAdd/>} size="large"
                                            sx={{fontSize: '1.2rem', color: 'red'}} 
                                            loading={status.includes('pendingAddItem' + item.productId) ? true : false}
                                            onClick={() => dispatch(addItemToBasket({productId: item.productId, quantity: 1}))}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <span style={{display:'inline-block', color: 'red', fontStyle: 'italic', fontSize: '1.1rem'}}>
                                        {currencyFormat(item.price * item.quantity)}
                                    </span>
                                </TableCell>
                                <TableCell align="center">
                                    <LoadingButton size="medium" sx={{ color: 'black', fontSize: '1.5rem', border: '1px solid #333'}} 
                                        loading={status.includes('pendingRemoveItem' + item.productId + 'remove') ? true : false}
                                        onClick={() => dispatch(removeFromBasket({productId: item.productId, quantity: item.quantity, remove: 'remove'}))}
                                    >
                                        <AiFillDelete/>
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{marginTop: '50px', width: '50%', padding: '15px 20px', border: '2px solid black', borderRadius: '5px'}} >
                <Typography variant="h4" sx={{fontStyle: 'italic'}} >Summary:</Typography>
                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}} >
                        <Typography variant="body1" sx={{fontSize: '1.2rem', fontWeight: 500}} >SubTotal:</Typography>
                        <Typography variant="body1" sx={{fontSize: '1.2rem', color: '#ccc'}} >{currencyFormat(subTotal || 0)}</Typography>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px'}} >
                        <Typography variant="body1" sx={{fontSize: '1.2rem', fontWeight: 500}} >Delivery Fee:</Typography>
                        <Typography variant="body1" sx={{fontSize: '1.2rem', color: '#ccc'}} >{currencyFormat(deliveryFee || 0)}</Typography>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px'}} >
                        <Typography variant="body1" sx={{fontSize: '1.2rem', fontWeight: 500}} >Discount:</Typography>
                        <Typography variant="body1" sx={{fontSize: '1.2rem', color: '#ccc'}} >0 %</Typography>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px'}} >
                        <Typography variant="body1" sx={{fontSize: '1.2rem', fontWeight: 500}} >Grand Total:</Typography>
                        <Typography variant="body1" sx={{fontSize: '1.2rem', color: 'red', fontWeight: 500}} >{currencyFormat(grandTotal || 0)}</Typography>
                    </Box>
                </Box>

                <LoadingButton variant="contained" sx={{width: '100%', marginTop: '30px', background: '#333'}} 
                    component={Link} to='/checkout'
                >Checkout</LoadingButton>
            </Box>

        </Container>
    )
}