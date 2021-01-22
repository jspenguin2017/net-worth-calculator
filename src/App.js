import './App.css';
import React from 'react';
import model from './model.js';

class Component extends React.Component {
  state = {
    netWorth: 1212130,
    totalAssets: 2120427,
    totalLiabilities: 908297,
  };

  defaultFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });

  formatCurrency(value, currency) {
    // Show '$' instead of 'CA$'
    if (currency === 'CAD')
      currency = 'USD'

    const formatter = currency ? new Intl.NumberFormat('en', {style: 'currency', currency}) : this.defaultFormatter;

    return formatter.format(value);
  }

  formatCurrencyNoSign(value) {
    return this.formatCurrency(value).replace('$', '');
  }

  recalculate() {
    // TODO
    this.forceUpdate();
  }

  handleCurrencyChange(event) {
    model.currency.changeCurrency(event.target.value);
    this.recalculate();
  }

  getTable(model, name) {
    let rows = [];
    for (const name of model.getNames()) {
      rows.push(
        <tr>
          <td>{name}</td>
          <td className="align-right input">
            $<input className="input" value={this.formatCurrencyNoSign(model.getTotalValue(name))}></input>
          </td>
        </tr>
      );
    }

    return (
      <table className="gray">
        <thead>
          <tr>
            <th className="width80 border2">{name}</th>
            <th className="width20 border2"></th>
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
            <select className="bold input" onChange={this.handleCurrencyChange.bind(this)}>
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
            <span className="bold output float-right">
              {
                this.formatCurrency(this.state.netWorth, model.currency.getCurrency())
              }
            </span>
            <span className="clear"></span>
          </div>
        </div>
        <br></br>
        <hr></hr>

        <br></br>

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

        <div>
          <div>
            <span className="bold output float-left">Total Assets</span>
            <span className="bold output float-right">
              {
                this.formatCurrency(this.state.totalAssets, model.currency.getCurrency())
              }
            </span>
            <span className="clear"></span>
          </div>
        </div>
        <br></br>
        <hr></hr>

        <br></br>
        <br></br>

        <div>
          <span className="bold output">Liabilities</span>
          <br></br>
          <hr></hr>
        </div>

        <div>
          {
            this.getTable(model.shortTermLiabilities, "Short Term Liabilities")
          }
        </div>
        <div>
          {
            this.getTable(model.longTermDebt, "Long Term Debt")
          }
        </div>

        <div>
          <div>
            <span className="bold output float-left">Total Liabilities</span>
            <span className="bold output float-right">
              {
                this.formatCurrency(this.state.totalLiabilities, model.currency.getCurrency())
              }
            </span>
            <span className="clear"></span>
          </div>
        </div>
        <br></br>
        <hr></hr>

        <br></br>
        <br></br>
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
