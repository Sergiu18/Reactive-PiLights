import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import './colorPicker.css';
import {setColor} from './server-comunication.js'

export default function ColorPicker(props)
{
	function handleChange(event)
	{
		setColor(event.rgb.r,event.rgb.g,event.rgb.b).then(state => {props.onStateChange(state)});
	}
  	return <div>
    	<ChromePicker 
	    	onChange={handleChange}
	    	color={props.color} 
	    	disableAlpha={true}	
	    	className='colorPicker'
	    />
    </div>
} 


ColorPicker.propTypes = {
	onChange: PropTypes.func.isRequired,
	color: PropTypes.object.isRequired,
	onStateChange: PropTypes.func.isRequired
};