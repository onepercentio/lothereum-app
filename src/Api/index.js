// import Web3 from 'web3'
import apiCalls from './calls'
const Web3 = window.Web3

const END_POINT = "https://ropsten.infura.io/Tbh0rdlz4fqktixk6gL7"

window.addEventListener('load', function() {
    window.web3js = null
    let web3 = window.web3
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.web3js = new Web3(web3.currentProvider)
      console.log('using metamask provider')
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3js = new Web3(new Web3.providers.HttpProvider(END_POINT));
        console.log('using our provider')
    }
})

let api = apiCalls()


// let's return back our create method as the default.
export default api
