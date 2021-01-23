import './App.css';
import React from 'react';
import model from './model';
import { formatCurrency } from './utils';

const API_URL = 'http://localhost:3001/api';

class Component extends React.Component {
    state = {
        netWorth: 1212130,
        totalAssets: 2120427,
        totalLiabilities: 908297,
        exchangeRate: 1,
        busy: true,
    };

    restoreModel(jsonData) {
        model.currency.setCurrency(jsonData.currency);
        model.cashAndInvestments.fromJSON(jsonData.cashAndInvestments);
        model.longTermAssets.fromJSON(jsonData.longTermAssets);
        model.shortTermLiabilities.fromJSON(jsonData.shortTermLiabilities);
        model.longTermDebt.fromJSON(jsonData.longTermDebt);
    }

    refreshInputs() {
        model.cashAndInvestments.refreshInputs();
        model.longTermAssets.refreshInputs();
        model.shortTermLiabilities.refreshInputs();
        model.longTermDebt.refreshInputs();
    }

    recalculate() {
        this.setState({ busy: true });
        fetch(`${API_URL}/set`, {
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
                alert('Failed to call /set, check the console.');
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
        fetch(`${API_URL}/get`, {
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
                alert('Failed to call /get, check the console.');
                console.error(err);
            });
    }

    componentDidUpdate() {
        this.refreshInputs();
    }

    getTable(currentModel, name, showMonthlyPayment = false) {
        let rows = [];
        for (const name of currentModel.getNames()) {
            rows.push(
                <tr key={name}>
                    <td>{name}</td>
                    {
                        showMonthlyPayment ? (
                            <td className="align-right pad-right">
                                {
                                    formatCurrency(
                                        model.currency.getCurrency(),
                                        currentModel.getMonthlyPayment(name) * this.state.exchangeRate,
                                    )
                                }
                            </td>
                        ) : null
                    }
                    <td className="align-right input">
                        <input className="input"
                            ref={currentModel.getInputRef(name)}
                            onBlur={this.handleValueChange.bind(this, currentModel, name)}></input>
                    </td>
                </tr>
            );
        }

        return (
            <table className="gray">
                <thead>
                    <tr>
                        <th className={showMonthlyPayment ? "width60 border2" : "width80 border2"}>{name}</th>
                        {
                            showMonthlyPayment ? <th className="width20 border2">Monthly Payment</th> : null
                        }
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
            <>
                <div className="align-right">
                    <span className="bold gray">
                        Select Currency:&nbsp;
                        <select className="bold input"
                            value={model.currency.getCurrency()}
                            onChange={this.handleCurrencyChange.bind(this)}>
                            {
                                model.currency.getAllCurrencyNames()
                                    .map(currency => <option value={currency} key={currency}>{currency}</option>)
                            }
                        </select>
                    </span>
                </div>
                <hr></hr>

                <div>
                    <div>
                        <span className="bold output float-left">
                            Net Worth
                        </span>
                        <span className="bold output float-right">
                            {
                                formatCurrency(
                                    model.currency.getCurrency(),
                                    this.state.netWorth,
                                )
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
                        this.getTable(
                            model.cashAndInvestments,
                            "Cash and Investments",
                        )
                    }
                </div>
                <div>
                    {
                        this.getTable(
                            model.longTermAssets,
                            "Long Term Assets",
                        )
                    }
                </div>

                <div>
                    <div>
                        <span className="bold output float-left">
                            Total Assets
                        </span>
                        <span className="bold output float-right">
                            {
                                formatCurrency(
                                    model.currency.getCurrency(),
                                    this.state.totalAssets,
                                )
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
                        this.getTable(
                            model.shortTermLiabilities,
                            "Short Term Liabilities",
                            true,
                        )
                    }
                </div>
                <div>
                    {
                        this.getTable(
                            model.longTermDebt,
                            "Long Term Debt",
                            true,
                        )
                    }
                </div>

                <div>
                    <div>
                        <span className="bold output float-left">
                            Total Liabilities
                        </span>
                        <span className="bold output float-right">
                            {
                                formatCurrency(
                                    model.currency.getCurrency(),
                                    this.state.totalLiabilities,
                                )
                            }
                        </span>
                        <span className="clear"></span>
                    </div>
                </div>
                <br></br>
                <hr></hr>

                <br></br>
                <br></br>
            </>
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
