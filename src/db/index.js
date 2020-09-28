const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  // port: 5432,
});


module.exports = {
  query: (text, params) => {
    const start = Date.now();
    return new Promise((resolve, reject) => {
      try {
        pool.query(text, params, (err, res) => {
          const duration = Date.now() - start;
          if (err) {
            console.log(`Query: ${text} Failed Due To \n ${err}`);
            reject(err);
            return;
          }
          console.log(
            `Executed Query: ${text} in ${duration} ms \n Rows Affected: ${res.rowCount}`
          );
          resolve(res);
        });
      } catch (err) {
        console.log(err);
      }
    });
  },
  transaction: pool.connect()
  
};
