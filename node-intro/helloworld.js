// Setup our server
//in node u dont need semi colon;

const http = require('http')
//Define the port the app will be accessed from (80,8080,8888 are default to the domain /)
const port = process.env.PORT || 3000

const server = http.createServer( (request,response) => {
    response.writeHead(200 , {  "Content-Type" : "Text/Plain"   })
    response.end("Hello World")
} )

//start the server

server.listen(port, () => console.log("server started on port " + port + " press ctrl + c to stop" ))