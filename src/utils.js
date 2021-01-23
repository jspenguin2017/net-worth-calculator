export const formatCurrency = (currency, value) => {
    // Show '$' instead of 'CA$'
    if (currency === 'CAD')
        currency = 'USD'

    const formatter = new Intl.NumberFormat('en', { style: 'currency', currency });

    return formatter.format(value);
};
