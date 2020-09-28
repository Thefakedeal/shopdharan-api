const bcrypt = require("bcrypt");

module.exports = {
  hash: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(hashedPassword);
      });
    });
  },
  compare: (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, same) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(same);
      });
    });
  },
};
