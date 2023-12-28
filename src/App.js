import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="main">
        <div id="screen">
          <div id="display">0</div>
          <div id="result">0</div>
        </div>
        <table>
          <tr>
            <td colSpan="2">
              <button id="clear" style={{backgroundColor: "rgb(150, 10, 10)"}}>AC</button>
            </td>
            <td>
              <button id="divide">/</button>
            </td>
            <td>
              <button id="multiply">x</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="seven">7</button>
            </td>
            <td>
              <button id="eight">8</button>
            </td>
            <td>
              <button id="nine">9</button>
            </td>
            <td>
              <button id="subtract">-</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="four">4</button>
            </td>
            <td>
              <button id="five">5</button>
            </td>
            <td>
              <button id="six">6</button>
            </td>
            <td>
              <button id="add">+</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="one">1</button>
            </td>
            <td>
              <button id="two">2</button>
            </td>
            <td>
              <button id="three">3</button>
            </td>
            <td rowSpan="2">
              <button id="equals" style={{height: 135 + 'px'}}>=</button>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button id="zero">0</button>
            </td>
            <td>
              <button id="decimal">.</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
