const lightController = require('./lights_control.js');
const express = require('express');
const app = express();

// lightController.set_color(51, 235, 110);
// lightController.stroboscopic_on();


app.use('/', express.static('public'));

app.get('/api/setColor', (req, res) => {
	const {r, g, b} = req.query;
	res.send(lightController.set_color(r, g, b));
});

app.get('/api/toogleStroboscopic', (req, res) => {
	if(lightController.state.stroboscop==true)
		res.send(lightController.stroboscopic_on());
	else
		res.send(lightController.stroboscopic_off());
});

app.listen(3000)

