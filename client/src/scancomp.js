import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { QrReader } from "react-qr-reader";
//import QRScan from "./qr-reader.component";

const Scancomp = params => {

  const [res, settext] = useState();
  const [scanner, setscanner] = useState();
  


  const setres = data => {
    if (data) {
      settext(data.text)
      const d = String(data.text);
      params.setresult(d);
      params.showComponent();

  }
  }

  const handleScan = data => {
    if (data) {
        settext(data.text)
        const d = String(data.text);
        params.setresult(d);
        
      params.showComponent();
    }
}
const handleError = err => {
console.error(err)
}

  

  const showComponent= () =>{
      if(!scanner) setscanner(true);
      else setscanner(false);
  }

  return (

    <div className="App" style={{alignitems: 'center' ,justifycontent:'center', height: "20%", width: "20%"}}>
        <h1>SCAN</h1>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "50%" }}
          onResult = {setres}
        />
        <div>{res}</div>
      </div>
    
  );

};

export default Scancomp;
