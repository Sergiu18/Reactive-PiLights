const lightController = require('./lights_control.js');
const express = require('express');
const app = express();
const cors = require('cors')

app.use('/', express.static('public'));

app.get('/with-cors', cors(), (req, res, next) => {
  res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
})

app.get('/api/lights_off', (req, res) => {
	console.log("lights_off called")
	lightController.stroboscopic_off();
	lightController.rainbow_off();
	lightController.lights_off();
	res.send({message: "Lights turned off", color: `Red: 0, Green: 0, Blue: 0`})
});

app.get('/api/modes_off', (req, res) => {
	console.log("modes_off called")
	function modes-off()
	{
		lightController.stroboscopic_off();
		lightController.rainbow_off();
	}
	res.send({message: "Modes turned off", colors:` Red: ${r}, Green: ${g}, Blue: ${b}`})
});


app.get('/api/setColor', (req, res) => {
	const {r, g, b} = req.query;

	if(r || g || b){
		if((r>255 || g>255 || b>255) || (r<0 || g<0 || b<0))
		{
			res.status(500);
			res.send({message: "All the parameters must be numbers within 0 - 255"})
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
	modes-off()
	const { red, green, blue } = lightController.state.currentColor;
	if(lightController.state.stroboscop)
	{
		lightController.stroboscopic_off();
		res.send({message: "Stroboscopic-off"})
		lightController.set_color(red, green, blue);
	}
	else
		if((red || green || blue) && lightController.state.rainbow==false)
		{
			lightController.stroboscopic_on();
			res.send({message: "Stroboscopic-on"})
		}	
		else
		{
			res.status(500);
			res.send({message: "Please select colors or close other modes before performing this action!"})
		}
});

app.get('/api/toggleRainbow', (req, res) => {
	modes-off()
	if(lightController.state.rainbow)
	{
		lightController.rainbow_off();
		res.send({message: "Rainbow_off"})
	}
	else
	{
		if(lightController.state.stroboscop==false)
		{
			lightController.rainbow_on();
			res.send({message: "Rainbow-on"})
			console.log("toggleRainbow");
		}
		else
			res.send({message: "Please close other modes before performing this action!"})
	}
});


app.listen(3000)

