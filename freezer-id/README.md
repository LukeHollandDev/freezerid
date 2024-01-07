# Freezer ID - NextJS codebase

## Requirements

Create a `.env` file with the following contents:

```env
# Prisma
DATABASE_URL="postgresql://freezer-id:password@db:5432/freezer-id?schema=public"
# NextAuth
NEXTAUTH_SECRET="********"
GOOGLE_CLIENT_ID="********"
GOOGLE_SECRET_ID="********"
```

If using the `docker/docker-compose.yml` to setup the database then leave the DATABASE_URL as is. With [Docker](https://www.docker.com/products/docker-desktop/) (Docker Desktop) installed run the command `docker-compose up -d` from the `docker` directory.

The `NEXTAUTH_SECRET` can be generated by running the following command;

```bash
openssl rand -base64 32
```

To obtain the Google Client variables an OAuth Client has to be created on Google API Console. [Guide to setting it up for NextAuth](https://www.telerik.com/blogs/how-to-implement-google-authentication-nextjs-app-using-nextauth), follow the '*Registering Our App and Getting OAuth Credentials*' section to get the client id and secret.

## Setup Project

Setup NodeJS environment, either install NodeJS to machine or use the `.devcontainer` with Docker to run the project inside of a NodeJS container. (Can be done using the [Dev Container](https://code.visualstudio.com/docs/devcontainers/containers) extension on VS Code)

Once in a NodeJS environment run the following commands;

```bash
cd freezer-id
npm install
```

This will install all the dependencies of the project into the `node_modules` directory. 

Now make sure the database which was created reflects the correct schema by running this command;

```bash
npx prisma migrate dev
```

## Run Project

Once all the setup has been completed simply run the project locally with the following command;

```bash
npm run dev
```

## Deployment

Details will be added later once a strategy is developed.