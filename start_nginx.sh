#!/bin/sh

# server.ssl.enabled is an environment variable that is set by the standard chart when REST-based Microservices
# have east-west encryption enabled. We are going to use the environment variable for NGINX-based Microservices
# as well. If server.ssl.enabled is set to "true", then just another environment variable SSL to string of "ssl".
# Because of the limitation of the sh shell, it is not possible to simply use server.ssl.enabled environment
# variable because of the period in the name, so we had to do this trick to use "env" and pipe-grep and extract
# the whole environment variable with its key and value, and then do the comparison.
export server_ssl_enabled=$(env | grep server.ssl.enabled=true)
if [ $server_ssl_enabled == "server.ssl.enabled=true" ]; then
    export SSL=ssl
    export east_west_microservice_server_cert="ssl_certificate /mnt/east-west-encryption-server-certs/east-west-microservice-server-cert;"
    export east_west_microservice_server_key="ssl_certificate_key /mnt/east-west-encryption-server-certs/east-west-microservice-server-key;"
fi

# Use envsubst to replace environment variable SSL in nginx-template.conf with "ssl" string.
# If SSL environment variable is not set, then $SSL will be replaced with a space, which will have
# the effect of turning off SSL.
envsubst '$SSL, $east_west_microservice_server_cert, $east_west_microservice_server_key' </alpha/nginx.conf >/etc/nginx/conf.d/nginx.conf

# Run nginx...
# With "daemon off", NGINX is running in the foreground (not as a daemon), which is not typical,
# usually this is done for development, not for production, however, we are using this image also in production.
# I didn't modify it because I am just refactoring, so I need to keep the original behavior.
# Changing it to run as a daemon should be done using a separate Jira to make sure that it has no side effects.
nginx -g "daemon off;"
