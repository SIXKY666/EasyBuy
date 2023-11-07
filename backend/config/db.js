var dbOptions = {
  port: process.env.DB_PORT ,
  host: process.env.DB_HOST ,
  database:process.env.DB_NAME ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
console.log("dbOptions",dbOptions);
var MySQL = require("mysql2");
var connectionPool = MySQL.createPool(dbOptions);

connectionPool.getConnection(function (err, connection) {;
  if (err) {
    console.log('Error connecting to mysql Db: ', err);
    return;
  }
  console.log('Connected to mysql db!');
});


module.exports = connectionPool.promise();
