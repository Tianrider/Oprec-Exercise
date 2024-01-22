import './Currency.css';
import { useEffect, useState } from 'react';
import { RiHomeLine } from "react-icons/ri";

const Currency = () => {
  const [result, setResult] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState('USD'); // default value = USD
  const [targetCurrency, setTargetCurrency] = useState('IDR'); // default value = IDR
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState(1); // default value = 1

  // use effect everytime the value of baseCurrency, targetCurrency or amount changes
  useEffect(() => {
    if (baseCurrency === targetCurrency) {
      setResult('Please select different currencies');
      return;
    }

    let resultValue = 0;
    if (baseCurrency === 'BTC' || targetCurrency === 'BTC') {
      getExchangeRateBTC(baseCurrency, targetCurrency);
      // if BTC is the base currency, display 8 decimal places
      resultValue = Number((amount * exchangeRate)).toLocaleString(undefined, {minimumFractionDigits: 8, maximumFractionDigits: 8})
    } else {
      getExchangeRate(baseCurrency, targetCurrency);
      resultValue = Number((amount * exchangeRate)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    setResult(`${amount} ${baseCurrency} = ${resultValue} ${targetCurrency}`);
  }, [baseCurrency, targetCurrency, amount, exchangeRate]);

  const getExchangeRate = async (selectedBaseCurrency, selectedTargetCurrency) => {
      let url = `https://api.exchangerate-api.com/v4/latest/${selectedBaseCurrency}`; // API USD to IDR to JPY
      const response = await fetch(url);
      const data = await response.json();
      let exchangeRate = data.rates[selectedTargetCurrency];
      setExchangeRate(exchangeRate);
  }

  // Ga nemu API BTC to IDR jadinya kek gini :(
  const getExchangeRateBTC = async (selectedBaseCurrency, selectedTargetCurrency) => {
    const BTC_URL = 'https://blockchain.info/ticker'; // API BTC to USD
    const btcResponse = await fetch(BTC_URL);
    const btcData = await btcResponse.json();
    let exchangeRateBTCtoUSD = btcData.USD.last;

    const usdResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const usdData = await usdResponse.json();

    // not the best method "yet"
    if (selectedBaseCurrency === 'BTC') {
      let targetExchangeRate = usdData.rates[selectedTargetCurrency];
      let exchangeResult = (exchangeRateBTCtoUSD * targetExchangeRate).toFixed(8);
      setExchangeRate(exchangeResult);
    } 
    else if (selectedTargetCurrency === 'BTC') {
      let exchangeResultUSD = (1 / exchangeRateBTCtoUSD).toFixed(8);
      let baseExchangeRate = usdData.rates[selectedBaseCurrency];
      let exchangeResult = (exchangeResultUSD * baseExchangeRate).toFixed(8);
      setExchangeRate(exchangeResult);
    }
  }

  return (
    <div className='Currency'>
      {/* home button */}
      <nav className='fixed-top'>
        <a href='/Oprec-Exercise/'><RiHomeLine className='home-button'/></a>
      </nav>

      {/* Blob Background */}
      <div className="slider-thumb container-fluid"></div>

      {/* Title */}
      <div className="title-container position-absolute text-center fixed-top pt-3 mt-5">
        <h1 className="title">
          CuConTer
        </h1>
        <p className="text-light">Currrency Converter</p>
      </div>

      <form className="row g-4 align-items-center position-absolute start-50 translate-middle text-center form" 
      onSubmit={(e) => e.preventDefault()}>
          {/* Amount Input */}
          <div className="container-fluid input-container" onChange={e => setAmount(e.target.value)}>
              <input
                type="text"
                className="form-control"
                id="amount_one"
                placeholder="Amount"
              ></input>
          </div>
    
          {/* Currency Selection */}
          <div className="row text-center d-flex justify-content-center select-container">
            <div className="col-2 d-flex justify-content-center">
              <select className="form-select-one form-select" defaultValue="USD" onChange={e => setBaseCurrency(e.target.value)}>
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
                <option value="BTC">BTC</option>
              </select>
            </div>

            <div className="col-1 d-flex justify-content-center align-content-center">
              <img className="arrow-img" src=
              "https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png"
              />
            </div>

            <div className="col-2 d-flex justify-content-center">
              <select className="form-select-two form-select" onChange={e => setTargetCurrency(e.target.value)} defaultValue="IDR">                                         
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>

          {/* Exchange Rate and Result */}
          <div className="result-text-container">
            <h6 className='result-text'>Current Exchange Rate:</h6>
            <h6 className='result-text'>{`1 ${baseCurrency} = ${exchangeRate} ${targetCurrency}`}</h6>
          </div>

          <div className="col-12 submit-button">
            <h3 className="result-text">{result !== null ? result : 'Waiting for you....'}</h3>
          </div>
        </form>
    </div>
  );
}

export default Currency;