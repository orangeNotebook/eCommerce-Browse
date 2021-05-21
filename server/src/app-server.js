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



// app.get('/products', async(req, res) => {
//     try {
//     let products = await DB.Products.all()
//     res.json(products)
//     } catch(e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })


// app.get('/products/add', (req, res) => {
//     const { name, details, price, reviews, ratings } = req.query
//     const INSERT_PRODUCTS = `INSERT INTO productdetails (name, details, price, reviews, ratings) VALUES('${name}', ${details}, ${price}, ${reviews}, ${ratings})`
//     connection.query(INSERT_PRODUCTS, (err, results) => {
//         if(err) {
//             return res.send(err)
//         }
//         else {
//             return res.send('sucess')
//         }
//     })
// })

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));