const {Router} = require('express')
const Recipe = require('../models/dish')
const router = Router()

router.get('/', async (req, res) => {
    const dishes = await Recipe.getAll()
    res.render('dishes', {
        title: "Dishes",
        isDishes: true,
        dishes
    })
})

router.get('/:id', async (req, res) => {
    const dish = await Recipe.getById(req.params.id)
    res.render('dish', {
        layout: 'empty',
        title: dish.title,
        dish
    })
})
module.exports = router