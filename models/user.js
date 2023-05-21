const {Schema, model} = require('mongoose')

const userSchema = new Schema({
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

userSchema.methods.addToCart = function (dish) {
    const items = [...this.cart.items]
    const idx = items.findIndex(d => {
        return d.dishId.toString() === dish._id.toString()
    })
    if (idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            dishId: dish._id,
            count: 1
        })
    }
    this.cart = {items}
    return this.save()
}

userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items]
    const idx = items.findIndex(d => d.dishId.toString() === id.toString())

    if (items[idx].count === 1) {
        items = items.filter(d => d.dishId.toString() !== id.toString())
    } else {
        items[idx].count--
    }

    this.cart = {items}
    return this.save()
}

module.exports = model('User', userSchema)