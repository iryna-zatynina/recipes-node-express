// const path = require('path')
// const fs = require('fs')
//
// // const p = path.join(
// //     path.dirname(process.mainModule.filename),
// //     "data",
// //     "cart.json"
// // )
// // const p = path.join(require.main.path,'data','cart.json');
//
// class Cart {
//     static async add(dish) {
//         const card = await Cart.fetch()
//
//         const idx = card.dishes.findIndex(c => c.id === dish.id)
//         const candidate = card.dishes[idx]
//
//         if (candidate) {
//             candidate.count++
//             card.dishes[idx] = candidate
//         } else {
//             dish.count = 1
//             card.dishes.push(dish)
//         }
//
//         card.price += +dish.price
//
//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'cart.json'),
//                 JSON.stringify(card),
//                 err => {
//                     if (err) {
//                         reject(err)
//                     }  else {
//                         resolve()
//                     }
//             })
//         })
//     }
//     static async fetch() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(
//                 path.join(__dirname, '..', 'data', 'cart.json'),
//                 'utf-8',
//                 (err, content) => {
//                     if (err) {
//                         reject(err)
//                     }  else {
//                         resolve(JSON.parse(content))
//                     }
//             })
//         })
//     }
// }
//
// module.exports = Cart

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
            // курс уже есть
            candidate.count++
            cart.dishes[idx] = candidate
        } else {
            // нужно добавить курс
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
}

module.exports = Cart