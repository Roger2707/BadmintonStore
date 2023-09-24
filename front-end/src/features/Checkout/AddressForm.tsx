import { Box, Grid, Typography } from "@mui/material";
import AppTextField from "../../apps/components/Forms/AppTextField";
import { useFormContext } from "react-hook-form";
import Review from "./Review";
import AppGroupCheckbox from "../../apps/components/Forms/AppGroupCheckbox";

export default function AddressForm() {
    const { control, formState } = useFormContext();

    return (
        <Grid container spacing={4}>
            <Grid item xs={8} >
                <Typography variant="h4" sx={{ background: 'black', color: '#fff', padding: '10px 15px' }} >1. SHIPPING:</Typography>
                <Box sx={{ background: '#ccc', padding: '25px 30px' }} >
                    <Grid item xs={12} sx={{ background: '#ccc' }} >
                        <AppTextField name="fullname" label="Full Name:" control={control} fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} sx={{ background: '#ccc' }} >
                        <AppTextField name="address1" label="Address 1:" control={control} fullWidth={true} styles={{ marginTop: '15px' }} />
                    </Grid>
                    <Grid item xs={12} sx={{ background: '#ccc' }} >
                        <AppTextField name="address2" label="Address 2:" control={control} fullWidth={true} styles={{ marginTop: '15px' }} />
                    </Grid>
                    <Grid item xs={12} sx={{ background: '#ccc' }} >
                        <AppTextField name="city" label="City:" control={control} fullWidth={true} styles={{ marginTop: '15px' }} />
                    </Grid>
                    <Grid item xs={12} sx={{ background: '#ccc' }} >
                        <AppTextField name="state" label="State:" control={control} fullWidth={true} styles={{ marginTop: '15px' }} />
                    </Grid>
                    <Grid item xs={12} sx={{ background: '#ccc' }} >
                        <AppTextField name="zip" label="Zip:" control={control} fullWidth={true} styles={{ marginTop: '15px' }} />
                    </Grid>
                    <Grid item xs={12} sx={{ background: '#ccc' }} >
                        <AppTextField name="country" label="Country:" control={control} fullWidth={true} styles={{ marginTop: '15px' }} />
                    </Grid>
                </Box>

                <Grid item xs={12}>
                    <AppGroupCheckbox
                    disabled={!formState.isDirty}
                    name='saveAddress'
                    label='Save this as the default address'
                    control={control}
                    />
                </Grid>
            </Grid>

            <Grid item xs={4} >
                <Review />
            </Grid>
        </Grid>
    )
}