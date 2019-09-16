import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default function Button(props)
{
	return <label htmlFor={props.id} className={"button " + props.id}>
    	<input 
	    	id={props.id}
	    	type={props.type} 
	    	name={props.name}
	    	onChange={props.onChange}
	    	checked={props.checked}
    	/>
    	<div></div>
	</label>
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};