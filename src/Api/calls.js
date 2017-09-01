export default (api) => ({
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
