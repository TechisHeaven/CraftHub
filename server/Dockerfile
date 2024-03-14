# Use a base image with Ubuntu
FROM ubuntu:latest

# Update package lists and install necessary tools
RUN apt-get update && \
    apt-get install -y wget iproute2 && \
    apt-get clean

# Download and install Java 16 (or above) from AdoptOpenJDK
RUN wget -O /tmp/openjdk.tar.gz https://github.com/AdoptOpenJDK/openjdk16-binaries/releases/download/jdk-16%2B36/OpenJDK16-jdk_x64_linux_hotspot_16_36.tar.gz && \
    tar xfv /tmp/openjdk.tar.gz -C /opt && \
    rm /tmp/openjdk.tar.gz

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/opt/jdk-16+36

# Add Java bin directory to PATH
ENV PATH="$JAVA_HOME/bin:${PATH}"

# Create a directory for the Minecraft server
RUN mkdir -p /minecraft-server

# Set working directory
WORKDIR /minecraft-server

# Download the Minecraft server JAR file
RUN wget -O server.jar https://papermc.io/api/v2/projects/paper/versions/1.17.1/builds/198/downloads/paper-1.17.1-198.jar

# Accept the Minecraft EULA
RUN echo "eula=true" > eula.txt


# Copy the startup script into the container
COPY start.sh /minecraft-server/start.sh

# Make the startup script executable
RUN chmod +x /minecraft-server/start.sh

# Expose Minecraft server port
EXPOSE 25565

# Command to start the Minecraft server using the startup script
CMD ["/bin/bash", "/minecraft-server/start.sh"]