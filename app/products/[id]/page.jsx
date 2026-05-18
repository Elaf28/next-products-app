'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function ProductDetailsPage({ params }) {
    const { id: productId } = use(params);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (!productId) return;

        const fetchProductDetails = async () => {
            try {
                const res = await fetch(`/api/products/${productId}`);
                const result = await res.json();

                if (res.ok) {
                    setProduct(result.data);
                } else {
                    router.push('/products');
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) {
        return (
            <div className="text-center p-10">
                Loading Product Details...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center p-10">
                Product not found
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Image */}
                <div>
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full rounded-lg shadow-lg object-cover"
                    />
                </div>

                {/* Details */}
                <div>
                    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                        {product.category}
                    </span>

                    <h1 className="text-3xl font-bold my-4">
                        {product.title}
                    </h1>

                    <p className="text-2xl font-semibold text-blue-600 mb-4">
                        ${product.price}
                    </p>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mb-6">
                        <span className="text-sm font-medium text-gray-500">
                            Availability:{' '}
                        </span>

                        <span
                            className={`text-sm font-bold ${
                                product.countInStock > 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {product.countInStock > 0
                                ? `${product.countInStock} In Stock`
                                : 'Out of Stock'}
                        </span>
                    </div>

                    <button
                        disabled={product.countInStock === 0}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
                        {product.countInStock > 0
                            ? 'Add to Cart'
                            : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
}