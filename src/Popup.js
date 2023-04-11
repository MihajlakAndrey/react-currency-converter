import React from 'react'

const Popup = ({ open, replaceCurrency, currencies }) => {

  const currenciesArr = [...Object.entries(currencies)]
  
  return (
    <>
      <svg height="50px" viewBox="0 0 50 50" width="50px">
        <rect fill="none" height="50" width="50" />
        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
      </svg>

      {open && (
        <ul className="popup">
          {currenciesArr.map(symbol => <li key={symbol} onClick={() => replaceCurrency(symbol[0])}>{symbol[0]} - {symbol[1]}</li>)}
        </ul>
      )}
    </>
  )
}

export default Popup
