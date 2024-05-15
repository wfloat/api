# API

## Temporary fix

### Starting

```bash
# Change directories into the api folder. Example:
cd ~/dev/wfloat/api

# Start the Postgres database and PGAdmin
docker compose up

# Open http://localhost:5050 in the web browser to view PGAdmin

# Start the API
npm run start

# Open http://localhost:4000 in the web browser to view the Apollo GraphQL server
```

### Debugging

```bash
# Run this instead of npm run start:
npm run build

# Press the "Run and debug" tab in VSCode on the left nav bar
# Press the green play button
# Place breakpoints as needed
```

## Getting started

```bash
cp .env.example .env
docker compose up
```

### Usage

#### Launch

```bash
npm run start
```

#### Debug

```bash
npm run build
```

In vscode select the run and debug tab. Launch index.ts.

#### Code generation

```bash
npm run codegen
```

#### Backup database

```bash
# Backup
pg_dump -U postgres -h localhost -p 5432 wfloat-local | gzip > "wfloat-local_$(date '+%Y-%m-%d_%H-%M-%S').sql.gz"

# Restore
# copy the database backup into the dump folder, run the command in the docker container

gunzip -c wfloat-local_YYYY-MM-DD_HH-MM-SS.sql.gz | psql -U postgres -h localhost -p 5432 wfloat-local
```

### TODO

- Add global totalCount field to connections: https://pothos-graphql.dev/docs/plugins/prisma#total-count-on-shared-connection-objects
- Fix Docker configuration for Node
