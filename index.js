const lightController = require('./lights_control.js');
const express = require('express');
const app = express();

app.use('/', express.static('public'));

app.get('/api/lights_off', (req, res) => {
	console.log("lights_off called")
	lightController.stroboscopic_off();
	lightController.rainbow_off();
	lightController.lights_off();
	res.send({message: "Lights turned off", color: `Red: 0, Green: 0, Blue: 0`})
});

app.get('/api/setColor', (req, res) => {
	const {r, g, b} = req.query;

	if(r || g || b){
		if((r>255 || g>255 || b>255) || (r<0 || g<0 || b<0))
		{
			res.status(500);
			res.send({message: "All the parameters must be digits within 0 - 255"})
			return
		}
		lightController.set_color(r, g, b);
		res.send({
			error: false,
			data: {message: `Colors: Red: ${r}, Green: ${g}, Blue: ${b}`}
		});
		return;
	}
	
	res.status(500);
	res.send({message: `Invalid colors: Red: ${r}, Green: ${g}, Blue: ${b}`})
});

app.get('/api/toggleStroboscopic', (req, res) => {
	const { red, green, blue } = lightController.state.currentColor;
	if(lightController.state.stroboscop)
	{
		res.send(lightController.stroboscopic_off());
		lightController.set_color(red, green, blue);
	}
	else
		if(red || green || blue)
			res.send(lightController.stroboscopic_on());
		else
		{
			res.status(500);
			res.send({message: "Please select colors!"})
		}
});

app.get('/api/toggleRainbow', (req, res) => {
	if(lightController.state.rainbow)
		res.send(lightController.rainbow_off());
	else
	{
		res.send(lightController.rainbow_on());
		console.log("toggleRainbow");
	}
});


app.listen(3000)

