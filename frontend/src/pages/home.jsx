import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const response = await api.get(
        `/products?search=${search}&category=${category}`,
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    console.log("userId:", userId);
    console.log("productId:", productId);

    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await api.post(`/cart/add`, { userId, productId });
      const total = response.data.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

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
        {products.map((product) => (
            <div key={product._id} className="border p-4 rounded">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4"
                />
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                <button
                  onClick={() => addToCart(product._id)}
                  className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
            </div>
        ))
        }
      </div>
    </div>
  );
}
