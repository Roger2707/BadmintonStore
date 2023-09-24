import { useRef, useState } from "react";
import { FaBars, FaProductHunt } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi';
import { TbBrandAsana } from 'react-icons/tb';
import { MdAccountCircle, MdDashboard } from 'react-icons/md';
import { CSSTransition } from "react-transition-group";
import IconButton from '@mui/material/IconButton';

import '../../styles/Sidebar.css';
import { Link } from "react-router-dom";

const menuItems = [

    { title: "Dashboard", icon: <MdDashboard />, route: '/admin' },
    { title: "Products", icon: <FaProductHunt />, route: '/admin/products'},
    { title: "Category", icon: <BiCategory />, route: '/admin/category'},
    { title: "Brands", icon: <TbBrandAsana />, route: '/admin/brands'},
    { title: "Account", icon: <MdAccountCircle />, route: '/admin/account' }
];

interface Props {
    isOpen: boolean;
    setIsOpen: (value: any) => void;
}

export default function Sidebar({isOpen, setIsOpen}: Props) {
    const [isActive, setIsActive] = useState(menuItems[0]);
    const nodeRef = useRef(null);

    const handleActiveIcon = (index: any) => {
        setIsActive(menuItems[index])
    }

    return (
        <div className={isOpen ? 'sidebar' : 'sidebar-closed'} >
            <button className="sidebar__button" onClick={() => setIsOpen(!isOpen)} >
                <FaBars />
            </button>

            <ul>
                {menuItems.map((item, index) => (
                    <li key={item.title}>
                        <Link className={isActive.title === item.title ? 'sidebar__listItem active' : 'sidebar__listItem'}
                            onClick={() => handleActiveIcon(index)} to={item.route}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                children={item.icon}
                                className='sidebar__icon'
                            />
                            <CSSTransition
                                in={isOpen}
                                timeout={200}
                                classNames={"fade"}
                                unmountOnExit
                                nodeRef={nodeRef}
                            >
                                <span className="sidebar__text" >{item.title}</span>
                            </CSSTransition>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
