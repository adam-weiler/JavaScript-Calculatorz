import React from 'react';

/*Creates a single button for an element in the arithmetics_arr.js array.
id and value are parameters from buttons.
clicker is a reference to the handleClick function in App.js.
*/
const Button = ({ id, value, sign, type, clicker }) => {
	return (
		<div className="keyPad" id={`${id}`} onClick={() => clicker(value, type)}>{sign || value}
		</div>
	);
}

export default Button;