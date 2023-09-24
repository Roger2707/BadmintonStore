import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';
import { Badge, List, ListItem, Typography } from '@mui/material';

import { FaReact } from 'react-icons/fa';
import { BiRegistered } from 'react-icons/bi'
import { AiOutlineLogin } from 'react-icons/ai'
import { BsFillCartFill } from 'react-icons/bs'
import { useAppSelector } from '../Redux/configureStore';
import DropdownMenuSignIn from './DropdownMenuSignIn';

const navMainControl = [
    {
        id: 1,
        name: 'Products',
        route: '/products'
    },
    {
        id: 2,
        name: 'About',
        route: '/about',
    },
    {
        id: 3,
        name: 'Contact',
        route: '/contact',
    },
    {
        id: 4,
        name: 'Control',
        route: '/admin'
    },
];

const navIdentity = [
    {
        name: 'Register',
        route: '/register',
        icon: <BiRegistered />
    },
    {
        name: 'Login',
        route: '/login',
        icon: <AiOutlineLogin />
    },
]

const navStyle = {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500',
        cursor: 'pointer',
    },
    '&.active': {
        fontWeight: '700',
        color: 'gold'
    }
}

// css
export const navDisplayFlex = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

export default function Header() {
    const { user } = useAppSelector(state => state.account);
    const {basket} = useAppSelector(state => state.basket);
    const basketItem = basket?.items.reduce((acc, cur) => acc + cur.quantity, 0)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'black' }} >
                <Toolbar sx={{ ...navDisplayFlex }} >
                    {/* Navbar Control */}
                    <List sx={{ ...navDisplayFlex }} >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            component={NavLink}
                            to='/'
                        >
                            <FaReact />
                            <Typography variant='h5' >
                                E-Badminton
                            </Typography>
                        </IconButton>
                        {navMainControl.map(({ id, name, route }) => (
                            <ListItem
                                component={NavLink}
                                to={route}
                                key={id + route}
                                sx={{ ...navStyle }}
                            >
                                {name.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                    {/* Navbar Identity */}
                    <List sx={{ ...navDisplayFlex }} >
                        {/* Shopping Cart */}
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2, ...navStyle }}
                            component={NavLink}
                            to='/basket'
                        >
                            <Badge badgeContent={basketItem} color='error' >
                                <BsFillCartFill />
                            </Badge>
                        </IconButton>

                        {
                            user ? (
                                <DropdownMenuSignIn user={user} />
                            ) : (
                                navIdentity.map(({ name, route, icon }) => (
                                    <ListItem
                                        sx={{ ...navStyle }}
                                        key={route}
                                        component={NavLink}
                                        to={route}
                                    >
                                        <IconButton
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={{ mr: 0 }}
                                        >{icon}
                                        </IconButton>
                                        {name.toUpperCase()}
                                    </ListItem>
                                ))
                            )
                        }

                    </List>
                </Toolbar>
            </AppBar>
        </Box>
    );
}