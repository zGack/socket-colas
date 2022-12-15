
export const socketController = (socket) => {
  console.log('Cliente conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });

  socket.on('send-msg', (payload, callback) => {
    const id = 123123;
    callback(id);

    // transmite el mensaje a todos los otros clientes menos a el mismo
    socket.broadcast.emit('send-msg', payload);
  });
}
