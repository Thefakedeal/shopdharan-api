const client = require("../../redis");
const getData = require("../../redis/getdata");
module.exports = {
  savePin: (role, email_id, pin) => {
    const expTimeInSec = 21600;
    //Save Pin To Redis
    const success = client.setex(
      `{resetpassword:${role}:${email_id}}`,
      expTimeInSec,
      pin
    );
    return success;
  },
  comparePin: async (role, id, pin) => {
    try{
      const data = await getData(`{resetpassword:${role}:${id}}`);
      if (data.toString() === pin.toString()) return true;
      return false;
    }catch(err){
      return false;
    }
  },
};
