// Importa o framework Express para criar rotas HTTP
const express = require('express')
// Importa o controller de autenticação que contém a lógica de login
const controller = require('../controllers/auth.controller')
// Cria uma instância de Router para agrupar rotas relacionadas a /auth
const router = express.Router()

// Rota simples de verificação para checar se o módulo de auth está montado
router.get('/', (req, res) => res.json({ ok: true }))
// Rota de login: recebe email e senha, valida e retorna token JWT
router.post('/login', controller.login)

// Exporta o router para ser montado em app.js sob o caminho /auth
module.exports = router
