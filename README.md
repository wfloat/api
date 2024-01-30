# API

## Getting started

```bash
cp .env.example .env
docker compose up
```

### Usage

#### Code generation

```bash
npm run codegen
```

#### Backup database

```bash
# Backup
pg_dump -U postgres -h localhost -p 5432 wfloat-local | gzip > "wfloat-local_$(date '+%Y-%m-%d_%H-%M-%S').sql.gz"

# Restore
gunzip -c wfloat-local_YYYY-MM-DD_HH-MM-SS.sql.gz | psql -U postgres -h localhost -p 5432 wfloat-local
```

### TODO

- Add global totalCount field to connections: https://pothos-graphql.dev/docs/plugins/prisma#total-count-on-shared-connection-objects
- Fix Docker configuration for Node
