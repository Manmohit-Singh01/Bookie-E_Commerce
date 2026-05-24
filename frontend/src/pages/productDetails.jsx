import {useEffect, useState} from 'react';
import api from '../api/axios';
import {useParams} from 'react-router';

export default function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    const loadProduct = async () => {
        try {
            const response = await api.get(`/products/`);
            const foundProduct = response.data.find(item => item._id === id);
            setProduct(foundProduct);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    useEffect(() => {
        loadProduct();
    }, [id]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="p-6">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover mb-4"
            />
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <p className="text-gray-700">{product.description}</p>
        </div>
    );
}