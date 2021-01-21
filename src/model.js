class AssetModel {
    #data = new Map();

    addEntry(name, totalValue) {
        this.#data.set(name, totalValue);
    }

    getNames() {
        return this.#data.keys();
    }

    getTotalValue(name) {
        return this.#data.get(name);
    }

    serialize() {
        return JSON.stringify(Array.from(this.#data.entries()));
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

    serialize() {
        return JSON.stringify(Array.from(this.#data.entries()));
    }
}

export const cashAndInvestments = new AssetModel();
export const longTermAssets = new AssetModel();

export const shortTermLiabilities = new LiabilityModel();
export const longTermDebt = new LiabilityModel();

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
longTermDebt.addEntry('Mortgage 1', 500, 10000);
longTermDebt.addEntry('Mortgage 1', 700, 10000);
