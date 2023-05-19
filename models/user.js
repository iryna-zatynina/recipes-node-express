const {Schema, model} = require('mongoose')

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                dishId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Dish',
                    required: true
                }
            }
        ]
    }
})

module.exports = model('User', user)