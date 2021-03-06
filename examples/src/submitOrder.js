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
