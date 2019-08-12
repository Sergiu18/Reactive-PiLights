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
	console.log("stroboscopic_off called");
	state.stroboscop = false;
	clearInterval(stroboscopLoop);
}

function rainbow_on()
{
	var frequency = 0.063;
	for (let i = 0; i < 100; ++i)
	{
		const timeout = setTimeout(() => {
		   const red   = Math.round(Math.sin(frequency*i + 0) * 127 + 128);
		   const green = Math.round(Math.sin(frequency*i + 2) * 127 + 128);
		   const blue  = Math.round(Math.sin(frequency*i + 4) * 127 + 128);
		   set_color(red, green, blue);
	   }, 50*i);
		//timeouts.push(timeout);
	}
	stroboscopLoop = setInterval(function(){
		//var timeouts = [];
		for (let i = 0; i < 100; ++i)
		{
			const timeout = setTimeout(() => {
			   const red   = Math.round(Math.sin(frequency*i + 0) * 127 + 128);
			   const green = Math.round(Math.sin(frequency*i + 2) * 127 + 128);
			   const blue  = Math.round(Math.sin(frequency*i + 4) * 127 + 128);
			   set_color(red, green, blue);
		   }, 50*i);
			//timeouts.push(timeout);
		}
		//timeouts.foreach((timeout) => clearTimeout(timeout));
	}, 5250);
}

function rainbow_off()
{
	console.log("rainbow_off called");
	state.rainbow = false;
	set_color(state.currentColor.red, state.currentColor.green, state.currentColor.blue);
}




module.exports = { 
	lights_off,
	set_color,
	stroboscopic_on,
	stroboscopic_off,
	rainbow_on,
	rainbow_off,
	state
}
