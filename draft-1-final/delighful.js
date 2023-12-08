const express = require('express')

//add the view engine
const expressHandlebars = require('express-handlebars')

const app = express()

const handler = require('./lib/handler')

const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: true}))


//configure our express app to use handlebars
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))


app.set('view engine', 'handlebars')
//ends handlebar configuration

//Static files or folders are specified before any route
app.use(express.static(__dirname + "/public"))

const port = process.env.port || 3000
//require gallery outside the view bc we will use the same in all get requests
const gallery = require('./data/gallery.json')

//Routes go before 404 and 500, error handling goes at the end always

app.get('/',(req,res)=>{
    var data = require('./data/home-data.json')
    res.render('page', {data})
    
})

app.get('/holidayspecials',(req,res)=>{
    var data = require('./data/holidayspecials-data.json')
    res.render('page', {data})
    
})

app.get('/bakedgoods',(req,res)=>{
    var data = require('./data/bakedgoods-data.json')
    res.render('page', {data, gallery})
    
})
app.get('/aboutus',(req,res)=>{
    var data = require('./data/aboutus-data.json')
    res.render('page', {data})
    
})

app.get('/gifts',(req,res)=>{
    var data = require('./data/gifts-data.json')
    res.render('page', {data})
    
})


app.get('/items',(req,res)=>{
    var data = require('./data/items-data.json')
    res.render('page', {data})
    
})

app.get('/cart',(req,res)=>{
    var data = require('./data/cart-data.json')
    res.render('page', {data})
    
})


app.get('/cartinfo-signup', handler.checkoutSignup)

app.get('/cartinfo/list', handler.checkoutSignupList)

app.get('/newsletter/details/:email', handler.checkoutUser)

app.post('/newsletter/delete', handler.checkoutUserDelete)

app.post('/newsletter-signup/process', handler.newsletterSignupProcess)

app.get('/newsletter/thankyou', (req, res)=>{
    res.render('thankyou')
})


// ERROR example , it generates an error becasue the parameter names dont match
//request and response should be written as res should be response bottom must match top parameter

// app.get('/nightlife', (req,res)=>{
//     res.render('nightlife')
// })


//Error handling ---> app.use() is your basic express route
app.use((req,res) => {
    res.status(404)
    res.render('404')
})


//Server Error 500
app.use((error,req,res,next) => {
    console.log(error.message)
    res.status(500)
    res.render('500')

})

// setup listener
app.listen(port,() =>{
    console.log(`Server started http://localhost:${port}`)
    ///console.log('Server Starter http://localhost:' +port)  ---> its the same thing as above
    console.log('To close press Ctrl-C')
})