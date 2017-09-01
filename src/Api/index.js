import Web3 from 'web3'
import apiCalls from './calls'

const END_POINT = "http://127.0.0.1:8545"

// our "constructor"
const create = () => {

    const web3 = new Web3(new Web3.providers.HttpProvider(END_POINT))

  return apiCalls(web3)
}

const api = create()

// let's return back our create method as the default.
export default api
