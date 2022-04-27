const session = require('express-session');
const { Pool } = require('pg');
const pgSimple = require('connect-pg-simple');

const connObj = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const poolObj = new Pool(connObj);

const sessionStore = new (pgSimple(session))({ pool: poolObj });

const sessionMiddleware = session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: false,
    maxAge: 1000 * 60 * 5, // in millisec,
  },
});

exports.poolObj = poolObj;
exports.sessionMiddleware = sessionMiddleware;
