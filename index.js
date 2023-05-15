const express = require('express')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const recipesRoutes = require('./routes/recipes')
const addRoutes = require('./routes/add')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'pages')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", homeRoutes)
app.use("/recipes", recipesRoutes)
app.use("/add", addRoutes)





const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})