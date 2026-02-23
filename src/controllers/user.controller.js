// Importa o serviço de usuários que contém regras de negócio (criação, etc.)
const userService = require('../services/user.services')
// Importa o schema Zod para validar os dados de criação de usuário
const {createUserSchema} = require('../schema/user.schema')

// Controller organiza entrada/saída HTTP e delega ao serviço
class UserController {
    // Handler da rota POST /users
    async create(req, res) {
        try {
            // Valida req.body com Zod (name, email, password)
            const data = createUserSchema.parse(req.body)
            // Chama o serviço para criar o usuário no banco (hash, select)
            const user = await userService.createUser(data)
            // Retorna sucesso com dados públicos (sem senha)
            res.status(201).json(user)
        } catch (err) {
            // Erros de validação/negócio retornam 400 com mensagem
            res.status(400).json({error: err.message})
        }
    }
    async index(req, res) {
        try {
            const users = await userService.listUsers()
            res.json(users)
        } catch (err) {
            res.status(500).json({ error: 'Erro ao listar usuários'})
        }
    }
}

// Exporta uma instância do controller para uso nas rotas
module.exports = new UserController()
