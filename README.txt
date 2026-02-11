Este diretório é a raiz do projeto API de Controle Financeiro Pessoal.

Responsabilidades
- Concentrar arquivos e configurações globais do projeto (package.json, lockfiles, .gitignore, configs gerais).
- Definir e versionar dependências e scripts de execução, desenvolvimento e manutenção.
- Centralizar configurações de ambiente (variáveis via .env) sem expor segredos no repositório.
- Ser o ponto de entrada para ferramentas de CLI (Prisma, Jest, etc.) e documentação geral.

Conteúdo típico
- package.json: dependências, scripts, metadados do projeto.
- package-lock.json: integridade das versões instaladas.
- .gitignore: regras para evitar versionar arquivos gerados/sensíveis.
- prisma.config.ts: ajustes do Prisma (schema, migrations, datasource).
- .env (não versionado): credenciais e URLs de serviços (ex.: DATABASE_URL).

Como se relaciona com outras pastas
- prisma/: modelagem do banco, migrações e geração de client.
- src/: código da aplicação (Express), rotas, controllers, services, repositories e libs.
- .vscode/: configurações locais do editor para padronizar experiência de desenvolvimento.

Boas práticas
- Manter scripts do package.json atualizados (lint, typecheck, build, test).
- Não commitar segredos; usar variáveis de ambiente e provedores seguros.
- Documentar convenções de projeto e decisões arquiteturais nesta raiz quando necessário.
