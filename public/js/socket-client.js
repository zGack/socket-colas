
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
  // console.log('Conectado');

  lblOffline.style.display = 'none'
  lblOnline.style.display = ''
});

socket.on('disconnect', () => {
  console.log('Desconectado');

  lblOnline.style.display = 'none'
  lblOffline.style.display = ''
});

socket.on('send-msg', (payload) => {
  console.log(payload);
});

btnSend.addEventListener('click', () => {
  const msg = txtMsg.value;
  const payload = {
    msg,
    id: 'abc123',
    date: new Date().getTime()
  };

  socket.emit('send-msg', payload, (id) => {
    console.log('Desde el server', id);
  });
})