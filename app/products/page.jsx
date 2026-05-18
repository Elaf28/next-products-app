'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const result = await res.json();

                if (res.ok) {
                    setProducts(result.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="text-center p-10 font-semibold text-gray-600">
                Loading Products...
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Our Products
            </h1>

            {products.length === 0 ? (
                <div className="text-center text-gray-500 my-10">
                    No products found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />

                            <span className="text-xs text-gray-500 uppercase font-semibold">
                                {product.category}
                            </span>

                            <h2 className="text-xl font-bold my-2 text-gray-900">
                                {product.title}
                            </h2>

                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                {product.description}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-blue-600">
                                    ${product.price}
                                </span>

                                <Link
                                    href={`/products/${product._id}`}
                                    className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}