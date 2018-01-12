import contracts from './contracts'

async function runAllPromises (promises){
    let result = []
    for( let promise of promises ){
        result.push(await promise())
    }
    return result
}

export default (api) => ({
    getEthPrice: () => fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD').then(r => r),
    getBalance: ({ address }) =>
        api.eth.getBalance(address),
    getLotteries: _ =>{
        let abi = require('human-standard-token-abi')
        let contractInterface = new api.eth.Contract(abi, '0x4057a50c61814eac8342a1241ef3a4811cea23a8')
        return api.eth.getBlockNumber()
            .then(block => contractInterface.getPastEvents('Transfer', { fromBlock: block - 50000, filter: { from: '0x99edce9cec1296590b67402a73c780baeb51c4ad' }}))
    },
    getTickets: ({ address, contractAddress }) => {
        let contract = contracts.find(c => c.address === contractAddress)
        let contractInterface = new api.eth.Contract(contract.abi, contract.address)
        
        return api.eth.getBlockNumber()
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
        let contractInterface = new api.eth.Contract(contract.abi, contract.address)
        let data = contractInterface.methods.buyTicket(numbers, address).encodeABI()
        return api.eth.accounts.signTransaction({to: contractAddress, data, value: ticketPrice, gas: "4000000"}, privateKey)
            .then(r => api.eth.sendSignedTransaction(r.rawTransaction))
            // .then(info => api.eth.sendSignedTransaction(info.rawTransaction))
    },
    login: ({ address, password }) => api.eth.personal.unlockAccount(address, password),
    createRandomAccount: _ => api.eth.accounts.create()
})
