import React from 'react';
import './App.css';

// Enumerator
const operation = {
  Number: "NUMBER",
  Operator: "OPERATOR"
};

// Used to compare current number/operator with previous number/operator
let prevValue = "", currVal = "";
// Number only
let totalVal = ""; 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operation: operation.Number,
      input: [],
      display: "",
      result: 0
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }
  handleClear() {
    this.setState({
      input: [],
      display: "",
      result: 0
    })

    currVal = "";
    totalVal = "";
    prevValue = "";
  }
  handleCalculate() {
    // Skip if input is empty
    if (this.state.input.length < 1) return;

    // Clean up before calculation
    switch (this.state.operation) {
      case operation.Number:
        this.setState({
          input: [...this.state.input, totalVal]
        });
        break;
      case operation.Operator:
        this.setState({
          input: [...this.state.input, currVal, '0']
        });
        break;
      default:
        console.error("Invalid operation");
        return;
    }

    currVal = "";
    totalVal = "";
    prevValue = "";

    for (let i in this.state.input) {
      // Look for multiplication and calculate
      console.log(this.state.input.at(i));
      // Look for division and calculate
      // Add/Subtract from the left
    }
  }
  handleNumber() {
    // Clean up and change operation
    if (this.state.operation !== operation.Number) {
      this.setState({
        operation: operation.Number,
        input: [...this.state.input, currVal]
      });

      currVal = "";
    }

    const el = document.activeElement;
    currVal = el.innerHTML;

    /**
     * If previous value store a 0 or null, replace it and store a new number.
     * Otherwise, add the number into totalVal.
     */
    if (prevValue === null || totalVal === '0') {
      prevValue = currVal
      totalVal = currVal;
    } else {
      prevValue = currVal;
      totalVal = totalVal.concat(prevValue);
    }

    // Set display to print the number
    this.setState({
      display: totalVal
    });
  }
  handleOperator() {
    // Clean up and change operation
    if (this.state.operation !== operation.Operator) {
      this.setState({
        operation: operation.Operator,
        input: [...this.state.input, totalVal]
      });

      currVal = "";
      totalVal = "";
      prevValue = "";
    }

    // Get the current operation input
    const el = document.activeElement;
    currVal = el.innerHTML;

    // Display it immediately
    this.setState({
      display: currVal
    });
  }
  render() {
    return (
      <div id="main">
        <div id="screen">
          <div id="display">{this.state.display}</div>
          <div id="result">{this.state.result}</div>
        </div>
        <table>
          <tr>
            <td colSpan="2">
              <button id="clear" style={{backgroundColor: "rgb(150, 10, 10)"}} onClick={this.handleClear}>AC</button>
            </td>
            <td>
              <button id="divide" onClick={this.handleOperator}>/</button>
            </td>
            <td>
              <button id="multiply" onClick={this.handleOperator}>x</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="seven" onClick={this.handleNumber}>7</button>
            </td>
            <td>
              <button id="eight" onClick={this.handleNumber}>8</button>
            </td>
            <td>
              <button id="nine" onClick={this.handleNumber}>9</button>
            </td>
            <td>
              <button id="subtract" onClick={this.handleOperator}>-</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="four" onClick={this.handleNumber}>4</button>
            </td>
            <td>
              <button id="five" onClick={this.handleNumber}>5</button>
            </td>
            <td>
              <button id="six" onClick={this.handleNumber}>6</button>
            </td>
            <td>
              <button id="add" onClick={this.handleOperator}>+</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="one" onClick={this.handleNumber}>1</button>
            </td>
            <td>
              <button id="two" onClick={this.handleNumber}>2</button>
            </td>
            <td>
              <button id="three" onClick={this.handleNumber}>3</button>
            </td>
            <td rowSpan="2">
              <button id="equals" style={{height: 135 + 'px'}} onClick={this.handleCalculate}>=</button>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button id="zero" onClick={this.handleNumber}>0</button>
            </td>
            <td>
              <button id="decimal" onClick={this.handleNumber}>.</button>
            </td>
          </tr>
        </table>
        {this.state.input}
      </div>
    );
  }
}

export default App;
