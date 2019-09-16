import axios from 'axios';

const route = "http://192.168.100.32:3000/api"
function handleError(error)
{
	console.log("Error:", error);
}

export function setColor(r,g,b)
{
	return axios.get(route + `/setColor`, {
		params:{
			r: r,
			g: g,
			b: b 
		}
	}).then(res => {
		return res.data.data.state;
	}).catch(err => {
		handleError(err)
	})
}

export function off()
{
	return axios.get(route + `/modes_off`)
	.then(res => {
		return res.data.data.state;
	}).catch(err => {
		handleError(err)
	})	
}

export function stroboscopic()
{
	return axios.get(route + `/toggleStroboscopic`)
	.then(res => {
		return res.data.data.state;
	}).catch(err => {
		handleError(err)
	})	
}

export function rainbow()
{
	return axios.get(route + `/toggleRainbow`)
	.then(res => {
		return res.data.data.state;
	}).catch(err => {
		handleError(err)
	})	
}

export function returnState()
{
	return axios.get(route + `/returnState`)
		.then(res => {
			return res.data.data.state;
		}).catch(err => {
			handleError(err)
		})
}