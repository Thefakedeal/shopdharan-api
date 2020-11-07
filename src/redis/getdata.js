const client = require("./index");

function getData(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) return reject(err);
      if (data) return resolve(data);
      reject("Data Doesn't Exist");
    });
  });
}

module.exports= getData