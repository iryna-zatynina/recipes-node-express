const {Router} = require('express')
const Dish = require('../models/dish')
const router = Router()

router.post('/add', async (req, res) => {
    const dish = await Dish.findById(req.body.id)
    await req.user.addToCart(dish)
    res.redirect('/cart')
})

router.get('/', async (req, res) => {
    // const cart = await Cart.fetch()
    // res.render('cart', {
    //     title: "Cart",
    //     isCart: true,
    //     dishes: cart.dishes,
    //     price: cart.price
    // })
    res.json({test:true})
})

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.remove(req.params.id)
    res.status(200).json(cart)
})

module.exports = router