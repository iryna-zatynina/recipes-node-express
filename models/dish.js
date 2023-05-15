const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

class Dish {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        const dishes = await Dish.getAll()
        dishes.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'dishes.json'),
                JSON.stringify(dishes),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'dishes.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else if (content) {
                        resolve(JSON.parse(content))
                    } else {
                        resolve([])
                    }
                }
            )
        })
    }

    static async getById(id) {
        const dishes = await Dish.getAll()
        return dishes.find(r => r.id === id)
    }
}

module.exports = Dish