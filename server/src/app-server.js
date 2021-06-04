const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const  { DB, connection } = require('./db')

const app = express()


const SELECT_ALL_PRODUCTS = 'SELECT * FROM productdetails'

connection.connect(err => {
    if(err) {
        return err;
    }
})

console.log(connection)

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log("Working")
})

app.get('/products', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.post('/category', (req, res) => {
    let SELECT_CATEGORISED_PRODUCTS;
    const chosenCategory = (req.body.category);

    // console.log(chosenCategory)
    

    if(chosenCategory == "all"){
        SELECT_CATEGORISED_PRODUCTS = SELECT_ALL_PRODUCTS
    }else{
        SELECT_CATEGORISED_PRODUCTS = ("SELECT * FROM microservices.productdetails WHERE microservices.productdetails.category LIKE '" + chosenCategory + "'")
    }
    

    connection.query(SELECT_CATEGORISED_PRODUCTS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})


app.get('/search/:searchTerm', (req, res) => {
    let searchTerm = req.params.searchTerm;
   
    const SELECT_SEARCHED_PRODUCTS = ("SELECT * FROM productdetails WHERE microservices.productdetails.name LIKE '%" + searchTerm + "%'")

    connection.query(SELECT_SEARCHED_PRODUCTS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/product-details/:id', (req, res) => {
    let searchTerm = req.params.id;
   
    const SELECT_SEARCHED_PRODUCTS = ("SELECT * FROM productdetails WHERE microservices.productdetails.id LIKE '" + searchTerm + "'")

    connection.query(SELECT_SEARCHED_PRODUCTS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));