Esta migração específica (init) representa o estado inicial do schema.

Responsabilidades
- Introduzir as primeiras tabelas e relações (ex.: User, Category, Transaction).
- Garantir que um novo ambiente possa iniciar o banco com estrutura mínima funcional.

Conteúdo típico
- migration.sql: comandos DDL para criar tabelas, chaves e índices definidos no schema.
- migration_lock.toml (em nível superior): bloqueio de sequência e integridade das migrações.

Uso e considerações
- Aplicada automaticamente durante npx prisma migrate dev em ambientes novos.
- Serve de base para todas as migrações subsequentes; não deve ser alterada manualmente.
- Caso haja divergências, gere novas migrações ao invés de editar esta migração inicial.
