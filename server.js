require('dotenv').config()
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const main = next({ dev })
const handle = main.getRequestHandler()

const port = process.env.PORT || 3000

console.log(`Production environment: ${dev}`);


main.prepare()
.then(() => {
  const app = express()
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  const server = app.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

  const io = require('socket.io')(server); 
  var connectedUsers = {}
  var allScores = {}
  var updateInterval = null
  var serverTime = ''


  var database = initializeFirebase()
  
  io.on('connection', (client) => { 
    
    console.log(client.id + ' connected')

    //ADDS PLAYER TO LIST
    client.on('CLIENT:ADD_PLAYER', (data) => {
      let numberOfConnectedSockets = parseInt(Object.keys(connectedUsers).length);
      let playerData = {
        name: data.name
      }
      if(numberOfConnectedSockets === 0) {
        //Send updated list of connected players once every x seconds
        updateInterval = setInterval(() => {
          io.emit('SERVER:EMIT_PLAYERS', connectedUsers )
          io.emit('SERVER:EMIT_ALL_SCORES', allScores)
          console.log('interval started')
        }, 2500)

      }
      connectedUsers[client.id] = playerData
    })




    client.on('CLIENT:EMIT_READY', () => {
      io.emit('SERVER:EMIT_READY', true)
    })

    client.on('CLIENT:SEND_START_SIGNAL', () => {
      serverTime = new Date()
      io.emit('SERVER:SEND_START_SIGNAL')
    })

    client.on('CLIENT:SEND_STOP_SIGNAL', (data) => {
      let currTime = new Date()
      let timeInSeconds = Math.ceil((currTime.getTime() - serverTime.getTime()) / 1000) - 5
      let scoreData = { 'name': data.name, 'time': timeInSeconds }
      let dateString = `${currTime.getFullYear()}-${currTime.getMonth() + 1 }-${day_of_the_month(currTime.getDate())}`

      allScores[client.id] = scoreData
      

      if(!dev) {
        //Save to Google Firebase
        var userRef = database.ref('users').child(data.name);
        userRef.push({
          date: dateString,
          seconds: timeInSeconds
        })
      }


    })

    //REMOVE PLAYER FROM SOCKET AND CLEAR ALL DATA
    client.on('disconnect', () => {
      delete connectedUsers[client.id]
      delete allScores[client.id]

      if(parseInt(io.engine.clientsCount) <= 0) {
        clearInterval(updateInterval)
        console.log('clear interval')
      }

    });
  })
  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

function initializeFirebase() {
  var firebase = require('firebase');  
  var firebaseObj = firebase.initializeApp({
    apiKey: process.env.fb_api_key,
    authDomain: process.env.fb_auth_domain,
    databaseURL: process.env.fb_database_url,
    projectId: process.env.fb_project_id,
    storageBucket: process.env.fb_storage_bucket,
    messagingSenderId: process.env.fb_messaging_sender_id,
  });

  // Get a reference to the database service
  return firebaseObj.database()
}

function day_of_the_month(d)
{ 
  return (parseInt(d) < 10 ? '0' : '') + parseInt(d);
}
