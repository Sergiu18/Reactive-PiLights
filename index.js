var GPIO = require('pigpio').Gpio;
console.log(GPIO.OUTPUT);

var red =  new GPIO(27, {mode: GPIO.OUTPUT});
var green = new GPIO(17, {mode: GPIO.OUTPUT});
var blue = new GPIO(22, {mode: GPIO.OUTPUT});
function clear()
{
 red.pwmWrite(0);
 green.pwmWrite(0);
 blue.pwmWrite(0);
}

var counter = 0;

setInterval(function()
{
  counter++;
   console.log(counter);
   switch(counter%3){
   case 1:clear(); red.pwmWrite(50); break; 
   case 2:clear();green.pwmWrite(50); break;
   case 0:clear();blue.pwmWrite(50); break;
  } 
}, 1500);
