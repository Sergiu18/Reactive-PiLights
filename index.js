const lightController = require('./lights_control.js');
const express = require('express');
const app = express();

// lightController.set_color(51, 235, 110);
// lightController.stroboscopic_on();


app.use('/', express.static('public'));

app.get('/api/setColor', (req, res) => {
	const {r, g, b} = req.query;
	if(r && g && b) {
		lightController.set_color(r, g, b);
		res.send({
			error: false,
			data: {
				message: "set colors success",
				colors: {r, g, b}
			}
		});
		return;
	}
	if()
	res.status(500);
	res.send({
		message: `invalid colors ${r}, ${g}, ${b}`
	})
});

app.get('/api/toogleStroboscopic', (req, res) => {
	if(lightController.state.stroboscop == true)
	{
		if(!(r=0 && g=0 && b=0))
			res.send(lightController.stroboscopic_off());
		else
		{
			lightController.set_color(r, g, b);
			res.send(lightController.stroboscopic_off());
		}
	}
	else
		res.send(lightController.stroboscopic_on());
});

app.listen(3000)

