#!/bin/bash

# Get values of Java heap size environment variables (default: 1G for Xms, 2G for Xmx)
RAM_SIZE=$1
SERVER_NAME=$2
PORT_NUMBER=$3


# # Update the online_mode setting to offline
# sed -i 's/^online_mode=true$/online_mode=false/' /minecraft-server/server.properties

docker run -d --name ${SERVER_NAME} -p ${PORT_NUMBER}:25565 -e RAM_SIZE=${RAM_SIZE} minecraft-server

# Start the Minecraft server with the adjusted Java heap size
java -Xms${RAM_SIZE} -Xmx${RAM_SIZE} -jar server.jar nogui
