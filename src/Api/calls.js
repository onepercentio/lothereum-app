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
                c.methods.drawingIndex().call,
                c.methods.maxDrawableNumber().call,
                c.methods.numbersPerTicket().call,
                c.methods.nextDrawingDate().call,
            ]).then(lotto => {
                let [name, ticketPrice, drawingIndex, maxDrawableNumber, numbersPerTicket, nextDrawingDate] = lotto
                return { name, ticketPrice, drawingIndex, maxDrawableNumber, numbersPerTicket, nextDrawingDate, id: contracts[i].address }
            }).then(lotto => c.methods.draws(lotto.drawingIndex).call().then(({ total }) => ({...lotto, prize: total})))
        ))
    },
    getTickets: ({ address, contractAddress }) => {
        let contract = contracts.find(c => c.address === contractAddress)
        let contractInterface = new api.eth.Contract(contract.abi, contract.address)
        return contractInterface.getPastEvents('NewTicket', { filter: { holder: address }})
        .then(tickets => tickets) // implement necessary transformations
    },
    buyTicket: ({ address, numbers, ticketPrice, contractAddress }) => {
        // current will be passed someday when there is more than 1 contract
        let contract = contracts.find(c => c.address === contractAddress)
        let contractInterface = new api.eth.Contract(contract.abi, contract.address)

        contractInterface.getPastEvents('NewTicket', { fromBlock: 1 }).then(r => console.log(r))
        return contractInterface.methods.buyTicket(numbers).send({from: address, value: ticketPrice, gas: 4000000})
            .on('transactionHash', hash => console.log('hash crap', hash))
            .on('confirmation', (counter, receipt) => console.log('confirmation # ', counter, ' receipt = ', JSON.stringfy(receipt)))
            .on('receipt', receipt => console.log(receipt))
            .then(r => {console.log('===', r); return r})
        .then(r => console.log('===', r))
        // return contractInterface.methods.buyTicket(numbers).estimateGas()
        // return contractInterface.methods.buyTicket(numbers).send({from: address, value: ticketPrice})

    },
    login: ({ address, password }) => api.eth.personal.unlockAccount(address, password)
    // /*
    //     POST: /users/card
    //     registers a card for a new user
    // */
    // saveCreditCard: ( { cardNumber, holderName, issuer, cvv, dueDate }) =>
    //     api.post('users/card', {
    //         cardNumber, holderName, issuer, cvv, dueDate
    //     }),

    // /*
    //     POST: /users/:id/card
    //     registers a new card for an existing user
    // */
    // addCreditCardToUser: ({ userId, cardNumber, holderName, issuer, cvv, dueDate }) =>
    //     api.post(`users/${userId}/card`, {
    //         cardNumber, holderName, issuer, cvv, dueDate
    //     }),

    // /*
    //     GET: /users/:id
    //     gets information for the referenced user
    // */
    // getUserInfo: ({ id }) => getOnce(`Users/${id}`),

    // /*
    //     POST: /payment
    //     registers a card for a new user
    // */
    // makePayment: ({ cardToken, payer, payee, transactionValue, conditions, calculatedValues }) =>
    //     api.post('payment', {
    //         cardToken, payer, payee, transactionValue, conditions, calculatedValues
    //     }),

    // /*
    //     PUT: users/:id/selectedcard
    //     updates the preferred card for the user
    // */
    // updatePreferredCard: ({ userId, token }) =>
    //     updateValue(`Users/${userId}/preferences`, { selectedCard: token }),

    // getFeeInfo: () => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve({
    //                 ok: true,
    //                 problem: null,
    //                 data: {
    //                     default: 0.0499,
    //                     visa: [{installments: 1, fee: 0.0499}],
    //                     master: [{installments: 1, fee: 0.0499}]
    //                 }
    //             })
    //         }, 3000)
    //     })
    // },

    // requestPhoneAuthentication: ({ phoneNumber, deviceInfo }) => {
    //     return new Promise((resolve, reject) => setTimeout(_ => resolve({ ok: true, data: {} }), 1200))
    // },

    // verifyPhone: ({ phoneNumber, deviceInfo, pin }) => {
    //     let responseData = { token: 'abcdefg' , userId: '123' }
    //     return new Promise((resolve, reject) => setTimeout(_ => resolve({ ok: true, data: responseData }, 1000)))
    // }
})
