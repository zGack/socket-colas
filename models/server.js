import express from "express";
import cors from 'cors';
import http from 'http';
import {Server as io} from 'socket.io';
import { socketController } from "../sockets/controller.js";

export class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT; // puerto de la app
    this.server = http.createServer(this.app);
    this.io = new io(this.server);

    // Objeto que contiene las rutas de la app
    this.paths = {}

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();

    // configuracion de sockets
    this.sockets();
  }

  middlewares() {

    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static('public'));

  }

  routes() {
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Server running at port: ', this.port);
    });
  }
}