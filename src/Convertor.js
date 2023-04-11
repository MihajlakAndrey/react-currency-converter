import React, { useEffect, useRef, useState } from 'react'

import './index.scss'
import Popup from './Popup'



const Convertor = ({ currency, onChangeCurrency, value, onChangeValue, currencies}) => {
  
  const [defaultCurrencies, setDefaultCurrencies] = useState(['USD', 'EUR', 'UAH', 'GBP']) 
  const [open, setOpen] = useState(false)
  const popupRef = useRef()

  const replaceCurrency = (value) => {
    const chosenCurrencyindex = defaultCurrencies.indexOf(currency)
    
    if(defaultCurrencies.includes(value)){
      onChangeCurrency(value)
      return
    }
    if(chosenCurrencyindex !== -1){
      setDefaultCurrencies(defaultCurrencies.map((item, index) => index === chosenCurrencyindex ? item = value : item))
      onChangeCurrency(value)
    }
    
  }

  useEffect(() => {
    const handleClickOutSide = (e) => {
      
      if (!e.path.includes(popupRef.current)) {
        setOpen(false);
      }
    }

    document.body.addEventListener(`click`, handleClickOutSide)

    return () => {
      document.body.removeEventListener(`click`, handleClickOutSide)
    }
  }, []);

  

  return (
    <div  className="convertor" >
      <ul className="currencies" >
        {defaultCurrencies.map((cur) => {
          return (
            <li
              className={currency === cur ? 'active' : ''}
              key={cur}
              onClick={() => onChangeCurrency(cur)}
            >
              {cur}
            </li>
          )
        })}

        <li ref={popupRef} onClick={() => setOpen(!open)}>
          <Popup currencies={currencies} open={open}  replaceCurrency={replaceCurrency}/>
        </li>
      </ul>

      <input
        type="number"
        placeholder={0}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
              
      />
    </div>
  )
}

export default Convertor
