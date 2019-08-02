const lightController = require('./lights_control.js');
const express = require('express');
const app = express();

// lightController.set_color(51, 235, 110);
// lightController.stroboscopic_on();


app.use('/', express.static('public'));

app.get('/api/setColor', (req, res) => {
	const {r, g, b} = req.query;
	lightController.state.currentColor.red=r;
	lightController.state.currentColor.green=g;
	lightController.state.currentColor.blue=b;
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
	res.status(500);
	res.send({
		message: `invalid colors ${r}, ${g}, ${b}`
	})
});

app.get('/api/toggleStroboscopic', (req, res) => {
	if(lightController.state.stroboscop == true)
	{
		res.send(lightController.stroboscopic_off(lightController.state.currentColor.red, lightController.state.currentColor.green, lightController.state.currentColor.blue, ));
		lightController.set_color(r, g, b);
	}
	else
		res.send(lightController.stroboscopic_on());
});

app.listen(3000)

