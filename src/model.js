import React from 'react';
import { formatCurrency } from './utils';

class Entry {
    _totalValue = 0;
    _inputRef = React.createRef();

    constructor(totalValue) {
        this._totalValue = totalValue;
    }

    setTotalValue(totalValue) {
        this._totalValue = totalValue;
    }

    getTotalValue() {
        return this._totalValue;
    }

    getRef() {
        return this._inputRef;
    }

    toJSON() {
        return this.getTotalValue();
    }
}

class Model {
    _data = new Map();

    _render() {
        for (const [_, entry] of this._data.entries()) {
            entry.getRef().current.value = entry.getTotalValue();
            void _; // Suppress unused warning
        }
    }

    getNames() {
        return this._data.keys();
    }

    setTotalValue(name, totalValue) {
        this._data.get(name).setTotalValue(totalValue);
    }

    getTotalValue(name) {
        return this._data.get(name).getTotalValue();
    }

    getRef(name) {
        return this._data.get(name).getRef();
    }

    fromJSON(jsonData) {
        for (const [name, totalValue] of jsonData)
            this._data.get(name).setTotalValue(totalValue);
    }

    toJSON() {
        return Array.from(this._data.entries());
    }

    _renderOne(name) {
        this._data.get(name).getRef().current.value = formatCurrency(
            model.currency.getCurrency(),
            this._data.get(name).getTotalValue(),
        );
    }

    render(name) {
        if (name) {
            this._renderOne(name)
        } else {
            for (const name of this._data.keys())
                this._renderOne(name);
        }
    }
}

class AssetEntry extends Entry { };

class AssetModel extends Model {
    addEntry(name, totalValue) {
        this._data.set(name, new AssetEntry(totalValue));
    }
}

class LiabilityEntry extends Entry {
    _monthlyPayment = 0;

    constructor(monthlyPayment, totalValue) {
        super(totalValue);
        this._monthlyPayment = monthlyPayment;
    }

    getMonthlyPayment() {
        return this._monthlyPayment;
    }
}

class LiabilityModel extends Model {
    addEntry(name, monthlyPayment, totalValue) {
        this._data.set(name, new LiabilityEntry(monthlyPayment, totalValue));
    }

    getMonthlyPayment(name) {
        return this._data.get(name).getMonthlyPayment();
    }
}

class CurrencyModel {
    _data = 'CAD';

    getAllCurrencyNames() {
        // First 10 of https://api.exchangeratesapi.io/latest
        return [
            'CAD',
            'HKD',
            'ISK',
            'PHP',
            'DKK',
            'HUF',
            'CZK',
            'GBP',
            'RON',
            'SEK',
        ];
    }

    setCurrency(currency) {
        this._data = currency;
    }

    getCurrency() {
        return this._data;
    }

    toJSON() {
        return this.getCurrency();
    }
}

const cashAndInvestments = new AssetModel();
const longTermAssets = new AssetModel();

const shortTermLiabilities = new LiabilityModel();
const longTermDebt = new LiabilityModel();

const currency = new CurrencyModel();

// Pre-populated data
cashAndInvestments.addEntry('Checking', 2000);
cashAndInvestments.addEntry('Savings for Taxes', 4000);
cashAndInvestments.addEntry('Rainy Day Fund', 506)
cashAndInvestments.addEntry('Savings for Fun', 5000);
cashAndInvestments.addEntry('Savings for Travel', 400);
cashAndInvestments.addEntry('Savings for Personal Development', 200);
cashAndInvestments.addEntry('Investment 1', 5000);
cashAndInvestments.addEntry('Investment 2', 60000);
cashAndInvestments.addEntry('Investment 3', 24000);

longTermAssets.addEntry('Primary Home', 455000);
longTermAssets.addEntry('Secondary Home', 1564321);
longTermAssets.addEntry('Other', 0);

shortTermLiabilities.addEntry('Credit Card 1', 200, 4342);
shortTermLiabilities.addEntry('Credit Card 2', 150, 322);

longTermDebt.addEntry('Mortgage 1', 2000, 250999);
longTermDebt.addEntry('Mortgage 2', 3500, 632634);
longTermDebt.addEntry('Line of Credit', 500, 10000);
longTermDebt.addEntry('Investment Loan', 700, 10000);

const model = {
    cashAndInvestments,
    longTermAssets,
    shortTermLiabilities,
    longTermDebt,
    currency,
};

export default model;
