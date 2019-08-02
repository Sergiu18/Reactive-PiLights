const lightController = require('./lights_control.js');
const express = require('express');
const app = express();

// lightController.set_color(51, 235, 110);
// lightController.stroboscopic_on();


app.use('/', express.static('public'));

app.get('/api/setColor', (req, res) => {
	const {r, g, b} = req.query;

	if(r || g || b){
		if((r>255 || g>255 || b>255) || (r<0 || g<0 || b<0))
		{
			res.status(500);
			res.send({message: "all the colors should be within 0 - 255"})
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

app.listen(3000)

