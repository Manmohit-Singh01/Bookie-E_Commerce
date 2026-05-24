import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully!");
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Product List
          </h1>

          <Link
            to="/admin/products/add"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 text-center"
          >
            + Add New Product
          </Link>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              
              {/* Table Head */}
              <thead className="bg-gray-800 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-center">Title</th>
                  <th className="px-6 py-4 text-center">Price</th>
                  <th className="px-6 py-4 text-center">Category</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4 text-center font-medium text-gray-800">
                        {product.title}
                      </td>

                      <td className="px-6 py-4 text-center text-green-600 font-semibold">
                        ${product.price.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-center text-gray-600">
                        {product.category}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow transition duration-300"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow transition duration-300"
                          >
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}