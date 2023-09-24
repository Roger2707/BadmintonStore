import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextField from "../../apps/components/Forms/AppTextField";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import AppSelectList from "../../apps/components/Forms/AppSelectList";
import { Category } from "../../apps/models/Category";
import AppRadioButtonGroup from "../../apps/components/Forms/AppRadioButtonGroup";
import AppDropzone from "../../apps/components/Forms/AppDropzone";
import agent from "../../apps/API/agent";
import { useAppDispatch } from "../../apps/Redux/configureStore";
import { setCategories } from "../../apps/Redux/categorySlice";
import { Brand } from "../../apps/models/Brand";
import { setBrands } from "../../apps/Redux/brandSlice";
import { Product } from "../../apps/models/Product";
import { setProduct } from "../../apps/Redux/productSlice";
import { validationSchema } from "./adminValidation";
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
    open: boolean;
    setOpen: any;
    setSelectedObject: any;
    selectedObject: any;
    typeData: string;
    categories?: any[];
    brands?: any[];
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
    scrollBehavior: 'smooth'
};

export default function CrudForm({ open, setOpen, selectedObject, setSelectedObject, typeData, categories, brands }: Props) {
    const [activeForm, setActiveForm] = useState(0);
    const [fromDefault, setFormDefault] = useState({});

    useEffect(() => {
        setFormDefault(_ => {
            if(typeData === 'Category') {
                setActiveForm(0);
                return {name: ''}
            }
            if(typeData === 'Brand') {
                setActiveForm(1);
                return {name: '', country: ''};
            }
            if(typeData === 'Product') {
                setActiveForm(2);
                return {
                    name: '',
                    description: '',
                    price: 0,
                    quantityInStock: 0,
                    pictureUrl: '',
                    status: true,
                    categoryId: 0,
                    brandId: 0,
                }
            }
        })
    }, [typeData])

    const currentValidationSchema = validationSchema[activeForm];

    const { control, reset, handleSubmit, watch, setValue, formState: { isDirty, isSubmitting } } = useForm({
        resolver: yupResolver(currentValidationSchema)
    });
    let watchFile = watch('file', null);
    const dispatch = useAppDispatch();


    // options Status Products
    const optionsStatus = [
        { value: true, label: 'active' },
        { value: false, label: 'non-active' },
    ]

    const handleClose = () => {
        setOpen(false);
        if (selectedObject) setSelectedObject(undefined);
    }

    useEffect(() => {
        // Nếu click vào có Object và các input vẫn bằng defaultValue thì Set input là giá trị trong hàm reset
        if (selectedObject && (!watchFile) && (!isDirty)) {
            reset(selectedObject);         
        }
        //if(selectedObject && watchFile && !isDirty) reset(selectedObject);

        return () => {
            if (watchFile) {
                setValue('file', null);
                reset(selectedObject);
            }
        }

    }, [selectedObject, reset, watchFile, isDirty, setValue])

    useEffect(() => {
        if (!selectedObject) {
            reset(fromDefault);
        }

    }, [selectedObject, reset, fromDefault])

    const submitUpsertForm = async (data: FieldValues) => {
        try {
            // Convert status (String -> boolean)
            if (data.status === 'true') data.status = true;
            if (data.status === 'false') data.status = false;
            //if (data.file === null) data.file = defaultURL + selectedObject.pictureUrl;
            
            console.log(data);
            

            if (typeData === 'Category') {
                let response : Category;
                if(selectedObject) {
                    response = await agent.Admin.updateCategory(data);
                } else {
                    response = await agent.Admin.createCategory(data);
                }
                dispatch(setCategories(response));
            } else if(typeData === 'Brand') {
                let response : Brand;
                if(selectedObject) {
                    response = await agent.Admin.updateBrand(data);
                } else {
                    response = await agent.Admin.createBrand(data);
                }
                dispatch(setBrands(response));
            } else if(typeData === 'Product') {
                let response : Product;

                if(selectedObject) {
                    response = await agent.Admin.updateProduct(data);
                } else {
                    response = await agent.Admin.createProduct(data);
                }
                dispatch(setProduct(response));    
            }

            handleClose();
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Typography id="modal-modal-title" variant="h4" sx={{ marginBottom: 2 }} >
                    {selectedObject ? 'Update ' : 'Create new '} {typeData}
                </Typography>

                <form onSubmit={handleSubmit(submitUpsertForm)} >
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <AppTextField name="name" label="Name" control={control} fullWidth={true} />
                        </Grid>
                        {typeData === 'Brand' && <Grid item xs={12}><AppTextField name="country" label="Country" control={control} fullWidth={true} /></Grid>}
                        {
                            typeData === 'Product' &&
                            <>
                                <Grid item xs={12} >
                                    <AppTextField name="description" label="Description" control={control} multiline={true} rows={4} fullWidth={true} />
                                </Grid>

                                <Grid item xs={6} >
                                    <AppTextField name="price" label="Price" control={control} type="number" fullWidth={true} defaultValue={0} />
                                </Grid>

                                <Grid item xs={6} >
                                    <AppTextField name="quantityInStock" label="Quantity" control={control} type='number' fullWidth={true} defaultValue={0} />
                                </Grid>

                                {
                                    categories &&
                                    <Grid item xs={6} >
                                        <AppSelectList name="categoryId" label="Category" control={control} items={categories} />
                                    </Grid>
                                }

                                {
                                    brands &&
                                    <Grid item xs={6} >
                                        <AppSelectList name="brandId" label="Brand" control={control} items={brands} />
                                    </Grid>
                                }

                                <Grid item xs={6} >
                                    <AppRadioButtonGroup name="status" label="Status" control={control} options={optionsStatus} />
                                </Grid>

                                <Grid item xs={6} >
                                    <AppDropzone name="file" control={control} watchFile={watchFile} selectedObject={selectedObject} />
                                </Grid>
                            </>
                        }
                    </Grid>

                    <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                        <Button onClick={handleClose} variant='contained' color='inherit'>Cancel</Button>
                        <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}