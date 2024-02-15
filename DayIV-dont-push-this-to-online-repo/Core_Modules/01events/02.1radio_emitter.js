const events = require('events');
const EventEmitter = events.EventEmitter;

// // ES2015 - class and inheritance
// class MyEmitter extends EventEmitter{}
// const myEmitter = new MyEmitter();
// myEmitter.on('customEvent', () => {
//     console.log('an event occurred!');
// })
// myEmitter.emit('customEvent');

class Radio extends EventEmitter{
    station;
    constructor(station){
        super();
        this.station = station;
    }
}