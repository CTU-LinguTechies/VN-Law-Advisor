# Use an OpenJDK 21 base image
FROM openjdk:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project file and download the dependencies
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN chmod +x mvnw

RUN ./mvnw dependency:resolve

# Copy the entire project
COPY src ./src
# Set the entry point to run the Spring Boot application
CMD ["./mvnw", "spring-boot:run"]

EXPOSE 8080