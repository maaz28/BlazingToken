import React from 'react'
import './App.css'
import Web3 from 'web3'
import Appbar from './Appbar'
import logo from './assets/logo.png'
import TableList from './components/TableList'

export default function App () {
  React.useEffect(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        // Request account access if needed
        await window.ethereum.enable()
        // Acccounts now exposed
      } catch (error) {
        // User denied account access..
      }
    }
    // Legacy dapp brow sers...
    else if (window.web3) {
      window.web3 = new Web3(this.web3.currentProvider)
    }
    // Non-dapp browsers...
    else {
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  })

  return (
    <div className='App'>

      <header className='App-header'>
        <img src={logo} width={250} className='logo' alt='Blazing logo' />
      </header>
      <TableList />
    </div>
  )
}
