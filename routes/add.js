const {Router} = require('express')
const Dish = require('../models/dish')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: "Add",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const recipe = new Dish(req.body.title, req.body.price, req.body.img)
    await recipe.save()
    res.redirect('/dishes')
})

module.exports = router