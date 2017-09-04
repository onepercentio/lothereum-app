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
                c.methods.nextDrawingDate().call
            ]).then(lotto => {
                let [name, ticketPrice, drawingIndex, maxDrawableNumber, numbersPerTicket, nextDrawingDate] = lotto
                return { name, ticketPrice, drawingIndex, maxDrawableNumber, numbersPerTicket, nextDrawingDate, id: contracts[i].address }
            }).then(lotto => c.methods.draws(lotto.drawingIndex).call().then(({ total }) => ({...lotto, prize: total})))
        ))
        .then(i => {
            console.log(' aaa ', JSON.stringify(i, null, 2))
            return i
        })
        // return Promise.resolve([])
    }
        // api.eth.get
        // new Promise(
        //
        //     resolve => setTimeout(_ => resolve([{ id: 597364, prize: 48927349, date: 1504364400, maxNumber: 15, numbersInTicket: 3 }]), 1000)
        ,
    getTickets: ({ address }) =>
        // new Promise(resolve => setTimeout(_ => resolve([{ id: 13, lotteryId: 597364, numbers: [10, 20, 30, 40, 50, 60]}]),1500)),
        new Promise(resolve => setTimeout(_ => resolve([]),1500)),
    buyTicket: ({ address, numbers, lotteryId }) =>
        new Promise(resolve => setTimeout(_ => resolve({ id: 754673 }), 1100))
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
