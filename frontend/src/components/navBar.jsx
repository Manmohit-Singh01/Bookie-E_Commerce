import {Link, useNavigate} from 'react-router';
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function NavBar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const loadCartCount = async () => {
            if ( !userId) return setCartCount(0);
            try {
                const response = await api.get(`/cart/${userId}`);
                const totalItems = response.data.items.reduce((total, item) => total + item.quantity, 0);
                setCartCount(totalItems);
            } 
            catch (err) {
                console.error(err);
                setCartCount(0);
            }
        };
        loadCartCount();
        window.addEventListener('cartUpdated', loadCartCount);
        return () => {
            window.removeEventListener('cartUpdated', loadCartCount);
        };
    }, [userId]);
    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <Link to="/" className="nav-link">Bookie</Link>

            <div className="flex items-center space-x-4">
                <Link to="/cart" className="nav-link">
                {
                    cartCount > 0 && (
                        <span className="ml-1 text-sm bg-red-500 rounded-full px-2 py-0.5">
                            {cartCount}
                        </span> 
                    )
                }
                </Link>

                {
                    !userId?(
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </>
                    ) : (
                        <button onClick={logout} className="nav-link">Logout</button>
                    )
                }
            </div>
        </nav>
    );
}