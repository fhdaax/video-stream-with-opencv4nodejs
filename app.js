const cv = require('opencv4nodejs')
const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const wCap = new cv.VideoCapture(0)
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 1920)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 1080)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

setInterval(() => {
    const frame = wCap.read()
    const image = cv.imencode('.jpg', frame).toString('base64')
    io.emit('video', image)
}, 1000 / 15);

const port = process.env.PORT || 3000
server.listen(port, () => console.log('server listening on http://127.0.0.1:3000'))
