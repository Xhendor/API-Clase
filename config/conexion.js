const mysql = require("mysql");

module.exports = mysql.createPool({
    host:"localhost",
    user:"twuser",
    password:"1234ABC%",
    database:"my_store",

})