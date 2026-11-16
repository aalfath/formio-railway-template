# Form.io Community Edition (API server + admin portal), official image pinned by version and digest.
FROM formio/formio:4.11.1@sha256:5ba2c03ccbd0354c650c913bf8751f0815d18f1a297da0725e86f275ffca01ff

COPY railway-start.sh /usr/local/bin/railway-start.sh
COPY railway-config.js /app/railway-config.js
RUN chmod +x /usr/local/bin/railway-start.sh

WORKDIR /app
ENTRYPOINT ["/usr/local/bin/railway-start.sh"]
