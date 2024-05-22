import { NavLink } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';

export default function Header(){

    const isAdmin = true;
    const {toggleSidebarOrder} = useOrder();

    return (

        <>
            <header>
                <nav className='header-nav'>
                    <NavLink to="/" className='nav-link'> Principal </NavLink> {/* Importo NavLink de libreria router-dom para manejar los links */}

                    <NavLink to='/login' className='nav-link'>Login</NavLink>
                    <NavLink to='/contact' className='nav-link'>Contacto</NavLink>
                    <NavLink to='/about-us' className='nav-link'>Acerca de</NavLink>
                    <NavLink to='/register' className='nav-link'>Registro</NavLink>

                    {isAdmin &&(
                        <NavLink to='/admin-product' className='nav-link'>
                            Admin. Product
                        </NavLink>
                    )}
                    {isAdmin &&(
                        <NavLink to='/admin-users' className='nav-link'>
                            Admin. Users
                        </NavLink>
                    )}

                </nav>

                <div className="user-info">
                    <FontAwesomeIcon icon={faCartShopping} onClick={()=>toggleSidebarOrder()}/>
                </div>
            </header>
        </>


    )
}