#!/bin/bash

# Get values of Java heap size environment variables (default: 1G for Xms, 2G for Xmx)
XMS=${JAVA_XMS:-1G}
XMX=${JAVA_XMX:-2G}


# # Update the online_mode setting to offline
# sed -i 's/^online_mode=true$/online_mode=false/' /minecraft-server/server.properties

# Start the Minecraft server with the adjusted Java heap size
java -Xms$XMS -Xmx$XMX -jar server.jar nogui