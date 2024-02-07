const mysql = require('mysql');
const Q = require('q');
var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'Abhi@123',
  database: 'chatapp',
  debug: false
});


const runQuery = (query1) => {
  var deffered = Q.defer();
  pool.query(query1, (err, rows, fields) => {
    if (err) {
      console.log(err);
      deffered.reject(err);
    } else {
      deffered.resolve(rows);

    }
  })

  return deffered.promise;
}


module.exports = runQuery;


