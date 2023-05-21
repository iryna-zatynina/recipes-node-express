const express = require('express')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const dishesRoutes = require('./routes/dishes')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const path = require("path");
const mongoose = require('mongoose');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const handlebars = require('handlebars')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'pages')

app.use(async (req, res, next) => {
    try {
        req.user = await User.findById('6467473c26ef3e3f5056b7a9')
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", homeRoutes)
app.use("/dishes", dishesRoutes)
app.use("/add", addRoutes)
app.use("/cart", cartRoutes)

const PORT = process.env.PORT || 3000


async function start() {
    try {
        const url = "mongodb+srv://ira:cJKgZVrch0YWw1xq@cluster0.zlizxf3.mongodb.net/menu"
        await mongoose.connect(url, {useNewUrlParser: true});
        const candidate = await User.findOne()

        if (!candidate) {
            const user = new User({
                email: 'ira.zat1997@gmail.com',
                name: 'Iryna',
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


