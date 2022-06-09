var admin = require("firebase-admin");
var serviceAccount = require("../../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gdeparkovka-6360b.firebaseio.com"
});

function delete_user(uid){
    
    console.log(uid)
    admin.auth()
    .deleteUser(uid)
    .then(() => {
        console.log('Successfully deleted user');
    })
    .catch((error) => {
        console.log('Error deleting user:', error);
    });
}

export default delete_user