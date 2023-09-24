import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppTextField from '../../apps/components/Forms/AppTextField';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../apps/Redux/configureStore';
import { signInUser } from '../../apps/Redux/accountSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

export default function Login() {
    const {control, handleSubmit} = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const submitForm = async (values: FieldValues) => {
        try {
            await dispatch(signInUser(values));
            navigate(location.state?.from || '/products');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container component="main" sx={{border: '2px solid #333', marginTop: '50px', width: '700px'}}>
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
                <Typography variant="h4" sx={{fontStyle: 'italic', fontWeight: 500}}>
                    Sign in
                </Typography>
                <Box component="form" sx={{width: '100%'}} onSubmit={handleSubmit(submitForm)} >

                    <AppTextField label='Username' name='username' control={control} fullWidth={true} styles={{margin: '20px 0'}} />

                    <AppTextField label='Password' name='password' control={control} fullWidth={true} type='password'  />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}