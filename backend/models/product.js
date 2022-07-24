const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        maxlength: [5, 'Product price cannot be more than 5 digits'],
        default: 0.00
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        maxlength: [500, 'Product description cannot be more than 500 characters']
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: [
            'Electronics',
            'Clothing',
            'Books',
            'Movies',
            'Toys',
            'Sports',
            'Other'
        ],
        message: 'Product category must be one of the following: Electronics, Clothing, Books, Movies, Toys, Sports, Other'
    },
    seller: {
        type: String,
        required: [true, 'Product seller is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', productSchema)