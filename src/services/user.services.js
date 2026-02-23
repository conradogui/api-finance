// Instância Prisma para executar operações no banco de dados
const prisma = require('../lib/prisma');
// Repositório de usuários com consultas específicas (findByEmail, create)
const userrepository = require('../repositories/user.repository')
// Biblioteca de hash de senhas (gera e verifica hashes)
const bcrypt = require('bcrypt')

class UserService {
    // Cria um novo usuário após validar unicidade de email e gerar hash
    async createUser(data) {
        // Verifica se já existe usuário cadastrado com o mesmo email
        const userExists = await userrepository.findByEmail(data.email)

        // Se existir, retorna erro de negócio
        if(userExists) {
            throw new Error("Usuário já existe");
        }

        // Gera hash da senha com custo 10 (trade-off entre segurança e desempenho)
        const hashedPassword = await bcrypt.hash(data.password, 10)

        // Cria o registro do usuário no banco e retorna apenas campos públicos
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
        
        // Retorna os dados do usuário recém-criado
        return user
    }
    async listUsers() {
        const users = await userrepository.findAll()
        return users
    }
}

// Exporta uma instância do serviço para uso pelos controllers
module.exports = new UserService()
