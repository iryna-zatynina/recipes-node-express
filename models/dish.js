const {Schema, model} = require('mongoose')

const dishSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


dishSchema.method('toClient', function () {
    const dish = this.toObject()

    dish.id = dish._id
    delete dish._id

    return dish
})

module.exports = model('Dish', dishSchema)