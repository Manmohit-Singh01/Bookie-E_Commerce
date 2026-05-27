import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Cart() {
    const userId = localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);

    //Load cart items
    const loadCartItems = async () => {
        if (!userId) return setCartItems([]);
        try {
            const response = await api.get(`/cart/${userId}`);
            setCartItems(response.data.items);
        }
        catch (err) {
            console.error(err);
            setCartItems([]);
        } 
    };

    useEffect(() => {
        loadCartItems();
    }, [userId]);


    const removeFromCart = async (productId) => {
        try {
            await api.post(`/cart/${userId}/item/${productId}`);
            loadCartItems();
            window.dispatchEvent(new Event('cartUpdated'));
        }
        catch (err) {
            console.error(err);
        }
    };

    
    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) 
            await removeFromCart(productId);
            return;
        try {
            await api.post('/cart/update', { userId, productId, quantity });
            loadCartItems();
            window.dispatchEvent(new Event('cartUpdated'));
        }
        catch (err) {
            console.error(err);
        }
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {
                cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {
                            cartItems.map(item => (
                                <div 
                                    key={item.product._id} 
                                    className="border p-4 rounded"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-200 flex-shrink-0">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold">
                                                {item.product.title}
                                            </h2>

                                            <p className="text-gray-600">
                                                ${item.product.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 mt-3">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product._id,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="px-2 py-1 bg-gray-300 rounded"
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product._id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="px-2 py-1 bg-gray-300 rounded"
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.product._id)
                                            }
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="text-right font-bold">
                            Total: ${totalPrice.toFixed(2)}
                        </div>
                    </div>
                )
            }
        </div>
    )
}