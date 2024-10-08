FROM node:18-alpine AS base

# set the container working dir
WORKDIR /app

# copy all files
COPY ./freezer-id .

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

CMD ["sh", "-c", "npx prisma migrate dev && npm run start"]