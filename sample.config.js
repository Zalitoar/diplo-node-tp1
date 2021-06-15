var config = {
  development: {
    //mysql connection settings
    db: {
      host: "127.0.0.1",
      port: "3306",
      name: "dev_db",
      user: "root",
      pwd: "****",
    },
    //server details
    server: {
      host: "127.0.0.1",
      port: "3005",
    },
  },
  production: {
    db: {
      host: "localhost",
      port: "3306",
      name: "mydb",
      user: "root",
      pwd: "",
    },
    //server details
    server: {
      host: "127.0.0.1",
      port: "3000",
    },
  },
};
var env = process.env.NODE_ENV || "production";
module.exports = config[env];
