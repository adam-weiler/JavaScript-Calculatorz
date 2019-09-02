import React from 'react';
import Buttons from './Buttons';

/*Creates a button for each element in the arithmetics_arr.js array.
buttons are parameters from arithmetics_arr.js array.
clicker is a reference to the handleClick function in App.js.
*/
const ButtonList = ({ buttons, clicker }) => {
	return (
	<div id="allButtons">
		{
			buttons.map((user, i) => { //Maps each item in the arithmetics_arr.js array to a unique Button.
				return (
					<Buttons key={buttons[i].id} id={buttons[i].id} value={buttons[i].value} sign={buttons[i].sign} type={buttons[i].type} clicker={clicker} />
				);
			})
		}
	</div>		
	);
}

export default ButtonList;