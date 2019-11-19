import React from 'react'
import axios from 'axios'
import { CONTRACT_ADDRESS, DATA_LIMIT, API_BASE_URL, CONTRACT_DECIMAL_VALUE } from '../../constants'
import TokenController from '../../interface/TokenController'
import { Grid, Button } from 'semantic-ui-react'
import './index.css'
import web3 from './../../interface/web3'

const lastDateOfaMonth = () => {
  var date = new Date()
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return lastDay.toDateString()
}

export default function TableList () {
  const [Addresses, setAddresses] = React.useState([])
  const [totalSupply, settotalSupply] = React.useState('')
  const [distribute, setDistribute] = React.useState(false)
  const [hash, setHash] = React.useState('')

  const [tokenDistribute, settokenDistribute] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      const nukToDostribute = await TokenController.methods.balanceOf(CONTRACT_ADDRESS).call()
      const totalSupply = await TokenController.methods.totalSupply().call()

      console.log('Balance of function returns', nukToDostribute)
      console.log('total supply', totalSupply)
      settotalSupply(totalSupply / CONTRACT_DECIMAL_VALUE)
      settokenDistribute(nukToDostribute / CONTRACT_DECIMAL_VALUE)
    }
    fetchData()
  }, [])

  const distributeToken = async () => {

    var result = await axios(
      `${API_BASE_URL}/getTopTokenHolders/0x6903003d96da868c144ad1c59ddd4c7b72ea077f?apiKey=freekey&limit=${DATA_LIMIT}`
    )
    console.log(result.data.holders)
    result = result.data.holders.map((item, i) => item.address)
    console.log(result)
    setAddresses(result)


    // call top100 token distributor function here
    const accounts = await web3.eth.getAccounts()
    console.log('Accounts:' + accounts)

    await TokenController.methods.multiTransferToTop100(Addresses).send({
      from: accounts[0]
    }).on('transactionHash', (hash) => {
      console.log(hash)
      setHash(hash)
      setDistribute(true)
    }).on('confirmation', async function () {
      console.log('confirmed')
    })
    console.log(accounts)
  }

  return (
    <div className='table-container'>
      <Grid columns={3} stackable divided>
        <Grid.Row>
          <Grid.Column>
            <div className='card-view'>TOTAL SUPPLY </div>
            <div className='card-value'>{totalSupply} NUK</div>
          </Grid.Column>
          <Grid.Column>
            <div className='card-view'> BLA TO DISTRIBUTE</div>
            <div className='card-value'>{tokenDistribute} NUK</div>
          </Grid.Column>
          <Grid.Column>
            <div className='card-view'>NEXT DISTRIBUTION </div>
            <div className='card-value'>{lastDateOfaMonth()}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />    <br />

      {
        (distribute)
          ? <div> Track your transaction <a target='_blank' href={`https://etherscan.io/tx/${hash}`}>here on Etherscan</a> </div>
          : <Button content='Distribute Tokens' title='Tokens will be distributed to top 100 token holders' secondary onClick={distributeToken} />
      }
    </div>
  )
}
