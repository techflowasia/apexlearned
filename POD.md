# Build Manual

## Required
- Node v.20.19.3 > 
- PNPM v.11.10.x >

## Checking tools version for build
```bash
nvm use #v20.19.3
corepack enable
```

## Data is ready?
```sh
docker compose -f docker-compose.yaml up -d postgres redis
```

## Running
### Generate CSS
```sh
pnpm --filter @cio/ui dev
```

### Service are running?
```sh
nvm use
pnpm api:dev
```

### Reset data
```sh
pnpm --filter @cio/db db:setup:seed
```

### Frontend are running?
```sh
nvm use
pnpm dashboard:dev
```

## Build

### Testing
```sh
pnpm install
pnpm dev | pnpm docs:dev
pnpm build  # or use "pnpm build --filter=\!@cio/storybook" to skip building storybook
```

### API Image
```bash
docker buildx build -f docker/Dockerfile.api --platform linux/arm64,linux/amd64 -t ghcr.io/techflowasia/apexlearned-api:1.0.0 --push .
```

### Dashboard Image
```bash
docker buildx build -f docker/Dockerfile.dashboard --platform linux/arm64,linux/amd64 -t ghcr.io/techflowasia/apexlearned-dashboard:1.0.0 --push .
```

### Jobs Image
```bash
docker buildx build -f docker/Dockerfile.jobs --platform linux/arm64,linux/amd64 -t ghcr.io/techflowasia/apexlearned-jobs:1.0.0 --push .
```

## Running
```sh
docker compose -f docker-compose.apexlearned.yaml up -d
docker compose -f docker-compose.apexlearned.yaml --profile minio up -d
```