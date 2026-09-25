// Handle Request response

const {StringDecoder} = require("string_decoder")
const url = require("url")

const routes = require('../routes')
const { notFoundHandler} = require('../handlers/routeHandlers/notFoundHandle')



const handler = {};
handler.handlerReqRes = (req, res) => {

    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "")
    const method = req.method.toLowerCase()
    const querStringObject = parsedUrl.query
    const headerObject = req.headers;

    const requestProperties = {
        parsedUrl, path, trimmedPath, method, querStringObject, headerObject
    }



    const decoder = new StringDecoder('utf-8')
    let realData = ''


    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler


    



    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    })

    req.on('end', () => {
        realData += decoder.end()

         chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === "object" ? payload : {};

        const payloadString = JSON.stringify(payload)

        res.writeHead(statusCode);
        res.end(payloadString)
    })



        console.log(realData)

        res.end("Hello Programmers")
    })

    


}

module.exports = handler