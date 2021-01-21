import './App.css';
import model from './model.js';

function handleCurrencyChange() {
  debugger;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="header">Tracking your Networth</p>
      </header>
      <div className="selectCurrencyWrapper">
        <p>
          Select Currency:&nbsp;
          <select onChange={handleCurrencyChange}>
            {
              model.currency.getAllCurrencyNames().map(currency => <option>{currency}</option>)
            }
          </select>
        </p>
      </div>

      <hr></hr>
    </div>
  );
}

export default App;
