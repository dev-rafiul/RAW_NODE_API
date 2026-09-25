// dependencies


const http = require("http");
const {handlerReqRes} = require("./helpers/handleReqRes");
const environment = require('./helpers/environment')
const data = require('./lib/data')


//app object - module scaffolding
const app = {}

data.delete('test', 'newFile', (err) => {
    console.log(err)
})


// create server
app.createSever = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Listening to PORT ${environment.port}`)
    })
}


//handle request response
app.handleReqRes = handlerReqRes;


app.createSever()