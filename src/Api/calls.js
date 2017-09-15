import contracts from './contracts'

async function runAllPromises (promises){
    let result = []
    for( let promise of promises ){
        result.push(await promise())
    }
    return result
}

export default (api) => ({
    getBalance: ({ address }) =>
        api.eth.getBalance(address),
    getLotteries: _ =>{
        let contractInterfaces = contracts.map(({abi, address }) => new api.eth.Contract(abi, address))
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
            }).then(lotto => c.methods.draws(lotto.drawingCounter).call().then(({ total }) => ({...lotto, prize: total})))
        ))
    },
    getTickets: ({ address, contractAddress }) => {
        let contract = contracts.find(c => c.address === contractAddress)
        let contractInterface = new api.eth.Contract(contract.abi, contract.address)
        
        window.contract = contractInterface
        
        return api.eth.getBlockNumber()
        .then(block => contractInterface.getPastEvents('NewTicket', { fromBlock: block - 50000, filter: { holder: address }}))
        .then(tickets => tickets.filter(t => String(t.returnValues[1]).toLowerCase() === String(address).toLowerCase()).map(t => ({
            lotteryId: t.returnValues[0],
            id: t.returnValues[2],
            numbers: t.returnValues[3]
        })))
    },
    buyTicket: ({ numbers, privateKey, ticketPrice, contractAddress }) => {
        // current will be passed someday when there is more than 1 contract
        console.log('-',numbers,privateKey,ticketPrice,contractAddress)
        let contract = contracts.find(c => c.address === contractAddress)
        let contractInterface = new api.eth.Contract(contract.abi, contract.address)
        window.contract = contractInterface
        window.acc = api.eth.accounts.privateKeyToAccount(privateKey)
        let data = contractInterface.methods.buyTicket(numbers).encodeABI()
        console.log('data', data)
        return api.eth.accounts.signTransaction({to: contractAddress, data, value: ticketPrice, gas: "4000000"}, privateKey)
            .then(r => r.rawTransaction)
            .then(r => setTimeout(() => api.eth.sendSignedTransaction(r),1000))
    },
    login: ({ address, password }) => api.eth.personal.unlockAccount(address, password),
    createRandomAccount: _ => api.eth.accounts.create()
})
