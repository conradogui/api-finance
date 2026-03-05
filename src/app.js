const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({status: 'working', timestamp: new Date()})
})

app.get('/', (req, res) => {
    res.send('API finance funcionando')
})


const userRoutes = require('./routes/user.routes')

const authRoutes = require('./routes/auth.routes')

const categoriesRoutes = require('./routes/category.routes')


app.use('/users', userRoutes)

app.use('/auth', authRoutes)

app.use('/categories', categoriesRoutes)

module.exports = app
