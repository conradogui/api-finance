# API Finance

API REST para controle de finanças pessoais - cadastro de usuários, autenticação e gerenciamento de categorias e transações (receitas e despesas).

## Stack

- Node.js + Express 5
- PostgreSQL via Prisma ORM
- Zod para validação de entrada
- JWT (jsonwebtoken) para autenticação
- bcrypt para hash de senha
- Jest + Supertest para testes

## Arquitetura

O projeto segue uma separação em camadas:

```
route → controller → service → repository → Prisma/DB
```

- routes - definição dos endpoints e middlewares aplicados
- controllers - recebem a requisição, validam o corpo com Zod e devolvem a resposta HTTP
- services - regras de negócio
- repositories - acesso a dados, sempre filtrando por `userId` para isolar os dados de cada usuário

```
src/
├── app.js                # configuração do Express (cors, json, rotas)
├── server.js              # inicialização do servidor
├── routes/                # definição das rotas
├── controllers/           # camada HTTP
├── services/               # regras de negócio
├── repositories/           # acesso ao banco (Prisma)
├── schema/                 # validação Zod
├── middleware/
│   └── auth.middleware.js  # valida o JWT e injeta req.user
└── lib/
    └── prisma.js            # client do Prisma

prisma/
└── schema.prisma           # modelos User, Category, Transaction
```

## Modelo de dados

- **User**: `id`, `name`, `email` (único), `password` (hash)
- **Category**: `id`, `name`, vinculada a um `User`; nome único por usuário
- **Transaction**: `id`, `title`, `amount` (decimal), `type` (`INCOME` ou `EXPENSE`), `date`, vinculada a um `User` e opcionalmente a uma `Category`

## Autenticação

1. `POST /users` cria uma conta (senha é hasheada com bcrypt antes de salvar).
2. `POST /auth/login` valida email/senha e retorna um token JWT (válido por 1 dia).
3. Nas rotas protegidas, envie o token no header:

```
Authorization: Bearer <token>
```

O middleware decodifica o token e injeta `req.user.id`, usado para isolar os dados de cada usuário.

## Endpoints

### Usuários

| Método | Rota     | Autenticação | Descrição       |
| ------ | -------- | ------------ | --------------- |
| POST   | `/users` | Não          | Cria um usuário |
| GET    | `/users` | Não          | Lista usuários  |

### Autenticação

| Método | Rota          | Autenticação | Descrição                                |
| ------ | ------------- | ------------ | ---------------------------------------- |
| POST   | `/auth/login` | Não          | Login (email + senha), retorna token JWT |

### Categorias

| Método | Rota                     | Autenticação | Descrição                   |
| ------ | ------------------------ | ------------ | --------------------------- |
| GET    | `/categories/categories` | Sim          | Lista categorias do usuário |
| POST   | `/categories`            | Sim          | Cria categoria              |
| PUT    | `/categories/:id`        | Sim          | Renomeia categoria          |
| DELETE | `/categories/:id`        | Sim          | Remove categoria            |

### Transações

| Método | Rota                | Autenticação | Descrição                   |
| ------ | ------------------- | ------------ | --------------------------- |
| GET    | `/transactions`     | Sim          | Lista transações do usuário |
| POST   | `/transactions`     | Sim          | Cria transação              |
| PUT    | `/transactions/:id` | Sim          | Atualiza transação          |
| DELETE | `/transactions/:id` | Sim          | Remove transação            |

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
DATABASE_URL="postgresql://usuario:senha@host:5432/banco"
JWT_SECRET="uma-chave-secreta-forte"
PORT=3000
```

## Como rodar

```bash
npm install
npx prisma migrate deploy
npm run dev
```

- `npm run dev` — inicia com `nodemon` (recarrega automaticamente)
- `npm start` — inicia em modo normal

## Testes

```bash
npx jest
```

## Health check

```
GET /health
```

Retorna `{ status: 'working', timestamp: <data> }`.
