
const express = require('express')
const app = express()
const {products, people} = require('./data')

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products',(req,res)=>{
    const newProduct = products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image}
    })
    res.json(newProduct)
})
app.get('/api/products/:id',(req,res)=>{
    // console.log(req);
    // console.log(req.params)
    const {id} = req.params;
    const singleProduct = products.find((product)=>product.id ===Number(id))
    if(!singleProduct){
        return res.status(404).send("the asked page couldnot be found")
    }
    res.json(singleProduct)

})

app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params)
})

app.get('/api/v1/query',(req,res)=>{
    //console.log(req.query)
    const {search,limit} = req.query
    let sortedProducts = [...products]

    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length<1){
        res.status(404).send("requested item couldnot be found")
    }
    res.status(200).json(sortedProducts)

    //res.send('Hello there')
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})