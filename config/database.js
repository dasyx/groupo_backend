module.exports = {
  HOST: "srv980.hstgr.io",
  USER: process.env.HST_USER,
  PASSWORD: process.env.HST_PASSWORD,
  DB: process.env.HST_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
