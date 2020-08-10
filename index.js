// definisikan web server
// panggil express dari librarynya
const express = require('express')
const bodyParser = require('body-parser')

//import route dari folder routes
const router = require('./routes/index')

// variabel aplikasi kita menggunakan express
const app = express()

// body-parser = module yg berguna untuk mengambil data dari Form
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// ini route root, homepage
app.get('/', (req, res) => {
    res.send(' This is homepage')
})

app.use('/api', router)

// listen
app.listen(5000, () => {
    console.log('Server is running');
})