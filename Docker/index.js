const rp = require("request-promise");
const express = require("express");
const cors = require('cors')

const PORT = 3000

const app = express()
app.use(cors());

app.listen(PORT, () => {
    console.log(`DEX BackendX2 listening on ${PORT}`);
})

// Coin Market Cap stuff
const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    qs: {
      start: "1",
      limit: "5",
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": "96ed4124-d315-4da6-88ac-b6062240d147",
    },
    json: true,
    gzip: true,
};

// Endpoint to get the data from Coin Market Cap
app.get("/", (req, res) => {
    var returnData = ""

    rp(requestOptions)
    .then((response) => {
        res.send(response)
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
})