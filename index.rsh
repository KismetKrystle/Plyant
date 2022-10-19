'reach 0.1'

const amt = 0

export const main = Reach.App(() => {
  const A = Participant('Farmer', {
    // Specify Farmers Land interface here
    startFARM: Fun(
      [],
      Object({
        nftId: Token,
        AreaSqft: UInt,
        Location: StringDyn,
        numTickets: UInt
      })
    ),
    seeHash: Fun([Digest], Null)
  })
  const B = Participant('Distributor', {
    // Specify Distributor's interact interface here
  })
  init()
  A.only(() => {
    const { nftId, AreaSqft, Location, numTickets } = declassify(
      interact.startFARM()
    )
    const _FarmLand = interact.startFARM()
    const [_commitA, _saltA] = makeCommitment(interact, _FarmLand)
    const commitA = declassify(_commitA)
  })
  // The first one to publish deploys the contract
  A.publish(nftId, AreaSqft, Location, numTickets)
  A.interact.seeHash(commitA)
  commit()
  A.pay([[amt, nftId]])
  commit()

  // The second one to publish always attaches
  B.publish()
  commit()
  // write your program here
  exit()
})
