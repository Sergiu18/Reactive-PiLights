const lightController = require('./lights_control.js');
const express = require('express');
const app = express();

// lightController.set_color(51, 235, 110);
// lightController.stroboscopic_on();


app.use('/', express.static('public'));

app.get('/api/setColor', (req, res) => {
	const {lightController.state.currentColor.red , lightController.state.currentColor.green, lightController.state.currentColor.blue} = req.query;
	if(lightController.state.currentColor.red & lightController.state.currentColor.green & lightController.state.currentColor.blue) {
		lightController.set_color(lightController.state.currentColor.red , lightController.state.currentColor.green, lightController.state.currentColor.blue);
		res.send({
			error: false,
			data: {
				message: "set colors success",
				colors: {lightController.state.currentColor.red , lightController.state.currentColor.green, lightController.state.currentColor.blue}
			}
		});
		return;
	}
	if()
	res.status(500);
	res.send({
		message: `invalid colors ${lightController.state.currentColor.red}, ${lightController.state.currentColor.green}, ${lightController.state.currentColor.blue}`
	})
});

app.get('/api/toggleStroboscopic', (req, res) => {
	if(lightController.state.stroboscop == true)
	{

		res.send(lightController.stroboscopic_off());
		lightController.set_color(lightController.state.currentColor.red , lightController.state.currentColor.green, lightController.state.currentColor.blue);
	}
	else
		res.send(lightController.stroboscopic_on());
});

app.listen(3000)

