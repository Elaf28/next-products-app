import mongoose, { models, Schema } from 'mongoose';

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a product title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a product description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a product price'],
            min: [0, 'Price cannot be negative'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Please provide a product image URL'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a product category'],
        },
        countInStock: {
            type: Number,
            required: [true, 'Please provide stock count'],
            default: 0,
        },
    },
    { timestamps: true } 
);

const Product = models.Product || mongoose.model('Product', productSchema);

export default Product;