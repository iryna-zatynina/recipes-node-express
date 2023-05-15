const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

class Recipe {
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
        const recipes = await Recipe.getAll()
        recipes.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'recipes.json'),
                JSON.stringify(recipes),
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
                path.join(__dirname, '..', 'data', 'recipes.json'),
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
}

module.exports = Recipe