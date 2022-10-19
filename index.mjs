import { loadStdlib } from '@reach-sh/stdlib'
import * as backend from './build/index.main.mjs'
const stdlib = loadStdlib(process.env)

const startingBalance = stdlib.parseCurrency(100)

const [accFarmer, accDistributor] = await stdlib.newTestAccounts(
  2,
  startingBalance
)
console.log('Hello, Farmer and Distributor!')

console.log('Launching...')
const ctcFarmer = accFarmer.contract(backend)
const ctcDistributor = accDistributor.contract(backend, ctcFarmer.getInfo())

console.log(`Creator is creating the newNFT for its land`)
const LandNFT = await stdlib.launchToken(
  accFarmer,
  "Land Area,location,crop",
  "pic of Land",
  { supply: 1 }
)
const nftParams = {
  nftId: LandNFT.id,
  AreaSqft: 5,
  Location: '  ',
  numTickets: 10
}

await accDistributor.tokenAccept(nftParams.nftId)

console.log('Starting backends...')
await Promise.all([
  backend.Farmer(ctcFarmer, {
    ...stdlib.hasRandom
    seeHash: (value) => {
      console.log(`FarmLand number Hash: ${value}`)
    }
    // implement Farmer's interact object here
  }),
  backend.Distributor(ctcDistributor, {
    ...stdlib.hasRandom
    // implement Distributor's interact object here
  })
])

console.log('Goodbye, Farmer and Distributor!')
