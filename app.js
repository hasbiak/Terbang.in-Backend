const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routerNavigation = require('./src/routesNavigation')
const socket = require('socket.io')

require('dotenv').config()

const app = express()
app.use(morgan('dev'))
app.use('/terbangin/fileUploadsTerbangin', express.static('uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/terbangin', routerNavigation)
app.get('*', (request, response) => {
  response.status(404).send('Path Not Found')
})

const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/terbangin/socket.io'
})
io.on('connection', (socket) => {
  console.log('Socket.io Connect !')
  socket.on('globalMessage', (data) => {
    console.log('globalMessage ')
    console.log(data)
    io.emit('chatMessage', data)
  })
  socket.on('privateMessage', (data) => {
    console.log('privateMessage ')
    console.log(data)

    socket.emit('chatMessage', data)
  })
  socket.on('broadcastMessage', (data) => {
    console.log('broadcastMessage ')
    console.log(data)

    socket.broadcast.emit('chatMessage', data)
  })
  socket.on('joinRoom', (data) => {
    console.log('joinRoom ')
    console.log(data)

    socket.join(data.room)
  })
  socket.on('changeRoom', (data) => {
    console.log('changeRoom ')
    console.log(data)

    socket.leave(data.oldRoom)
    socket.join(data.room)
  })
  socket.on('roomMessage', (data) => {
    console.log('roomMessage ')
    console.log(data)
    io.to(data.room).emit('chatMessage', data)
  })
  socket.on('typing', (data) => {
    console.log(data)
    socket.broadcast.to(data.room).emit('typingMessage', data)
  })
})

server.listen(process.env.port, () => {
  console.log(`Listening on Port ${process.env.port}`)
})
