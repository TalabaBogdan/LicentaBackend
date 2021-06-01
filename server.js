// const rp = require('request-promise');
// const CoinMarketCap = require('coinmarketcap-api');
//
// const apiKey = '45e0157a-c4ea-4891-8322-0204893fcdd9';
// const client = new CoinMarketCap(apiKey);
//
//
// const requestOptions = {
//     method: 'GET',
//     uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//     qs: {
//         start: 1,
//         limit: 5000,
//         convert: 'USD'
//     },
//     headers: {
//         'X-CMC_PRO_API_KEY': '45e0157a-c4ea-4891-8322-0204893fcdd9',
//         'Access-Control-Allow-Origin' : '*'
//     },
//     json: true,
//     gzip: true
// };
//
//
//
// var http = require('http');
//
//
// http.createServer(function (req, response) {
//     rp(requestOptions).then(response => {
//         console.log('API call response:', response);
//         response.write(response);
//     }).catch((err) => {
//     });
//     response.end();
// }).listen(8080);

const express = require('express');
const rp = require('request-promise');
const cors = require('cors');

const app = express();

const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        start: 1,
        limit: 100,
        convert: 'USD'
    },
    headers: {
        //eu
        'X-CMC_PRO_API_KEY': '45e0157a-c4ea-4891-8322-0204893fcdd9',
        // //negrea
        // 'X-CMC_PRO_API_KEY': 'f0f5f963-778c-4cf8-a17f-de8c8054288a',
    },
    json: true,
    gzip: true
};

var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Authorization');

    next();
}

app.use(corsMiddleware)
app.use(cors())


app.get('/', (req, res) => {
    rp(requestOptions).then(response => {
        console.log('API call response:', response);
        res.send(response);
    }).catch((err) => {
    });
});

app.listen(8080)