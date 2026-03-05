const express = require('express')
const auth = require('../middleware/auth.middleware')

const transactionController = require('../controllers/transaction.controller')
const router = express.Router()
router.use(auth)

//continuar rotas de trnasactions