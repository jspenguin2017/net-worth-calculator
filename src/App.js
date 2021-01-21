import './App.css';
import model from './model.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="header">Tracking your Networth</p>
      </header>
      <div className="selectCurrencyWrapper">
        <p>Select Currency: <select>CAD</select></p>
      </div>

      <hr></hr>
    </div>
  );
}

export default App;
