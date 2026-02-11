const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

//checando saude
app.get('/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date()})
})

app.get('/', (req, res) => {
    res.send('API finance funcionando')
})

const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')

app.use('/users', userRoutes)
app.use('/auth', authRoutes)



module.exports = app
