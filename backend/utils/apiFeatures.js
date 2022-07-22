const { remove } = require("../models/product");

class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' // Case insensitive option
            }
        } : {}

        console.log(keyword)

        this.query = this.query.find({ ...keyword })
        return this; 
    }

    filter () {
        const queryCopy = {...this.queryStr};

        console.log(queryCopy)

        // Remove the fields from the query string
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advanced filtering
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports = APIFeatures; 