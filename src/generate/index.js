const crypto = require('crypto')

function generate(length) {
  // const ln = parseInt(length);
  // if (ln <= 0) throw "The Length Of Generated Screen can't be 0 or less";
  // const random = Math.random();
  // const power = Math.pow(10, ln - 1);
  // return Math.floor(power + random * power * 9);
  return crypto.randomBytes(length).toString('hex')
}

module.exports = generate;
