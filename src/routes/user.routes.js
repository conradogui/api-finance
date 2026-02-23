// Importa o framework Express para criar rotas HTTP
const express = require('express')
// Importa o controller de usuário com handlers de criação, etc.
const userController = require('../controllers/user.controller')

// Cria uma instância de Router para agrupar rotas de usuários
const router = express.Router()

// Rota de criação de usuário (POST /users)
// Valida entrada no controller e delega para o serviço criar o usuário
router.get('/', userController.index)
router.post('/', userController.create)

// Exporta o router para ser montado em app.js sob o caminho /users
module.exports = router
