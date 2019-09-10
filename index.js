const lightController = require('./lights_control.js');
const express = require('express');
const cors = require('cors');

const app = express();

function getState()
{
	const { red, green, blue } = lightController.state.currentColor;
	let currentMode = "mode";
	let lightState = true;
	if(lightController.state.stroboscop && lightController.state.rainbow == false)
		currentMode = "strobo";
	if(lightController.state.stroboscop == false && lightController.state.rainbow)
		currentMode = "rainbow";
	if(red == 0 && green == 0 && blue == 0)
		lightState = false;
	return {
		background: {
			r: red,
			b: blue,
			g: green
		},
		currentMode: currentMode,
		lightState: lightState
	}	
}

function getRes(error, message)
{
	return {
		error: error,
		data: {
			message: message,
			state: getState()
		}
	}
}

app.use('/', express.static('public'));

app.get('/api/modes_off', cors(), (req, res) => {
	console.log("modes_off called")
	lightController.stroboscopic_off();
	lightController.rainbow_off();
	res.send(getRes(false, "Modes turned off"))
});


app.get('/api/setColor', cors(), (req, res) => {
	lightController.stroboscopic_off();
	lightController.rainbow_off();
	const {r, g, b} = req.query;

	if(r || g || b)
	{
		if((r>255 || g>255 || b>255) || (r<0 || g<0 || b<0))
		{
			res.status(500);
			res.send(getRes(true, "All the parameters must be numbers within 0 - 255"))
			return;
		}
		lightController.set_color(r, g, b);
		const message =  `Colors: Red: ${r}, Green: ${g}, Blue: ${b}`;
		res.send(getRes(false, message));
		return;
	}
	const message =  `Colors: Red: ${r}, Green: ${g}, Blue: ${b}`;
	res.status(500);
	res.send(getRes(true, message))
});

app.get('/api/toggleStroboscopic', cors(), (req, res) => {
	lightController.rainbow_off();
	const { red, green, blue } = lightController.state.currentColor;
	if(lightController.state.stroboscop)
	{
		lightController.stroboscopic_off();
		res.send(getRes(false, "Stroboscopic turned off"))
		lightController.set_color(red, green, blue);
	}
	else
		if((red || green || blue) && lightController.state.rainbow==false)
		{
			lightController.stroboscopic_on();
			res.send(getRes(false, "Stroboscopic turned on"))
		}	
		else
		{
			res.status(500);
			res.send(getRes(true, "Please select colors before performing this action!"))
		}
});

app.get('/api/toggleRainbow', cors(), (req, res) => {
	lightController.stroboscopic_off();
	if(lightController.state.rainbow)
	{
		lightController.rainbow_off();
		res.send(getRes(false, "Rainbow turned off"))
	}
	else
	{
		if(lightController.state.stroboscop==false)
		{
			lightController.rainbow_on();
			res.send(getRes(false, "Rainbow turned on"))
			this.setState(lightState:true)
		}
		else
			res.send(getRes(true, "Lights turned off??"))
	}
});

app.get('/api/returnState', cors(), (req, res) => {
	console.log("Getting state called")
	res.send(getRes(false, "State get"))
	state: getState();
});


app.listen(3000, () => {
	console.log("Listening on port 3000");
})

