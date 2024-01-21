import './Currency.css';
import React, { useState } from 'react';
import { RiHomeLine } from "react-icons/ri";

const Currency = () => {
    // not the best method "yet"
    const [result, setResult] = useState(null);
    const baseCurrencyRef = React.createRef();
    const targetCurrencyRef = React.createRef();

    const handleButtonClick = async () => {
      let amount = parseFloat(document.getElementById('amount_one').value);
      let selectedBaseCurrency = baseCurrencyRef.current.value;
      let selectedTargetCurrency = targetCurrencyRef.current.value;

      if (selectedBaseCurrency === selectedTargetCurrency) {
        setResult('Please select different currencies');
        return;
      }

      // ganemu API BTC to IDR jadinya kek gini :(
      if (selectedBaseCurrency === 'BTC' || selectedTargetCurrency === 'BTC') {
        handleBTCConversion(amount, selectedBaseCurrency, selectedTargetCurrency);
      } else {
        await getExchangeRate(amount, selectedBaseCurrency, selectedTargetCurrency);
      }
    };
    
    const getExchangeRate = async (amount, selectedBaseCurrency, selectedTargetCurrency) => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${selectedBaseCurrency}`;
        const response = await fetch(url);
        const data = await response.json();
        let exchangeRate = data.rates[selectedTargetCurrency];
        let exchangeResult = (amount * exchangeRate).toFixed(2);
        setResult(`${amount} ${selectedBaseCurrency} = ${exchangeResult} ${selectedTargetCurrency}`);
      } catch (error) {
        console.error('Error fetching exchange rates:', error.message);
      }
    };

    const handleBTCConversion = async (amount, selectedBaseCurrency, selectedTargetCurrency) => {
      try {
        const BTC_URL = 'https://blockchain.info/ticker';
        const btcResponse = await fetch(BTC_URL);
        const btcData = await btcResponse.json();
        let exchangeRate = btcData.USD.last;

        if (selectedBaseCurrency === 'BTC') {
          let exchangeResultUSD = (amount * exchangeRate).toFixed(2);
          const usdResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          const usdData = await usdResponse.json();
          let targetExchangeRate = usdData.rates[selectedTargetCurrency];
          let exchangeResult = (exchangeResultUSD * targetExchangeRate).toFixed(2);
          setResult(`${amount} ${selectedBaseCurrency} = ${exchangeResult} ${selectedTargetCurrency}`);
        } 
        else if (selectedTargetCurrency === 'BTC') {
          let exchangeResultUSD = (amount / exchangeRate).toFixed(8);
          const usdResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          const usdData = await usdResponse.json();
          let baseExchangeRate = usdData.rates[selectedBaseCurrency];
          let exchangeResult = (exchangeResultUSD / baseExchangeRate).toFixed(8);
          setResult(`${amount} ${selectedBaseCurrency} = ${exchangeResult} ${selectedTargetCurrency}`);
        }
      } catch (error) {
        console.error('Error performing BTC conversion:', error.message);
      }
    };

  return (
    <div className='Currency'>
      <nav className='fixed-top'>
        <a href='/Oprec-Exercise/'><RiHomeLine className='home-button'/></a>
      </nav>
      <div className="slider-thumb container-fluid"></div>
      <div className="title-container position-absolute text-center fixed-top pt-3 mt-5">
        <h1 className="title">
          CuConTer
        </h1>
        <p className="text-light">Currrency Converter</p>
      </div>

      <form className="row g-4 align-items-center position-absolute start-50 translate-middle text-center form" 
      onSubmit={(e) => e.preventDefault()}>
          <div className="container-fluid input-container">
              <input
                type="text"
                className="form-control"
                id="amount_one"
                placeholder="Amount"
              ></input>
          </div>
    
          <div className="row text-center d-flex justify-content-center select-container">
            <div className="col-2 d-flex justify-content-center">
              <select className="form-select-one form-select" ref={baseCurrencyRef} defaultValue="USD">
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
              <select className="form-select-two form-select" ref={targetCurrencyRef} defaultValue="IDR">                                         
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>

          <div className="result-text-container">
            <h6 className="result-text">{result !== null ? result : 'Waiting for you....'}</h6>
          </div>

          <div className="col-12 submit-button">
              <button type="submit" className="btn" onClick={handleButtonClick}>Convert!</button>
          </div>
        </form>
    </div>
  );
}

export default Currency;