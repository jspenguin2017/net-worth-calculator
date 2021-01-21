import './App.css';
import {cashAndInvestments, longTermAssets, shortTermLiabilities, longTermDebt} from './model.js';

function App() {
  console.log(cashAndInvestments.serialize());
  console.log(longTermDebt.serialize());

  return (
    <div className="App">
      <header className="App-header">
        <p>Tracking your Networth</p>
      </header>

      <hr></hr>
    </div>
  );
}

export default App;
