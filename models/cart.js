const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
    static async add(dish) {
        const cart = await Cart.fetch()

        const idx = cart.dishes.findIndex(c => c.id === dish.id)
        const candidate = cart.dishes[idx]

        if (candidate) {
            candidate.count++
            cart.dishes[idx] = candidate
        } else {
            dish.count = 1
            cart.dishes.push(dish)
        }

        cart.price += +dish.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }

    static async remove(id) {
        const cart = await Cart.fetch()

        const idx = cart.dishes.findIndex(c => c.id === id)
        const dish = cart.dishes[idx]

        if (dish.count === 1) {
            cart.dishes = cart.dishes.filter(d => d.id !== id)
        } else {
            cart.dishes[idx].count--
        }

        cart.price -= dish.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(cart)
                }
            })
        })
    }
}

module.exports = Cart