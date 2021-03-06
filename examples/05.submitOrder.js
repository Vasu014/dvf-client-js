#!/usr/bin/env node

const HDWalletProvider = require('truffle-hdwallet-provider')
const sw = require('starkware_crypto')
const Web3 = require('web3')

const DVF = require('../src/dvf')
const envVars = require('./helpers/loadFromEnvOrConfig')()


const ethPrivKey = envVars.ETH_PRIVATE_KEY
// NOTE: you can also generate a new key using:`
// const starkPrivKey = dvf.stark.createPrivateKey()
const starkPrivKey = ethPrivKey
const infuraURL = `https://ropsten.infura.io/v3/${envVars.INFURA_PROJECT_ID}`

const provider = new HDWalletProvider(ethPrivKey, infuraURL)
const web3 = new Web3(provider)

const dvfConfig = {
  // Using staging API.
  api: 'https://api.stg.deversifi.com'
}


;(async () => {
  const dvf = await DVF(web3, dvfConfig)

  // Submit an order to sell 0.3 Eth for 200 USDT per 1 Eth
  const symbol = 'ETH:USDT'
  const amount = -0.3
  const price = 200
  const validFor = '0'
  const feeRate = ''

  const submitOrderResponse = await dvf.submitOrder({
    symbol,
    amount,
    price,
    starkPrivateKey: starkPrivKey,
    validFor,           // Optional
    feeRate,            // Optional
    gid: '1',           // Optional
    cid: '1',           // Optional
    partnerId: 'P1'    // Optional
  })

  console.log('submitOrder response ->', submitOrderResponse)

})()
// Stop provider to allow process to exit.
.then(() => {
  console.log('Stopping provider...')
  provider.engine.stop()
})
.catch(error => {
  console.error(error)
  process.exit(1)
})

