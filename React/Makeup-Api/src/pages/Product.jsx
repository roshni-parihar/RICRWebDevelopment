import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://makeup-api.herokuapp.com/api/v1/products.json"
      );

      setProducts(res.data);

      toast.success("Products loaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 py-10 bg-gray-100">
      <h1 className="text-4xl text-center text-pink-800 mb-6">Our Products</h1>

      <div className="text-center mb-6">
        <button
          onClick={handleFetchProducts}
          className="px-6 py-3 bg-pink-900 text-white rounded-full hover:bg-pink-800"
        >
          Load Products
        </button>
      </div>

      {loading && <p className="text-center text-xl">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.slice(0, 40).map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-3xl shadow-lg hover:shadow-2xl"
          >
            <img
              src={item.image_link}
              alt={item.name}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />

            <h2 className="text-lg font-semibold">{item.name}</h2>

            <p className="text-sm text-gray-600 capitalize">
              Brand: {item.brand || "N/A"}
            </p>

            <p className="text-pink-950 font-bold mt-2">
              Price: {item.price_sign || "$"}
              {item.price || "N/A"}
            </p>

            <a
              href={item.product_link}
              target="_blank"
              rel="noreferrer"
              className="block mt-3 text-center bg-purple-900 text-white py-2 rounded-full hover:bg-pink-950"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
