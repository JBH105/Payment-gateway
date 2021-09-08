const cors = require('cors')
const express = require('express')
const app =express()
const stripe =require('stripe')("sk_test_51JXHwxSDBFeI2rcR7rUANw4Dz3t2CYdL6pPLFKvwDBy5uFSE8Vr9Z1sJWVWuxkBIU0voW0zC3KPUKB8C5GLHIu0r00ULbuO14t")
// import {v4 as uuid}  require('uuid/dist')
// const uuid =require('uuid')


//middeleware
app.use(express.json())
app.use(cors())

//Routes
app.get("/" , (req,res)=>{
res.send("<h1>Hello</h1>")
})
app.post("/payment" , (req,res)=>{
    const{product , token} =req.body;
    console.log("Product" , product);
    console.log("Product" , product.price);
    // const idempontencyKey = uuid()
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:product.name
        })
    }).then((result)=>{
        res.status(200).json(result)
    }).catch(err=> console.log(err))
})



//Listen

app.listen(5555 , ()=>{
    console.log("listening on port 5555")
})