import Data from '../db/data.json' assert {type: "json"};
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop
  }
}

export class TicketControl {

  constructor() {
    this.last    = 0;
    this.today   = new Date().getDate();
    this.tickets = [];
    this.last4   = [];

    this.init();
  }

  get toJson() {
    return {
      "last": this.last,
      "today": this.today,
      "tickets": this.tickets,
      "last4": this.last4

    }
  }

  init() {
    const {today, tickets, last, last4} = Data;

    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.last4 = last4;
    } else {
      console.log('saving');
      this.saveDB();
    }

  }

  saveDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDB();
    return 'Ticket ' + ticket.number;
  }

  resolveTicket(desktop) {
    if (this.tickets.length === 0){
      return null
    }

    const ticket = this.tickets.shift();
    
    ticket.desktop = desktop;
    this.last4.unshift(ticket);

    if (this.last4.length > 4) {
      this.last4.splice(-1,1);
    }

    this.saveDB();

    return ticket;
  }
}