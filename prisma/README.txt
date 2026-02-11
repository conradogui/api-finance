Esta pasta concentra tudo relacionado ao Prisma (ORM) e à modelagem de dados.

Responsabilidades
- Definir o schema do banco de dados (entidades, relações, índices, enums).
- Gerenciar migrações versionadas que evoluem o schema ao longo do tempo.
- Integrar com o client do Prisma utilizado pela aplicação (src/).

Conteúdo típico
- schema.prisma: modelo das tabelas, relações e datasource (DATABASE_URL).
- migrations/: diretório com migrações geradas pelo Prisma (historicamente ordenadas).

Fluxo de trabalho
- Editar schema.prisma ao introduzir mudanças de domínio (ex.: novas colunas, índices).
- Gerar e aplicar migrações (npx prisma migrate dev) para sincronizar banco e código.
- Opcionalmente criar seeds para dados fixos (ex.: categorias padrão).

Boas práticas
- Usar tipos apropriados para dinheiro (Decimal) e criar índices para performance.
- Manter nomes e relações consistentes com as camadas de serviço/repositorio.
- Validar schema regularmente (npx prisma validate) e acompanhar status de migrações.

Anotações:
- Básicamente onde crio os componentes do banco de dados e entidades a qual irei criar relacionamentos
