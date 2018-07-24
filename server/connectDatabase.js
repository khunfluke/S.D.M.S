const { Pool, Client } = require('pg')
const connectionString = 'postgresql://thapattarasun_trainee:yyeB6ppc7d@203.151.20.163:5432/dbu_sdms'

const pool = new Pool({
  connectionString: connectionString,
})

// pool.query('SELECT * FROM employee', (err, res) => {
//   console.log(res.rows);
//   pool.end()
// })

module.exports = pool;