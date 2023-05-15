const {Router} = require('express')
const Dish = require('../models/dish')
const router = Router()

router.get('/', async (req, res) => {
    const dishes = await Dish.getAll()
    res.render('dishes', {
        title: "Dishes",
        isDishes: true,
        dishes
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const dish = await Dish.getById(req.params.id)
    res.render('edit', {
        title: `Edit ${dish.title}`,
        dish
    })
})

router.post('/edit', async (req, res) => {
    await Dish.update(req.body)
    res.redirect('/dishes')
})

router.get('/:id', async (req, res) => {
    const dish = await Dish.getById(req.params.id)
    res.render('dish', {
        layout: 'empty',
        title: dish.title,
        dish
    })
})
module.exports = router