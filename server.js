var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hw-5-redo-142e9.firebaseio.com"
});

var db = admin.database()
var ref = db.ref('users');

const express = require("express")
const app = express()
const port = 3000

const server = app.listen(port, listening)

function listening(){
	console.log("listening on port " + port)
}

//routes that save data to firebase
app.get("/saveme/:data1", saveData)
app.get("/saveme/:data2/:data3", saveData)
function saveData(req, res){
	const data = req.params

	ref.push(data)
	res.send("Successfully saved the data. Go to route viewMe to see the content of the file.")
	
}

//route to view a snapshot of the current data in the database in firebase
app.get("/viewme", viewData)
function viewData(req, res){
	ref.once("value", function(snapshot){
		console.log(snapshot.val())
		res.send(snapshot)
	})
}