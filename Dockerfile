# Build frontend
FROM node:20 AS frontend
WORKDIR /app/front-end
COPY front-end/package*.json ./
RUN npm install
COPY front-end/ .
RUN npm run build

# Build backend
FROM node:20 AS backend
WORKDIR /app/back-end
COPY back-end/package*.json ./
RUN npm install
COPY back-end/ .

# Final image
FROM node:20
WORKDIR /app
COPY --from=frontend /app/front-end/build ./front-end
COPY --from=backend /app/back-end ./back-end
EXPOSE 5000
CMD ["node", "back-end/server.js"]
