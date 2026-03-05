const express = require('express')
const auth = require('../middleware/auth.middleware')

const categoryController = require('../controllers/category.controller')

const router = express.Router()
router.use(auth)

router.get('/categories', categoryController.index) //lista todas as categorias

router.post('/', categoryController.create) //cria uma categoria

router.put('/:id', categoryController.update) //atualiza uma categoria específica

router.delete('/:id', categoryController.destroy) //deleta uma categoria

module.exports = router