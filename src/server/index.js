const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;
const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const webroot = __dirname + '/../../build';

http.listen(8080); //listen to port 8080
app.use(express.static(webroot));

const doorbutton = new Gpio(7, 'out');
const lightPin = new Gpio(0, 'out');
const door = 7;
const light = 0;


gpiop.setup(door, gpio.DIR_OUT);

doorbutton.writeSync(1);
lightPin.writeSync(1);

io.sockets.on('connection', function (socket) {
  let direction = 'stop'; // direction: forward, backward, stop
  socket.on('direction', function (data) { // Incoming data
    direction = data;
    console.log(direction);
    if (direction === 'forward') {
	//gpio.write(door, true);
	doorbutton.writeSync(0);
	console.log("forward triggered");
    } else if (direction === 'backward') {
	console.log("backward triggered");
	//gpio.write(door, true);
	lightPin.writeSync(0);
    } else {
	doorbutton.writeSync(1);
	lightPin.writeSync(1);
	//gpio.write(door, false);
    }
  });
});


process.on('SIGINT', function () {  //on ctrl+c  
  gpio.destroy(() => {
    console.log('All pins unexported');
    process.exit(); //exit completely
  })
});
