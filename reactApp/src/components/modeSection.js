import React from 'react';
import PropTypes from 'prop-types';
import './modeSection.css';
import  Button  from './button.js';
import {off} from './server-comunication.js'
import {stroboscopic} from './server-comunication.js'
import {rainbow} from './server-comunication.js'
import {setColor} from './server-comunication.js'

export default function ModeSection(props) 
{ 
	function modeChanged(event) {
		props.onModeChange("mode")
		off().then(state => {props.onStateChange(state)});

	}

	function stroboChange(event) {
		props.onModeChange("strobo")
		stroboscopic().then(state => {props.onStateChange(state)});
		console.log(event)
	}

	function rainbowChange(event) {
		props.onModeChange("rainbow")
		rainbow().then(state => {props.onStateChange(state)});
	}

	function lightsChanged(event) {
		props.onLightStateChange(event.target.checked)
		if(event.target.checked)
			setColor(255,255,255).then(state => {props.onStateChange(state)});
		else
			setColor(0,0,0).then(state => {props.onStateChange(state)});
	}

	function micChanged(event) {
		props.onModeChange("mic")
	}

	function breathChange(event) {
		props.onModeChange("breath")
	}

  	return <div className="modesSection">
  		<div className="div">
	  		<Button 
	  			id="lights" 
	  			name="modesSection" 
	  			type="checkbox"
	  			checked={props.lightState}
	  			onChange={lightsChanged}
	  		/>	
		    <Button 
			    id="mode" 
			    name="modesSection" 
			    type="radio" 
			    checked={props.currentMode === "mode"}
			    onChange={modeChanged}
		    />
		    <Button 
				id="mic" 
				name="modesSection"
				type="radio" 		    
				checked={props.currentMode === "mic"}
				onChange={micChanged}
			/>
		</div>	
		<div className="div">
			<Button 
				id="strobo" 
				name="modesSection" 
				type="radio" 		    
				checked={props.currentMode === "strobo"}
				onChange={stroboChange}
			/>
			<Button 
				id="rainbow" 
				name="modesSection"
				type="radio" 		    
				checked={props.currentMode === "rainbow"}
				onChange={rainbowChange}
			/>
			<Button 
				id="breath" 
				name="modesSection"
				type="radio" 		    
				checked={props.currentMode === "breath"}
				onChange={breathChange}
			/>
		</div>
    </div>
}

ModeSection.propTypes = {
	lightState: PropTypes.bool.isRequired,
	currentMode: PropTypes.string.isRequired,
	onModeChange: PropTypes.func.isRequired,
	onStateChange: PropTypes.func.isRequired,
	onLightStateChange: PropTypes.func.isRequired
};