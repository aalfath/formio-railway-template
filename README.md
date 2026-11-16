[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/formio-1?utm_medium=integration&utm_source=button&utm_campaign=formio)

# Form.io on Railway

One-click Railway template for [Form.io Community Edition](https://github.com/formio/formio), the open-source form and API platform: build forms with a drag-and-drop builder, and every form becomes a REST API that stores its submissions in MongoDB.

## What it deploys

| Service | Source | Notes |
|---|---|---|
| `Form.io` | this repo (`Dockerfile`) | `formio/formio:4.11.1` pinned by digest, plus a small start script. Serves the admin portal and the API on Railway's `PORT`, health check `/` (the server listens only after MongoDB is connected) |
| `MongoDB` | Railway's MongoDB | All forms, submissions, users and settings, on a volume |

## Variables

| Variable | Default | What it is |
|---|---|---|
| `ROOT_EMAIL` | *(you enter it)* | Email of the first admin account, created on first boot |
| `ROOT_PASSWORD` | `${{secret(24)}}` | Password of that admin account. Read it in the service's Variables tab. Only used on first boot: change it later in the portal |
| `JWT_SECRET` | `${{secret(48)}}` | Signs login tokens |
| `DB_SECRET` | `${{secret(48)}}` | Encrypts project settings in MongoDB. Don't change it after the first boot |
| `MONGO_URL` | `${{MongoDB.MONGO_URL}}` | Private connection string; the start script adds the `formio` database and `authSource=admin` |
| `PORT` | `3001` | Port the server listens on |

Optional, read by the start script: `FORMIO_DB_NAME` (default `formio`), `JWT_EXPIRE_MINUTES` (default `240`), `FORMIO_PUBLIC_DOMAIN` (defaults to the Railway domain).

## How it works

`railway-start.sh` checks the required variables, `railway-config.js` turns them into the `NODE_CONFIG` JSON that Form.io reads, and the official entrypoint (`node main`) starts. On an empty database Form.io imports its default project and creates the admin account from `ROOT_EMAIL` and `ROOT_PASSWORD`.

## Updates

Each change to this repo's `main` branch (for example a new Form.io version) shows up as an "update available" notice in the Railway projects deployed from this template. Read [CHANGELOG.md](CHANGELOG.md) before you apply one. Form.io migrates its MongoDB schema on start, so take a backup of the MongoDB volume before a major upgrade.

## License

Form.io Community Edition is under the [OSL-3.0](https://github.com/formio/formio/blob/main/LICENSE.txt) license.
