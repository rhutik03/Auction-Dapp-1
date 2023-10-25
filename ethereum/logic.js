const fs = require("fs-extra");
const {web3} = require("./web3");
const compileContract = require("./build/Auction.json");
const JSONbigString = require('json-bigint')({ useNativeBigInt: true });

// Contract object deployed on network (ganache-cli or testnet or mainnet)
// network can be selected in web3 file

// cont

const getContractObject = () => {
     
    const contractReceipt = require("./receipt-ganache.json");
    // create a contract object/instance 
    
    const contractObject = new web3.eth.Contract(
        compileContract.abi,
        contractReceipt.address
    );

    // console.info(compileContract.abi,
    //     contractReceipt.address);
    
    return contractObject;
};

const contract_owner = async()=>{
    
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    return accounts[0];
}

const getCarInfo = async()=>{
    
    const contractObject = getContractObject();
    const accounts = await web3.eth.getAccounts();
    
    const result = await contractObject.methods
                    .Mycar()
                    .call({from : accounts[0]});
    console.info(result);
    console.info("Message successfully saved!");
    return {"Brand":result.Brand, "Rnumber":result.Rnumber};
    
}

const bid = async (addr,bidPrice) => {

    bidPrice = parseInt(bidPrice);

    var highestBid = await getHigestBid(addr);
    highestBid = JSONbigString.stringify(highestBid.highestBid); 
    highestBid = parseInt(highestBid);

    // console.log(highestBid,bidPrice);
    if(highestBid>=(bidPrice)) return "Place a higher bid";
    
    const contractObject = getContractObject();
    
    result = await contractObject.methods
            .bid()
            .send({from : addr,value:bidPrice, gas: 5000000, gasPrice: '1000000'});

    console.info(result);
    console.info("Message successfully saved!");

    


    return result;

}

const cancel_auction = async(addr) => {

    const owner = await contract_owner();
    console.log(owner);
    if(addr!== owner) return "Only owner can cancel the Auction";
 
    const contractObject = getContractObject();
    var result="Nothing to see here";
    try {
        result = await contractObject.methods
                    .cancelAuction()
                    .call({from : addr})
        console.log(result);
        
    } 
    catch (err) {
        return err.message;
    }

    try{
        result = await contractObject.methods
                    .cancelAuction()
                    .send({from : addr,gas: 5000000, gasPrice: '1000000'})
        console.log(result);
        console.log("Message successfully saved!");
    }
    catch(err){
        console.log(error);
    }

    
    return result;
}

const destruct_auction = async(addr) => {

    const owner = await contract_owner();
    console.log(owner);
    if(addr!== owner) return "Only owner can cancel the Auction";
 
    const contractObject = getContractObject();
    var result="Nothing to see here";
    try {
        result = await contractObject.methods
                    .destructAuction()
                    .call({from : addr})
        console.log(result);
        
    } 
    catch (err) {
        return err.message+". All bidders haven't withdrawn their bids";
    }

    try{
        result = await contractObject.methods
                    .destructAuction()
                    .send({from : addr,gas: 5000000, gasPrice: '1000000'})
        console.log(result);
        console.log("Message successfully saved!");
    }
    catch(err){
        console.log(err);
    }

    return result;
}

const withdraw = async(addr) => {
    
    const contractObject = getContractObject();
    var result="Nothing to see here";

    try {
        const result = await contractObject.methods
                    .withdraw()
                    .call({from : addr});
        console.info(result);
        
    } 
    catch (err) {
        return err.message+". Auction is still going on";
    }

    try{
        result = await contractObject.methods
                    .withdraw()
                    .send({from : addr,gas: 5000000, gasPrice: '1000000'})
        console.log(result);
        console.log("Message successfully saved!");
    }
    catch(err){
        console.log(error);
    }

    return result;


}

const getBids = async(addr)=>{
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const result = await contractObject.methods
                    .bids(addr)
                    .call({from : addr});
    console.info(result);
    console.info("Message successfully saved!");
    return result;
}

const getHigestBid = async(addr)=>{
      
    const contractObject = getContractObject();
    const resultBidder = await contractObject.methods
                    .highestBidder(addr)
                    .call({from : addr});
    // console.info(resultBidder);

    const resultBid = await contractObject.methods
                    .highestBid(addr)
                    .call({from : addr});
    // console.info(resultBid);

    finalResult = {"highestBidder":resultBidder,"highestBid":resultBid};

    // console.info(finalResult);
    console.info("Message successfully saved!");
    return finalResult;
}





module.exports = {
    bid,
    cancel_auction,
    destruct_auction,
    withdraw,
    contract_owner,
    getCarInfo,
    getBids,
    getHigestBid
};

// https://www.youtube.com/watch?v=m18SSx0uDyQ