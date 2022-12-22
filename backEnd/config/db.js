"use strict"
const mysql = require('mysql')

const dbConn = mysql.createConnection({
    host: process.env.URL_HOST_BDD,
    user: "root",
    password: "",
    database: process.env.URL_BDD  
})

dbConn.connect( function (err) {
    if (err) throw err
    console.log(`Connection à notre base de donnée ..... : ..... reussi. `);
})

module.exports = dbConn
