const express = require("express");
const router = express.Router();
const JSONbigString = require('json-bigint')({ storeAsString: true });

const logic = require("../../ethereum/logic");

router.get("/health", async (req,res,next) => {
    console.log("Running on 4000");
    res.send("Running on 4000");
})

router.post("/bid",async(req,res,next)=>{
    let message = await logic.bid(req.body.addr,req.body.bidPrice);
    // console.log(message.events);
    if(message.events) message = JSONbigString.stringify(message.events.BidEvent);
    res.send(message);
})

router.post("/cancelauc",async(req,res,next)=>{
    let message = await logic.cancel_auction(req.body.addr);
    console.log(message);

    if(message.events) message = JSONbigString.stringify(message.events);
    
    res.send(message);
})

router.post("/destroyauc",async(req,res,next)=>{
    let message = await logic.destruct_auction(req.body.addr);
    console.log(message);

    if(message.events) message = JSONbigString.stringify(message.events);
    
    res.send(message);
})

router.post("/withdraw",async(req,res,next)=>{
    let message = await logic.withdraw(req.body.addr);
    console.log(message);
    if(message.events) message = JSONbigString.stringify(message.events);
    res.send(message);
})

router.post("/bids",async(req,res,next)=>{
    let message = await logic.getBids(req.body.addr);
    console.log(message);
    message = JSONbigString.stringify(message);
    console.log(message);
    res.send(message + " wei");
})

router.post("/highestbid",async(req,res,next)=>{
    let message = await logic.getHigestBid(req.body.addr);
    // console.log(message);
    message = JSONbigString.stringify(message);
    // console.log(message);
    res.send(message);
})

router.get("/owner",async(req,res,next)=>{
    let owner = await logic.contract_owner();
    res.send(owner);
})

router.get("/car",async(req,res,next)=>{
    let owner = await logic.getCarInfo();
    res.send(owner);
})



module.exports = router;