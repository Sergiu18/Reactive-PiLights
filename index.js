const lightController = require('./lights_control.js');
const express = require('express');
const cors = require('cors');

const app = express();

function getState()
{
	const { red, green, blue } = lightController.state.currentColor;
	let currentMode = "mode";
	if(lightController.state.stroboscop && lightController.state.rainbow == false)
		currentMode = "strobo";
	if(lightController.state.stroboscop == false && lightController.state.rainbow)
		currentMode = "rainbow";

	return {
		background: {
			r: red,
			b: blue,
			g: green
		},
		currentMode: currentMode
	}	
}

app.use('/', express.static('public'));

app.get('/api/lights_off', cors(), (req, res) => {
	console.log("lights_off called")
	lightController.stroboscopic_off();
	lightController.rainbow_off();
	lightController.lights_off();
	res.send({message: "Lights turned off", color: `Red: 0, Green: 0, Blue: 0`, state: getState()})
});

app.get('/api/modes_off', cors(), (req, res) => {
	console.log("modes_off called")
	lightController.stroboscopic_off();
	lightController.rainbow_off();
	res.send({message: "Modes turned off",	state: getState()})
});


app.get('/api/setColor', cors(), (req, res) => {
	const {r, g, b} = req.query;

	if(r || g || b){
		if((r>255 || g>255 || b>255) || (r<0 || g<0 || b<0))
		{
			res.status(500);
			res.send({message: "All the parameters must be numbers within 0 - 255", state: getState()})
			return
		}
		lightController.set_color(r, g, b);
		res.send({
			error: false,
			data: {
				message: `Colors: Red: ${r}, Green: ${g}, Blue: ${b}`,
				state: getState();
			}
		});
		return;
	}
	
	res.status(500);
	res.send({message: `Invalid colors: Red: ${r}, Green: ${g}, Blue: ${b}`, state: getState()})
});

app.get('/api/toggleStroboscopic', cors(), (req, res) => {
	lightController.rainbow_off();
	const { red, green, blue } = lightController.state.currentColor;
	if(lightController.state.stroboscop)
	{
		lightController.stroboscopic_off();
		res.send({message: "Stroboscopic-off",	state: getState()})
		lightController.set_color(red, green, blue);
	}
	else
		if((red || green || blue) && lightController.state.rainbow==false)
		{
			lightController.stroboscopic_on();
			res.send({message: "Stroboscopic-on",	state: getState()})
		}	
		else
		{
			res.status(500);
			res.send({message: "Please select colors or close other modes before performing this action!",	state: getState()})
		}
});

app.get('/api/toggleRainbow', cors(), (req, res) => {
	lightController.stroboscopic_off();
	if(lightController.state.rainbow)
	{
		lightController.rainbow_off();
		res.send({message: "Rainbow_off",	state: getState()})
	}
	else
	{
		if(lightController.state.stroboscop==false)
		{
			lightController.rainbow_on();
			res.send({message: "Rainbow-on",	state: getState()})
			console.log("toggleRainbow");
		}
		else
			res.send({message: "Please close other modes before performing this action!",	state: getState()})
	}
});

app.get('/api/returnState', cors(), (req, res) => {
	console.log("Getting state called")
	state: getState();
});


app.listen(3000, () => {
	console.log("Listening on port 3000");
})

