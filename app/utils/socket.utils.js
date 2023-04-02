import io from 'socket.io-client'

export const chatSocket = io('http://10.0.2.2:8080/chats', {
  transports: ['websocket']
})

chatSocket.on('connection', () => {
  console.log('Socket connected to chats namespace')
})

chatSocket.on('disconnect', () => {
  console.log('Socket disconnected from chats namespace')
})

chatSocket.on('connect_error', (err) => {
  console.log(`Client namespace connect_error due to ${err.message}`)
})

chatSocket.on('connect_timeout'),
  (err) => {
    console.log(err)
  }
