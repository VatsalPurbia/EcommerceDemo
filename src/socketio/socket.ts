import { Server, Socket } from 'socket.io';


const users:any = {}

export const socketStart=()=>{
    const io: Server = new Server(4500);
    console.log('here');
    
    io.on('connection', socket => {
        console.log('here3');

        socket.on('new-user', name => {
          users[socket.id] = name
          socket.broadcast.emit('user-connected', name)
        })
        socket.on('send-chat-message', message => {
          socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
        })
        socket.on('disconnect', () => {
          socket.broadcast.emit('user-disconnected', users[socket.id])
          delete users[socket.id]
        })
      })
      
      
}

