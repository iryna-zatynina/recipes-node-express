// const {Router} = require('express')
// const Dish = require('../models/dish')
// const router = Router()
//
// router.get('/', (req, res) => {
//     res.render('add', {
//         title: "Add",
//         isAdd: true
//     })
// })
//
// router.post('/', async (req, res) => {
//     const dish = new Dish(req.body.title, req.body.price, req.body.img)
//     await dish.save()
//     res.redirect('/dishes')
// })
//
// module.exports = router

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
    const dish = new Dish({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    })

    try {
        await dish.save()
        res.redirect('/dishes')
    } catch (e) {
        console.log(e)
    }

})

module.exports = router