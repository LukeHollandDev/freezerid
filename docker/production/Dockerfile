FROM node:18-alpine AS base

# set environment variables
ARG POSTGRES_USER
ENV POSTGRES_USER ${POSTGRES_USER}
ARG POSTGRES_PASSWORD
ENV POSTGRES_PASSWORD ${POSTGRES_PASSWORD}
ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET ${NEXTAUTH_SECRET}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET ${NEXTAUTH_SECRET}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL ${NEXTAUTH_URL}

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID ${GOOGLE_CLIENT_ID}
ARG GOOGLE_SECRET_ID
ENV GOOGLE_SECRET_ID ${GOOGLE_SECRET_ID}

ARG VIRTUAL_HOST
ENV VIRTUAL_HOST ${VIRTUAL_HOST}

# set the container working dir
WORKDIR /app

# copy all files
COPY . .

# install dependencies
RUN npm ci

# generate prisma client
RUN npx prisma generate

# run the build script
RUN npm run build

# set environment
ENV NODE_ENV=production

# setup nextjs user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

# expose the port 3000
EXPOSE 3000