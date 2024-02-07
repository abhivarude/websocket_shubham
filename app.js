const { createServer } = require("http");


const { Server } = require("socket.io")
const express = require("express");
const app = express();
let cors = require("cors");

const runQuery = require('./server/mysqloperation');
const { apiHandler } = require("./server/apis");
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3005;
const server = createServer(app);
// const io = require('socket.io')(server)



server.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});

options = {
  cors: true,
  origins: ["http://localhost:3005"],
}

const io = new Server(server, options)


let socketsConected = new Set()

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on("send", (data) => {
    socket.broadcast.emit("receive_message", data);
  })


})

apiHandler.storeChata;


//  app.post("/storechat",apiHandler.storeChata);

app.post("/getUsers",async(req,res)=>{

  try{
    const query="call stp_GetUsersList()";
    const data =await runQuery(query);
    res.send(JSON.stringify(data[0]))

  }
  catch(error){
    console.log(error);
  }



})


app.post("/data", async (req, res) => {

  let username = req.body.sUsername;
  let password = req.body.spassword;
  let role = 1;
  let mobileNumber = req.body.mobileNumber;

  try {
    const query = `call stp_UserLogin("${username}","${password}","${role}","${mobileNumber}")`;
    console.log(query);
    const data = await runQuery(query);
    
    res.send(JSON.stringify(data))
  }
  catch (err) {
    console.log(err);
  }

})


// Create a promise-based connection pool
// const promisePool = pool.promise();

// Use the connection pool in your application
// async function runQuery() {
//   try {
//     const rows = await pool.query('SELECT * FROM userinformation', (err, res, fields) => {
//       if (err) {
//         return console.log(err);
//       }
//       else {
//         return res;
//       }


//     });
//     console.log('Query results:', rows);
//   } catch (error) {
//     console.error('Error executing query:', error);
//   }
// }



// When done, release the connection pool
// pool.end((err) => {
//   if (err) {
//     console.error('Error closing the connection pool:', err);
//     return;
//   }
//   console.log('Connection pool closed');
// });
















// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ path: "/ws", server });
// wss.on("connection", (ws) => {
//   console.log("WebSocket connection established");

//   ws.on("close", () => {
//     console.log("WebSocket connection closed");
//   });

// });
