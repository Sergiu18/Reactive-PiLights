const GPIO = require('pigpio').Gpio;
const red =  new GPIO(27, {mode: GPIO.OUTPUT});
const green = new GPIO(17, {mode: GPIO.OUTPUT});
const blue = new GPIO(22, {mode: GPIO.OUTPUT});
var currentColor = {
	red: 180,
	green: 80,
	blue: 50
}

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

function stroboscopic_off()
{
	clearInterval(stroboscopLoop);
}

function rainbow_on()
{
	for(r=0;r<255;r+=10)
		for(g=0;g<255;g+=10)
			for(b=0;b<255;b+=10)
				console.log(r,g,b);
				set_color(r,g,b)
}

function rainbow_off()
{
	//clearInterval(stroboscopLoop);
}

rainbow_on();


setTimeout(function(){
	// stroboscopic_off();
}, 10000)

