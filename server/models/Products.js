const {Schema, model} = require('mongoose');

const productsSchema = new Schema(
    {
       productName: {
            type: String,
            require: true,
       },
       productPrice: {
            type: Number,
            require: true,
       }
    },
    {
        id: false
    }
);

const Products = model('Products', productsSchema);

module.exports = Products;