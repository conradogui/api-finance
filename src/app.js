// Importa o framework Express para criar a API HTTP
const express = require('express')
// Cria a instância principal da aplicação Express
const app = express()
// Importa o CORS para permitir requisições de outros domínios
const cors = require('cors')

// Habilita CORS (libera acesso entre origens diferentes)
app.use(cors())
// Habilita parsing de JSON no corpo das requisições
app.use(express.json())

// Rota de saúde para verificação rápida do status da API
app.get('/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date()})
})

// Rota raiz simples para confirmar funcionamento
app.get('/', (req, res) => {
    res.send('API finance funcionando')
})

// Importa e monta rotas de usuários
const userRoutes = require('./routes/user.routes')
// Importa e monta rotas de autenticação
const authRoutes = require('./routes/auth.routes')

// Todas as rotas de usuário ficam sob /users
app.use('/users', userRoutes)
// Todas as rotas de autenticação ficam sob /auth
app.use('/auth', authRoutes)
// Exporta a aplicação para ser utilizada pelo servidor (server.js)
module.exports = app
