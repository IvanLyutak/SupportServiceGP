const { exec } = require("child_process"); 
 
//Подключение VPN
const connectionVPN = (name, callback) => {
   exec("rasdial " + name, (err, outs, errs) => { 
      if (err) {
         console.log("Error in connection")
         callback("error");
      }
      else {
         console.log(outs); 
         console.log("Connection is success!")
         callback("success");
      }
   }); 
}

export default connectionVPN