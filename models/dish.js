// const {v4: uuidv4} = require('uuid')
// const fs = require('fs')
// const path = require('path')
//
// class Dish {
//     constructor(title, price, img) {
//         this.title = title
//         this.price = price
//         this.img = img
//         this.id = uuidv4()
//     }
//
//     toJSON() {
//         return {
//             title: this.title,
//             price: this.price,
//             img: this.img,
//             id: this.id
//         }
//     }
//
//     static async update(dish) {
//         const dishes = await Dish.getAll()
//
//         const idx = dishes.findIndex(d => d.id === dish.id)
//         dishes[idx] = dish
//
//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'dishes.json'),
//                 JSON.stringify(dishes),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve()
//                     }
//                 }
//             )
//         })
//     }
//
//     async save() {
//         const dishes = await Dish.getAll()
//         dishes.push(this.toJSON())
//
//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'dishes.json'),
//                 JSON.stringify(dishes),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve()
//                     }
//                 }
//             )
//         })
//     }
//
//     static getAll() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(
//                 path.join(__dirname, '..', 'data', 'dishes.json'),
//                 'utf-8',
//                 (err, content) => {
//                     if (err) {
//                         reject(err)
//                     } else if (content) {
//                         resolve(JSON.parse(content))
//                     } else {
//                         resolve([])
//                     }
//                 }
//             )
//         })
//     }
//
//     static async getById(id) {
//         const dishes = await Dish.getAll()
//         return dishes.find(d => d.id === id)
//     }
// }
//
// module.exports = Dish


const {Schema, model} = require('mongoose')

const dish = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String
})

module.exports = model('Dish', dish)