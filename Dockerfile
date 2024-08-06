FROM reartifactory01.crd.com:5013/nginxinc/nginx-unprivileged:1.23.1-alpine

# Modify the home page name here.
ARG homepage=dynamic-grid

# Switching to root to move files and update file permissions
USER root

# We need to add CRD root cert in order to run APK under ZScaler
# See https://stackoverflow.com/questions/67231714/how-to-add-trusted-root-ca-to-docker-alpine
RUN mkdir -p /usr/local/share/ca-certificates
COPY ./certs/* /usr/local/share/ca-certificates/
RUN cat /usr/local/share/ca-certificates/CRDBRLROOTCA.cer >> /etc/ssl/certs/ca-certificates.crt && \
    cat /usr/local/share/ca-certificates/CRDBRLSUBCA.cer >> /etc/ssl/certs/ca-certificates.crt && \
    rm -r /usr/local/share/ca-certificates

# Patch High CVE for zlib package
RUN apk add --no-cache \
    zlib=1.2.12-r3 --repository https://dl-cdn.alpinelinux.org/alpine/edge/main

# default.conf is not needed, so just delete it.
RUN rm /etc/nginx/conf.d/default.conf

# Copy web app from the build folder.
RUN rm /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html/$homepage
RUN chmod -R +r /usr/share/nginx/html/$homepage

# USE for production deployment
RUN chown 100000:300000 -R /usr/share/nginx/html/$homepage

# change the permissions for the nginx configuration folder so that we can later on as nginx user
# in the start_nginx.sh script create the nginx.conf of the nginx-template.conf using envsubst command.
RUN chown 100000:300000 -R /etc/nginx/conf.d/

# create the /alpha folder and change its permissions to nginx user.
RUN mkdir -p /alpha && \
    chown 100000:300000 /alpha

# copy the template and the script to /alpha folder, and add the execute permission to the script.
COPY nginx.conf start_nginx.sh /alpha/
RUN chmod +x /alpha/start_nginx.sh && \
    dos2unix /alpha/start_nginx.sh && \
    chown 100000:300000 /alpha/start_nginx.sh && \
    chown 100000:300000 /alpha/nginx.conf

# Switching back to the nginx user
USER nginx

EXPOSE 8080

CMD ["/alpha/start_nginx.sh"]