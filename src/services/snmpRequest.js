var snmp = require('snmp-native');

//Отправка SNMP запроса
const snmpRequest = (host, port, message, type, value=null) => {
    var session = new snmp.Session({ host: host, port: port, community: 'SWITCH' });
 
    if (type === 'SET') {
       session.set({ oid: message, value: value, type: 2 }, function (error, varbind) {
          if (error) {
             console.log('Fail :(');
          } else {
             console.log('The set is done.');
          }
       });
    }
    else if (type === 'GET') {
       session.get({ oid: message }, function (error, varbinds) {
          if (error) {
              console.log('Fail :(');
          } else {
              console.log('Status = ' + varbinds[0].value);
          }
      });
    }
 }

 export default snmpRequest
