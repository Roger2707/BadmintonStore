import * as yup from 'yup';

export const validationSchema = yup.object({
    username: yup.string().required('Please enter your username'),
    email: yup.string().email().required('Please enter your email').matches(/@[^.]*\./),
    password: yup.string().required('Please enter your password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Passwords must match")
})