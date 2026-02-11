Esta pasta contém o código da aplicação (Express) e suas camadas.

Responsabilidades
- Implementar a API HTTP: rotas, controllers, serviços e integração com banco via Prisma.
- Orquestrar middlewares (auth, validação, erro, logging) e bootstrap do servidor.
- Centralizar lógica de negócio e regras de validação com Zod.

Conteúdo típico
- server.js: inicialização do servidor (porta, escuta, encerramento gracioso).
- app.js: configuração do Express (middlewares, rotas, tratamento de erros).
- routes/: definição de endpoints e parâmetros (pode ser modular por domínio).
- controllers/: entrada HTTP; tradução de requests em chamadas de serviço.
- services/: regras de negócio, orquestração de fluxo e validações.
- repositories/: acesso ao banco usando Prisma (consultas e agregações).
- lib/: utilitários/infra (ex.: instância única do PrismaClient, logger, CSV).
- middlewares/: autenticação JWT, validação Zod, rate limiting, etc.

Boas práticas
- Manter separação clara de responsabilidades entre camadas.
- Validar inputs/outputs com Zod em todas as rotas.
- Evitar N+1 e otimizar consultas com índices e agregações (groupBy).
