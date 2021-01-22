import './App.css';
import React from 'react';
import model from './model.js';

class Component extends React.Component {
  state = {
    netWorth: 1212130,
    totalAssets: 2120427,
    totalLiabilities: 908297,
  };

  handleCurrencyChange(event) {
    model.currency.changeCurrency(event.target.value);
  }

  getTable(model, name) {
    let rows = [];
    for (const name of model.getNames()) {
      rows.push(
        <tr>
          <td>{name}</td>
          <td className="align-right">$<input value={model.getTotalValue(name)}></input></td>
        </tr>
      );
    }

    return (
      <table>
        <thead>
          <tr>
            <th className="width80">{name}</th>
            <th className="width20"></th>
          </tr>
        </thead>
        <tbody>
          {
            rows
          }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <div className="align-right">
          <span className="bold gray">
            Select Output Currency (Inputs Are Always in CAD):&nbsp;
            <select className="bold input" onChange={this.handleCurrencyChange}>
              {
                model.currency.getAllCurrencyNames().map(currency =>
                  <option value={currency} key={currency}>{currency}</option>)
              }
            </select>
          </span>
        </div>
        <hr></hr>

        <div>
          <div>
            <span className="bold output float-left">Net Worth</span>
            <span className="bold output float-right">${this.state.netWorth}</span>
            <span className="clear"></span>
          </div>
        </div>
        <br></br>
        <hr></hr>

        <div>
          <span className="bold output">Assets</span>
          <br></br>
          <hr></hr>
        </div>

        <div>
          {
            this.getTable(model.cashAndInvestments, "Cash and Investments")
          }
        </div>
        <div>
          {
            this.getTable(model.longTermAssets, "Long Term Assets")
          }
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <span className="bold">Tracking Your Net Worth</span>
      <br></br>
      <Component></Component>
    </div>
  );
}

export default App;
