const express = require('express')

//add the view engine
const expressHandlebars = require('express-handlebars')

const app = express()

//configure our express app to use handlebars
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))


app.set('view engine', 'handlebars')
//ends handlebar configuration

//Static files or folders are specified before any route
app.use(express.static(__dirname + "/public"))

const port = process.env.port || 3000


//Routes go before 404 and 500, error handling goes at the end always

app.get('/',(req,res)=>{
    res.render('home')
    
})

app.get('/about',(req,res)=>{
    res.render('about' ,{
    title:"About Colombia", 
    pageTitle:"About Colombia Travel",
    image:"colombia2.jpg",
    description:"Colombia is a beautiful city"})

})

// ERROR example , it generates an error becasue the parameter names dont match
//request and response should be written as res should be response bottom must match top parameter

app.get('/nightlife', (req,res)=>{
    res.render('nightlife')
})


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