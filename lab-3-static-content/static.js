// Setup our server
//in node u dont need semi colon;

const http = require('http')
const fs = require('fs')

//Define the port the app will be accessed from (80,8080,8888 are default to the domain /)
const port = process.env.PORT || 3000


const server = http.createServer( (request,response) => {
const path = request.url

const displayPage = (path,res,contentType, responseCode = 200) => {
    fs.readFile (__dirname + path , (errors, content) => {
        if(errors) {
            res.writeHead(500,{"Content-Type" : "Text/Plain"})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {"Content-Type" : contentType})
        res.end(content)
    })
}


    switch(path) {
        case '':
        case '/':
        displayPage ('/public/home.html' ,response, "text/html")
        break
        case '/about' :
        displayPage ('/public/about.html' ,response,"text/html")
        break
        case '/contact' :
        displayPage ('/public/contact.html' , response, "text/html")
        break
        case '/logo':
        displayPage('/public/img/logo.jpg', response,"image/jpg")
        break
        default:
        displayPage ('/public/404.html' ,response, "text/html", 400)
        break
    }



})


server.listen(port, () => console.log("server started on port " + port + " press ctrl + c to stop" ))
