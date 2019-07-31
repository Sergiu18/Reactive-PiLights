const GPIO = require('pigpio').Gpio;
const red =  new GPIO(27, {mode: GPIO.OUTPUT});
const green = new GPIO(17, {mode: GPIO.OUTPUT});
const blue = new GPIO(22, {mode: GPIO.OUTPUT});
var currentColor = {
	red: 0,
	green: 0,
	blue: 0
}
var currentMode = "";

var stroboscopLoop;

function lights_off()
{
	red.pwmWrite(0);
	green.pwmWrite(0);
	blue.pwmWrite(0);
}

function set_color(r, g, b)
{
	red.pwmWrite(r);
	green.pwmWrite(g);
	blue.pwmWrite(b);

	currentColor =  {
		red: r,
		green: g,
		blue: b
	}
}

function stroboscopic_on()
{
	currentMode = "stroboscopic";	
}

function stroboscopic_off()
{
	currentMode = "";
}

function startStroboscopicMode() {
	var stroboscop = true;
	stroboscopLoop = setInterval(function(){
		console.log(stroboscop ? "lights on" : "lights off")
		if(stroboscop){
			set_color(currentColor.red, currentColor.green, currentColor.blue);
		}
		else {
			lights_off();
		}
		stroboscop = !stroboscop;
	}, 500);
}

function resetModes(){ 
	clearInterval(stroboscopLoop);
}

setInterval(function(){
	console.log("currentMode : ", currentMode)
	switch(currentMode) {
		case "stroboscopic": !stroboscopLoop ? startStroboscopicMode() : null;break;
		default: resetModes();
	}
}, 100); 



stroboscopic_on();


setTimeout(function(){
	stroboscopic_off();
}, 10000)

