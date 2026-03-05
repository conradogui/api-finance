const userService = require('../services/user.services')
const {createUserSchema} = require('../schema/user.schema')

class UserController {
    async create(req, res) {
        try {
            const data = createUserSchema.parse(req.body)
            const user = await userService.createUser(data)
            res.status(201).json(user)
        } catch (err) {
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

module.exports = new UserController()
