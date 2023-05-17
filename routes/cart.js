const {Router} = require('express')
const Cart = require('../models/cart')
const Dish = require('../models/dish')
const router = Router()

router.post('/add', async (req, res) => {
    const dish = await Dish.getById(req.body.id)
    await Cart.add(dish)
    res.redirect('/cart')
})

router.get('/', async (req, res) => {
    const cart = await Cart.fetch()
    res.render('cart', {
        title: "Cart",
        isCart: true,
        dishes: cart.dishes,
        price: cart.price
    })
})

module.exports = router