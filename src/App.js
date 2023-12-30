import React from 'react';
import './App.css';

// Input operation 
const operation = {
  Number: "NUMBER",
  Operator: "OPERATOR"
};

// Operators
const operators = {
  DIV: 1,             // Division
  MUL: 2,             // Multiplication
  ADS: 4,             // Addition or subtraction
};

/* Does current calculation contain specific operator defined above?
 * Always set to null after calculation is finished.
 * example:
 *    containOperators |= operators.DIV; 
 */
let containOperators = null;

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
    this.handleResult = this.handleResult.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }
  handleDelete() {
    if (totalVal.length > 0) {
      totalVal = totalVal.substring(0, totalVal.length - 1);

      this.setState({
        display: totalVal
      });
    }
  }
  handleClear() {
    this.setState({
      operation: operation.Number,
      input: [],
      display: "",
      result: 0
    })

    currVal = "";
    totalVal = "";
    prevValue = "";
  }
  handleResult() {
    // Skip if input is empty
    if (this.state.input.length < 1) return;

    // Clean up before calculation
    switch (this.state.operation) {
      case operation.Number:
        this.setState({
          display: "",
          input: [...this.state.input, totalVal]
        }, this.handleCalculate);
        break;
      case operation.Operator:
        this.setState({
          display: "",
          input: [...this.state.input, currVal, '0']
        }, this.handleCalculate);
        break;
      default:
        console.error("Invalid operation");
        return;
    }
  }
  handleCalculate() {
    currVal = "";
    prevValue = "";

    const input = this.state.input;
    // For benchmarking only
    // const timeStart = (new Date()).getTime();

    // console.log(input.length);
    // console.log(input);

    do {
      // Do division
      if (containOperators & operators.DIV) {
        for (let i = 1; i < input.length; i += 2) {
          // console.log(`DIV: ${input}`);
  
          let a = input[i - 1];
          let o = input[i];
          let b = input[i + 1];
  
          // console.log(`div index ${j}`);
          
          // If a and/or b is zero; skip the calculation.
          if (a === '0' || b === '0') {
            console.error("Error = Can't divide by zero");
  
            this.setState({
              display: "Can't divide by zero",
              input: []
            });
  
            return;
          }
  
          if (o === '/') {
            // Calculate
            totalVal = parseFloat(a) / parseFloat(b);
            // Change the previous element into the result
            input[i - 1] = totalVal.toString();
            // Trim
            input.splice(i, 2);
  
            // console.log(`DIV ${a} ${o} ${b} = ${totalVal}`);
          }
        }
      }

      // Do multiplication
      if (containOperators & operators.MUL) {
        for (let i = 1; i < input.length; i += 2) {
          // console.log(`MUL: ${input}`);
  
          let a = input[i - 1];
          let o = input[i];
          let b = input[i + 1];
  
          if (o === 'x') {
            // Calculate`
            totalVal = parseFloat(a) * parseFloat(b);
            // Change the previous element into the result
            input[i - 1] = totalVal.toString();
            // Trim
            input.splice(i, 2);
  
            // console.log(`MUL ${a} ${o} ${b} = ${totalVal}`);
          }
        }
      }

      // Do addition/subtraction
      if (containOperators & operators.ADS) {
        for (let i = 1; i < input.length; i += 2) {
          // console.log(`ADD/SUB: ${input}`);
  
          let a = input[i - 1];
          let o = input[i];
          let b = input[i + 1];
  
          if (o === '+') {
            // Calculate
            totalVal = parseFloat(a) + parseFloat(b);
            // Change the previous element into the result
            input[i - 1] = totalVal.toString();
            // Trim
            input.splice(i, 2);
  
            // console.log(`ADD ${a} ${o} ${b} = ${totalVal}`);
          } else if (o === '-') {
            // Calculate
            totalVal = parseFloat(a) - parseFloat(b);
            // Change the previous element into the result
            input[i - 1] = totalVal.toString();
            // Trim
            input.splice(i, 2);
  
            // console.log(`SUB ${a} ${o} ${b} = ${totalVal}`);
          } 
        }
      }
    } while (input.length >= 3);

    // console.log(input);
    // const timeEnd = (new Date()).getTime() - timeStart;
    // console.log(`Finished time: ${timeEnd}ms`);

    this.setState({
      operation: operation.Number,
      input: [],
      result: totalVal
    }, () => { 
      totalVal = totalVal.toString(); 
      containOperators = null;
    });
  }
  handleNumber() {
    // Clean up and change operation
    if (this.state.operation !== operation.Number) {
      // Add the operator into registry
      switch (currVal) {
        case '/':
          containOperators |= operators.DIV;
          break;
        case 'x':
          containOperators |= operators.MUL;
          break;
        case '+':
        case '-':
          containOperators |= operators.ADS
          break;
        default:
          break;
      }

      this.setState({
        operation: operation.Number,
        input: [...this.state.input, currVal]
      });

      currVal = "";
    }

    const el = document.activeElement;
    currVal = el.innerHTML;

    prevValue = currVal;
    /**
     * If previous value store a 0 or null, replace it and store a new number.
     * Otherwise, add the number into totalVal.
     */
    totalVal = (prevValue === null || totalVal === '0') ? currVal : totalVal.concat(prevValue);

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
              <button id="divide" onClick={this.handleDelete}>
                <i class="fa-solid fa-delete-left"></i>
              </button>
            </td>
            <td>
              <button id="divide" onClick={this.handleOperator}>/</button>
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
              <button id="multiply" onClick={this.handleOperator}>x</button>
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
              <button id="subtract" onClick={this.handleOperator}>-</button>
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
            <td>
              <button id="add" onClick={this.handleOperator}>+</button>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button id="zero" onClick={this.handleNumber}>0</button>
            </td>
            <td>
              <button id="decimal" onClick={this.handleNumber}>.</button>
            </td>
            <td>
              <button id="equals" onClick={this.handleResult}>=</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
