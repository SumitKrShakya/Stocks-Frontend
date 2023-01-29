import './App.css';
import SearchBar from './components/SearchBar';
import ChartArea from './components/ChartArea';
import InfoArea from './components/InfoArea';
import { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('AAPL')
  const [updateData, setUpdateData] = useState(null)
  
  console.log(symbol)


  return (
    <div className="App">
      <SearchBar setSymbol={setSymbol} />
      <div className="page">
        <ChartArea setUpdateData={setUpdateData} symbol={symbol} />
        <InfoArea updateData={updateData} symbol={symbol} />
      </div>
    </div>
  );
}

export default App;
