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
	rainbow: false,
	breathing: false
}

var stroboscopLoop;
var rainbowLoop;
var breathingLoop;
var rainbowColorAux = null;

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

function stroboscopic_on(emitStateChange)
{
	state.stroboscop = true;
	rainbowColorAux = state.currentColor;
	var stroboscop = true;
	stroboscopLoop = setInterval(function(){
		console.log(stroboscop ? "lights on" : "lights off")
		if(stroboscop)
		{
			set_color(rainbowColorAux.red, rainbowColorAux.green, rainbowColorAux.blue);
			emitStateChange();
		}
		else 
		{
			set_color(0, 0, 0);
			emitStateChange();
		}
		stroboscop = !stroboscop;
	}, 150);
}

function stroboscopic_off()
{
	const currentColor = rainbowColorAux ? rainbowColorAux : state.currentColor;
	console.log("stroboscopic_off called");
	state.stroboscop = false;
	set_color(currentColor.red, currentColor.green, currentColor.blue);
	rainbowColorAux = null;
	clearInterval(stroboscopLoop);
}

function rainbow_cycle(emitStateChange)
{
	var timeouts = [];
	var frequency = 0.063;
	for (let i = 0; i < 100; ++i)
	{	
		timeouts.push(setTimeout(function(){
			if(state.rainbow==true)
			{
				const r   = Math.round(Math.sin(frequency*i + 0) * 127 + 128);
				const g = Math.round(Math.sin(frequency*i + 2) * 127 + 128);
			 	const b  = Math.round(Math.sin(frequency*i + 4) * 127 + 128);
			   	set_color(r, g, b);
			   	emitStateChange();
			} else {
				clearAllTimeouts(timeouts);
			}
	   	}, 50*i));
	}
}

function rainbow_on(emitStateChange)
{
	console.log("rainbow_on called");
	state.rainbow = true; 
	rainbowColorAux = state.currentColor;
	rainbow_cycle(emitStateChange);
	rainbowLoop = setInterval(() => rainbow_cycle(emitStateChange),5250);
}

function rainbow_off()
{
	const currentColor = rainbowColorAux ? rainbowColorAux : state.currentColor;

	console.log("rainbow_off called");
	state.rainbow = false;
	set_color(currentColor.red, currentColor.green, currentColor.blue);
	rainbowColorAux = null;
	clearInterval(rainbowLoop);
}

function breathing_on(emitStateChange)
{
	var { red, green, blue } = state.currentColor;
	state.breathing = true; 
	rainbowColorAux = state.currentColor;
	var timeouts = [];
	for (let i = 0; i <= 100; ++i)
	{	
		timeouts.push(setTimeout(function(){
			if(state.breathing==true)
			{
				red = Math.round(red - (red*100)/255);
				green = Math.round(green - (green*100)/255);
			 	blue  = Math.round(blue - (blue*100)/255);
			   	set_color(red, green, blue);
			   	emitStateChange();
			   	console.log(`Colors: ${red}, ${green}, ${blue}`);
			} else {
				clearAllTimeouts(timeouts);
			}

	   	}, 50*i));
	}
	breathingLoop = setInterval(() => breathing_cycle(emitStateChange),5250);
}
function breathing_off()
{
	const currentColor = rainbowColorAux ? rainbowColorAux : state.currentColor;
	state.breathing = false;
	set_color(currentColor.red, currentColor.green, currentColor.blue);
	rainbowColorAux = null;
	clearInterval(breathingLoop);
}

function clearAllTimeouts(timeouts) {
	timeouts.forEach(timeout => clearTimeout(timeout));
}


module.exports = { 
	lights_off,
	set_color,
	stroboscopic_on,
	stroboscopic_off,
	rainbow_on,
	rainbow_off,
	breathing_on,
	breathing_off,
	state
}
