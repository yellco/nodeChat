// let pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : '37.140.192.207',
//   user            : 'u0655708_wp811',
//   password        : '[B4S0!ppR3',
//   database        : 'information_schema'
// });

let mysql = require('mysql');

let con = mysql.createConnection({
  host: "37.140.192.207",
  user: "u0655708_wp811",
  password: "[B4S0!ppR3"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
