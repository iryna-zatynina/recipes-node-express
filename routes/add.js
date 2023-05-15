const {Router} = require('express')
const Recipe = require('../models/recipe')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: "Add",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const recipe = new Recipe(req.body.title, req.body.price, req.body.img)
    await recipe.save()
    res.redirect('/recipes')
})

module.exports = router