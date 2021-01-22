import './App.css';
import React from 'react';
import model from './model';
import { formatCurrency } from './utils';

const API_URL = 'http://localhost:3001/api/';

class Component extends React.Component {
    state = {
        netWorth: 1212130,
        totalAssets: 2120427,
        totalLiabilities: 908297,
        busy: true,
    };

    restoreModel(jsonData) {
        model.currency.setCurrency(jsonData.currency);
        model.cashAndInvestments.fromJSON(jsonData.cashAndInvestments);
        model.longTermAssets.fromJSON(jsonData.longTermAssets);
        model.shortTermLiabilities.fromJSON(jsonData.shortTermLiabilities);
        model.longTermDebt.fromJSON(jsonData.longTermDebt);
    }

    renderInputs() {
        model.cashAndInvestments.render();
        model.longTermAssets.render();
        model.shortTermLiabilities.render();
        model.longTermDebt.render();
    }

    recalculate() {
        this.setState({ busy: true });
        fetch(`${API_URL}set`, {
            method: 'POST',
            body: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json())
            .then((jsonData) => {
                this.restoreModel(jsonData.model);
                this.setState(Object.assign(jsonData.data, { busy: false }));
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleCurrencyChange(event) {
        if (this.state.busy)
            return;

        model.currency.setCurrency(event.target.value);
        this.recalculate();
    }

    handleValueChange(model, name, event) {
        if (this.state.busy)
            return;

        let value = event.target.value;
        value = value.replace(/[^0-9.]/g, '');
        value = Number.parseFloat(value);

        model.setTotalValue(name, value);
        this.recalculate();
    }

    componentDidMount() {
        fetch(`${API_URL}get`, {
            method: 'POST',
            body: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json())
            .then(this.restoreModel)
            .then(() => {
                this.recalculate();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    componentDidUpdate() {
        this.renderInputs();
    }

    getTable(model, name) {
        let rows = [];
        for (const name of model.getNames()) {
            rows.push(
                <tr key={name}>
                    <td>{name}</td>
                    <td className="align-right input">
                        <input className="input"
                            ref={model.getRef(name)}
                            onBlur={this.handleValueChange.bind(this, model, name)}></input>
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
                        <select className="bold input"
                            value={model.currency.getCurrency()}
                            onChange={this.handleCurrencyChange.bind(this)}>
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
                                formatCurrency(model.currency.getCurrency(), this.state.netWorth)
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
                                formatCurrency(model.currency.getCurrency(), this.state.totalAssets)
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
                                formatCurrency(model.currency.getCurrency(), this.state.totalLiabilities)
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
