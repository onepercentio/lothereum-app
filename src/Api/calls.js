import contracts from './contracts'

async function runAllPromises (promises){
    let result = []
    for( let promise of promises ){
        result.push(await promise())
    }
    return result
}

export default () => ({
    getEthPrice: () => fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD').then(r => r),
    getBalance: ({ address }) =>
        window.web3js.eth.getBalance(address),
    getLotteries: _ =>{
        let contractInterfaces = contracts.map(({abi, address }) => new window.web3js.eth.Contract(abi, address))
        return Promise.all(contractInterfaces.map((c, i) =>
            runAllPromises([
                c.methods.name().call,
                c.methods.ticketPrice().call,
                c.methods.drawingCounter().call,
                c.methods.maxDrawableNumber().call,
                c.methods.numbersPerTicket().call,
                c.methods.nextDrawingDate().call,
            ]).then(lotto => {
                let [name, ticketPrice, drawingCounter, maxDrawableNumber, numbersPerTicket, nextDrawingDate] = lotto
                return { name, ticketPrice, drawingCounter, maxDrawableNumber, numbersPerTicket, nextDrawingDate, id: contracts[i].address }
            }).then(lotto => c.methods.draws(lotto.drawingCounter).call().then(({ total }) => ({...lotto, prize: (total/1000000000000000000) * 0.98 })))
        ))
    },
    getTickets: ({ address, contractAddress }) => {
        let contract = contracts.find(c => c.address === contractAddress)
        let contractInterface = new window.web3js.eth.Contract(contract.abi, contract.address)
        
        return window.web3js.eth.getBlockNumber()
        .then(block => contractInterface.getPastEvents('NewTicket', { fromBlock: block - 50000, filter: { holder: address }}))
        .then(tickets => tickets.filter(t => String(t.returnValues[1]).toLowerCase() === String(address).toLowerCase()).map(t => ({
            lotteryId: t.returnValues[0],
            id: t.returnValues[2],
            numbers: t.returnValues[3]
        })))
    },
    buyTicket: ({ numbers, address, privateKey, ticketPrice, contractAddress }) => {
        // current will be passed someday when there is more than 1 contract
        let contract = contracts.find(c => c.address === contractAddress)
        let contractInterface = new window.web3js.eth.Contract(contract.abi, contract.address)
        let data = contractInterface.methods.buyTicket(numbers, address).encodeABI()
        return window.web3js.eth.sendTransaction({from: address, to: contractAddress, data, value: ticketPrice, gas: "6000000"})
    },
    login: () => 
        window.web3js.eth.getAccounts().then(accounts => ({ address: accounts[0] })),
    createRandomAccount: _ => window.web3js.eth.accounts.create()
})
