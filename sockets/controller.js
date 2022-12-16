import { TicketControl } from "../models/ticket-control.js";

const ticketControl = new TicketControl();

export const socketController = (socket) => {

  socket.emit('last-ticket', ticketControl.last);
  socket.emit('current-status', ticketControl.last4);

  // 'pending-tickets'
  socket.emit('pending-tickets', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.next();

    socket.emit('pending-tickets', ticketControl.tickets.length);

    callback(next);
  });

  socket.on('resolve-ticket', ({escritorio}, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio'
      })
    }

    const ticket = ticketControl.resolveTicket(escritorio);

    socket.broadcast.emit('current-status', ticketControl.last4);

    if (!ticket) {
      callback({
        ok: false,
        msg: 'Ya no hay tickets pendientes'
      });
    } else {
      socket.emit('pending-tickets', ticketControl.tickets.length);
      socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
      callback({
        ok: true,
        ticket
      })
    }
  })
}
