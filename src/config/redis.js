const redis = require("redis");

const client = redis.createClient();
client.on("connect", () => {
  console.log("connected to redis");
});

//cloud redis
// const client = redis.createClient({ host: process.env.REDIS_HOSTNAME, port: process.env.REDIS_PORT, password: process.env.REDIS_PASSWORD });
// client.on("connect", () => {
//   console.log("connected to redis");
// });

module.exports = client;
