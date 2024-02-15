const events = require('events');
const EventEmitter = events.EventEmitter;
var ee = new EventEmitter();

// // ES2015 - class and inheritance
// class MyEmitter extends EventEmitter{}
// const myEmitter = new MyEmitter();
// myEmitter.on('customEvent', () => {
//     console.log('an event occurred!');
// })
// myEmitter.emit('customEvent');

// // 1 simple event
// // subscribing to 'someEvent' - providing event listener
// ee.on('someEvent', function(){
//     console.log('Event has been occurred and handled too!');
// });
// // publish / raise an event
// ee.emit('someEvent');

// // 2 event data
// ee.on('newUser', function(evt){
//     console.log(`Data along with event newUser is Id: ${evt.Id} and Name: ${evt.Name}!`);
// });

// let userData = new Object();
// userData.Id = 100;
// userData.Name = 'Sachin';

// // You can pass the data to the event while raising it
// ee.emit('newUser', userData);

// // 3 Providing multiple event listeners for the same event
// ee.on('firstEvent', function(){
//     console.log('First subscriber for the firstEvent!');
// });

// ee.on('firstEvent', function(){
//     console.log('Second subscriber for the firstEvent!');
// });

// ee.addListener('firstEvent', function(){
//     console.log('Second subscriber for the firstEvent!');
// });

// ee.emit('firstEvent');

// // 4 multiple event listeners - setMaxListeners()

// ee.setMaxListeners(20);

// ee.on('someEvent', function(){console.log('Event listener 1!')});
// ee.on('someEvent', function(){console.log('Event listener 2!')});
// ee.on('someEvent', function(){console.log('Event listener 3!')});
// ee.on('someEvent', function(){console.log('Event listener 4!')});
// ee.on('someEvent', function(){console.log('Event listener 5!')});
// ee.on('someEvent', function(){console.log('Event listener 6!')});
// ee.on('someEvent', function(){console.log('Event listener 7!')});
// ee.on('someEvent', function(){console.log('Event listener 8!')});
// ee.on('someEvent', function(){console.log('Event listener 9!')});
// ee.on('someEvent', function(){console.log('Event listener 10!')});
// ee.on('someEvent', function(){console.log('Event listener 11!')});

// ee.emit('someEvent');

// // 5 once
// // ee.on('firstConnection',function(){
// ee.once('firstConnection',function(){
//     console.log('You\'ll never see this again!');
// });

// ee.emit('firstConnection');
// ee.emit('firstConnection');

// // 6 removeListener
// // Event Listener
// function onlyOnce(){
//     console.log('You\'ll never see this again!');
//     ee.emit('secondConnection');
//     ee.removeListener('firstConnection',onlyOnce);
// }

// function secondCon(){
//     console.log('It\'s from second connection!');
// }

// // Subscribing to the firstConnection event
// ee.on('firstConnection',onlyOnce);

// ee.on('secondConnection', secondCon);

// ee.emit('firstConnection');
// ee.emit('firstConnection');

// // 7 removeAllListeners
// function onlyOnce(){
//     console.log('You\'ll never see this again!');
// }

// ee.on('firstConnection',onlyOnce);

// ee.emit('firstConnection');
// ee.emit('someEvent');

// console.log('\n');
// // ee.removeAllListeners(); // remove all listeners on the ee object
// ee.removeAllListeners('someEvent'); // remove all listeners on the ee object of a specific event - someEvent

// ee.emit('firstConnection');
// ee.emit('someEvent');

// // 8 listeners
// function onlyOnce(){
//     console.log(ee.listeners('firstConnection'));
//     console.log('You\'ll never see this again!');
//     // ee.removeListener('firstConnection',onlyOnce);
//     ee.off('firstConnection',onlyOnce);
//     console.log(ee.listeners('firstConnection'));
// }

// ee.on('firstConnection',onlyOnce);

// ee.emit('firstConnection');

// console.log(ee.listeners('someEvent'));

// // 9 In events module there are few built-in events
// // newListener - event raised when you register / subscribe the listener to the event
//             // for call of on, once, addListener
// // removeListener - event raised when you remove the listener or unsubscribe to the event
//             // for call of off, removeListener, removeAllListeners

// // Provide custom event listener for newListener built-in event
// ee.on('newListener', function(eventName, fn){
//     console.log('\nnewListener built-in event is raised!');
//     console.log('New Event:- ', eventName);
//     console.log('New Listener:- ', fn);
// });

// ee.on('removeListener', function(eventName, fn){
//     console.log('\nremoveListener built-in event is raised!');
//     console.log('Removed Event:- ', eventName);
//     console.log('Removed Listener:- ', fn);
// });

// function abc(){console.log('abc event listener I!');}
// function abcII(){console.log('abc event listener II!');}
// function xyz(){console.log('xyz event listener!');}

// ee.on('abcUser', abc); // subscribe
// ee.on('abcUser', abcII); // subscribe
// // ee.removeListener('abcUser',abc); // unsubscribe
// ee.off('abcUser',abc); // unsubscribe
// ee.on('xyzUser', xyz); // subscribe

// // ee.emit('abcUser');
// // ee.emit('xyzUser');

// 10
var radium = new EventEmitter();
radium.on('radiation', function(ray){
    console.log(ray);
});

setInterval(function(){
    radium.emit('radiation', 'GAMMA');
},1000)