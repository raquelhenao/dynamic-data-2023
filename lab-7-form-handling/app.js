const express = require('express')

//add the view engine

const expressHandlebars= require('express-handlebars')

const app = express()

const handler = require('./lib/handler')

const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: true}))

// configure our express app to use handlebar

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main' ,
}))

app.set('view engine', 'handlebars')

//ends handlebar configuration

const port = process.env.por || 3000

app.get('/',(req, res)=> {
    res.render('page', {req})
})

app.get('/mad',(req, res)=> {
    const data = require('./data/mad-data.json')
    res.render('madform', {data})
})



app.get('/madprocess', (req,res)=>{
    res.render('madprocess', {req})
})



app.get('/newsletter-signup', handler.newsletterSignup)

app.get('/newsletter/list', handler.newsletterSignupList)

app.get('/newsletter/details/:email', handler.newsletterUser)

app.post('/newsletter/delete', handler.newsletterUserDelete)

app.post('/newsletter-signup/process', handler.newsletterSignupProcess)

app.get('/newsletter/thankyou', (req, res)=>{
    res.render('thankyou')
})


//Error handling

app.use((req, res)=>{
    res.status(404)
    res.render('404')
})

//Server error 500
app.use((error, req, res, next)=>{
    console.log(error.message)
    res.status(500)
    res.render('500')
})

//set up listener
app.listen(port, ()=> {
    console.log(`Server started http://localhost:${port}`)
    console.log('To close press Ctrl-C')
})