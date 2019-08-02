const GPIO = require('pigpio').Gpio;
const red =  new GPIO(27, {mode: GPIO.OUTPUT});
const green = new GPIO(17, {mode: GPIO.OUTPUT});
const blue = new GPIO(22, {mode: GPIO.OUTPUT});

var state = {
	currentColor: {
		red: 0,
		green: 0,
		blue: 0
	},
	stroboscop: false,
	rainbow: false
}

var stroboscopLoop;

function lights_off()
{
	red.pwmWrite(0);
	green.pwmWrite(0);
	blue.pwmWrite(0);
}

function set_color(r = 0, g = 0, b = 0)
{
	red.pwmWrite(r);
	green.pwmWrite(g);
	blue.pwmWrite(b);

	state.currentColor =  {
		red: r,
		green: g,
		blue: b
	}
}

function stroboscopic_on()
{
	state.stroboscop = true;
	var stroboscop = true;
	stroboscopLoop = setInterval(function(){
		console.log(stroboscop ? "lights on" : "lights off")
		if(stroboscop){
			set_color(state.currentColor.red, state.currentColor.green, state.currentColor.blue);
		}
		else {
			lights_off();
		}
		stroboscop = !stroboscop;
	}, 250);
}

function stroboscopic_off()
{
	state.stroboscop = false;
	clearInterval(stroboscopLoop);
}

function rainbow_on()
{

	for(g=0;g<=255;g=+2)
		for(r=0;r<=255;r=+2)
			for(b=0;b<=255;b=+2)	
					set_color(r,g,b)

}

function rainbow_off()
{
	state.rainbow = false;
}




module.exports = { 
	lights_off,
	set_color,
	stroboscopic_on,
	stroboscopic_off,
	state
}
