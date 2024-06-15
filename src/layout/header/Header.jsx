import { NavLink } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';
import Modal from '../modal/Modal';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function Header(){

    const [isOpen, setIsOpen] = useState(false) /* Seteo un estado para el Modal */

    function handleClose(){
        setIsOpen(false)
    }

    function handleShow(){
        setIsOpen(true)
    }

    const{user, logout} = useUser();
    const {toggleSidebarOrder, count} = useOrder();

    return (

        <>
            <header>
                <nav className='header-nav'>
                    <NavLink to="/" className='nav-link'> Principal </NavLink> {/* Importo NavLink de libreria router-dom para manejar los links */}

                    {user  ? <button className='nav-link' onClick={logout}>Logout</button>
                           : <NavLink to='/login' className='nav-link'>Login</NavLink>
                    }
                    

                    <NavLink to='/contact' className='nav-link'>Contacto</NavLink>
                    <NavLink to='/about-us' className='nav-link'>Acerca de</NavLink>
                    <NavLink to='/register' className='nav-link'>Registro</NavLink>
                    
                    

                    {user?.role === "ADMIN_ROLE" &&(
                        <NavLink to='/admin-product' className='nav-link'>
                            Admin. Product
                        </NavLink>
                    )}
                    {user?.role === "ADMIN_ROLE" &&(
                        <NavLink to='/admin-users' className='nav-link'>
                            Admin. Users
                        </NavLink>
                    )}

                    <button onClick={handleShow}>
                        Modal
                    </button>

                </nav>

                <div className="user-info">
                    <div className={`user-cart-container ${count < 1 ? '' : 'show-circle'}`} data-count={count}>
                        <FontAwesomeIcon 
                        className='user-cart'
                        icon={faCartShopping} 
                        onClick={()=>toggleSidebarOrder()}/>
                    </div>
                </div>
            </header>

            <Modal isOpen={isOpen} handleClose={handleClose} title="Título de modal"> {/* Llamo al modal */}
                    <>
                        <h3>Elemento children</h3>
                        <hr />
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, magnam!
                        </p>
                    </>
            </Modal>

            
        </>


    )
}