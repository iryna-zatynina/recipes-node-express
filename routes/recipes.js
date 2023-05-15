const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('recipes', {
        title: "Recipes",
        isRecipes: true
    })
})
module.exports = router