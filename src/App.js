import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';

function App() {
  const [product, setProduct] = useState({
    name: "react from fb",
    price: 10,
    productby: "Facebook"

  })
  const makePayment = token =>{
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type":"application/json"
    }
    return fetch(`http://localhost:5555/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(res=>{
      console.log(res)
      const {status} =res
      console.log(status)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="App">
      <StripeCheckout
        stripeKey="pk_test_51JXHwxSDBFeI2rcRe8cB2KUMSmhAGaWRx3jKK2k83WnJNC3Gg1TzYtTLHyZuWAhCZSIJ2Cz0Ae5ahK1yLSyKA3pO00URSEGlfI"
        token={makePayment}
        name="buy react"
        allowRememberMe={true}
        reconfigureOnUpdate
      >
        <button>Click To pay</button>
      </StripeCheckout>
    </div>
  );
}

export default App;
