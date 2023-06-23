const WebSocket = require('websocket').server
const http = require('http')
const { MongoClient } = require('mongodb')
require('dotenv').config()

const MONGODB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const COLLECTIONS = process.env.DB_COLLECTIONS.split(',')
const PORT = process.env.PORT
let connections = []

// Create a new MongoDB client and connect to the database
const client = new MongoClient(MONGODB_URL, {
  useUnifiedTopology: true,
})

async function main() {
  try {
    await client.connect()
    console.log('Connected to MongoDB successfully!')
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err}`)
  }

  // Create a new HTTP server
  const server = http.createServer((req, res) => {
    res.writeHead(404)
    res.end()
  })

  // Create a new WebSocket server and attach it to the HTTP server
  const wsServer = new WebSocket({
    httpServer: server,
    autoAcceptConnections: false,
  })

  COLLECTIONS.forEach(coll => {
    // Listen for MongoDB change stream events
    const collection = client.db(DB_NAME).collection(coll)
    const changeStream = collection.watch({ fullDocument: 'updateLookup' })
    changeStream.on('change', change => {
      const { fullDocument, documentKey, operationType, ns } = change

      let message = { fullDocument: operationType === 'delete' ? documentKey : fullDocument, operationType, collection: ns.coll }

      // Broadcast the new message to all connected clients
      connections.forEach(conn => conn.send(JSON.stringify(message)))
    })
  })

  // Listen for WebSocket connection requests
  wsServer.on('request', request => {
    // Accept the connection
    const connection = request.accept(null, request.origin)

    // When a new connection is made, add it to the list of connections
    console.log('New connection accepted.')
    connections.push(connection)

    // When the connection is closed, remove it from the list of connections
    connection.on('close', (reasonCode, description) => {
      console.log(`Connection closed: ${reasonCode} - ${description}`)
      const index = connections.indexOf(connection)
      if (index !== -1) connections.splice(index, 1)
    })
  })

  // Start the HTTP server
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

main()
