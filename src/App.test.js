import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const createMockServer = (model, data) => {
    fetch.mockImplementation((url, options) => {
        return Promise.resolve({
            json() {
                if (!model)
                    model = JSON.parse(options.body);

                if (!data) {
                    data = {
                        netWorth: 1212130,
                        totalAssets: 2120427,
                        totalLiabilities: 908297,
                    };
                }

                if (url.endsWith('/get')) {
                    return Promise.resolve(model);
                } else {
                    return Promise.resolve({
                        model,
                        data,
                    });
                }
            },
        });
    });
};

const createBrokenMockServer = () => {
    fetch.mockImplementation(() => {
        return Promise.reject();
    });
};

const renderApp = async () => {
    createMockServer();
    render(<App />);
    await nextTick();
    fetch.mockClear();
};

const changeCurrency = (currency) => {
    fireEvent.change(document.querySelector('select'), {
        target: {
            value: currency,
        },
    });
};

const changeTotalValue = (totalValue) => {
    fireEvent.change(document.querySelector('input'), {
        target: {
            value: totalValue,
        },
    });
    fireEvent.blur(document.querySelector('input'));
};

const nextTick = () => {
    return new Promise((resolve) => {
        process.nextTick(resolve);
    });
};

test('renders the page', async () => {
    await renderApp();
    expect(screen.getByText("Tracking Your Net Worth")).toBeInTheDocument();
});

test('gets current data from the backend', async () => {
    createMockServer();
    render(<App />);
    await nextTick();
    expect(fetch).toBeCalledTimes(2);
});

test('shows error when the backend is down', async () => {
    createBrokenMockServer();
    render(<App />);
    await nextTick();
    expect(fetch).toBeCalledTimes(1);
    expect(alert).toBeCalledTimes(1);
});

test('handles currency change', async () => {
    await renderApp();
    changeCurrency('HKD');
    await nextTick();
    expect(fetch).toBeCalledTimes(1);
});

test('shows error when changing currency while the backend is down', async () => {
    await renderApp();
    createBrokenMockServer();
    changeCurrency('HKD');
    await nextTick();
    expect(fetch).toBeCalledTimes(1);
    expect(alert).toBeCalledTimes(1);
});

test('prevents currency change when busy', async () => {
    await renderApp();
    changeCurrency('HKD');
    changeCurrency('HKD');
    await nextTick();
    expect(fetch).toBeCalledTimes(1);
});

test('handles total value change', async () => {
    await renderApp();
    changeTotalValue('500');
    await nextTick();
    expect(fetch).toBeCalledTimes(1);
});

test('prevents total value change when busy', async () => {
    await renderApp();
    changeTotalValue('500');
    changeTotalValue('500');
    await nextTick();
    expect(fetch).toBeCalledTimes(1);
});
