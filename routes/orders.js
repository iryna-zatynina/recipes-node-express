const {Router} = require('express')
const order = require('../models/order')
const router = Router()

router.get('/', async (req, res) => {
    res.render('orders', {
        title: "Orders",
        isOrder: true
    })
})

router.get('/', async (req, res) => {
    res.redirect('/orders')
})

module.exports = router