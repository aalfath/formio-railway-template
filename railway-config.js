'use strict';
// Prints the JSON that Form.io reads from NODE_CONFIG (node "config" package).
// Every value comes from an environment variable; nothing secret is baked in.
const env = process.env;

function mongoUrl() {
  const u = new URL(env.MONGO_URL);
  const db = env.FORMIO_DB_NAME || 'formio';
  if (!u.pathname || u.pathname === '/') u.pathname = '/' + db;
  // Railway's MongoDB user lives in the admin database.
  if ((u.username || u.password) && !u.searchParams.has('authSource')) {
    u.searchParams.set('authSource', 'admin');
  }
  return u.toString();
}

const port = parseInt(env.PORT || '3001', 10);
const publicHost = env.FORMIO_PUBLIC_DOMAIN || env.RAILWAY_PUBLIC_DOMAIN || '';
const config = {
  port,
  mongo: mongoUrl(),
  mongoSecret: env.DB_SECRET,
  jwt: {
    secret: env.JWT_SECRET,
    expireTime: parseInt(env.JWT_EXPIRE_MINUTES || '240', 10),
  },
};
if (publicHost) {
  config.host = publicHost;
  config.protocol = 'https';
  config.domain = 'https://' + publicHost;
}

process.stdout.write(JSON.stringify(config));
