const client = require("../redis");
const getData = require("../redis/getdata");

function login(role, id, token) {
  const ttl = 2592000;
  return client.setex(`{auth:${role}:${id}}`, ttl, token);
}

async function verify(role, id, token) {
  try {
    const data = await getData(`{auth:${role}:${id}}`);
    if (data.toString() === token.toString()) return true;
    return false;
  } catch (err) {
    return false;
  }
}

function logout(role,id) {
    return client.del(`{auth:${role}:${id}}`)
}

module.exports = {
    login,
    logout,
    verify
}