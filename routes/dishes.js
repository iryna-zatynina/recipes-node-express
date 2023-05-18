// const {Router} = require('express')
// const Dish = require('../models/dish')
// const router = Router()
//
// router.get('/', async (req, res) => {
//     const dishes = await Dish.getAll()
//     res.render('dishes', {
//         title: "Dishes",
//         isDishes: true,
//         dishes
//     })
// })
//
// router.get('/:id/edit', async (req, res) => {
//     if (!req.query.allow) {
//         return res.redirect('/')
//     }
//     const dish = await Dish.getById(req.params.id)
//     res.render('edit', {
//         title: `Edit ${dish.title}`,
//         dish
//     })
// })
//
// router.post('/edit', async (req, res) => {
//     await Dish.update(req.body)
//     res.redirect('/dishes')
// })
//
// router.get('/:id', async (req, res) => {
//     const dish = await Dish.getById(req.params.id)
//     res.render('dish', {
//         layout: 'empty',
//         title: dish.title,
//         dish
//     })
// })
// module.exports = router

const {Router} = require('express')
const Dish = require('../models/dish')
const router = Router()

router.get('/', async (req, res) => {
    const dishes = await Dish.find()
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
    const dish = await Dish.findById(req.params.id)
    res.render('edit', {
        title: `Edit ${dish.title}`,
        dish
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Dish.findByIdAndUpdate(id, req.body)
    res.redirect('/dishes')
})

router.get('/:id', async (req, res) => {
    const dish = await Dish.findById(req.params.id)
    res.render('dish', {
        layout: 'empty',
        title: dish.title,
        dish
    })
})

router.post('/remove', async (req, res) => {
    try {
        await Dish.deleteOne({
            _id: req.body.id
        })
        res.redirect('/dishes')
    } catch (e) {
        console.log(e)
    }

})
module.exports = router