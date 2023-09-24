import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppTextField from '../../apps/components/Forms/AppTextField';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './registerValidation';
import agent from '../../apps/API/agent';
import { toast } from 'react-toastify';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const submitForm = async (values: FieldValues) => {
        try {
            await agent.Account.register(values).then(() => {
                toast.success('Registration successful - you can now login');
                navigate('/login');
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" sx={{border: '2px solid #333', marginTop: '50px', width: '700px'}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '0 30px',
                    }}
                >
                    <Avatar sx={{ m: 1, background: '#333' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h4" sx={{fontStyle: 'italic', fontWeight: 500, marginBottom: '20px'}}>
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <AppTextField label='Username' name='username' control={control} fullWidth={true}  />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <AppTextField label='Email' name='email' control={control} fullWidth={true}  />

                            </Grid>
                            <Grid item xs={12}>
                                <AppTextField label='Password' name='password' control={control} fullWidth={true} type='password' />

                            </Grid>
                            <Grid item xs={12}>
                                <AppTextField label='Confirm Password' name='confirmPassword' control={control} fullWidth={true} type='password'  />

                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/login' >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}