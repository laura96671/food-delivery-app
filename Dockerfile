FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} foodle-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=local", "-jar", "/app/foodle-0.0.1-SNAPSHOT.jar"]
