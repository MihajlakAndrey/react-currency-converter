import axios from 'axios'
import { useEffect, useState } from 'react'
import Arrows from './Arrows'
import Convertor from './Convertor'
import './index.scss'

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [rates, setRates] = useState([])
  const [currencies, setCurrencies] = useState({})
  const [isReady, setIsReady] = useState(false)

  const [fromCurrency, setFromCurrency] = useState('UAH')
  const [toCurrency, setToCurrency] = useState('USD')

  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)



  const fetchData = async () => {
    try {
      const currencies = await axios({
        url: `https://api.apilayer.com/exchangerates_data/symbols`,
        method: `get`,
        headers: { apikey: API_KEY },
      })
      const rates = await axios({
        url: 'https://api.apilayer.com/exchangerates_data/latest?symbols=&base=USD',
        method: `get`,
        headers: { apikey: API_KEY },
      })
      setCurrencies(currencies.data.symbols)
      setRates(rates.data.rates)
      setIsReady(true)
    } catch (error) {
      alert(error.message)
    }
  }

  const onChangeFromValue = (value) => {
    const price = value / rates[fromCurrency]
    const result = price * rates[toCurrency]
    setFromValue(value)
    setToValue(result.toFixed(2))
  }
  const onChangeToValue = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value
    setFromValue(result.toFixed(2))
    setToValue(value)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (isReady) {
      onChangeToValue(toValue)
    }
  }, [toCurrency])

  useEffect(() => {
    if (isReady) {
      onChangeFromValue(fromValue)
    }
  }, [fromCurrency])

  return (
    <div className="Wrapper">
      {isReady 
       ?  <div className="App">
            <Convertor
              currencies={currencies}
              currency={fromCurrency}
              value={fromValue}
              onChangeCurrency={setFromCurrency}
              onChangeValue={onChangeFromValue}
            />

            <Arrows />

            <Convertor
              currencies={currencies}
              currency={toCurrency}
              value={toValue}
              onChangeCurrency={setToCurrency}
              onChangeValue={onChangeToValue}
            />
          </div>
       : <h1>Loading...</h1>
      }
    </div>
  )
}

export default App
