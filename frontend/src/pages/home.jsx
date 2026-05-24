import {useEffect, useState} from 'react';
import api from '../api/axios';
import {Link} from 'react-router';


export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const loadProducts = async () => {
        try {
            const response = await api.get(`/products?search=${search}&category=${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    return (
        <div className="p-6">

            {/* Search */}
            <div className="mb-4">
                <input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 w-full"
                />

                {/* Category Filter */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 w-full mt-4"
                >
                    <option value="">All Categories</option>
                    <option value="fiction">fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                </select>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="border p-4 rounded hover:shadow-lg transition"
                    >
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-48 object-cover mb-4" 
                        />
                        <h2 className="text-lg font-bold">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    ); 
}