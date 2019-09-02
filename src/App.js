import React, { Component } from 'react';
import ButtonList from './ButtonList.js';
import { arithmetics_arr } from './arithmetics_arr';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formula_val: '', //Value shown in "Formula" div.
			display_val: 0, //Value shown in "Display" div.
			current_length: 0, //Counts length of current number.
			decimal_FLAG: false //Prevents user from entering multiple decimals within the same number.
		};
		this.handleClick = this.handleClick.bind(this); //Handles any button clicks.
	}

	componentDidMount() { //When the webpage first loads.
		const fCCscript = document.createElement("script");
		fCCscript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
		fCCscript.async = true;
		document.body.appendChild(fCCscript); //Needed to for freeCodeCamp Test Suite.
	}

	handleClick(value, type) { //The user click a calculator button.
		//console.log("1 Mouse click: value is " + value + " " + type);
		switch (type) { //User hit a number button, between 0 and 9.
			case 'numbers':
				this.newNum(value);
				break;

			case 'operators': //User hit a math operator button, + - x or Ã·.
				this.newOperator(value)
				break;

			case 'decimal': //User hit the decimal . button.
				this.decimal(value);
				break;

			case 'clear': //User hit clear AC button.
				this.clear();
				break;

			default: //User hit the equals = button.
				this.equals();
				break;
		}
	}

	newNum(value) { //User entered a number between 0 and 9.
		//console.log("2 User entered a number: " + value);
		let currFormula = this.state.formula_val; //Current formula.
		let currLength = this.state.current_length + 1; //Gets current length of string and adds 1.

		if (currFormula.charAt(0) === "0") { //If first character of equation is 0, removes it.
			console.log("firstchar", currFormula.charAt(0))
			currFormula = currFormula.slice(0, -1);
		}

		if (currLength <= 9) { //Prevents current number being greater than 9 digits.
			currFormula = currFormula.concat(value);
		}

		this.setState({ //Updates the formula, the display, and the current length of number.
			formula_val: currFormula, //Adds the number to the formula.
			display_val: currFormula,
			current_length: currLength //Increases the length of current number by 1.
		});
		// console.log("formula_val, display_val: " + this.state.formula_val);
		// console.log("currLength: " + this.state.current_length);
	}

	newOperator(value) { //User entered a math operator, + - x or Ã·.
		//console.log("3 User entered an operator: " + value);
		let currFormula = this.state.formula_val; //Current formula.
		let lastChar = currFormula[currFormula.length - 1]; //Gets the last character entered.
		//console.log("lastChar: " + lastChar);

		//If user entered an operator and then another operator, the first operator is erased.
		if ((lastChar === "+") || (lastChar === "-") || (lastChar === "*") || (lastChar === "/")) {
			currFormula = currFormula.slice(0, -1);
		}

		this.setState({
			formula_val: currFormula = currFormula.concat(value), //Adds the operator to the current formula.
			current_length: 0, //Resets length of number to 0.
			decimal_FLAG: false //Resets decimal flag to false.
		});
		// console.log("formula_val: " + this.state.formula_val);
		// console.log("currLength: " + this.state.current_length);
		// console.log("decimal_FLAG: " + this.state.decimal_FLAG);
	}

	equals() { //User entered the equals = button.
		//console.log("4 User hit equal.");
		let currFormula = this.state.formula_val; //Current formula.

		if (currFormula) { //If a formula value exists, add brackets around current formula.
			currFormula = "(".concat(currFormula).concat(")");
		} else { //If there is no formula value, current formula is set to 0.
			currFormula = 0;
		}

		this.setState({
			formula_val: currFormula, //Updates the formula value.
			display_val: eval(currFormula), //Evaluates the current formula and updates the display value.
			current_length: 0, //Resets length of number to 0.
			decimal_FLAG: false //Resets decimal flag to false.
		});
		// console.log("formula_val, display_val: " + this.state.formula_val);
		// console.log("currLength: " + this.state.current_length);
		// console.log("decimal_FLAG: " + this.state.decimal_FLAG);
	}

	decimal(value) { //User entered the decimal . button.
		//console.log("5 User hit a decimal: " + value);
		let currFormula = this.state.formula_val; //Current formula.

		if (this.state.decimal_FLAG === false) { //If there are no decimals in current number, it adds one.
			currFormula = currFormula.toString().concat(value);
		}

		this.setState({
			formula_val: currFormula, //Updates the formula value.
			display_val: currFormula, //Updates the display value.
			decimal_FLAG: true //There is now a decimal in current number, flag is raised.
		});
		// console.log("formula_val, display_val: " + this.state.formula_val);
		// console.log("decimal_FLAG: " + this.state.decimal_FLAG);
	}

	clear() { //User entered the clear AC button. Resets all values to default.
		//console.log("6 User hit clear.");
		this.setState({
			formula_val: '',
			display_val: 0,
			current_length: 0,
			decimal_FLAG: false
		});
		// console.log("formula_val: " + this.state.formula_val);
		// console.log("display_val: " + this.state.display_val);
		// console.log("currLength: " + this.state.current_length);
		// console.log("decimal_FLAG: " + this.state.decimal_FLAG);
	}

	render() {
		return ( <div className="App" id="App">
			<h1>Calculator in React:</h1> 
			<div id = "calculator">
				<div id="formula"> {this.state.formula_val} </div>
				<div id="display"> {this.state.display_val} </div>
				<ButtonList buttons={arithmetics_arr} clicker={this.handleClick} /> </div>
			</div>
		);
	}
}

export default App;