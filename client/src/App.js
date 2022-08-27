import React, { useState, useEffect } from "react";
import Parking from "./contracts/Parking.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
//import QRScan from "./qr-reader.component";
import Scancomp from "./scancomp";
const App = () => {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [scanner, setscanner] = useState(false);
  const [result, setresult] = useState("");
  const [infolist, setinfolist] = useState([]);
  var t = 0;
  const token = () => {
    // const info = result.split("-");
    // const name = info[1];
    // const vehicle = info[0];
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    contract.methods.token(result,result,time).send({from: account}, (error)=>{
      if(!error){
        const par = contract.methods.isparked(result).call();
        var b = "OUT";
        if(par===true) b = "IN";
        t += 1;


        if(par===true) setinfolist(infolist => [...infolist,{t,result,result,time,b,par}]);

        setresult("");
        
    }
    else{
      console.log("errooorrr")
    }
  });
}



  const loadinfo = async (contract) => {
    const totalSupply = await contract.methods.getnum().call();
    console.log(totalSupply);
    console.log("trying again");
    let list = [];
    for(let i = 1; i < totalSupply; i++){
     // console.log("reached");
     
      let info = await contract.methods.getinfo(i).call();
      //if(info.parked===false) continue;
      list.push(info);
      
    }
    setinfolist(list);
  }



  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = Parking.networks[networkId];
    if(networkData){
      const abi = Parking.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  }

  const showComponent= async () =>{
    
      if(!scanner) setscanner(true);
      else{ 
        setscanner(false);}

  }

  
  
  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    await loadinfo(contract);
  }, [])

  return (
    <div className="col">
      <nav className="navbar navbar-light bg-dark px-4">
        <span className="myfont"> Parking System </span>
        <span className="myfont">{account}</span>
      </nav>
      <div >
        <div className="d-flex flex-row showbtn">
          <button onClick={showComponent}>Click to scan !</button>
        </div>
        <div className="d-flex scandiv">
          {scanner && (
            <Scancomp setresult={setresult} showComponent={showComponent} />
          )}
        </div>
      </div>
      <div className="d-flex showbtn">
        <button  onClick={token}> Generate token for Vehicle {result}</button>
      </div>

      

      <table className="custom" >
        <thead>
          <tr className="mytable">
            <th>Vehicle No</th>
            <th>Time</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {infolist.map((list, key) => {
            return (
              <tr className="mytable2" key={key}>
                <td className="mytable3">{list.vehicleno}</td>
                <td className="mytable3">{list.time}</td>
                <td className="mytable3">{list.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );

};

export default App;
