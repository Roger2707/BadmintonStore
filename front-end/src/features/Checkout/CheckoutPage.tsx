import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './checkoutValidation';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../apps/Redux/configureStore';
import { clearBasket } from '../../apps/Redux/basketSlice';
import agent from '../../apps/API/agent';
import { LoadingButton } from '@mui/lab';

const steps = ['Shipping address', 'Payment details'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        default:
            throw new Error('Unknown step');
    }
}

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [orderNumber, setOrderNumber] = useState(0);
    const dispatch = useAppDispatch();

    const currentValidationSchema = validationSchema[activeStep];

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(currentValidationSchema)
    })

    useEffect(() => {
        agent.Account.fetchAddress()
            .then(response => {
                if (response) {
                    methods.reset({ ...methods.getValues(), ...response, saveAddress: false })
                }
            })
    }, [methods]);


    async function submitOrder(data: FieldValues) {
        setLoading(true);
        const { saveAddress, ...address } = data;
        try {
            const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress: address });
            setOrderNumber(orderNumber);
            setActiveStep(activeStep + 1);
            dispatch(clearBasket());
            setLoading(false);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleNext = async (data: FieldValues) => {
        if (activeStep === steps.length - 1) {
            await submitOrder(data);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    
    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <form onSubmit={methods.handleSubmit(handleNext)}>
                            {getStepContent(activeStep)}
                        </form>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                type='submit'
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </LoadingButton>
                        </Box>
                    </React.Fragment>
                )}
            </Paper>
        </FormProvider>
    );
}