import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { MdAdd, MdDelete } from "react-icons/md";
import { useState } from "react";
import CrudForm from "./CrudForm";
import { Category } from "../../apps/models/Category";
import { Brand } from "../../apps/models/Brand";
import { currencyFormat, uploadURL } from "../../apps/utils/utils";
import agent from "../../apps/API/agent";
import { useAppDispatch } from "../../apps/Redux/configureStore";
import { removeCategory } from "../../apps/Redux/categorySlice";
import { removeBrand } from "../../apps/Redux/brandSlice";
import { removeProduct } from "../../apps/Redux/productSlice";


interface Props {
    data: any[];
    title: string;
    
    categories?: Category[];
    brands?: Brand[];
}

export default function DataTable({ data, title, categories, brands }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedObject, setSelectedObject] = useState<any | undefined>(undefined);
    const dispatch = useAppDispatch();


    const openUpsertForm = (object: any) => {
        setOpen(true);
        setSelectedObject(object)
    }

    const handleDelete = async (id: number) => {
        try {
            if(title === 'Category') {
                const response = await agent.Admin.deleteCategory(id);
                dispatch(removeCategory(response));
            } else if(title === 'Brand') {
                const response = await agent.Admin.deleteBrand(id);
                dispatch(removeBrand(response));
            } else if(title === 'Product') {
                const response = await agent.Admin.deleteProduct(id);
                dispatch(removeProduct(response));
            }
        } catch (error) {
            console.log(error);
        }
    }

    //if(open) return  <CrudForm open={open} handleClose={handleClose} selectedObject={selectedObject} typeData={title} />

    return (
        <>
            <CrudForm open={open} setOpen={setOpen} 
                    selectedObject={selectedObject} setSelectedObject={setSelectedObject} typeData={title} 
                    categories = {categories} brands={brands}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 5 }} >
                <Typography variant="h3" >
                    {title}
                </Typography>

                <Button
                    sx={{p: 2, fontSize: '1rem'}}
                    variant="contained"
                    onClick={() => openUpsertForm(undefined)}
                >
                    <MdAdd />
                    Create New
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ p: 5, paddingTop: 0 }}>
                <Table sx={{ minWidth: 650, border: '3px solid black' }} aria-label="simple table">
                    <TableHead>
                        {
                            <TableRow >
                                {data[0].id && <TableCell sx={{ fontSize: 20 }} align="center">Id</TableCell>}
                                {data[0].name && <TableCell sx={{ fontSize: 20 }} align="center">Name</TableCell>}
                                {data[0].country && <TableCell sx={{ fontSize: 20 }} align="center">Country</TableCell>}
                                {data[0].description && <TableCell sx={{ fontSize: 20 }} align="center">Description</TableCell>}
                                {data[0].price && <TableCell sx={{ fontSize: 20 }} align="center">Price</TableCell>}
                                {data[0].quantityInStock && <TableCell sx={{ fontSize: 20 }} align="center">QuantityInStock</TableCell>}
                                {data[0].created && <TableCell sx={{ fontSize: 20 }} align="center">Created</TableCell>}
                                {data[0].pictureUrl && <TableCell sx={{ fontSize: 20 }} align="center">Photo</TableCell>}
                                {data[0].status && <TableCell sx={{ fontSize: 20 }} align="center">Status</TableCell>}
                                {data[0].category && <TableCell sx={{ fontSize: 20 }} align="center">Category</TableCell>}
                                {data[0].brand && <TableCell sx={{ fontSize: 20 }} align="center">Brand</TableCell>}
                                <TableCell sx={{ fontSize: 20 }} align="center"></TableCell>
                            </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                        {data.map((d) => (
                            <TableRow
                                key={d.id + d.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {d.id && <TableCell sx={{ fontSize: 18 }} align="center">{d.id}</TableCell>}
                                {d.name && <TableCell sx={{ fontSize: 18 }} align="center">{d.name}</TableCell>}
                                {d.country && <TableCell sx={{ fontSize: 18 }} align="center">{d.country}</TableCell>}
                                {d.description && <TableCell sx={{ fontSize: 18, maxWidth: '200px' }} align="center">{d.description.slice(0, 80)}...</TableCell>}
                                {d.price && <TableCell sx={{ fontSize: 18 }} align="center">{currencyFormat(d.price)}</TableCell>}
                                {d.quantityInStock && <TableCell sx={{ fontSize: 18 }} align="center">{d.quantityInStock}</TableCell>}
                                {d.created && <TableCell sx={{ fontSize: 18 }} align="center">{d.created.slice(0, 10)}</TableCell>}
                                {d.pictureUrl && <TableCell align="center">
                                    <img src={uploadURL + d.pictureUrl} alt={d.name} width='120px' height='120px' />
                                </TableCell>}
                                {(d.status || (!d.status && d.price) ) && <TableCell sx={{ fontSize: 18 }} align="center">{d.status === true ? 'Active' : 'Non-Active'}</TableCell>}
                                {d.category && <TableCell sx={{ fontSize: 18 }} align="center">{d.category.name}</TableCell>}
                                {d.brand && <TableCell sx={{ fontSize: 18 }} align="center">{d.brand.name}</TableCell>}
                                <TableCell sx={{ fontSize: 20 }} align="center">
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        sx={{ mr: 2 }}
                                        onClick={() => openUpsertForm(d)}
                                    >
                                        <BiEdit />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        onClick={() => handleDelete(d.id)}
                                    >
                                        <MdDelete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}