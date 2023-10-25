import React, { useEffect, useState } from "react";
import axios from "axios";

const endpoint = "http://localhost:4000";

const Message = () => {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [bidTime, setBidTime] = useState(5);
  const [brand, setBrand] = useState("BMW");
  const [rnumber, setRnumber] = useState("1234");
  const [highestBid,setHighestBid] = useState("");
  const [highestBidder,setHighestBidder] = useState("");
  const [output, setOutput] = useState([]);
  const [deployed, setDeployed] = useState(false);

  useEffect(()=>{

  },[deployed])

  const onChangeAddr = (event) => {
    setAddress(event.target.value);
  };
  const onValChange = (event) => {
    setValue(event.target.value);
  };
  const onChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const onChangeRnumber = (event) => {
    setRnumber(event.target.value);
  };

  const onBidTimeChange = (event) => {
    
    setBidTime(event.target.value);  
};

  const onsubmitBid = () => {
    axios.post(endpoint + "/bid", {
      "addr":address,
      "bidPrice":value
    })
    .then(res => {
      setOutput(res.data);
      if(res.data.returnValues!==undefined) setHighestBid(res.data.returnValues.highestBid);
      if(res.data.returnValues!==undefined) setHighestBidder(res.data.returnValues.highestBidder);
      console.log(res);
    });
  };

  const onsubmitWithdraw = () => {
    axios.post(endpoint + "/withdraw",{
      "addr":address
    }).then(res => {
      setOutput(res.statusText);
    });
  };

  const onsubmitcompile = () => {
    axios.post(endpoint + "/compile").then(res => {
      setOutput(res.data);
    });
  };

  const onsubmitdeploy = () => {
    axios.post(endpoint + "/deploy",
      {"bidTime":bidTime,
        "brand":brand,
        "rnumber":rnumber
      })
      .then(res => {
      setOutput("Contract Address: "+res.data);
      console.log(res);
    });
    setDeployed(true);
  };

  const onsubmitCancel = () => {
    axios.post(endpoint + "/cancelauc",
      {"addr":address,
      })
      .then(res => {
      setOutput(res.statusText);
      console.log(res);
    });
    setDeployed(true);
  };

  return (
    <div className="container">
      <fieldset>
        <div className="ghost-input">
          {output}
        </div>
        <form>
          <div>
            <span className = "ghost-input">Highest Bid : {highestBid} </span>
            <span className = "ghost-input">Highest Bidder : {highestBidder} </span>

            <input
              type="name"
              className="ghost-input"
              placeholder="set address"
              name="setMessage"
              value={address}
              onChange={onChangeAddr}
            />
            <input
              type="number"
              className="ghost-input"
              placeholder="set value"
              name="setValue"
              value={value}
              onChange={onValChange}
            />
            <>
            {
                <>
                {!deployed ?
                <>
                <input
                    type="number"
                    min="5" max="360"
                    placeholder="5"
                    className="ghost-input"
                    name="bidTime"
                    value={bidTime}
                onChange={onBidTimeChange}
                />
                <input
                  type="name"
                  className="ghost-input"
                  placeholder="set Brand name"
                  name="setBrandName"
                  value={brand}
                  onChange={onChangeBrand}
                />
                <input
                  type="name"
                  className="ghost-input"
                  placeholder="set Registration number"
                  name="setBrandName"
                  value={rnumber}
                  onChange={onChangeRnumber}
                />
                </>
                :<>
                <span className = "ghost-input">Bid time : {bidTime} mins</span>
                <span className = "ghost-input">Brand : {brand} </span>
                <span className = "ghost-input">RNumber : {rnumber} </span>
                </>
                }
                </>
            }
            </>
            <button
              type="button"
              className="ghost-button"
              onClick={onsubmitBid}
            >
              Bid
            </button>
          </div>
          <div>
            <button
              type="button"
              className="ghost-button"
              onClick={onsubmitWithdraw}
            >
              Withdraw
            </button>
          </div>
          <div>
            <button
              type="button"
              className="ghost-button"
              onClick={onsubmitcompile}
            >
              Compile Contract
            </button>
          </div>
          <div>
            <button
              type="button"
              className="ghost-button"
              onClick={onsubmitdeploy}
            >
              Deploy Contract
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={onsubmitCancel}
            >
              Cancel Auction
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default Message;
