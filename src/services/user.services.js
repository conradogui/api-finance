const prisma = require('../lib/prisma');
const userrepository = require('../repositories/user.repository')
const bcrypt = require('bcrypt')

class UserService {
    async createUser(data) {
        const userExists = await userrepository.findByEmail(data.email)

        if(userExists) {
            throw new Error("Usuário já existe");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        
        return user
    }
}

module.exports = new UserService()