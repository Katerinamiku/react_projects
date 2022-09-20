import React, {useEffect, useRef, useState} from 'react';
import {Block} from './Block';
import './index.scss';

function App() {
    // const [rates, setRates] = useState({});
    const ratesRef = useRef({});

    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('CZK');
    const [toCurrency, setToCurrency] = useState('USD');

    const onChangeFromValue = (value) => {
        const convertFromValue = value / ratesRef.current[fromCurrency];
        const result = convertFromValue * ratesRef.current[toCurrency];
        setFromValue(value)
        setToValue(result.toFixed(3))
    }
    const onChangeToValue = (value) => {
        const convertToValue = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
        setToValue(value)
        setFromValue(convertToValue.toFixed(3))
    }

    useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then(res => res.json())
            .then(json => {
                // setRates(json.rates)
                ratesRef.current = json.rates;
                onChangeToValue(1)
            })
            .catch(err => {
                console.warn(err)
                alert('Error occurred')
            })
    }, [])

     useEffect(() => {
        onChangeFromValue(fromValue);
    }, [fromCurrency])

    useEffect(() => {
        onChangeToValue(toValue);
    }, [toCurrency])


    return (
        <div className="App">
            <Block value={fromValue}
                   currency={fromCurrency}
                   onChangeCurrency={setFromCurrency}
                   onChangeValue={onChangeFromValue}/>
            <Block value={toValue}
                   currency={toCurrency}
                   onChangeCurrency={setToCurrency}
                   onChangeValue={onChangeToValue}/>
        </div>
    );
}

export default App;
