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
}

module.exports = new UserController()