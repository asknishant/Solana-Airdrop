// App.js
import React, { useState } from 'react'
import './App.css'
import Alert from './Alert'
import { Connection, PublicKey } from '@solana/web3.js'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleButtonClick = () => {
    if (inputValue.trim() === '') {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    } else {
      alert(`You entered: ${inputValue}`)
      setInputValue('')
    }
    // connection
    const connection = new Connection('https://api.devnet.solana.com')
    let myPublicKey = new PublicKey(inputValue)
    const fn = async () => {
      // 1e9 lamports = 10^9 lamports = 1 SOL
      let txhash = connection.requestAirdrop(myPublicKey, 1e9)
      console.log(`txhash: ${txhash}`)
    }
    fn()
  }

  return (
    <div className="container">
      <h1>Enter the address</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text here"
      />
      <button onClick={handleButtonClick}>Submit</button>
      {showAlert && <Alert />}
    </div>
  )
}

export default App
