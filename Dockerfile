# Build frontend
FROM node:20 AS frontend
WORKDIR /app/front-end
COPY front-end/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build backend
FROM maven:3.9.5-eclipse-temurin-23 AS backend
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/ .
RUN mvn clean package -DskipTests

# Final image (run backend + serve frontend)
FROM eclipse-temurin:23-jre
WORKDIR /app
COPY --from=backend /app/backend/target/backend.jar app.jar
COPY --from=frontend /app/frontend/dist ./static
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
