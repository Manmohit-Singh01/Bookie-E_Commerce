import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function AddProduct() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: null,
        stock: ""
    });

    const navigate  = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setForm({
            ...form,
            image: e.target.files[0],
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            await api.post("/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Product added successfully!");

            setForm({
                title: "",
                description: "",
                price: "",
                category: "",
                image: null,
                stock: ""
            });

            navigate("/admin/products");

        } catch (error) {
            console.error(
                "Error adding product:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8">
                
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Add New Product
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Fill in the product details below
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Product Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter product title"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Enter product description"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        />
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="Available stock"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Product Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white cursor-pointer"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}