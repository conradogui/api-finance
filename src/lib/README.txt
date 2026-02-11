Esta pasta reúne utilitários de infraestrutura e integração usados pela aplicação.

Responsabilidades
- Expor instâncias e helpers compartilhados (ex.: PrismaClient, logger, CSV).
- Oferecer componentes reutilizáveis com baixo acoplamento às camadas de negócio.

Conteúdo típico
- prisma.js: criação e exportação de uma instância única do PrismaClient.
- logger.js (opcional): configuração de logs padronizados.
- csv.js (opcional): utilitário para exportação/streaming em CSV.

Boas práticas
- Evitar lógica de domínio: focar em infraestrutura e utilidades.
- Gerenciar ciclo de vida de clientes (ex.: conexão/encerramento) de forma segura.
- Isolar dependências externas para facilitar testes e manutenção.
