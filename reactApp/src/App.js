import React, { Component } from 'react';
import './App.css';
import  ColorPicker  from './components/colorPicker.js';
import  ModeSection  from './components/modeSection.js';
import {returnState} from './components/server-comunication.js';
import io from 'socket.io-client';


export default class App extends Component 
{
	state = {
		background: {
			r: 255,
			g: 255,
			b: 255	
		},
		currentMode: "mode",
		lightState: true
	};

	socket = io();

	componentDidMount()
	{
		returnState().then(state => {this.changeAppState(state)});
		this.socket.on('xxx', console.log);

	}

	changeAppState = state => {
		this.setState(state);
	}
	
	handleChangeComplete = (color) => {
		this.setState({ background: color.rgb });
	};

	handleModeChanged = (mode) => {
		this.setState({ currentMode: mode })
	}

	handleLightStateChanged = (state) => {
		this.setState({ lightState: state })
	}

	render()
	{
		const {r,g,b} = this.state.background;

		return<div className="App">
			<div className="colorPickerSection" style={{background: `rgb(${r},${g},${b})`}}>
				<br />
		    	<h1 style={{color: `rgb(${255 - r},${255 - g},${255 - b})`}}><center>Reactive Pi-Lights</center></h1>
		    	<div></div>
		    	<ColorPicker 
		    		color={this.state.background}
		    		onChange={this.handleChangeComplete }
		    		onStateChange={this.changeAppState}
		    	/> 
		    </div>
		    <ModeSection 
			    currentMode={this.state.currentMode} 
			    lightState={this.state.lightState}
			    onLightStateChange={this.handleLightStateChanged}
			    onModeChange={this.handleModeChanged}
			    onStateChange={this.changeAppState}
		    />
		</div>
	}
}



