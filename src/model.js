class AssetModel {
    #data = new Map();

    addEntry(name, totalValue) {
        this.#data.set(name, totalValue);
    }

    getNames() {
        return this.#data.keys();
    }

    setTotalValue(name, totalValue) {
        this.#data.set(name, totalValue);
    }

    getTotalValue(name) {
        return this.#data.get(name);
    }

    fromJSON(jsonData) {
        for (const [name, totalValue] of jsonData) {
            this.#data.set(name, totalValue);
        }
    }

    toJSON() {
        return Array.from(this.#data.entries());
    }
}

class LiabilityEntry {
    #monthlyPayment = 0;
    #totalValue = 0;

    constructor(monthlyPayment, totalValue) {
        this.#monthlyPayment = monthlyPayment;
        this.#totalValue = totalValue;
    }

    getMonthlyPayment() {
        return this.#monthlyPayment;
    }

    setTotalValue(totalValue) {
        this.#totalValue = totalValue;
    }

    getTotalValue() {
        return this.#totalValue;
    }

    toJSON() {
        return this.getTotalValue();
    }
}

class LiabilityModel {
    #data = new Map();

    addEntry(name, monthlyPayment, totalValue) {
        this.#data.set(name, new LiabilityEntry(monthlyPayment, totalValue));
    }

    getNames() {
        return this.#data.keys();
    }

    getMonthlyPayment(name) {
        return this.#data.get(name).getMonthlyPayment();
    }

    getTotalValue(name) {
        return this.#data.get(name).getTotalValue();
    }

    fromJSON(jsonData) {
        for (const [name, totalValue] of jsonData)
            this.#data.get(name).setTotalValue(totalValue);
    }

    toJSON() {
        return Array.from(this.#data.entries());
    }
}

class CurrencyModel {
    #data = 'CAD';

    changeCurrency(currency) {
        this.#data = currency;
    }

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

    getCurrency() {
        return this.#data;
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
