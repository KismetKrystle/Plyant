// Algorand Indexer (v2) example
// Retrieve block - TestNet

const algosdk = require('algosdk')
const baseServer = 'https://testnet-algorand.api.purestake.io/idx2'
const port = ''

const token = {
  'X-API-key': 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
}

let indexerClient = new algosdk.Indexer(token, baseServer, port)

;(async () => {
  let blockInfo = await indexerClient.lookupBlock(5).do()
  console.log(blockInfo)
})().catch(e => {
  console.log(e)
})
