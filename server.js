var express = require('express')
var env = require('dotenv').config()
var ejs = require('ejs')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var dbConnect = require('./docs/config/db')

dbConnect()

const server = require('http').Server(app)
const { v4: uuidv4 } = require('uuid')
const io = require('socket.io')(server, {
  
  cors: {
    origin: '*'
  }
})
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
  debug: true
})

app.use('/peerjs', peerServer)
app.use(express.static(__dirname + 'public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/uploads'))
app.use(express.static(__dirname + '/csv'))

var index = require('./routes/index')
app.use('/', index)
app.get('/video', (req, res) => {
  res.redirect(`/video/${uuidv4()}`)
})
app.get('/video/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId, userName) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    console.log('this')
    socket.on('message', message => {
      io.to(roomId).emit('createMessage', message, userName)
    })
  })
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found')
  err.status = 404
  next(err)
})

app.use(
  session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
  })
)

app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})

const PORT = process.env.PORT || 3000
server.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:' + PORT)
})
