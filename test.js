var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'server119.hosting.reg.ru',
    port     : 3306,
    user     : 'u0655708_default',
    password : 'p!F5sXLw',
    database : 'information_schema'
  });

connection.connect();

connection.query('SELECT * FROM COLLATIONS', function(error, result, fields){
    if (error) throw error;
    console.log(result);
});

connection.end();
